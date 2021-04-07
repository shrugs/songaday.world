import { Box, VStack } from '@chakra-ui/react';
import { times } from 'lodash-es';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ComponentPropsWithoutRef } from 'react';

import { GridOfSongs } from '../../components/GridOfSongs';
import SongCard from '../../components/SongCard';
import { getSong } from '../../lib/db';
import { Song } from '../../lib/types';

function AccountPage({ account, songs }: { account: string; songs: Song[] }) {
  return (
    <Box py={4} px={2}>
      <GridOfSongs songs={songs}>
        {!songs && times(4, (i) => <SongCard key={i} song={undefined} card />)}
      </GridOfSongs>
    </Box>
  );
}

const COLLECTION = 'song-a-day';
const ONE_HOUR = 60 * 60;

function parseSongId(asset): number {
  const parts = asset.external_link.split('/');
  return parseInt(parts[parts.length - 1]);
}

export const getStaticProps: GetStaticProps<ComponentPropsWithoutRef<typeof AccountPage>> = async (
  ctx,
) => {
  const account = ctx.params.account as string;

  if (!account) return { notFound: true };

  const response = await fetch(
    `https://api.opensea.io/api/v1/assets?${new URLSearchParams({
      owner: account,
      collection: COLLECTION,
      limit: '50',
    })}`,
  );

  const results = await response.json();

  const songs = results.assets.map((asset) => getSong(parseSongId(asset))).filter(Boolean);

  return { props: { account, songs }, revalidate: ONE_HOUR };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export default AccountPage;
