import React from 'react';
import { NextPageContext } from 'next';
import useSWR from 'swr';

function SongPage({ number }: { number: number }) {
  const { data, error } = useSWR(`/api/song?number=${number}`);

  return (
    <>
      <p>looking up song {number}</p>
      <p>{data && JSON.stringify(data)}</p>
      <p>{error && 'error!'}</p>
    </>
  );
}

SongPage.getInitialProps = async (ctx: NextPageContext) => {
  return { number: ctx.query.song };
};

export default SongPage;
