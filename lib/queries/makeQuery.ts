import useSWR, { trigger, mutate } from 'swr';
import { useContext, createContext, useEffect } from 'react';
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
    const [token] = APIToken.useContainer();
    if (!initialData) {
      // initialData will never change during the lifecycle of an app
      // eslint-disable-next-line react-hooks/rules-of-hooks
      initialData = useContext(useQuery.InitialDataContext);
    }

    useEffect(() => {
      console.log(`[${debugLabel}] initialData: ${initialData ? 'yes' : 'no'}`);
    }, [initialData]);

    console.log(`[${debugLabel}] useSwr([token: ${token ? 'yes' : 'no'}, ${pathBuilder(args)}])`);

    return useSWR(keyBuilder(token, args), fetcher, { initialData });
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
