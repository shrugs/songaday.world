import {
  Alert,
  Box,
  Button,
  Divider,
  HStack,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { times } from 'lodash-es';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { SongDetail } from '../components/SongDetail';
import { Filters } from '../containers/Filters';
import { useSongs } from '../lib/useSongs';
import { HumanKeys, HumanMaps, Year } from '../lib/utils/constants';
import { FilterTag } from './FilterTag';
import { GridOfSongs } from './GridOfSongs';
import SongCard from './SongCard';
import SongListDescription from './SongListDescription';

export function Page() {
  // filter state
  const {
    filters: { id, ...filters },
    resetFilters,
    makeHref,
  } = Filters.useContainer();

  const hasFiltered = useMemo(() => Object.values(filters).filter(Boolean).length > 0, [filters]);

  const {
    songs,
    availableFilters,
    loading,
    error,
    hasMore,
    loadMore,
    isEmpty,
    isHydrating,
    totalCount,
  } = useSongs(filters);

  const includeSkeletons = isHydrating || loading;

  const [sentinel, inView] = useInView({
    rootMargin: '0px -200px',
    skip: !hasMore,
    initialInView: false,
  });

  useEffect(() => {
    if (!inView) return;
    if (loading) return;
    if (!hasMore) return;
    loadMore();
  }, [hasMore, inView, loadMore, loading]);

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

    return (
      <Button
        onClick={() => setFocusedTab(focused ? undefined : key)}
        isActive={focused || selected}
        textDecoration={focused && 'underline'}
      >
        {filters[key] ? HumanMaps[key][filters[key]] : HumanKeys[key]}
      </Button>
    );
  };

  return (
    <>
      {id && <SongDetail id={id} />}

      <Divider />

      <Box py="8" px={{ base: '2', xl: '8' }}>
        <VStack align="stretch" spacing={8}>
          {error && <Alert status="error">{error.message}</Alert>}

          <VStack spacing={4} align="stretch">
            <SimpleGrid gap={3} columns={[3, null, 6]}>
              {tabButton('location')}
              {tabButton('instrument')}
              {tabButton('topic')}
              {tabButton('mood')}
              {tabButton('beard')}
              <Button variant="outline" onClick={discardChanges} disabled={!hasFiltered}>
                Clear all
              </Button>
            </SimpleGrid>

            <SimpleGrid gap={3} columns={[2, 4, 6]}>
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

          {isEmpty && (
            <HStack>
              <Button variant="outline" onClick={discardChanges}>
                Clear all filters
              </Button>
            </HStack>
          )}

          <GridOfSongs songs={songs}>
            {includeSkeletons && times(12, (i) => <SongCard key={i} song={undefined} card />)}

            <div ref={sentinel} />
          </GridOfSongs>
        </VStack>
      </Box>
    </>
  );
}
