import React from 'react';
import App from 'next/app';

import '../styles/_main.css';
import Navbar from '../components/Navbar';
import Head from 'next/head';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

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
}

export default MyApp;
