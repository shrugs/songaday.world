import cx from 'classnames';
import Head from 'next/head';
import pluralize from 'pluralize';
import React, { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

import FilterTag from '../components/FilterTag';
import Header from '../components/minimann/Header';
import MiniMann, { MiniMannConfig } from '../components/minimann/MiniMann';
import NoticeBox from '../components/NoticeBox';
import SongCard from '../components/song/SongCard';
import SongColorBackground from '../components/SongColorBackground';
import SongListDescription from '../components/SongListDescription';
import fetcher from '../lib/fetcher';
import { SongsResponse } from '../lib/types';
import useQueryParams from '../lib/useQueryParams';
import { cleanObject } from '../lib/utils/cleanObject';
import {
  Beard,
  HumanKeys,
  HumanMaps,
  Instrument,
  Location,
  LocationViewConfig,
  MinimannPropertyValue,
  Mood,
  Topic,
} from '../lib/utils/constants';

const EMPTY_HEADER_CONFIG: MiniMannConfig = {
  location: Location.Vermont,
  topic: Topic.Kids,
  mood: Mood.Angry,
  beard: Beard.Shadow,
  instrument: Instrument.Organ,
};

function Index({ initialData }: { initialData: SongsResponse }) {
  // filter state
  const [filters, setFilters] = useQueryParams();
  const resetFilters = useCallback(() => setFilters({}), [setFilters]);
  const hasFiltered = useMemo(() => Object.values(filters).length > 0, [filters]);

  const handleFilterTagSelect = async (key: string, value: MinimannPropertyValue) => {
    setFilters({ ...filters, [key]: value });
  };

  const key = useMemo(() => `/api/songs?${new URLSearchParams(cleanObject(filters))}`, [filters]);

  const { data, error } = useSWR<SongsResponse>(key, fetcher, {
    initialData,
    // we don't actually need to revalidate at all
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
  });
  const loading = !data && !error;

  const hasMore = useMemo(() => data?.hasMore ?? false, [data]);

  // ui filter header state
  const [focusedTab, setFocusedTab] = useState<string>();

  // ui selected song state
  const [focusedSong, setFocusedSong] = useState<number>();

  const discardChanges = useCallback(() => {
    resetFilters();
    setFocusedTab(undefined);
    setFocusedSong(undefined);
  }, [resetFilters]);

  const songs: any[] = useMemo(() => data?.songs ?? [], [data]);
  const song: any = useMemo(() => {
    if (focusedSong) {
      return songs.find((song) => song.number == focusedSong);
    } else {
      return songs.length ? songs[0] : undefined;
    }
  }, [focusedSong, songs]);
  const songNumber = song?.number;
  const songLocation = song?.location;
  const dark = LocationViewConfig[songLocation]?.dark ?? false;

  const hasManySongs = songs.length > 1;

  // force showing the selected filters if we're not looking at a specific set or there's only one song
  const showSelectedFilters = !focusedTab || !hasManySongs;
  // hide the selected tab when showing the selected filters
  const visiblySelectedTab = showSelectedFilters ? undefined : focusedTab;

  // view builders
  const tabButton = (key: string) => {
    const focused = visiblySelectedTab === key;
    const selected = filters[key] !== undefined;
    const disabled = !hasManySongs || (!focused && selected);

    return (
      <button
        className={cx(
          'mr-1 mb-1 px-4 py-2',
          'leading-none text-sm font-bold',
          'rounded border-2 border-gray-800',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-gray-200 text-gray-900': !focused && !selected,
            'bg-gray-100 text-gray-900': !focused && selected,
            'bg-gray-800 text-white': focused,
          },
        )}
        onClick={() => setFocusedTab(focused ? undefined : key)}
        disabled={disabled}
      >
        {filters[key] ? HumanMaps[key][filters[key]] : HumanKeys[key]}
      </button>
    );
  };

  return (
    <>
      <Head>
        <title>Song a Day World</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {songNumber ? <Header song={song} /> : <MiniMann {...(song || EMPTY_HEADER_CONFIG)} />}

      <SongColorBackground className="flex-grow p-4 pb-10" location={songLocation}>
        <div className="flex flex-col">
          <p className={cx('mb-1 leading-tight text-sm', { 'text-white': dark })}>
            {hasFiltered ? (
              <>
                Showing songs <SongListDescription filters={filters} />.
              </>
            ) : (
              <>
                Showing <span className="font-semibold">random songs</span> from the catalog.
              </>
            )}{' '}
            Discover more specific songs with the filters 👇
          </p>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row flex-wrap">
              {tabButton('location')}
              {tabButton('instrument')}
              {tabButton('topic')}
              {tabButton('mood')}
              {tabButton('beard')}
            </div>
            <div className="flex flex-row items-center">
              <button
                className={cx(
                  'p-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
                  { 'text-white': dark },
                )}
                onClick={discardChanges}
                disabled={!hasFiltered}
              >
                clear all
              </button>
            </div>
          </div>

          <div className={cx('flex flex-row flex-wrap', { 'text-white': dark })}>
            {showSelectedFilters &&
              Object.keys(filters).map(
                (key) =>
                  filters[key] && (
                    <div key={key}>
                      <FilterTag
                        className="mr-4 mb-2"
                        prefix={key}
                        thumbKey={filters[key]}
                        size="24"
                        selected={true}
                      >
                        {HumanMaps[key][filters[key]]}
                      </FilterTag>
                    </div>
                  ),
              )}
            {!showSelectedFilters &&
              data &&
              data.filters &&
              data.filters[focusedTab] &&
              data.filters[focusedTab].map((prop) => (
                <div className={cx({ 'pointer-events-none': loading })} key={prop}>
                  <FilterTag
                    onClick={() => handleFilterTagSelect(focusedTab, prop as MinimannPropertyValue)}
                    className="mr-4 mb-2"
                    prefix={focusedTab}
                    thumbKey={prop}
                    size="24"
                    selected={filters[focusedTab] === prop}
                  >
                    {HumanMaps[focusedTab][prop]}
                  </FilterTag>
                </div>
              ))}
          </div>

          {error && !loading && (
            <NoticeBox className="mb-2" color="red">
              {JSON.stringify(error)}
            </NoticeBox>
          )}
        </div>

        <div className="flex flex-col">
          {hasManySongs ? (
            <div className="flex flex-col justify-center items-start my-2">
              <p
                className={cx('text-xl md:text-3xl leading-tight font-bold', {
                  'text-white': dark,
                })}
              >
                {hasFiltered ? 'More Songs Like This' : 'More Songs From the Catalog'}
              </p>
              <p className={cx('leading-tight text-base', { 'text-white': dark })}>
                {hasFiltered && (
                  <>
                    {hasMore ? `${songs.length - 1}+` : `${songs.length - 1}`} more{' '}
                    {pluralize('song', songs.length - 1)} <SongListDescription filters={filters} />.
                  </>
                )}
              </p>
            </div>
          ) : (
            <NoticeBox color="gray">
              You've found the only song in the catalog <SongListDescription filters={filters} />!
            </NoticeBox>
          )}
          <div className="flex flex-row flex-wrap song-card-list">
            {songs.slice(1).map((song) => (
              <div key={song.id} className="w-full md:song-card mb-4 cursor-pointer">
                <SongCard song={song} className="rounded-lg" />
              </div>
            ))}
          </div>
        </div>
        {hasMore && (
          <NoticeBox color="gray">
            👆 There are more than {songs.length - 1} songs{' '}
            {hasFiltered ? <SongListDescription filters={filters} /> : 'in the catalog'}! Discover
            more specific songs using the filters above 👆
          </NoticeBox>
        )}
      </SongColorBackground>
    </>
  );
}

export default Index;
