import { Button, HStack, Img, Link, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { Account } from '../containers/Account';
import { useDidHydrate } from '../lib/useDidHydrate';

function Navbar() {
  const router = useRouter();
  const isOnAddressPage = router.route === '/a/[account]';
  const { connect, disconnect, account, loading } = Account.useContainer();
  const didHydrate = useDidHydrate();

  const links = (
    <>
      <Link href="https://www.jonathanmann.net/" fontSize={['sm', 'sm', 'md']} isExternal>
        About
      </Link>
      <Link href="https://twitter.com/songadaymann" fontSize={['sm', 'sm', 'md']} isExternal>
        @songadaymann
      </Link>
    </>
  );

  return (
    <VStack align="stretch" as="header" px="4" py="4" borderBottom="1px" borderColor="gray.200">
      <HStack justifyContent="space-between">
        <NextLink href="/" passHref>
          <Link h={[12, 16, 20]}>
            <Img h="full" cursor="pointer" src="/assets/logo.svg" alt="the Song a Day World logo" />
          </Link>
        </NextLink>
        <HStack spacing="4">
          <HStack spacing="4" display={{ base: 'none', md: 'inherit' }} justifyContent="end">
            {links}
          </HStack>
          {didHydrate && account ? (
            isOnAddressPage ? (
              <Button onClick={disconnect} variant="outline">
                Disconnect
              </Button>
            ) : (
              <Button as="a" href={`/a/${account}`}>
                My Songs
              </Button>
            )
          ) : (
            <Button onClick={connect} isLoading={loading}>
              Connect Wallet
            </Button>
          )}
        </HStack>
      </HStack>
      <HStack display={{ md: 'none' }} spacing="4" justifyContent="space-between">
        {links}
      </HStack>
    </VStack>
  );
}

export default Navbar;
