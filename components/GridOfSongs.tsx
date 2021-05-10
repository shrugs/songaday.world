import { Box, BoxProps, Link as ChakraLink, SimpleGrid } from '@chakra-ui/react';
import Link from 'next/link';

import { Filters } from '../containers/Filters';
import { Song } from '../lib/types';
import SongCard from './SongCard';

export function GridOfSongs({ songs, children, ...delegated }: BoxProps & { songs: Song[] }) {
  const { makeHref } = Filters.useContainer();
  return (
    <SimpleGrid {...delegated} gap="4" columns={{ base: 1, lg: 2 }}>
      {songs?.map((song) => (
        <Box key={song.id} position="relative">
          <SongCard cursor="pointer" h="full" song={song} card />
          <Link key={song.id} href={makeHref({ id: song.id })} shallow>
            <ChakraLink
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              overflow="hidden"
              whiteSpace="nowrap"
              zIndex="0"
            />
          </Link>
        </Box>
      ))}

      {children}
    </SimpleGrid>
  );
}
