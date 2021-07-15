import { Alert, AspectRatio, Box, Center, Img } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { useOpenSeaPort } from '../lib/useOpenSeaPort';
import { BuySongModal } from './BuySongModal';
import SongCard from './SongCard';

export function SongDetail({ id }: { id: string }) {
  const {
    openSeaPort,
    transactionStarted,
    isModalOpen,
    setIsModalOpen,
    onModalClose,
  } = useOpenSeaPort();

  const { data, error } = useSWR(`/api/song/${id}`, fetcher);

  // Gets the `tokenId` from the url. This only works if they navigate here from
  // the `SongBuyCard` component, otherwise we don't know what the `tokenId` is.
  const { query } = useRouter();
  const tokenId = query.tokenId as string;

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
        tokenId={tokenId}
        openSeaPort={openSeaPort}
        setIsModalOpen={setIsModalOpen}
        w="full"
        maxWidth={{ base: 'full', lg: 'md', xl: 'lg', '2xl': 'xl' }}
        py={{ base: 2, lg: 4, xl: 6 }}
        px={{ base: 2, lg: 4, xl: 6 }}
        embed
      />
      <BuySongModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        transactionStarted={transactionStarted}
      />
    </Box>
  );
}
