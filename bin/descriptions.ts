#!/usr/bin/env ts-node

import { config } from 'dotenv';
config();

import stringify from 'csv-stringify/lib/sync';
import { writeFileSync } from 'fs';
import { chunk, difference } from 'lodash';
import fetch from 'node-fetch';
import pMap from 'p-map';
import path from 'path';

import db from '../generated/db';

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

async function getVideoInfos(ids: string[]): Promise<Record<string, VideoInfo>> {
  const results = await pMap(chunk(ids, LIMIT), fetchVideosByIds, { concurrency: 5 });
  const items = results.flatMap((result) => result);
  return items.reduce((memo, item) => {
    memo[item.id] = {
      description: item.snippet.description,
    };
    return memo;
  }, {});
}

const main = async () => {
  const infos = await getVideoInfos(db.map((song) => song.youtubeId));

  const data = db.map((song) => [
    song.id,
    song.description || 'N/A',
    infos[song.youtubeId]?.description || 'N/A',
  ]);

  writeFileSync(path.join(__dirname, '../generated/descriptions.csv'), stringify(data), {
    flag: 'w',
  });
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
