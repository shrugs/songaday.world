#!/usr/bin/env ts-node

import { config } from 'dotenv';
config();

import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import gm from 'gm';
import { times, uniq } from 'lodash';
import pMap from 'p-map';
import { join } from 'path';

import db from '../generated/db';
import {
  Instrument,
  Location,
  MISSING_INSTRUMENTS_FOR_YEAR,
  MISSING_MOODS_FOR_YEAR,
  MISSING_TOPICS_FOR_YEAR,
  Mood,
  NUM_POETIC,
  Topic,
  Year,
} from '../lib/utils/constants';
import { nameFromKey } from '../lib/utils/images';

const INITIAL_WIDTH = 1792;
const INITIAL_HEIGHT = 768;
const THUMB_EXTENT = 512;

const ensureDir = (dir: string) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

const sourcePath = (year: Year, prefix: string, key: string) =>
  join(__dirname, `../public/images/${year}/${nameFromKey(prefix, key)}`);

const thumbnailPath = (year: Year, prefix: string, key: string) =>
  join(__dirname, `../public/thumbnails/${year}/${nameFromKey(prefix, key)}`);

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
  year: Year,
  prefix: string,
  key: string,
  cb: (source: string, destination: string) => Promise<void>,
) {
  const source = sourcePath(year, prefix, key);
  const destination = thumbnailPath(year, prefix, key);

  await cb(source, destination);
}

const uniqForYear = (year: Year, property: string) =>
  uniq(db.filter((song) => song.year === year).map((song) => song[property]));

async function generate(year: Year) {
  console.log(`Generating thumbnails for year ${year} ->`);

  // ensure the directory is available
  ensureDir(join(__dirname, `../public/thumbnails/${year}`));

  const beards = uniqForYear(year, 'beard');
  const topics = uniqForYear(year, 'topic')
    .flatMap((key) =>
      key === Topic.Poetic ? times(NUM_POETIC[year], (i) => `poetic${i + 1}`) : [key],
    )
    .filter((key: Topic) => !MISSING_TOPICS_FOR_YEAR[year].includes(key));
  const moods = uniqForYear(year, 'mood').filter(
    (key: Mood) => !MISSING_MOODS_FOR_YEAR[year].includes(key),
  );
  const instruments = uniqForYear(year, 'instrument')
    .filter((key: Instrument) => !MISSING_INSTRUMENTS_FOR_YEAR[year].includes(key))
    .filter((key: Instrument) => key !== Instrument.Vocals);
  const locations = uniqForYear(year, 'location');

  await pMap(beards, async (key) => {
    await withPrefixAndKey(year, 'beard', key, trimBasic);
  });
  console.log(`Generated Beards...`);

  await pMap(topics, async (key: Topic) => {
    const noTopicBaadge =
      key.startsWith('poetic') || [Topic.PSA, Topic.Sex, Topic.ThemeSong].includes(key);
    await withPrefixAndKey(year, 'topic', key, noTopicBaadge ? trimBasic : trimTopicWithBadge);
  });
  console.log(`Generated Topics...`);

  await pMap(moods, async (key) => {
    await withPrefixAndKey(year, 'mood', key, trimBasic);
  });
  console.log(`Generated Moods...`);

  await pMap(instruments, async (key: Instrument) => {
    await withPrefixAndKey(year, 'instrument', key, trimBasic);
  });
  console.log(`Generated Instruments...`);

  await pMap(locations, async (key: Location) => {
    await withPrefixAndKey(year, 'location', key, trimCover);
  });
  console.log(`Generated Locations...`);
}

const copyFiles = (from: string, to: string) =>
  readdirSync(from).forEach((name) => copyFileSync(join(from, name), join(to, name)));

const main = async () => {
  await generate(Year.One);
  await generate(Year.Two);

  // merge for universal by copying over to the all folder
  ensureDir(join(__dirname, `../public/thumbnails/all`));
  copyFiles(
    join(__dirname, `../public/thumbnails/${Year.Two}`),
    join(__dirname, `../public/thumbnails/all`),
  );
  copyFiles(
    join(__dirname, `../public/thumbnails/${Year.One}`),
    join(__dirname, `../public/thumbnails/all`),
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
