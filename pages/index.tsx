import React from 'react';
import Head from 'next/head';
import Avatar from '../components/minimann/Avatar';
import Header from '../components/minimann/Header';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-full">
        <div className="border border-black">
          <Header />
        </div>
        <div className="border border-black w-1/4 mt-1">
          <Avatar />
        </div>
      </main>
    </>
  );
}
