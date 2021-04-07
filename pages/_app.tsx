import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import React from 'react';

import Navbar from '../components/Navbar';
import { Filters } from '../containers/Filters';
import { theme } from '../lib/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Song a Day World"
        twitter={{
          cardType: 'summary_large_image',
          handle: '@songadaymann',
          site: 'Song a Day World',
        }}
        openGraph={{
          images: [{ url: 'https://songaday.world/generated/1.png' }],
        }}
      />
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
