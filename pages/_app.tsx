import React, { PropsWithChildren } from 'react';
import App from 'next/app';
import { SWRConfig } from 'swr';
import makeFetcher from '../lib/fetcher';

import nest from '../lib/nest';
import APIToken from '../lib/containers/APIToken';
import Mutator from '../lib/containers/Mutator';

import '../styles/_main.css';
import Navbar from '../components/Navbar';

function SWRConfigWithToken({ children }: PropsWithChildren<{}>) {
  const [token] = APIToken.useContainer();
  return <SWRConfig value={{ fetcher: makeFetcher(token) }}>{children}</SWRConfig>;
}

const Providers = nest([APIToken.Provider, SWRConfigWithToken, Mutator.Provider]);

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Providers>
          <div className="antialiased text-gray-900">
            <Navbar />
            <Component {...pageProps} />
          </div>
        </Providers>

        <style jsx global>{`
          body {
            display: flex;
            width: 100%;
            height: 100%;
          }

          #__next {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </>
    );
  }
}

export default MyApp;
