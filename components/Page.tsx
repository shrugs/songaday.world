import { Alert, Box, Button, Divider, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react';
import { times } from 'lodash-es';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

import { SongDetail } from '../components/SongDetail';
import { Filters } from '../containers/Filters';
import { SongsResponse } from '../lib/types';
import { useSongs } from '../lib/useSongs';
import { HumanKeys, HumanMaps } from '../lib/utils/constants';
import FilterTag from './FilterTag';
import SongCard from './SongCard';
import SongListDescription from './SongListDescription';

export function Page({
  initialKey,
  initialData,
}: {
  initialKey?: string;
  initialData?: SongsResponse;
}) {
  // filter state
  const {
    filters: { id, ...filters },
    resetFilters,
    makeHref,
  } = Filters.useContainer();

  const hasFiltered = useMemo(() => Object.values(filters).filter(Boolean).length > 0, [filters]);

  const { songs, availableFilters, loading, error, hasMore, isEmpty, totalCount } = useSongs(
    filters,
  );

  // ui filter header state
  const [_focusedTab, setFocusedTab] = useState<string>();
  const focusedTab = _focusedTab ?? 'location';

  const discardChanges = useCallback(() => {
    resetFilters();
    setFocusedTab(undefined);
  }, [resetFilters]);

  const tabButton = (key: string) => {
    const focused = focusedTab === key;
    const selected = !!filters[key];
    const disabled = !isEmpty || (!focused && selected);

    return (
      <Button
        onClick={() => setFocusedTab(focused ? undefined : key)}
        isActive={focused || selected}
        // isDisabled={disabled}
      >
        {filters[key] ? HumanMaps[key][filters[key]] : HumanKeys[key]}
      </Button>
    );

    // return (
    //   <button
    //     className={cx(
    //       'mr-1 mb-1 px-4 py-2',
    //       'leading-none text-sm font-bold',
    //       'rounded border-2 border-gray-800',
    //       'disabled:opacity-50 disabled:pointer-events-none',
    //       {
    //         'bg-gray-200 text-gray-900': !focused && !selected,
    //         'bg-gray-100 text-gray-900': !focused && selected,
    //         'bg-gray-800 text-white': focused,
    //       },
    //     )}
    //     onClick={() => setFocusedTab(focused ? undefined : key)}
    //     disabled={disabled}
    //   >
    //     {filters[key] ? HumanMaps[key][filters[key]] : HumanKeys[key]}
    //   </button>
    // );
  };

  return (
    <>
      {id && <SongDetail id={id} />}

      <Divider />

      <Box py="8" px={{ base: '2', xl: '8' }}>
        <VStack align="stretch" spacing={8}>
          {error && <Alert status="error">{error.message}</Alert>}

          <VStack spacing={4} align="stretch">
            <SimpleGrid gap="2" columns={[3, null, 6]}>
              {tabButton('location')}
              {tabButton('instrument')}
              {tabButton('topic')}
              {tabButton('mood')}
              {tabButton('beard')}
              <Button variant="outline" onClick={discardChanges} disabled={!hasFiltered}>
                Clear all
              </Button>
            </SimpleGrid>

            <SimpleGrid gap={4} columns={[2, 4, 6]}>
              {loading
                ? times(12, (i) => <Skeleton key={i} h="9rem" w="full" borderRadius="md" />)
                : availableFilters?.[focusedTab]?.map((key) => (
                    <Link
                      key={key}
                      href={makeHref({ ...filters, [focusedTab]: key })}
                      passHref
                      shallow
                    >
                      <a>
                        <FilterTag
                          prefix={focusedTab}
                          thumbKey={key}
                          selected={filters[focusedTab] === key}
                        >
                          {HumanMaps[focusedTab][key]}
                        </FilterTag>
                      </a>
                    </Link>
                  ))}
            </SimpleGrid>
          </VStack>

          <Divider />

          <Text>
            {hasFiltered ? (
              <>
                Found {totalCount} songs <SongListDescription filters={filters} />.
              </>
            ) : (
              <>
                Showing {totalCount}{' '}
                <Text as="span" fontWeight="semibold">
                  random songs
                </Text>{' '}
                from the catalog.
              </>
            )}
          </Text>

          <SimpleGrid gap="4" columns={{ base: 1, lg: 2 }}>
            {songs.map((song) => (
              <Link
                key={song.number}
                href={makeHref({ id: song.number.toString() })}
                passHref
                shallow
              >
                <a>
                  <SongCard h="full" song={song} card />
                </a>
              </Link>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>

      {/* <SongColorBackground className="flex-grow p-4 pb-10" location={songLocation}>
        <div className="flex flex-col">

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
              <div key={song.number} className="w-full md:song-card mb-4 cursor-pointer">
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
      </SongColorBackground> */}
    </>
  );
}
