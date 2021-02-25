#!/usr/bin/env ts-node

import { config } from 'dotenv';
config();

import { existsSync, mkdirSync, unlinkSync } from 'fs';
import gm from 'gm';
import pMap from 'p-map';
import { join } from 'path';
import tempy from 'tempy';

import db from '../generated/db.json';
import { Song } from '../lib/types';
import { Beard, Instrument, Topic } from '../lib/utils/constants';
import { nameFromKey, resolveTopic } from '../lib/utils/images';

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

const main = async () => {
  // ensure the generated directory is available
  ensureDir(join(__dirname, '../public/generated'));

  await composite(
    pathFromKey('topic', resolveTopic(songs[0].number, songs[0].topic)),
    pathFromKey('mood', songs[0].mood),
    'out.png',
  );

  await pMap(
    songs,
    async (song) => {
      const { number } = song;

      if (
        [
          Topic.Christmas,
          Topic.Objects,
          Topic.Friend,
          Topic.InstrumentalSamples,
          Topic.InstrumentalSynths,
          Topic.Food,
        ].includes(song.topic)
      )
        return;

      if (
        [
          Instrument.AcousticGuitar,
          Instrument.Banjo,
          Instrument.Vocals,
          Instrument.Congas,
        ].includes(song.instrument)
      )
        return;

      if ([Beard.Stubble].includes(song.beard)) return;

      const temp = tempy.file({ extension: 'png' });
      const final = join(__dirname, `../public/generated/${number}.png`);
      await composite(
        pathFromKey('location', song.location),
        pathFromKey('topic', resolveTopic(number, song.topic)),
        temp,
      );
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
