import useSWR, { trigger, mutate } from 'swr';
import { useContext, createContext, useRef } from 'react';
import { NextPageContext } from 'next';
import getApiHostUrl from '../server/getApiHostUrl';
import APIToken from '../containers/APIToken';
import { parseCookies } from 'nookies';
import fetcher from '../fetcher';

type PathBuilder<A> = (args?: A) => string;

export default function makeQuery<A>(pathBuilder: PathBuilder<A>, debugLabel = 'makeQuery') {
  // cache key is token:path, so all cached values are dependent on current auth state
  // when token changes, all cache is invalidated by proxy
  const keyBuilder = (token: string, args?: A) => {
    return [token || '', pathBuilder(args)];
  };

  const useQuery = function(args?: A, initialData?: any) {
    const count = useRef(0);
    const [token] = APIToken.useContainer();
    if (!initialData) {
      // initialData will never change during the lifecycle of an app
      // eslint-disable-next-line react-hooks/rules-of-hooks
      initialData = useContext(useQuery.InitialDataContext);
    }

    return useSWR(keyBuilder(token, args), fetcher, {
      // NOTE: here, we only pass initialData on the _first_ invokation
      // this avoids an issue where, on token changes, initialData isn't cleared, meaning that
      // for example, when logging out and setting token to undefined, the old initialData from
      // a valid token is used as the cache value and immediately returned
      // this has the effect of logging the user out (and failing all subsequent requests)
      // but showing-until revalitated—a logged-in component
      // so we avoid that by only using initialData when this is the first render, so any subsequent
      // changes in token or args can never have initialData provided by our getInitialProps
      initialData: count.current++ === 0 ? initialData : undefined,
    });
  };

  useQuery.getInitialData = async (
    ctx: NextPageContext,
    args?: A,
    { required = false }: { required: boolean } = { required: false },
  ) => {
    const { token } = parseCookies(ctx);
    const url = `${getApiHostUrl(ctx)}${pathBuilder(args)}`;
    let data = null;
    try {
      data = await fetcher(token, url);
    } catch (error) {
      if (required) {
        throw error;
      }
    }

    return data;
  };

  useQuery.InitialDataContext = createContext<any>(null);

  useQuery.trigger = (token: string, args?: A) => trigger(keyBuilder(token, args));

  // can't use undefined in cache because of https://github.com/zeit/swr/blob/master/src/use-swr.ts#L119
  useQuery.clear = (token: string, args?: A) => mutate(keyBuilder(token, args), null);

  useQuery.mutate = (token: string, value: any, args?: A) => mutate(keyBuilder(token, args), value);

  return useQuery;
}
