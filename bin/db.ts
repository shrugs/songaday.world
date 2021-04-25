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
import { Beard, Instrument, Location, Mood, Topic, Year } from '../lib/utils/constants';
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

const toPascalCase = (text: string) =>
  text
    .split(' ')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(' ');
const formatBeard = (text: string) =>
  toPascalCase(trim(text).toLowerCase().replace('n/a', Beard.Clean).replace('na', Beard.Clean));
const formatMood = (text: string) => toPascalCase(trim(text));
const formatTag = (text: string) => trim(text);
const formatLocation = (text: string) => trim(text).replace(/ /gi, '').replace(/,/gi, '');
const formatTopic = (text: string) =>
  trim(text)
    .replace(/ /gi, '')
    .replace(/^Object$/, 'Objects');
const formatInstrument = (text: string) =>
  toPascalCase(trim(text))
    .replace(/ /gi, '')
    .replace('Ukulele', 'Uke')
    .replace(/^Synth$/, 'Synths')
    .replace(/^Drum$/, 'Drums');

function songsFromCSV(year: Year) {
  const input = readFileSync(path.join(__dirname, `year${year}.csv`));
  const data: SongFromCSV[] = parse(input, {
    columns: true,
  });

  return data.map<Song>((record) => {
    try {
      // console.log(record);
      const number = parseInt(record.number);
      const description = trim(record.description).replace(/^N\/A$/, '');
      const isQueryParam = record.videoID.includes('?v=');
      const youtubeId = isQueryParam
        ? last(record.videoID.split('?v='))
        : last(record.videoID.split('/'));
      const releasedAt = DateTime.fromFormat(record.date, 'M/d/yyyy');
      const tags = compact(record.tags.split(',').map(formatTag));

      const mood = ensureValidProperty<Mood>(Mood, formatMood(record.mood));
      const beard = ensureValidProperty<Beard>(Beard, formatBeard(record.beard));
      const location = ensureValidProperty<Location>(Location, formatLocation(record.location));
      const topic = ensureValidProperty<Topic>(Topic, formatTopic(record.topic));

      const instruments = compact(
        trim(record.instruments)
          .split(',')
          .map(formatInstrument)
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
        year,
        youtubeId,
        title: record.title,
        description,
        topic: fullTopic,
        mood,
        beard,
        location,
        instrument: primaryInstument,
        background: getBackground(year, releasedAtStr),
        tags,
        releasedAt: releasedAtStr,
      };
    } catch (error) {
      console.log(error);
      console.log(`while parsing record`);
      console.log(record);
    }
  });
}

// expects year1.csv, exported from https://docs.google.com/spreadsheets/d/15wJgkbF40NRYjcBtZRgIu1BbLl8QFLl8_3nv9YcNILg/edit#gid=0
// to be present locally
const main = async () => {
  const inputs = [Year.One, Year.Two].flatMap(songsFromCSV);

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
