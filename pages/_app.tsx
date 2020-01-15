import React, { PropsWithChildren } from 'react';
import App from 'next/app';
import { SWRConfig } from 'swr';
import makeFetcher from '../lib/fetcher';

import '../styles/tailwind.css';
import nest from '../lib/nest';
import APIToken from '../lib/containers/APIToken';
import Mutator from '../lib/containers/Mutator';

function SWRConfigWithToken({ children }: PropsWithChildren<{}>) {
  const [token] = APIToken.useContainer();
  return <SWRConfig value={{ fetcher: makeFetcher(token) }}>{children}</SWRConfig>;
}

const Providers = nest([APIToken.Provider, SWRConfigWithToken, Mutator.Provider]);

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Providers>
        <Component {...pageProps} />
      </Providers>
    );
  }
}

export default MyApp;
