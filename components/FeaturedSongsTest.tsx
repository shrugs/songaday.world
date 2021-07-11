import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { Network, OpenSeaPort } from 'opensea-js';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Account } from '../containers/Account';
import fetcher from '../lib/fetcher';
import { OpenSeaSellOrder, OpenSeaSong } from '../lib/types';
import { SongBuyCard } from './SongBuyCard';

interface SplitSongName {
  name: string;
  songNumber: string;
}

function formatBigNumber(bigNumber: number): number {
  return bigNumber / Math.pow(10, 18);
}

function parseSongName(name: string): SplitSongName {
  const splitName = name.split(' | ');
  return {
    name: splitName[0],
    songNumber: splitName[1],
  };
}

function getPrice(sellOrders: OpenSeaSellOrder[]): number {
  if (!sellOrders) {
    return 0;
  }
  const sellOrder = sellOrders[0];
  return formatBigNumber(parseInt(sellOrder?.current_price || '0'));
}

export function FeaturedSongsTest(): JSX.Element {
  const { account } = Account.useContainer();
  const [openSeaPort, setOpenSeaPort] = useState<OpenSeaPort>();

  useEffect(() => {
    if (window.ethereum) {
      const seaport = new OpenSeaPort(window.ethereum, {
        networkName: Network.Rinkeby,
      });
      setOpenSeaPort(seaport);
    }
  }, [account]);

  // Get the assets from OpenSea. We set the `owner` to Jonathan's address
  // so that we only fetch songs that have not been sold.
  const url = `https://rinkeby-api.opensea.io/api/v1/assets?${new URLSearchParams({
    // collection: 'song-a-day-test',
    owner: '0x7271C5398456Dae6b6AB6Ac94C41A6522a3c4cBf', // TODO: Jonathan's address
  })}`;

  const { data, error, mutate } = useSWR(url, fetcher);

  if (error) {
    return <Box>{error}</Box>;
  }

  return (
    <Box>
      <Heading as="h2" mb="6" mt="8" fontSize="3xl">
        TESTNET Featured Songs
      </Heading>
      <SimpleGrid gap="4" columns={{ base: 1, md: 2, lg: 6 }}>
        {data?.assets.map((song: OpenSeaSong) => {
          const price = getPrice(song.sell_orders);
          if (!song.name || price === 0) {
            return null;
          }
          const { name, songNumber } = parseSongName(song.name);
          return (
            <SongBuyCard
              key={song.id}
              song={song}
              songNumber={songNumber}
              name={name}
              price={price}
              openSeaPort={openSeaPort}
              mutate={mutate}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
