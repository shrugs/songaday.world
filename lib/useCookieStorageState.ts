import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useCallback, useState } from 'react';

const doParse = () => parseCookies({}, {});

export default function useCookieStorageState(
  key: string,
): [string | null, (value: string) => void] {
  const [cookies, _setCookies] = useState(doParse);
  const setState = useCallback(
    (value: string | null) => {
      value === null ? destroyCookie({}, key, {}) : setCookie(null, key, value, { path: '/' });
      _setCookies(doParse);
    },
    [key],
  );
  return [cookies[key] || null, setState];
}
