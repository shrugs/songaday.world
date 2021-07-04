import { Box, Button, Flex, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import { OpenSeaSong } from '../lib/types';

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

export function FeaturedSongs(): JSX.Element {
  // Get the assets from OpenSea. We set the `owner` to Jonathan's address
  // so that we only fetch songs that have not been sold.
  const url = `https://api.opensea.io/api/v1/assets?${new URLSearchParams({
    collection: 'song-a-day',
    limit: '12',
    order_by: 'visitor_count',
    owner: '0x3d9456ad6463a77bd77123cb4836e463030bfab4', // Jonathan's address
  })}`;

  const { data, error } = useSWR(url, fetcher);

  if (error) {
    return <Box>{error}</Box>;
  }

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="6">
        <Heading as="h2" fontSize="3xl">
          Featured Songs
        </Heading>
        <Button colorScheme="blue">View Unclaimed Songs</Button>
      </Flex>
      <SimpleGrid gap="4" columns={{ base: 1, md: 2, lg: 6 }}>
        {data?.assets.map((song: OpenSeaSong) => {
          if (!song.name) {
            return null;
          }
          const { name, songNumber } = parseSongName(song.name);
          const sellOrder = song.sell_orders[0];
          const date = song.traits.find((trait) => trait.trait_type === 'DATE');
          const price = formatBigNumber(parseInt(sellOrder.current_price));
          return (
            <Link
              key={song.id}
              href={song.permalink}
              mt="4"
              _hover={{ color: 'blue.500', shadow: 'lg' }}
              isExternal
            >
              <Box pt="3" pb="6" borderWidth="1px" borderColor="gray.200" borderRadius="md">
                <Flex justifyContent="space-between" px="4" mb="7" fontSize="xs">
                  <Text>{songNumber}</Text>
                  <Text>{date.value}</Text>
                </Flex>
                <Box textAlign="center">
                  <Image src={song.image_url} alt={song.name} width={512} height={220} />
                </Box>
                <Box px="4">
                  <Text mt="4" lineHeight="6" fontWeight="semibold" isTruncated>
                    {name}
                  </Text>
                  <Text mt="2" fontSize="sm">
                    Price: {price} Ξ
                  </Text>
                </Box>
              </Box>
            </Link>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
