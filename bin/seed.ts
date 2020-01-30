#!/usr/bin/env ts-node

import { config } from 'dotenv';
config();

import photon from '../lib/server/photon';
import parse from 'csv-parse/lib/sync';
import { readFileSync } from 'fs';
import path from 'path';
import { DateTime } from 'luxon';
import { SongCreateInput, Location, Topic, Mood, Beard, Instrument } from '@prisma/client';
import last from 'lodash/last';
import trim from 'lodash/trim';
import without from 'lodash/without';
import head from 'lodash/head';
import compact from 'lodash/compact';

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
  if (isValidProperty<T>(all, value)) {
    return value;
  }

  throw new Error(`Invalid property: '${value}'`);
};

const handle = async (fn: () => Promise<void>) => {
  try {
    await fn();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const main = async () => {
  const input = readFileSync(path.join(__dirname, 'year1.csv'));
  const data: SongFromCSV[] = parse(input, {
    columns: true,
  });

  const inputs: SongCreateInput[] = data.map<any>(record => {
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
    const beard = ensureValidProperty<Beard>(
      Beard,
      trim(record.beard)
        .replace('N/A', Beard.Clean)
        .replace('Beard', Beard.Stubble),
    );
    const location = ensureValidProperty(
      Location,
      trim(record.location)
        .replace(/ /gi, '')
        .replace(/,/gi, ''),
    );
    const topic = ensureValidProperty<Topic>(
      Topic,
      trim(record.topic)
        .replace(/ /gi, '')
        .replace('Object', 'Objects'), // special case: 'Object' in spreadsheet is 'Objects' in model
    );

    const instruments = compact(
      trim(record.instruments)
        .split(',')
        .map(trim)
        .map(text => text.replace(/ /gi, ''))
        .filter(text => !INGORE_INSTRUMENTS.includes(text))
        .map(text => ensureValidProperty<Instrument>(Instrument, text)),
    );

    const instrumentsWithoutVocals = without(instruments, Instrument.Vocals);
    // the primary instrument is the first instrument that isn't vocals, or Vocals
    const primaryInstument = head(instrumentsWithoutVocals) || Instrument.Vocals;

    // for instruments, we have two cases
    // when the track topic is instrumental, the topic becomes Instrumental{PrimaryInstrument}
    const fullTopic = topic === Topic.Instrumental ? `${topic}${primaryInstument}` : topic;

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
      tags: { set: tags },
      releasedAt: releasedAt.toJSDate(),
    } as SongCreateInput;
  });

  for (const input of inputs) {
    await photon.song.upsert({
      where: { number: input.number },
      create: input,
      update: input,
    });
  }

  process.exit(0);
};

handle(main);
