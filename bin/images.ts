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
import { Instrument, Topic } from '../lib/utils/constants';
import { nameFromKey, resolveTopic } from '../lib/utils/images';

const INITIAL_WIDTH = 1792;
const INITIAL_HEIGHT = 768;

const songs = db as Song[];

const ensureDir = (dir: string) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

const pathFromKey = (prefix: string, key: string) =>
  join(__dirname, `../public/images/${nameFromKey(prefix, key)}`);

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

const main = async () => {
  // ensure the generated directory is available
  ensureDir(join(__dirname, '../public/generated'));

  await pMap(
    songs,
    async (song) => {
      const { number } = song;

      if ([Topic.InstrumentalSamples, Topic.InstrumentalSynths].includes(song.topic)) return;
      if ([Instrument.Vocals, Instrument.Congas].includes(song.instrument)) return;

      const temp = tempy.file({ extension: 'png' });
      const final = join(__dirname, `../public/generated/${number}.png`);

      const background = song.background.startsWith('#')
        ? await tempBackgroundColor(song.background)
        : pathFromKey('special', song.background);
      await composite(background, pathFromKey('location', song.location), temp);
      await composite(temp, pathFromKey('topic', resolveTopic(song.topic, song.releasedAt)), temp);
      await composite(temp, pathFromKey('mood', song.mood), temp);
      await composite(temp, pathFromKey('beard', song.beard), temp);
      await composite(temp, pathFromKey('instrument', song.instrument), final);

      console.log(`Generated ${number}!`);

      unlinkSync(temp);
    },
    { concurrency: 50 },
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
