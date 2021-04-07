import {
  AspectRatio,
  Box,
  BoxProps,
  Grid,
  Heading,
  HStack,
  Img,
  Link,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import NextLink from 'next/link';
import React, { useMemo } from 'react';

import { Filters } from '../containers/Filters';
import { Song } from '../lib/types';
import FilterTag from './FilterTag';
import TextTag from './TextTag';
import YoutubeEmbed from './YoutubeEmbed';

const SHOULD_AUTOPLAY = process.env.NODE_ENV === 'production';

function SongCard({
  song,
  embed = false,
  card = false,
  ...delegated
}: BoxProps & { song: Song; embed?: boolean; card?: boolean }) {
  const { makeHref } = Filters.useContainer();
  const date = useMemo(() => (song ? DateTime.fromISO(song.releasedAt) : DateTime.local()), [song]);
  const subtitleDateString = useMemo(() => date.toLocaleString(DateTime.DATE_FULL), [date]);
  const calendarDateString = useMemo(() => date.toFormat('LLL dd'), [date]);

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
              {song.number}
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
            <Img w="full" h="full" src={`/generated/${song.number}.png`} />
          )
        ) : (
          <Skeleton h="full" w="full" />
        )}
      </AspectRatio>

      <VStack flex="1" p={card && '2'} spacing={4} align="stretch">
        <Box flex="1" overflowY="auto">
          {song ? <Text>{song.description}</Text> : <SkeletonText skeletonHeight="4" />}
        </Box>

        <Grid gap={4} gridTemplateColumns="repeat(auto-fit, 3rem)">
          {song ? (
            <>
              <NextLink href={makeHref({ location: song.location })} passHref shallow>
                <Link>
                  <FilterTag h="3rem" prefix="location" thumbKey={song.location} />
                </Link>
              </NextLink>

              <NextLink href={makeHref({ instrument: song.instrument })} passHref shallow>
                <Link>
                  <FilterTag h="3rem" prefix="instrument" thumbKey={song.instrument} />
                </Link>
              </NextLink>

              <NextLink href={makeHref({ topic: song.topic })} passHref shallow>
                <Link>
                  <FilterTag h="3rem" prefix="topic" thumbKey={song.topic} />
                </Link>
              </NextLink>

              <NextLink href={makeHref({ mood: song.mood })} passHref shallow>
                <Link>
                  <FilterTag h="3rem" prefix="mood" thumbKey={song.mood} />
                </Link>
              </NextLink>

              <NextLink href={makeHref({ beard: song.beard })} passHref shallow>
                <Link>
                  <FilterTag h="3rem" prefix="beard" thumbKey={song.beard} />
                </Link>
              </NextLink>
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
      </VStack>

      {/* margin collapse fix */}
      <Box />
    </VStack>
  );
}

export default SongCard;
