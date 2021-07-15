import { Box, Button, Flex, Link, Text, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { OpenSeaPort } from 'opensea-js';
// import { OpenSeaAsset } from 'opensea-js/lib/types';
import React, { useState } from 'react';
import { Account } from '../containers/Account';
import { OpenSeaSellTrait, OpenSeaSong } from '../lib/types';

interface SongBuyCardProps {
  song: OpenSeaSong;
  songNumber: string;
  name: string;
  price: number;
  date?: OpenSeaSellTrait;
  openSeaPort: OpenSeaPort;
  mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SongBuyCard({
  song,
  songNumber,
  name,
  price,
  date,
  openSeaPort,
  mutate,
  setIsModalOpen,
}: SongBuyCardProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const { account, provider } = Account.useContainer();
  const toast = useToast();

  const buyAsset = async () => {
    if (openSeaPort) {
      setIsLoading(true);
      setIsModalOpen(true);
      try {
        const order = await openSeaPort?.api.getOrder({
          side: 1,
          token_id: song.token_id,
          asset_contract_address: song.asset_contract.address,
        });
        await openSeaPort?.fulfillOrder({ order, accountAddress: account });
        toast({
          title: 'Transaction Successful!',
          description: 'Thank you for your purchase',
          status: 'success',
          position: 'top',
        });
        setIsLoading(false);
        setIsModalOpen(false);
        mutate((cache) => {
          const newAssets = cache.assets.filter((asset) => asset.token_id !== song.token_id);
          return {
            assets: newAssets,
          };
        }, false);
      } catch (error) {
        setIsLoading(false);
        setIsModalOpen(false);
        toast({
          title: 'An error has occurred',
          description: error.message,
          status: 'error',
          position: 'top',
        });
      }
    }
  };

  return (
    <Box
      mt="4"
      pt="3"
      pb="6"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      transition="box-shadow 100ms linear"
      _hover={{
        boxShadow: 'lg',
      }}
    >
      <NextLink href={`/song/${songNumber}?tokenId=${song.token_id}`} passHref>
        <Link _hover={{ color: 'blue.600' }}>
          <Box>
            <Flex justifyContent="space-between" px="4" mb="5" fontSize="xs">
              {songNumber && <Text>Song A Day #{songNumber}</Text>}
              {date && <Text>{date.value}</Text>}
            </Flex>
            {/* <Box textAlign="center" position="relative" width="100%" minHeight="220px"> */}
            {/* <Image src={song.image_url} alt={song.name} layout="fill" objectFit="contain" /> */}
            <Image src={song.image_url} alt={song.name} width={512} height={220} />
            {/* </Box> */}
            <Box px="4">
              <Text mt="4" lineHeight="6" fontWeight="semibold" isTruncated>
                {name}
              </Text>
            </Box>
          </Box>
        </Link>
      </NextLink>
      <Box px="4">
        <Button
          mt="4"
          size="sm"
          colorScheme="blue"
          isLoading={isLoading}
          isDisabled={!provider}
          onClick={buyAsset}
        >
          {provider ? `Buy: ${price} Ξ` : 'Connect Wallet'}
        </Button>
      </Box>
    </Box>
  );
}
