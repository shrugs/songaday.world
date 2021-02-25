import React from 'react';
import Head from 'next/head';
import Header from '../../components/minimann/Header';
import useSong from '../../lib/queries/useSong';
import SongColorBackground from '../../components/SongColorBackground';

function SongPage({ number, initialSong }: { number: string; initialSong?: any }) {
  const { data: song } = useSong({ number }, initialSong);

  return (
    <useSong.InitialDataContext.Provider value={song}>
      <div className="flex-grow flex flex-col">
        <Head>
          <title>Song a Day World</title>
        </Head>

        <Header number={number} />

        <SongColorBackground
          className="flex-grow w-full"
          location={song ? song.location : undefined}
        >
          {/* <CommentThread number={number} /> */}
        </SongColorBackground>
      </div>
    </useSong.InitialDataContext.Provider>
  );
}

export default SongPage;
