import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/minimann/Header';
import { MiniMannConfig } from '../components/minimann/MiniMann';

export default function Home() {
  const [config] = useState<MiniMannConfig>({
    location: 'Vermont',
    topic: 'Kids',
    mood: 'Angry',
    beard: 'Beard',
    instrument: 'Organ',
  });

  // TODO: some sort of cycling animation for various manns

  return (
    <>
      <Head>
        <title>Song a Day World</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-full">
        <div className="">
          <Header config={config} number={1} />
        </div>
      </main>

      <style jsx>{``}</style>
    </>
  );
}
