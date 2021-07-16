import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, Box, Button, Center, SimpleGrid } from '@chakra-ui/react';
import { times } from 'lodash-es';
import React, { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { OpenSeaSellOrder, OpenSeaSong } from '../lib/types';
import { useOpenSeaPort } from '../lib/useOpenSeaPort';
import { BuySongModal } from './BuySongModal';
import { SongBuyCard } from './SongBuyCard';
import SongCard from './SongCard';

/**
 * Constants & Helpers
 */

interface SplitSongName {
  name: string;
  songNumber: string;
}

function formatBigNumber(bigNumber: number): number {
  return bigNumber / Math.pow(10, 18);
}

function parseSongName(name: string): SplitSongName {
  const splitName = name.split(' | ');
  let songNumber;
  if (splitName && splitName.length === 2) {
    const splitSongNumber = splitName[1].split('#');
    songNumber = splitSongNumber[1];
  }
  return {
    name: splitName[0],
    songNumber,
  };
}

function getPrice(sellOrders: OpenSeaSellOrder[]): number {
  if (!sellOrders) {
    return 0;
  }
  const sellOrder = sellOrders[0];
  return formatBigNumber(parseInt(sellOrder?.current_price || '0'));
}

// Get the assets from OpenSea. We set the `owner` to Jonathan's address
// so that we only fetch songs that have not been sold.
function getApiKey(showAllSongs: boolean, page: number): string {
  const offset = page * 50;
  return `https://api.opensea.io/api/v1/assets?${new URLSearchParams({
    collection: 'song-a-day',
    limit: showAllSongs ? '50' : '12', // API is capped to 50
    order_by: 'visitor_count',
    owner: '0x3d9456ad6463a77bd77123cb4836e463030bfab4', // Jonathan's address
    offset: offset.toString(),
  })}`;
}

/**
 * Component
 */

export function FeaturedSongs({
  gridSize = 4,
  showAllSongs,
}: {
  gridSize?: number;
  showAllSongs?: boolean;
}): JSX.Element {
  // Max number of pages currently is `6`.
  // After that, there are no more songs.
  const [page, setPage] = useState(0);

  const {
    openSeaPort,
    transactionStarted,
    isModalOpen,
    setIsModalOpen,
    onModalClose,
  } = useOpenSeaPort();

  const { data, error, mutate } = useSWR(getApiKey(showAllSongs, page), fetcher);

  function loadMoreSongs() {
    setPage((prevPage) => {
      if (prevPage <= 5) {
        return prevPage + 1;
      }
    });
  }

  function loadPreviousSongs() {
    setPage((prevPage) => {
      if (prevPage > 0) {
        return prevPage - 1;
      }
    });
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  return (
    <Box>
      <SimpleGrid gap="4" columns={{ base: 1, md: 2, lg: gridSize }}>
        {!data && !error && times(gridSize * 2, (i) => <SongCard key={i} song={undefined} card />)}
        {data?.assets.map((song: OpenSeaSong) => {
          const price = getPrice(song.sell_orders);
          if (!song.name || price === 0) {
            return null;
          }
          const { name, songNumber } = parseSongName(song.name);
          const date = song.traits.find((trait) => trait.trait_type === 'DATE');
          return (
            <SongBuyCard
              key={song.id}
              song={song}
              songNumber={songNumber}
              name={name}
              price={price}
              date={date}
              mutate={mutate}
              openSeaPort={openSeaPort}
              setIsModalOpen={setIsModalOpen}
            />
          );
        })}
      </SimpleGrid>
      {showAllSongs && (
        <Center
          mt="6"
          py="3"
          bg="gray.50"
          border="1px"
          borderColor="gray.200"
          position="sticky"
          bottom="0px"
        >
          {page > 0 && (
            <Button
              colorScheme="blue"
              variant="outline"
              mx="4"
              size="sm"
              isDisabled={!data}
              leftIcon={<ArrowBackIcon />}
              onClick={loadPreviousSongs}
            >
              Previous Songs
            </Button>
          )}
          {page <= 5 && (
            <Button
              colorScheme="blue"
              variant="outline"
              mx="4"
              size="sm"
              isDisabled={!data}
              rightIcon={<ArrowForwardIcon />}
              onClick={loadMoreSongs}
            >
              More Songs
            </Button>
          )}
        </Center>
      )}
      <BuySongModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        transactionStarted={transactionStarted}
      />
    </Box>
  );
}
