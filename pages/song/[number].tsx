import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ComponentPropsWithoutRef } from 'react';
import useSWR from 'swr';

import Header from '../../components/minimann/Header';
import SongColorBackground from '../../components/SongColorBackground';
import { getSong } from '../../lib/db';
import fetcher from '../../lib/fetcher';
import { Song } from '../../lib/types';

function SongPage({ initialData }: { initialData?: Song }) {
  const router = useRouter();
  const number = router.query.number as string;

  // TODO: handle error
  const { data, error } = useSWR<Song>(`/api/song/${number}`, fetcher, {
    initialData,
    // we don't actually need to revalidate at all on this one
    revalidateOnFocus: false,
    revalidateOnMount: !initialData,
    revalidateOnReconnect: false,
  });

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

export const getServerSideProps: GetServerSideProps<
  ComponentPropsWithoutRef<typeof SongPage>
> = async (ctx) => {
  // fetch
  const song = getSong(parseInt(ctx.params.number as string));

  if (!song) return { notFound: true };

  return { props: { initialData: song } };
};

export default SongPage;
