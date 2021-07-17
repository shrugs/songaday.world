import {
  AspectRatio,
  Box,
  BoxProps,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Link as ChakraLink,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { OpenSeaPort } from 'opensea-js';
import React, { useEffect, useMemo, useState } from 'react';
import { Account } from '../containers/Account';
import { Filters } from '../containers/Filters';
import tokenIds from '../generated/tokenIds';
import { Song } from '../lib/types';
import { useNifty } from '../lib/useNifty';
import { FilterTag } from './FilterTag';
import { OwnershipButton } from './OwnershipButton';
import TextTag from './TextTag';
import YoutubeEmbed from './YoutubeEmbed';

const SHOULD_AUTOPLAY = process.env.NODE_ENV === 'production';

// The contract address for all the songs on OpenSea.
const ASSET_CONTRACT_ADDRESS = '0x495f947276749ce646f68ac8c248420045cb7b5e';

const JONATHAN_ID = '0x3d9456ad6463a77bd77123cb4836e463030bfab4@eip155:1';

interface SongCardProps {
  song: Song;
  embed?: boolean;
  card?: boolean;
  tokenId?: string;
  openSeaPort?: OpenSeaPort;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function SongCard({
  song,
  embed = false,
  card = false,
  tokenId,
  openSeaPort,
  setIsModalOpen,
  ...delegated
}: BoxProps & SongCardProps) {
  const { makeHref } = Filters.useContainer();
  const date = useMemo(() => (song ? DateTime.fromISO(song.releasedAt) : DateTime.local()), [song]);
  const subtitleDateString = useMemo(() => date.toLocaleString(DateTime.DATE_FULL), [date]);
  const calendarDateString = useMemo(() => date.toFormat('LLL dd'), [date]);

  // Get the `tokenId` from the url param if it exists, otherwise try and
  // get it from the generated list of ids.
  const finalTokenId = tokenId || tokenIds[song?.number];

  const { data, loading: niftyLoading, isHydrating, error, openSeaUri } = useNifty(finalTokenId);

  const ownedByJonathan = data?.ownerships[0]?.owner?.id === JONATHAN_ID;

  const { account, provider } = Account.useContainer();
  const toast = useToast();
  const [isBuyLoading, setIsBuyLoading] = useState(false);
  const [showBuyButton, setShowBuyButton] = useState(false);

  useEffect(() => {
    setShowBuyButton(tokenId && openSeaPort && ownedByJonathan);
  }, [openSeaPort, ownedByJonathan, tokenId]);

  const buyAsset = async () => {
    if (openSeaPort && showBuyButton) {
      setIsBuyLoading(true);
      setIsModalOpen(true);
      try {
        const order = await openSeaPort?.api.getOrder({
          side: 1,
          token_id: finalTokenId,
          asset_contract_address: ASSET_CONTRACT_ADDRESS,
        });
        await openSeaPort?.fulfillOrder({ order, accountAddress: account });
        toast({
          title: 'Transaction Successful!',
          description: 'Thank you for your purchase',
          status: 'success',
          position: 'top',
        });
        setIsBuyLoading(false);
        setIsModalOpen(false);
        setShowBuyButton(false);
      } catch (error) {
        setIsBuyLoading(false);
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
    <VStack
      {...(card && {
        borderWidth: '1px',
        borderColor: 'gray.200',
        borderRadius: 'sm',
        _hover: { shadow: 'sm' },
        transition: 'all 100ms linear',
      })}
      spacing="2"
      alignItems="stretch"
      bg="white"
      {...delegated}
    >
      <HStack p={card && '2'} justify="space-between" spacing="4">
        <VStack align="stretch" flex="1" minW="0">
          {song ? (
            <Heading as="h3" fontSize="xl" isTruncated>
              {song.title}
            </Heading>
          ) : (
            <Skeleton h="6" w="full" />
          )}
          {song ? (
            <Text as="h4" fontSize="xs" isTruncated>
              {subtitleDateString}
            </Text>
          ) : (
            <Skeleton h="4" w="66%" />
          )}
        </VStack>
        <VStack borderRadius="1" borderColor="black" justifyContent="center" alignItems="center">
          {song ? (
            <Text fontWeight="bold" fontSize="xl">
              {song.id}
            </Text>
          ) : (
            <Skeleton h="6" w="6" />
          )}

          {song ? (
            <Text whiteSpace="nowrap" fontSize="sm" textTransform="uppercase">
              {calendarDateString}
            </Text>
          ) : (
            <Skeleton h="4" w="12" />
          )}
        </VStack>
      </HStack>

      <AspectRatio ratio={16 / 9}>
        {song ? (
          embed ? (
            <YoutubeEmbed id={song.youtubeId} autoPlay={SHOULD_AUTOPLAY} />
          ) : (
            <Image w="full" h="full" src={`/generated/${song.id}.png`} />
          )
        ) : (
          <Skeleton h="full" w="full" />
        )}
      </AspectRatio>

      <VStack flex="1" p={card && '2'} spacing={4} align="stretch">
        <Box flex="1" overflowY="auto">
          {card && (
            <>{song ? <Text>{song.description}</Text> : <SkeletonText skeletonHeight="4" />}</>
          )}
          {!card && (
            <Box mt="4" p="4" bg="gray.50" border="1px" borderColor="gray.300" borderRadius="md">
              {niftyLoading && <Skeleton h="140px" />}
              {!niftyLoading && !showBuyButton && (
                <Button px={[12, 12, 16]} size="lg" colorScheme="blue" isDisabled={true}>
                  {provider ? 'Sold Out' : 'Connect Wallet'}
                </Button>
              )}
              {!niftyLoading && showBuyButton && (
                <>
                  <Text color="gray.600">Current Price:</Text>
                  <Text
                    display="flex"
                    alignItems="center"
                    mt="2"
                    fontSize="3xl"
                    fontWeight="semibold"
                  >
                    <Image src="/assets/icon-eth.svg" display="inline" width="20px" mr="2" />
                    0.12
                  </Text>
                  <Button
                    mt="6"
                    px={[12, 12, 16]}
                    size="lg"
                    colorScheme="blue"
                    isLoading={isBuyLoading}
                    isDisabled={!provider}
                    onClick={buyAsset}
                  >
                    {provider ? 'Buy Song' : 'Connect Wallet'}
                  </Button>
                </>
              )}
            </Box>
          )}
        </Box>
        <Grid gap={4} gridTemplateColumns="repeat(auto-fit, 3rem)">
          {song ? (
            <>
              <Link href={makeHref({ location: song.location })} passHref shallow>
                <ChakraLink zIndex="1">
                  <FilterTag year={song.year} h="3rem" prefix="location" thumbKey={song.location} />
                </ChakraLink>
              </Link>

              <Link href={makeHref({ instrument: song.instrument })} passHref shallow>
                <ChakraLink zIndex="1">
                  <FilterTag
                    year={song.year}
                    h="3rem"
                    prefix="instrument"
                    thumbKey={song.instrument}
                  />
                </ChakraLink>
              </Link>

              <Link href={makeHref({ topic: song.topic })} passHref shallow>
                <ChakraLink zIndex="1">
                  <FilterTag year={song.year} h="3rem" prefix="topic" thumbKey={song.topic} />
                </ChakraLink>
              </Link>

              <Link href={makeHref({ mood: song.mood })} passHref shallow>
                <ChakraLink zIndex="1">
                  <FilterTag year={song.year} h="3rem" prefix="mood" thumbKey={song.mood} />
                </ChakraLink>
              </Link>

              <Link href={makeHref({ beard: song.beard })} passHref shallow>
                <ChakraLink zIndex="1">
                  <FilterTag year={song.year} h="3rem" prefix="beard" thumbKey={song.beard} />
                </ChakraLink>
              </Link>
            </>
          ) : (
            <>
              <Skeleton h="3rem" />
              <Skeleton h="3rem" />
              <Skeleton h="3rem" />
              <Skeleton h="3rem" />
              <Skeleton h="3rem" />
            </>
          )}
        </Grid>

        <SimpleGrid gap="2" minChildWidth="8rem">
          {song?.tags.map((tag) => <TextTag key={tag}>{tag}</TextTag>) ?? (
            <>
              <Skeleton h="8" w="24" />
              <Skeleton h="8" w="24" />
              <Skeleton h="8" w="24" />
            </>
          )}
        </SimpleGrid>

        {!error && (
          <HStack justifyContent="space-between">
            <Box flex="1" overflowX="auto" display="flex">
              <HStack>
                {niftyLoading || isHydrating ? (
                  <OwnershipButton ownership={undefined} />
                ) : (
                  data?.ownerships?.map((ownership) => (
                    <OwnershipButton key={ownership.owner.id} ownership={ownership} />
                  ))
                )}
              </HStack>
            </Box>
            <Button
              as="a"
              size="xs"
              variant="ghost"
              href={openSeaUri}
              target="_blank"
              rel="noopener noreferrer"
              isDisabled={!data}
              zIndex="1"
            >
              See on OpenSea
            </Button>
          </HStack>
        )}
      </VStack>

      {/* margin collapse fix */}
      <Box />
    </VStack>
  );
}

export default SongCard;
