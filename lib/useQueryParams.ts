import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';

export default function useQueryParams(): [
  Record<string, string>,
  (value: Record<string, string>) => void,
] {
  const router = useRouter();

  const [query, _setQuery] = useState(() => router.query as Record<string, string>);

  const setQuery = useCallback(
    (values: Record<string, string>) => {
      const url = `${window.location.pathname}?${new URLSearchParams(values)}`;
      router.replace(url, url, { shallow: true });
      _setQuery(values);
    },
    [router],
  );

  return [query, setQuery];
}
