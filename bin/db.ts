#!/usr/bin/env ts-node

import { config } from 'dotenv';
config();

import parse from 'csv-parse/lib/sync';
import { readFileSync, writeFileSync } from 'fs';
import { chunk, difference } from 'lodash';
import compact from 'lodash/compact';
import head from 'lodash/head';
import last from 'lodash/last';
import trim from 'lodash/trim';
import without from 'lodash/without';
import { DateTime } from 'luxon';
import fetch from 'node-fetch';
import pMap from 'p-map';
import path from 'path';

import { Song } from '../lib/types';
import { Beard, Instrument, Location, Mood, Topic, Year } from '../lib/utils/constants';
import { getBackground } from '../lib/utils/images';

const LIMIT = 50;

interface VideoItem {
  id: string;
  snippet: {
    description: string;
  };
}

interface VideoInfo {
  description: string;
}

async function fetchVideosByIds(ids: string[]): Promise<VideoItem[]> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?${new URLSearchParams({
      part: ['snippet'].join(','),
      id: ids.join(','),
      key: process.env.YOUTUBE_API_KEY,
    })}`,
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(result));
  }

  if (result.items.length < ids.length) {
    const missing = difference(
      ids,
      result.items.map((item) => item.id),
    );

    console.log(`missing ${JSON.stringify(missing)}`);
  }

  return result.items;
}

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
          .map((text) => ensureValidProperty<Instrument>(Instrument, text)),
      );

      // the instrument is the first instrument that isn't vocals, or vocals
      const instrument = head(without(instruments, Instrument.Vocals)) || Instrument.Vocals;

      const releasedAtStr = releasedAt.toISODate();

      return {
        id: record.number,
        number,
        year,
        youtubeId,
        title: record.title,
        description,
        topic,
        mood,
        beard,
        location,
        instrument,
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

async function getVideoInfos(songs: Song[]): Promise<Record<string, VideoInfo>> {
  const ids = songs.map((song) => song.youtubeId);
  const results = await pMap(chunk(ids, LIMIT), fetchVideosByIds, { concurrency: 5 });
  const items = results.flatMap((result) => result);
  return items.reduce((memo, item) => {
    memo[item.id] = {
      description: item.snippet.description,
    };
    return memo;
  }, {});
}

// expects year#.csv to be present locally
const main = async () => {
  const data = [Year.One, Year.Two].flatMap(songsFromCSV);

  // get infos
  const songsWithoutDescription = data.filter((song) => !song.description);
  const infos = await getVideoInfos(songsWithoutDescription);

  const songs = data.map((song) => ({
    ...song,
    description:
      song.description || infos[song.youtubeId]?.description || 'This song is unavailable!',
  }));

  writeFileSync(
    path.join(__dirname, '../generated/db.js'),
    `export default ${JSON.stringify(songs, null, 2)}`,
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
