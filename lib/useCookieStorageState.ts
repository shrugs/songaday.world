import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useCallback, useMemo } from 'react';

export default function useCookieStorageState(
  key: string,
): [string | null, (value: string) => void] {
  const setState = useCallback(
    (value: string | null) =>
      value === null ? destroyCookie({}, key, {}) : setCookie(null, key, value, { path: '/' }),
    [key],
  );
  const cookies = useMemo(() => parseCookies({}, {}), []);
  return [cookies[key] || null, setState];
}
