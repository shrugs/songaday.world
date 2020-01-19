import React, { PropsWithChildren } from 'react';
import App from 'next/app';
import { SWRConfig } from 'swr';

import nest from '../lib/nest';
import APIToken from '../lib/containers/APIToken';
import Mutator from '../lib/containers/Mutator';
import Fetcher from '../lib/containers/Fetcher';

import '../styles/_main.css';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';
import useProfile from '../lib/queries/useProfile';

function SWRConfigWithToken({ children }: PropsWithChildren<{}>) {
  const fetcher = Fetcher.useContainer();
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}

const Providers = nest([APIToken.Provider, Fetcher.Provider, Mutator.Provider, SWRConfigWithToken]);

class MyApp extends App<{ initialProfile: any }> {
  render() {
    const { Component, pageProps, initialProfile } = this.props;

    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Providers>
          <useProfile.InitialDataContext.Provider value={initialProfile}>
            <div className="antialiased text-gray-900 max-w-6xl mx-auto min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-grow flex flex-col">
                <Component {...pageProps} />
              </div>
            </div>
          </useProfile.InitialDataContext.Provider>
        </Providers>

        <style jsx global>{`
          body {
            width: 100%;
            min-height: 100vh;
          }

          #__next {
            width: 100%;
            min-height: 100vh;
          }
        `}</style>
      </>
    );
  }
}

MyApp.getInitialProps = async (ctx: AppContextType<Router>) => {
  const appProps = await App.getInitialProps(ctx);

  const initialProfile = await useProfile.getInitialData(ctx.ctx);

  return { ...appProps, initialProfile };
};

export default MyApp;
