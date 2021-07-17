import { Box, Container, Heading, Link, Text } from '@chakra-ui/react';

function RoadmapIndex() {
  return (
    <Container maxWidth="container.lg">
      <Box py={10}>
        <Heading as="h1">Song A Day NFT Roadmap</Heading>
        <Heading mt="10" fontSize="2xl">
          SongADAO!
        </Heading>
        <Text mt="6" lineHeight="tall">
          Inspired by what the folks over at{' '}
          <Link href="https://stoi.org/" color="blue.500" isExternal>
            The Song That Owns Itself
          </Link>{' '}
          are doing, I'm in the early stages of setting up Song A DAO as an LLC that officially and
          legally owns the copyright to the entirety of the Song A Day catalog.
        </Text>
        <Text mt="6" lineHeight="tall">
          All Song A Day's royalties, both on-chain-and-off, would then flow into the DAO. Members
          of the DAO, in exchange for helping the Song A Day catalog achieve it's true purpose (to
          be heard by as many people as possible) would hold tokens that would entitle them to a
          percentage of those on-and-off chain royalties.
        </Text>
        <Heading mt="10" fontSize="2xl">
          Moving To A New Contract
        </Heading>
        <Text mt="6" lineHeight="tall">
          Years 1 and 2 were sold on OpenSea's shared storefront contract, and it was a great way to
          start the Song A Day NFT project. Moving forward, Year 3 will be on it's own ERC 721
          contract, and I'll be offering a wrapper for years 1 and 2 as well. I'm working with the
          lovely folks at{' '}
          <Link href="https://buidlguidl.com/" color="blue.500" isExternal>
            BuidlGuidl
          </Link>{' '}
          to make this happen!
        </Text>
      </Box>
    </Container>
  );
}

export default RoadmapIndex;
