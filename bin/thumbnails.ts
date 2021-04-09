#!/usr/bin/env ts-node

import { config } from 'dotenv';
config();

import { existsSync, mkdirSync } from 'fs';
import gm from 'gm';
import { times } from 'lodash';
import pMap from 'p-map';
import { join } from 'path';

import { Beard, Instrument, Location, Mood, Topic } from '../lib/utils/constants';
import { nameFromKey } from '../lib/utils/images';

const INITIAL_WIDTH = 1792;
const INITIAL_HEIGHT = 768;
const THUMB_EXTENT = 512;

const ensureDir = (dir: string) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

const sourcePath = (prefix: string, key: string) =>
  join(__dirname, `../public/images/${nameFromKey(prefix, key)}`);

const thumbnailPath = (prefix: string, key: string) =>
  join(__dirname, `../public/thumbnails/${nameFromKey(prefix, key)}`);

const trimBasic = (source: string, destination: string): Promise<void> =>
  new Promise((resolve, reject) =>
    gm(source)
      .trim()
      .resize(THUMB_EXTENT, THUMB_EXTENT)
      .background('transparent')
      .gravity('Center')
      .extent(THUMB_EXTENT, THUMB_EXTENT)
      .noProfile()
      .write(destination, function (err) {
        if (err) {
          console.log(`Error for ${source} -> ${destination}`);
          return reject(err);
        }
        return resolve();
      }),
  );

const trimTopicWithBadge = async (source: string, destination: string): Promise<void> =>
  new Promise((resolve, reject) =>
    gm(source)
      // here we subtract enough pixels to cut off the badge
      // for some reason the command -gravity East -crop 0x0+250+0 works just fine in the cli
      // but when run with node it complains about missing image data
      // so we just do this dumb version here instead
      .crop(INITIAL_WIDTH - 250, INITIAL_HEIGHT)
      .trim()
      .repage('+')
      .resize(THUMB_EXTENT, THUMB_EXTENT)
      .background('transparent')
      .gravity('Center')
      .extent(THUMB_EXTENT, THUMB_EXTENT)
      .noProfile()
      .write(destination, function (err) {
        if (err) {
          console.log(`Error for ${source} -> ${destination}`);
          return reject(err);
        }
        return resolve();
      }),
  );

const trimCover = async (source: string, destination: string): Promise<void> =>
  new Promise((resolve, reject) =>
    gm(source)
      .gravity('Center')
      .resize(THUMB_EXTENT, THUMB_EXTENT, '^')
      .background('transparent')
      .gravity('Center')
      .extent(THUMB_EXTENT, THUMB_EXTENT)
      .noProfile()
      .write(destination, function (err) {
        if (err) {
          console.log(`Error for ${source} -> ${destination}`);
          return reject(err);
        }
        return resolve();
      }),
  );

async function withPrefixAndKey(
  prefix: string,
  key: string,
  cb: (source: string, destination: string) => Promise<void>,
) {
  const source = sourcePath(prefix, key);
  const destination = thumbnailPath(prefix, key);

  await cb(source, destination);
}

const main = async () => {
  // ensure the directory is available
  ensureDir(join(__dirname, '../public/thumbnails'));

  await pMap(Object.keys(Beard), async (key) => {
    await withPrefixAndKey('beard', key, trimBasic);
  });

  console.log(`Generated Beards...`);

  await pMap(
    Object.keys(Topic)
      // include the extra poetic topic images
      .flatMap((key) => (key === Topic.Poetic ? times(7, (i) => `poetic${i + 1}`) : [key]))
      // filter unknown topics
      .filter((key: Topic) => ![Topic.InstrumentalSamples, Topic.InstrumentalSynths].includes(key)),
    async (key: Topic) => {
      const noTopicBaadge =
        key.startsWith('poetic') || [Topic.PSA, Topic.Sex, Topic.ThemeSong].includes(key);
      await withPrefixAndKey('topic', key, noTopicBaadge ? trimBasic : trimTopicWithBadge);
    },
  );
  console.log(`Generated Topics...`);

  await pMap(Object.keys(Mood), async (key) => {
    await withPrefixAndKey('mood', key, trimBasic);
  });
  console.log(`Generated Moods...`);

  await pMap(
    Object.keys(Instrument) //
      // filter unknown instruments
      .filter((key: Instrument) => ![Instrument.Vocals, Instrument.Congas].includes(key)),
    async (key: Instrument) => {
      await withPrefixAndKey('instrument', key, trimBasic);
    },
  );
  console.log(`Generated Instruments...`);

  await pMap(Object.keys(Location), async (key: Location) => {
    await withPrefixAndKey('location', key, trimCover);
  });
  console.log(`Generated Locations...`);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
