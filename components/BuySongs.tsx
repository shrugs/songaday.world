import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import useSWR from 'swr';

import fetcher from '../lib/fetcher';

export function BuySongs(): JSX.Element {
  // Get the assets from OpenSea. We set the `owner` to Jonathan's address
  // so that we only fetch songs that have not been sold.
  const url = `https://api.opensea.io/api/v1/assets?${new URLSearchParams({
    collection: 'song-a-day',
    limit: '10',
    order_by: 'visitor_count',
    owner: '0x3d9456ad6463a77bd77123cb4836e463030bfab4', // Jonathan's address
  })}`;

  const { data, error } = useSWR(url, fetcher);

  console.log(data?.assets);

  if (error) {
    return <Box>{error}</Box>;
  }

  return (
    <Box mb="12">
      {data?.assets.map((song) => {
        if (!song.name) {
          return null;
        }
        return (
          <Box key={song.id} mt="4">
            <Image src={song.image_preview_url} alt={song.name} />
            <Text>
              <a href={song.permalink} target="_blank" rel="noopener noreferrer">
                {song.name || 'No Name'}
              </a>
            </Text>
            <Text>Description: {song.description}</Text>
          </Box>
        );
      })}
    </Box>
  );
}
