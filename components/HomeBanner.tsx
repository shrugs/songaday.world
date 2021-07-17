import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  Progress,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { SongsProgress } from '../lib/types';

// Song a day started on `1/1/2009` so we calculate the number of
// days since then, to give us the total number of songs written.
function getNumberOfDays() {
  const date1 = new Date('1/1/2009');
  const date2 = new Date();

  // Set time to be beginning of day
  date1.setUTCHours(0, 0, 0, 0);
  date2.setUTCHours(0, 0, 0, 0);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const totalDays = Math.round(diffInTime / oneDay) + 1;
  const totalYears = Math.floor(totalDays / 365);
  const daysRemainder = totalDays - totalYears * 365;

  return {
    totalDays,
    totalYears,
    daysRemainder,
  };
}

interface HomeBannerProps {
  progressBarData?: SongsProgress;
}

export function HomeBanner({ progressBarData }: HomeBannerProps): JSX.Element {
  const { totalDays, totalYears, daysRemainder } = getNumberOfDays();
  const { totalSupply, totalSales, progressPercent } = progressBarData;

  return (
    <Box py="12" px="6" bg="gray.50" borderBottom="1px" borderColor="gray.200" textAlign="center">
      <Heading as="h1">Hi! I'm Jonathan Mann.</Heading>
      <Text mt="4" fontSize="2xl" lineHeight="9">
        I've been writing a song a day for{' '}
        <Text as="strong" fontWeight="semibold">
          {totalYears} years
        </Text>{' '}
        and{' '}
        <Text as="strong" fontWeight="semibold">
          {daysRemainder} days
        </Text>
        . That's{' '}
        <Text as="strong" fontWeight="semibold">
          {totalDays} songs
        </Text>
        .
      </Text>
      <SimpleGrid my="12" mx="auto" maxWidth="container.lg" gap="12" columns={[1, 1, 2]}>
        <Box>
          <video style={{ margin: '0 auto' }} autoPlay muted loop playsInline>
            <source src="/assets/songaday-video-1.mp4" type="video/mp4" />
          </video>
          {/* <Image src="/assets/songaday-video-1.gif" width={480} height={270} priority /> */}
          <Box mt="3">
            <Button
              mx="2"
              _disabled={{
                bg: 'gray.300',
                cursor: 'not-allowed',
                opacity: 1,
              }}
              _hover={{
                bg: 'gray.300',
                cursor: 'not-allowed',
                opacity: 1,
              }}
              colorScheme="blue"
              size="lg"
              isDisabled
            >
              Year 1 Sold Out
            </Button>
            <Text mt="4" color="gray.600">
              Illustration by{' '}
              <Link textDecoration="underline" href="https://twitter.com/Defacedstudio" isExternal>
                Defaced Studio
              </Link>
            </Text>
          </Box>
        </Box>
        <Box>
          <video style={{ margin: '0 auto' }} autoPlay muted loop playsInline>
            <source src="/assets/songaday-video-2.mp4" type="video/mp4" />
          </video>
          {/* <Image src="/assets/songaday-video-2.gif" width={480} height={270} priority /> */}
          <Box mt="3">
            <NextLink href="/available-songs" passHref>
              <Button as="a" mx="2" colorScheme="blue" size="lg">
                Buy Year 2 Songs
              </Button>
            </NextLink>
            <Text mt="4" color="gray.600">
              Illustration by{' '}
              <Link textDecoration="underline" href="https://twitter.com/EclecticMethod" isExternal>
                Eclectic Method
              </Link>
            </Text>
          </Box>
        </Box>
      </SimpleGrid>
      {
        <>
          <Text mt="4" mb="12" fontSize={['lg', null, '2xl']}>
            Currently,{' '}
            <Text as="strong" fontWeight="semibold">
              {totalSupply}
            </Text>{' '}
            of them are available as NFTs.
          </Text>
          <Container>
            <Progress
              height="24px"
              borderRadius="2xl"
              value={progressPercent}
              sx={{
                '& > div': {
                  background:
                    'linear-gradient(90deg, rgba(43,108,176,1) 10%, rgba(66,153,225,1) 90%)',
                },
              }}
            />
            <Text mt="4" color="gray.600">
              {totalSales} Songs Sold / {totalSupply} Total Songs
            </Text>
          </Container>
        </>
      }
    </Box>
  );
}
