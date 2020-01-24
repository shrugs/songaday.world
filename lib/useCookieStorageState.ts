import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useCallback, useState } from 'react';

const doParse = () => parseCookies(null, {});

export default function useCookieStorageState(key: string): [string, (value: string) => void] {
  const [cookies, _setCookies] = useState(doParse);

  const setState = useCallback(
    (value: string) => {
      value === undefined
        ? destroyCookie(null, key, {})
        : setCookie(null, key, value, { path: '/' });
      _setCookies(doParse);
    },
    [key],
  );

  return [cookies[key], setState];
}
