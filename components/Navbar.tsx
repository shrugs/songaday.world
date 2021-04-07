import { HStack, Img, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <HStack
      as="header"
      justifyContent="space-between"
      px="4"
      py="4"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <NextLink href="/" passHref>
        <Link h={[12, 16, 20]}>
          <Img h="full" cursor="pointer" src="/assets/logo.svg" alt="the Song a Day World logo" />
        </Link>
      </NextLink>
      <HStack spacing="4">
        <Link href="https://www.jonathanmann.net/" fontSize={['sm', 'sm', 'md']} isExternal>
          About
        </Link>
        <Link href="https://twitter.com/songadaymann" fontSize={['sm', 'sm', 'md']} isExternal>
          @songadaymann
        </Link>
      </HStack>
    </HStack>
  );
}

export default Navbar;
