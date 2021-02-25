import Head from 'next/head';
import React from 'react';
import useSWR from 'swr';

import Header from '../../components/minimann/Header';
import SongColorBackground from '../../components/SongColorBackground';
import fetcher from '../../lib/fetcher';
import { Song } from '../../lib/types';

function SongPage({ initialData }: { initialData?: Song }) {
  const { data, error } = useSWR<Song>(`/api/song`, fetcher, {
    initialData,
    // we don't actually need to revalidate at all
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });
  const loading = !data && !error;

  return (
    <div className="flex-grow flex flex-col">
      <Head>
        <title>Song a Day World</title>
      </Head>

      <Header song={data} />

      <SongColorBackground className="flex-grow w-full" location={data?.location} />
    </div>
  );
}

export default SongPage;
