import { GetStaticProps } from 'next';
import { ComponentPropsWithoutRef } from 'react';
import { Page } from '../components/Page';
import { OpenSeaCollection, SongsProgress } from '../lib/types';

function Homepage({ progressBarData }: { progressBarData: SongsProgress }) {
  return <Page isHomepage progressBarData={progressBarData} />;
}

// Loops through all the collections that Jonathan owns and find `song-a-day`.
// Get the stats off of it and return for the Progress bar.
function getSongsProgress(data: OpenSeaCollection[]): SongsProgress {
  if (!data) {
    return {
      totalSupply: 0,
      totalSales: 0,
      progressPercent: 0,
    };
  }
  const songADayCollection = data.find((datum) => datum.slug === 'song-a-day');
  if (songADayCollection) {
    const totalSupply = songADayCollection.stats.total_supply;
    const totalSales = songADayCollection.stats.total_sales;
    return {
      totalSupply,
      totalSales,
      progressPercent: (totalSales / totalSupply) * 100,
    };
  }
}

const ONE_HOUR = 60 * 60;

export const getStaticProps: GetStaticProps<
  ComponentPropsWithoutRef<typeof Homepage>
> = async () => {
  const response = await fetch(
    `https://api.opensea.io/api/v1/collections?${new URLSearchParams({
      limit: '300',
      asset_owner: '0x3d9456ad6463a77bd77123cb4836e463030bfab4', // Jonathan's address
    })}`,
  );

  const data = await response.json();
  const progressBarData = getSongsProgress(data);

  return { props: { progressBarData }, revalidate: ONE_HOUR };
};

export default Homepage;
