import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Heading,
} from '@chakra-ui/react';
import { times } from 'lodash-es';
import { GetStaticPaths, GetStaticProps } from 'next';
import NextLink from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import { GridOfSongs } from '../../components/GridOfSongs';
import SongCard from '../../components/SongCard';
import { getSong } from '../../lib/db';
import { Song } from '../../lib/types';
import { parseSongId } from '../../lib/utils/parseSongId';

function AccountPage({ songs }: { songs: Song[] }) {
  const noSongs = songs?.length === 0;
  return (
    <Box py={10} px={6}>
      <Heading as="h1" mb="8">
        My Songs
      </Heading>
      {noSongs ? (
        <Alert
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py="6"
          maxWidth="container.md"
          textAlign="center"
        >
          <AlertIcon boxSize="30px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            There are no songs in your account.
          </AlertTitle>
          <AlertDescription mt="4" maxWidth="sm">
            <NextLink href="/available-songs" passHref>
              <Button as="a" colorScheme="blue">
                Buy Year 2 Songs
              </Button>
            </NextLink>
          </AlertDescription>
        </Alert>
      ) : (
        <GridOfSongs songs={songs}>
          {!songs && times(4, (i) => <SongCard key={i} song={undefined} card />)}
        </GridOfSongs>
      )}
    </Box>
  );
}

const COLLECTION = 'song-a-day';
const ONE_HOUR = 60 * 60;

export const getStaticProps: GetStaticProps<ComponentPropsWithoutRef<typeof AccountPage>> = async (
  ctx,
) => {
  const account = ctx.params.account as string;

  if (!account) return { notFound: true };
  if (!account.startsWith('0x')) return { notFound: true };

  const response = await fetch(
    `https://api.opensea.io/api/v1/assets?${new URLSearchParams({
      owner: account,
      collection: COLLECTION,
      limit: '50',
    })}`,
  );

  const results = await response.json();

  if (!results.assets) {
    console.error(JSON.stringify(results));
    throw new Error(`Unable to parse opensea response`);
  }

  const songs = results.assets?.map((asset) => getSong(parseSongId(asset))).filter(Boolean);

  return { props: { songs: songs ?? null }, revalidate: ONE_HOUR };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export default AccountPage;
