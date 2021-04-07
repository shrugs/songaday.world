import { Alert, AspectRatio, Box, Center, Img } from '@chakra-ui/react';
import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import SongCard from './SongCard';

export function SongDetail({ id }: { id: string }) {
  // TODO: display error
  const { data, error } = useSWR(`/api/song/${id}`, fetcher);

  if (error) {
    return (
      <Center h="48">
        <Alert w={{ base: 'full', lg: '50%' }} status="error">
          {error.message}
        </Alert>
      </Center>
    );
  }

  return (
    <Box display="flex" flexDirection={{ base: 'column', lg: 'row' }}>
      <AspectRatio flex="1" w="full" ratio={16 / 9}>
        <Img w="full" h="full" src={`/generated/${id}.png`} />
      </AspectRatio>
      <SongCard
        song={data}
        w="full"
        maxWidth={{ base: 'full', lg: 'md', xl: 'lg', '2xl': 'xl' }}
        py={{ base: 2, lg: 4, xl: 6 }}
        px={{ base: 2, lg: 4, xl: 6 }}
        embed
      />
    </Box>
  );
}
