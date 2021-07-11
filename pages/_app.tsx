import { ChakraProvider } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { SWRConfig } from 'swr';
import Navbar from '../components/Navbar';
import { Account } from '../containers/Account';
import { Filters } from '../containers/Filters';
import { theme } from '../lib/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Song a Day World"
        description="Hello! I'm Jonathan Mann! I've been writing, producing and sharing a Song A Day for 12 years. Now I'm making each one available as a unique NFT for the first time."
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
        <SWRConfig
          value={{
            /** do not auto revalidate when window gets focus */
            revalidateOnFocus: false,
            /** allow 2 retries max when the fetcher throws an error */
            errorRetryCount: 2,
          }}
        >
          <Account.Provider>
            <Filters.Provider>
              <Navbar />
              <Component {...pageProps} />
            </Filters.Provider>
          </Account.Provider>
        </SWRConfig>
      </ChakraProvider>
    </>
  );
}

export default App;
