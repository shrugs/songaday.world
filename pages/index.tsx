import React from 'react';
import Head from 'next/head';
import MiniMann from '../components/minimann';

const Home = () => (
  <>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <MiniMann />
    </main>

    <style jsx>{`
      main {
        width: 100%;
        height: 100%;
      }
    `}</style>

    <style jsx global>{`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        height: 100vh;
        width: 100vw;
      }

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

export default Home;
