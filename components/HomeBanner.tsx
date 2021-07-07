import { Box, Button, Container, Flex, Heading, Progress, Text } from '@chakra-ui/react';
import React from 'react';

function getNumberOfDays() {
  const date1 = new Date('1/1/2009');
  const date2 = new Date();

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const totalDays = Math.round(diffInTime / oneDay);

  const totalYears = Math.floor(totalDays / 365);

  const daysRemainder = totalDays - totalYears * 365;

  return {
    totalDays,
    totalYears,
    daysRemainder,
  };
}

export function HomeBanner(): JSX.Element {
  const { totalDays, totalYears, daysRemainder } = getNumberOfDays();
  return (
    <Box py={[12, null, 16]} px="6" bg="gray.50" textAlign="center">
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
      <Flex my="12" justifyContent="center">
        <Box>
          <Box as="video" mb="-10" autoPlay loop playsInline muted>
            <source src="/assets/songaday-video.mp4" type="video/mp4" />
          </Box>
          <Button
            mt="4"
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
          <Button as="a" mt="4" mx="2" colorScheme="blue" size="lg">
            Buy Year 2 Songs
          </Button>
        </Box>
      </Flex>
      <Text mt="4" mb="12" fontSize={['lg', null, '2xl']}>
        Currently, 730 of them are available as NFTs.
      </Text>
      <Container>
        <Progress hasStripe size="lg" value={60} />
        <Text mt="4" color="gray.600">
          400 Songs Sold / 730 Total Songs
        </Text>
      </Container>
    </Box>
  );
}
