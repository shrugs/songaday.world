import React from 'react';
import Head from 'next/head';
import Header from '../../components/minimann/Header';
import { BackgroundThemes } from '../../lib/utils/constants';
import useSong from '../../lib/queries/useSong';
import { NextPageContext } from 'next';

function SongPage({ number, initialSong }: { number: string; initialSong?: any }) {
  const { data: song } = useSong(number, initialSong);

  const bgColor = song ? BackgroundThemes[song.location] : 'transparent';

  return (
    <div className="flex-grow flex flex-col">
      <Head>
        <title>Song a Day World</title>
      </Head>

      <Header song={song} />

      <div className="flex-grow w-full song-color"></div>

      <style jsx>{`
        .song-color {
          background-color: ${bgColor};
        }
      `}</style>
    </div>
  );
}

SongPage.getInitialProps = async (ctx: NextPageContext) => {
  const number = ctx.query.song as string;
  const initialSong = await useSong.getInitialData(ctx, number);
  return { number, initialSong };
};

export default SongPage;
