import '../styles/_main.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import Navbar from '../components/Navbar';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width" />
      </Head>

      <div className="relative antialiased text-gray-900 min-h-screen flex flex-col">
        <div className="relative w-full max-w-6xl mx-auto flex-grow flex flex-col">
          <Navbar />
          <main className="flex-grow flex flex-col">
            <Component {...pageProps} />
          </main>
        </div>
      </div>

      <style jsx global>{`
        #__next {
          width: 100%;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
}

export default App;
