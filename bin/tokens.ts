#!/usr/bin/env ts-node

import { config } from 'dotenv';
config();

import { writeFileSync } from 'fs';
import fetch from 'node-fetch';
import path from 'path';

import { parseSongId } from '../lib/utils/parseSongId';

const LIMIT = 50;

async function fetchByOffset(offset = 0) {
  const response = await fetch(
    `https://api.opensea.io/api/v1/assets?${new URLSearchParams({
      collection: 'song-a-day',
      limit: LIMIT.toString(),
      offset: offset.toString(),
    })}`,
  );

  const result = await response.json();

  return result.assets;
}

const main = async () => {
  const assets = [];
  let offset = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const page = await fetchByOffset(offset);
    assets.push(...page);
    if (page.length < LIMIT) break;
    offset += page.length;
  }

  const songIdToTokenId = assets
    .filter((asset) => !!asset.name)
    .reduce(
      (memo, asset) => ({
        ...memo,
        [parseSongId(asset)]: asset.token_id,
      }),
      {},
    );

  writeFileSync(
    path.join(__dirname, '../generated/tokenIds.js'),
    `export default ${JSON.stringify(songIdToTokenId)}`,
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
