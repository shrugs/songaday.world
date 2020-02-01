import React from 'react';
import App from 'next/app';

import nest from '../lib/nest';
import APIToken from '../lib/containers/APIToken';

import '../styles/_main.css';
import Navbar from '../components/Navbar';
import Head from 'next/head';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';
import useProfile from '../lib/queries/useProfile';

const Providers = nest([APIToken.Provider]);

class MyApp extends App<{ initialProfile: any }> {
  render() {
    const { Component, pageProps, initialProfile } = this.props;

    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width" />
        </Head>

        <Providers>
          <useProfile.InitialDataContext.Provider value={initialProfile}>
            <div className="relative antialiased text-gray-900 min-h-screen flex flex-col">
              <div className="relative w-full max-w-6xl mx-auto flex-grow flex flex-col">
                <Navbar />
                <div className="flex-grow flex flex-col">
                  <Component {...pageProps} />
                </div>
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

  let initialProfile = undefined;
  try {
    initialProfile = await useProfile.getInitialData(ctx.ctx);
  } catch {}

  return { ...appProps, initialProfile };
};

export default MyApp;
