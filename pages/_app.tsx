import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import Navbar from '../components/Navbar';
import { Filters } from '../containers/Filters';
import { theme } from '../lib/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width" />
      </Head>

      <ChakraProvider theme={theme}>
        <Filters.Provider>
          <Navbar />
          <Component {...pageProps} />
        </Filters.Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
