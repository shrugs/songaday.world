import React, { useState, useCallback, PropsWithChildren, useMemo, useEffect } from 'react';
import get from 'lodash/get';
import pluralize from 'pluralize';
import FlipMove from 'react-flip-move';
import cx from 'classnames';
import getInitialProps from '../lib/getInitialProps/getInitialProps';
import MiniMann, { MiniMannConfig } from '../components/minimann/MiniMann';
import SidePanel from '../components/SidePanel';
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
import requireUser from '../lib/getInitialProps/requireUser';
import fetcher from '../lib/fetcher';
import APIToken from '../lib/containers/APIToken';

const PanelHeader = ({ children }: PropsWithChildren<{}>) => (
  <h2 className="mb-8 text-3xl font-bold">{children}</h2>
);

const SectionHeader = ({ children }: PropsWithChildren<{}>) => (
  <h3 className="mb-4 text-xl font-semibold">{children}</h3>
);

const EMPTY_HEADER_CONFIG: MiniMannConfig = {
  location: Location.Vermont,
  topic: Topic.Kids,
  mood: Mood.Angry,
  beard: Beard.Shadow,
  instrument: Instrument.Organ,
};

function Create({ initialAvailableSongs }: { initialAvailableSongs: any }) {
  const [open, setOpen] = useState(false);
  const onRequestClose = useCallback(() => setOpen(false), []);
  const onRequestOpen = useCallback(() => setOpen(true), []);

  const [filters, setFilters] = useQueryParams();
  const resetFilters = useCallback(() => setFilters({}), [setFilters]);

  const hasFiltered = useMemo(() => Object.values(filters).length > 0, [filters]);

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

  const [selectedSong, setSelectedSong] = useState<number>();

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

  const discardChanges = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handleFilterTagSelect = async (key: string, value: MinimannPropertyValue) => {
    setFilters({ ...filters, [key]: value });
  };

  const buildSection = (key: string, header: string) => (
    <>
      <SectionHeader>{header}</SectionHeader>
      <FlipMove className="flex flex-row flex-wrap">
        {data &&
          data.filters &&
          data.filters[key].map(prop => (
            <div className={cx({ 'pointer-events-none': loadingSongs })} key={prop}>
              <FilterTag
                onClick={() => handleFilterTagSelect(key, prop)}
                className="mr-4 mb-2"
                prefix={key}
                thumbKey={prop}
                size="24"
                selected={filters[key] === prop}
              >
                {prop}
              </FilterTag>
            </div>
          ))}
      </FlipMove>
    </>
  );

  return (
    <>
      {songNumber ? (
        <Header number={songNumber} />
      ) : (
        <MiniMann {...(song || EMPTY_HEADER_CONFIG)} />
      )}

      <SongColorBackground className="flex-grow p-4" location={songLocation}>
        <button className="w-full p-2" onClick={onRequestOpen}>
          open
        </button>
        <div className="flex flex-col">
          {songs.length > 1 ? (
            <div className="flex flex-col justify-center items-start mb-4">
              <p className="text-3xl leading-tight font-bold truncate">Other Songs Like This</p>
              <p className="leading-tight text-gray-600 truncate">
                {hasMore ? `${songs.length - 1}+` : `${songs.length - 1}`} other{' '}
                {pluralize('song', songs.length - 1)} {buildSongListDescription(filters)}
              </p>
            </div>
          ) : (
            <NoticeBox color="gray">You've found the only song with this combination!</NoticeBox>
          )}
          <div className="flex flex-row flex-wrap song-card-list">
            {songs.slice(1).map(song => (
              <div key={song.id} className="w-full md:song-card mb-4">
                <SongCard number={song.number} className="rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </SongColorBackground>

      <SidePanel open={open} onRequestClose={onRequestClose}>
        <div className="flex-grow flex flex-col text-white">
          <div className="flex flex-grow flex-row-reverse justify-between z-10">
            <button
              className="p-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
              onClick={discardChanges}
              disabled={!hasFiltered}
            >
              Clear Filters
            </button>
            <button className="p-4 hover:underline" onClick={onRequestClose}>
              Explore Songs
            </button>
          </div>
          <div className="mx-4 md:mx-10 mb-4">
            <PanelHeader>Find Your MiniMann</PanelHeader>
            {error && !loadingSongs && (
              <NoticeBox className="mb-2" color="red">
                {JSON.stringify(error)}
              </NoticeBox>
            )}
            {buildSection('location', 'Location')}
            {buildSection('topic', 'Topic')}
            {buildSection('mood', 'Mood')}
            {buildSection('beard', 'Beard')}
            {buildSection('instrument', 'Instrument')}
          </div>
        </div>
      </SidePanel>
    </>
  );
}

Create.getInitialProps = getInitialProps(async ctx => {
  requireUser(ctx);

  const initialAvailableSongs = await useAvailableSongs.getInitialData(ctx, ctx.query, {
    required: true,
  });

  return { initialAvailableSongs };
});

export default Create;
