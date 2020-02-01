import React, { useState, useCallback, useMemo, useEffect } from 'react';
import get from 'lodash/get';
import pluralize from 'pluralize';
import FlipMove from 'react-flip-move';
import cx from 'classnames';
import getInitialProps from '../lib/getInitialProps/getInitialProps';
import MiniMann, { MiniMannConfig } from '../components/minimann/MiniMann';
import {
  Location,
  Topic,
  Mood,
  Beard,
  Instrument,
  MinimannPropertyValue,
} from '../lib/utils/constants';
import FilterTag from '../components/FilterTag';
import NoticeBox from '../components/NoticeBox';
import useAvailableSongs from '../lib/queries/useAvailableSongs';
import { useAsync } from 'react-async';
import cleanObject from '../lib/utils/cleanObject';
import useQueryParams from '../lib/useQueryParams';
import Header from '../components/minimann/Header';
import SongColorBackground from '../components/SongColorBackground';
import buildSongListDescription from '../lib/buildSongListDescription';
import SongCard from '../components/song/SongCard';
import fetcher from '../lib/fetcher';
import APIToken from '../lib/containers/APIToken';
import Head from 'next/head';

const EMPTY_HEADER_CONFIG: MiniMannConfig = {
  location: Location.Vermont,
  topic: Topic.Kids,
  mood: Mood.Angry,
  beard: Beard.Shadow,
  instrument: Instrument.Organ,
};

function Create({ initialAvailableSongs }: { initialAvailableSongs: any }) {
  // filter state
  const [filters, setFilters] = useQueryParams();
  const resetFilters = useCallback(() => setFilters({}), [setFilters]);
  const hasFiltered = useMemo(() => Object.values(filters).length > 0, [filters]);

  const handleFilterTagSelect = async (key: string, value: MinimannPropertyValue) => {
    setFilters({ ...filters, [key]: value });
  };

  // data state
  const [token] = APIToken.useContainer();
  const promiseFn = useMemo(
    () => async ({ filters }) =>
      fetcher(token, `/api/available_songs?${new URLSearchParams(cleanObject(filters))}`),
    [token],
  );
  const { data, error, isPending: loadingSongs, cancel } = useAsync<any>({
    promiseFn,
    initialValue: initialAvailableSongs,
    filters,
    watch: filters,
  });

  const hasMore = useMemo(() => get(data, ['hasMore'], false), [data]);

  // TODO: remove this line when this issue is closed
  // https://github.com/async-library/react-async/issues/249
  useEffect(() => {
    cancel();
  }, [cancel]);

  // ui filter header state
  const [selectedTab, setSelectedTab] = useState<string>();

  // ui selected song state
  const [selectedSong, setSelectedSong] = useState<number>();

  const discardChanges = useCallback(() => {
    resetFilters();
    setSelectedTab(undefined);
    setSelectedSong(undefined);
  }, [resetFilters]);

  const songs: any[] = useMemo(() => get(data, ['songs'], []), [data]);
  const song: any = useMemo(() => {
    if (selectedSong) {
      return songs.find(song => song.number == selectedSong);
    } else {
      return songs.length ? songs[0] : undefined;
    }
  }, [selectedSong, songs]);
  const songNumber = useMemo(() => get(song, ['number']), [song]);
  const songLocation = useMemo(() => get(song, ['location']), [song]);

  const hasManySongs = songs.length > 1;

  // force showing the selected filters if we're not looking at a specific set or there's only one song
  const showSelectedFilters = !selectedTab || !hasManySongs;
  // hide the selected tab when showing the selected filters
  const visiblySelectedTab = showSelectedFilters ? undefined : selectedTab;

  // view builders
  const tabButton = (key: string) => {
    const focused = visiblySelectedTab === key;
    const selected = filters[key] !== undefined;
    const disabled = !hasManySongs;

    return (
      <button
        className={cx(
          'mr-1 mb-1 px-4 py-2 leading-none text-sm border-2 border-gray-800 rounded font-bold disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-gray-200': !focused && !selected,
            'bg-gray-100': !focused && selected,
            'bg-gray-800 text-white': focused,
          },
        )}
        onClick={() => setSelectedTab(focused ? undefined : key)}
        disabled={disabled}
      >
        {filters[key] || key}
      </button>
    );
  };

  return (
    <>
      <Head>
        <title>Song a Day World</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {songNumber ? (
        <Header number={songNumber} />
      ) : (
        <MiniMann {...(song || EMPTY_HEADER_CONFIG)} />
      )}

      <SongColorBackground className="flex-grow p-4" location={songLocation}>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row flex-wrap">
              {tabButton('location')}
              {tabButton('instrument')}
              {tabButton('topic')}
              {tabButton('mood')}
              {tabButton('beard')}
            </div>
            <button
              className="p-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
              onClick={discardChanges}
              disabled={!hasFiltered}
            >
              clear all filters
            </button>
          </div>

          <FlipMove className="flex flex-row flex-wrap">
            {showSelectedFilters &&
              Object.keys(filters).map(
                key =>
                  filters[key] && (
                    <div key={key}>
                      <FilterTag
                        className="mr-4 mb-2"
                        prefix={key}
                        thumbKey={filters[key]}
                        size="24"
                        selected={true}
                      >
                        {filters[key]}
                      </FilterTag>
                    </div>
                  ),
              )}
            {!showSelectedFilters &&
              data &&
              data.filters &&
              data.filters[selectedTab] &&
              data.filters[selectedTab].map(prop => (
                <div className={cx({ 'pointer-events-none': loadingSongs })} key={prop}>
                  <FilterTag
                    onClick={() => handleFilterTagSelect(selectedTab, prop)}
                    className="mr-4 mb-2"
                    prefix={selectedTab}
                    thumbKey={prop}
                    size="24"
                    selected={filters[selectedTab] === prop}
                  >
                    {prop}
                  </FilterTag>
                </div>
              ))}
          </FlipMove>

          {error && !loadingSongs && (
            <NoticeBox className="mb-2" color="red">
              {JSON.stringify(error)}
            </NoticeBox>
          )}
        </div>

        <div className="flex flex-col">
          {hasManySongs ? (
            <div className="flex flex-col justify-center items-start mb-4">
              <p className="text-3xl leading-tight font-bold">More Songs Like This</p>
              <p className="leading-tight text-gray-700">
                {hasMore ? `${songs.length - 1}+` : `${songs.length - 1}`} more{' '}
                {pluralize('song', songs.length - 1)} {buildSongListDescription(filters)}. Search
                for more specific songs with the filters 👆
              </p>
            </div>
          ) : (
            <NoticeBox color="gray">You've found the only song with this combination!</NoticeBox>
          )}
          <div className="flex flex-row flex-wrap song-card-list">
            {songs.slice(1).map(song => (
              <div key={song.id} className="w-full md:song-card mb-4 cursor-pointer">
                <SongCard number={song.number} className="rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </SongColorBackground>
    </>
  );
}

Create.getInitialProps = getInitialProps(async ctx => {
  const initialAvailableSongs = await useAvailableSongs.getInitialData(ctx, ctx.query, {
    required: true,
  });

  return { initialAvailableSongs };
});

export default Create;
