#!/usr/bin/env ts-node

import { config } from 'dotenv';
config();

import { existsSync, mkdirSync, unlinkSync } from 'fs';
import gm from 'gm';
import pMap from 'p-map';
import { join } from 'path';
import tempy from 'tempy';

import db from '../generated/db';
import { Song } from '../lib/types';
import {
  MISSING_INSTRUMENTS_FOR_YEAR,
  MISSING_TOPICS_FOR_YEAR,
  Year,
} from '../lib/utils/constants';
import { nameFromKey, resolveTopic } from '../lib/utils/images';

const INITIAL_WIDTH = 1792;
const INITIAL_HEIGHT = 768;

const songs = db as Song[];

const ensureDir = (dir: string) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

const pathFromKey = (year: Year, prefix: string, key: string) =>
  join(__dirname, `../public/images/${year}/${nameFromKey(prefix, key)}`);

const composite = (a: string, b: string, out: string) =>
  new Promise((resolve, reject) =>
    gm(a)
      .composite(b)
      .write(out, function (err) {
        if (err) return reject(err);
        return resolve(out);
      }),
  );

function tempBackgroundColor(color: string): Promise<string> {
  const path = tempy.file({ extension: 'png' });
  return new Promise((resolve, reject) =>
    gm(INITIAL_WIDTH, INITIAL_HEIGHT, color).write(path, (err) => {
      if (err) return reject(err);
      return resolve(path);
    }),
  );
}

function skip(song: Song, prop: string) {
  console.log(`Skipping song ${song.number} because ${prop} ${song[prop]} isn't available!`);
}

const main = async () => {
  // ensure the generated directory is available
  ensureDir(join(__dirname, '../public/generated'));

  await pMap(
    songs,
    async (song) => {
      const { number, year } = song;
      if (MISSING_TOPICS_FOR_YEAR[year].includes(song.topic)) return skip(song, 'topic');
      if (MISSING_INSTRUMENTS_FOR_YEAR[year].includes(song.instrument))
        return skip(song, 'instrument');

      const temp = tempy.file({ extension: 'png' });
      const final = join(__dirname, `../public/generated/${number}.png`);

      const background = song.background.startsWith('#')
        ? await tempBackgroundColor(song.background)
        : pathFromKey(year, 'special', song.background);
      const locationPath = pathFromKey(year, 'location', song.location);
      const topicPath = pathFromKey(year, 'topic', resolveTopic(year, song.topic, song.releasedAt));
      const moodPath = pathFromKey(year, 'mood', song.mood);
      const beardPath = pathFromKey(year, 'beard', song.beard);
      const instrumentPath = pathFromKey(year, 'instrument', song.instrument);

      await composite(background, locationPath, temp);
      await composite(temp, topicPath, temp);
      await composite(temp, moodPath, temp);
      await composite(temp, beardPath, temp);
      await composite(temp, instrumentPath, final);

      console.log(`Generated ${number}!`);

      unlinkSync(temp);
    },
    { concurrency: 25 },
  );
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
