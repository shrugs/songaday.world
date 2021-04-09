#!/usr/bin/env ts-node

import { config } from 'dotenv';
config();

import parse from 'csv-parse/lib/sync';
import { readFileSync, writeFileSync } from 'fs';
import compact from 'lodash/compact';
import head from 'lodash/head';
import last from 'lodash/last';
import trim from 'lodash/trim';
import without from 'lodash/without';
import { DateTime } from 'luxon';
import path from 'path';

import { Song } from '../lib/types';
import { Beard, Instrument, Location, Mood, Topic } from '../lib/utils/constants';
import { getBackground } from '../lib/utils/images';

// these instruments are listed, but we don't have any images for them
const INGORE_INSTRUMENTS = ['Shaker', 'Claps'];

interface SongFromCSV {
  number: string;
  date: string;
  title: string;
  length: string;
  inKey: string;
  tempo: string;
  topic: string;
  location: string;
  instruments: string;
  beard: string;
  videoID: string;
  description: string;
  acousticProduced: string;
  firsts: string;
  comments: string;
  press: string;
  mood: string;
  spotify: string;
  itunes: string;
  bandcamp: string;
  tags: string;
}

const isValidProperty = <T>(all: Record<string, string>, value: any): value is T =>
  all[value] !== undefined;

const ensureValidProperty = <T>(all: Record<string, string>, value: any) => {
  if (!isValidProperty<T>(all, value)) throw new Error(`Invalid property: '${value}'`);

  return value;
};

// expecsts year1.csv, exported from https://docs.google.com/spreadsheets/d/15wJgkbF40NRYjcBtZRgIu1BbLl8QFLl8_3nv9YcNILg/edit#gid=0
// to be present locally
const main = async () => {
  const input = readFileSync(path.join(__dirname, 'year1.csv'));
  const data: SongFromCSV[] = parse(input, {
    columns: true,
  });

  const inputs = data.map<Song>((record) => {
    // console.log(record);
    const number = parseInt(record.number);
    const description = trim(record.description).replace(/^N\/A$/, '');
    const isQueryParam = record.videoID.includes('?v=');
    const youtubeId = isQueryParam
      ? last(record.videoID.split('?v='))
      : last(record.videoID.split('/'));
    const releasedAt = DateTime.fromFormat(record.date, 'M/d/yyyy');
    const tags = compact(record.tags.split(',').map(trim));

    const mood = ensureValidProperty<Mood>(Mood, trim(record.mood));
    const beard = ensureValidProperty<Beard>(Beard, trim(record.beard).replace('N/A', Beard.Clean));
    const location = ensureValidProperty<Location>(
      Location,
      trim(record.location).replace(/ /gi, '').replace(/,/gi, ''),
    );
    const topic = ensureValidProperty<Topic>(
      Topic,
      trim(record.topic).replace(/ /gi, '').replace('Object', 'Objects'), // special case: 'Object' in spreadsheet is 'Objects' in model
    );

    const instruments = compact(
      trim(record.instruments)
        .split(',')
        .map(trim)
        .map((text) => text.replace(/ /gi, ''))
        .filter((text) => !INGORE_INSTRUMENTS.includes(text))
        .map((text) => ensureValidProperty<Instrument>(Instrument, text)),
    );

    // the primary instrument is the first instrument that isn't vocals, or Vocals
    const instrumentsWithoutVocals = without(instruments, Instrument.Vocals);
    const primaryInstument = head(instrumentsWithoutVocals) || Instrument.Vocals;

    // for instruments, we have two cases
    // when the track topic is instrumental, the topic becomes Instrumental{PrimaryInstrument}
    const fullTopic = ensureValidProperty<Topic>(
      Topic,
      topic === Topic.Instrumental ? `${topic}${primaryInstument}` : topic,
    );

    const releasedAtStr = releasedAt.toISODate();

    return {
      number,
      youtubeId,
      title: record.title,
      description,
      topic: fullTopic,
      mood,
      beard,
      location,
      instrument: primaryInstument,
      background: getBackground(releasedAtStr),
      tags,
      releasedAt: releasedAtStr,
    };
  });

  writeFileSync(
    path.join(__dirname, '../generated/db.js'),
    `export default ${JSON.stringify(inputs)}`,
    {
      flag: 'w',
    },
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
