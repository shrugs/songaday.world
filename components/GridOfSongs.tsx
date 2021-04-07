import { BoxProps, SimpleGrid } from '@chakra-ui/react';
import Link from 'next/link';

import { Filters } from '../containers/Filters';
import { Song } from '../lib/types';
import SongCard from './SongCard';

export function GridOfSongs({ songs, children, ...delegated }: BoxProps & { songs: Song[] }) {
  const { makeHref } = Filters.useContainer();
  return (
    <SimpleGrid {...delegated} gap="4" columns={{ base: 1, lg: 2 }}>
      {songs?.map((song) => (
        <Link key={song.number} href={makeHref({ id: song.number.toString() })} passHref shallow>
          <a>
            <SongCard h="full" song={song} card />
          </a>
        </Link>
      ))}

      {children}
    </SimpleGrid>
  );
}
