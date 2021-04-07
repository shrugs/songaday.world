import { flatMap, mapValues, pickBy, toString } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { useSWRInfinite } from 'swr';

import { FilterParams } from '../containers/Filters';
import fetcher from './fetcher';
import { SongsResponse } from './types';

const makeKey = (filters: FilterParams & { page?: number; size?: number }) =>
  `/api/songs?${new URLSearchParams(pickBy(mapValues(filters, toString)))}`;

export function useSongs(filters: FilterParams) {
  const getKey = useCallback(
    (page: number, prev: SongsResponse) => {
      // if we have a previous but there were no results, then we've reached the end
      if (prev && prev.songs.length === 0) return null;
      return makeKey({ ...filters, page, size: 12 });
    },
    [filters],
  );

  const { data, error, isValidating: loading, size, setSize } = useSWRInfinite<SongsResponse>(
    getKey,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const songs = useMemo(() => flatMap((data ?? []).map((response) => response.songs)), [data]);
  const availableFilters = data?.[data?.length - 1].filters;

  const totalCount = data?.[0]?.totalCount ?? 0;
  const isEmpty = totalCount === 0;
  const hasMore = songs.length < totalCount;
  const loadMore = useCallback(() => setSize(size + 1), [setSize, size]);

  // via https://swr.vercel.app/advanced/performance#dependency-collection
  const isHydrating = data === undefined && error === undefined && loading === false;

  return {
    songs,
    availableFilters,
    loading,
    error,
    totalCount,
    isEmpty,
    hasMore,
    loadMore,
    isHydrating,
  };
}
