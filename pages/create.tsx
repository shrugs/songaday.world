import React, { useState, useCallback, PropsWithChildren, useMemo, isValidElement } from 'react';
import cx from 'classnames';
import getInitialProps from '../lib/server/getInitialProps';
import MiniMann, { MiniMannConfig } from '../components/minimann/MiniMann';
import SidePanel from '../components/SidePanel';
import {
  Location,
  Topic,
  Mood,
  Beard,
  Instrument,
  MinimannProperty,
  MinimannPropertyValue,
} from '../lib/utils/constants';
import FilterTag from '../components/FilterTag';
import NoticeBox from '../components/NoticeBox';
import useAvailableSongs from '../lib/queries/useAvailableSongs';
import usePreviousTruthy from '../lib/usePreviousTruthy';

const PanelHeader = ({ children }: PropsWithChildren<{}>) => (
  <h2 className="mb-8 text-3xl font-bold">{children}</h2>
);

const SectionHeader = ({ children }: PropsWithChildren<{}>) => (
  <h3 className="mb-4 text-xl font-semibold">{children}</h3>
);

const DEFAULT_CONFIG: MiniMannConfig = {
  location: Location.Vermont,
  topic: Topic.Kids,
  mood: Mood.Angry,
  beard: Beard.Shadow,
  instrument: Instrument.Organ,
};

function Create({ initialAvailableSongs }: { initialAvailableSongs: any }) {
  const [open, setOpen] = useState(true);
  const onRequestClose = useCallback(() => setOpen(false), []);
  const onRequestOpen = useCallback(() => setOpen(true), []);

  const [filters, setFilters] = useState({});
  const resetFilters = useCallback(() => setFilters({}), []);

  const hasFiltered = useMemo(() => Object.values(filters).length > 0, [filters]);

  const { data: _data, error, isValidating: loadingSongs } = useAvailableSongs(filters);
  const data = usePreviousTruthy(_data, _data);

  const config: MiniMannConfig = useMemo(
    () => (data && data.songs && data.songs.length ? data.songs[0] : DEFAULT_CONFIG),
    [data],
  );

  const applyFilters = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

  const discardChanges = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handleFilterTagSelect = async (key: string, value: MinimannPropertyValue) => {
    console.log(key, value);
    setFilters({ ...filters, [key]: value });
  };

  const buildSection = (key: string, header: string) => (
    <>
      <SectionHeader>{header}</SectionHeader>
      <div className="flex flex-row flex-wrap">
        {data &&
          data.filters &&
          data.filters[key].map(prop => (
            <div className={cx({ 'opacity-50 pointer-events-none': loadingSongs })} key={prop}>
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
      </div>
    </>
  );

  return (
    <>
      <MiniMann {...config} />
      <button onClick={onRequestOpen}>open</button>
      <SidePanel open={open} onRequestClose={onRequestClose}>
        <div className="w-full flex-grow flex flex-col items-end">
          <div className="w-full lg:w-auto lg:min-w-1/2 lg:max-w-full flex-grow bg-main">
            <div className="flex-grow flex flex-col text-white">
              <div className="flex flex-grow flex-row-reverse justify-between">
                <button
                  className="p-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                  onClick={discardChanges}
                  disabled={!hasFiltered}
                >
                  Clear Filters
                </button>
                <button className="p-4 hover:underline" onClick={applyFilters}>
                  Search & Close
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
          </div>
        </div>
      </SidePanel>
    </>
  );
}

Create.getInitialProps = getInitialProps(async ctx => {
  let initialAvailableSongs = undefined;
  try {
    initialAvailableSongs = await useAvailableSongs.getInitialData(ctx, {});
  } catch {}
  return { initialAvailableSongs };
});

export default Create;
