import React from 'react';
import Head from 'next/head';
import Header from '../../components/minimann/Header';
import useSong from '../../lib/queries/useSong';
import { NextPageContext } from 'next';
import getInitialProps from '../../lib/getInitialProps/getInitialProps';
import CommentThread from '../../components/CommentThread';
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
          <CommentThread number={number} />
        </SongColorBackground>
      </div>
    </useSong.InitialDataContext.Provider>
  );
}

SongPage.getInitialProps = getInitialProps(async (ctx: NextPageContext) => {
  const number = ctx.query.song as string;
  const initialSong = await useSong.getInitialData(ctx, { number });
  return { number, initialSong };
});

export default SongPage;
