import { Box, Button, Flex, Heading, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { Network, OpenSeaPort } from 'opensea-js';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Account } from '../containers/Account';
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

export function FeaturedSongsTest(): JSX.Element {
  const { account } = Account.useContainer();
  const [openSeaPort, setOpenSeaPort] = useState<OpenSeaPort>();
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

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
    collection: 'song-a-day-test',
    owner: '0x3d9456ad6463a77bd77123cb4836e463030bfab4', // Jonathan's address
  })}`;

  const { data, error, mutate } = useSWR(url, fetcher);

  const buyAsset = async (token_id, asset_contract_address) => {
    if (openSeaPort) {
      setIsLoading(true);
      toast({
        title: 'Transaction Started',
        description: 'Please confirm the transaction from your Wallet',
        status: 'success',
        position: 'bottom-right',
      });
      try {
        const order = await openSeaPort?.api.getOrder({
          side: 1,
          token_id,
          asset_contract_address,
        });
        await openSeaPort?.fulfillOrder({ order, accountAddress: account });
        toast({
          title: 'Transaction Successful!',
          description: 'Thank you for your purchase',
          status: 'success',
          position: 'bottom-right',
        });
        setIsLoading(false);
        mutate();
      } catch (error) {
        setIsLoading(false);
        toast({
          title: 'An error has occurred',
          description: error.message,
          status: 'error',
          position: 'bottom-right',
        });
      }
    }
  };

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
          if (!song.name) {
            return null;
          }
          const { name, songNumber } = parseSongName(song.name);
          const sellOrder = song.sell_orders[0];
          const price = formatBigNumber(parseInt(sellOrder.current_price));
          return (
            <Box
              key={song.id}
              mt="4"
              pt="3"
              pb="6"
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
            >
              <Flex justifyContent="space-between" px="4" mb="7" fontSize="xs">
                <Text>{songNumber}</Text>
              </Flex>
              <Box textAlign="center">
                <Image src={song.image_url} alt={song.name} width={512} height={220} />
              </Box>
              <Box px="4">
                <Text mt="4" lineHeight="6" fontWeight="semibold" isTruncated>
                  {name}
                </Text>
                <Button
                  mt="4"
                  size="sm"
                  colorScheme="blue"
                  isLoading={isLoading}
                  onClick={() => {
                    buyAsset(song.token_id, song.asset_contract.address);
                  }}
                >
                  Buy: {price} Ξ
                </Button>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
