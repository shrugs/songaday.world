import useSWR, { trigger, mutate } from 'swr';
import { useContext, createContext } from 'react';
import { NextPageContext } from 'next';
import getApiHostUrl from '../server/getApiHostUrl';
import APIToken from '../containers/APIToken';
import { parseCookies } from 'nookies';
import fetcher from '../fetcher';

type PathBuilder<A> = (args?: A) => string;

export default function makeQuery<A>(pathBuilder: PathBuilder<A>) {
  const keyBuilder = (args?: A) => {
    const { token } = parseCookies();
    return [token, pathBuilder(args)];
  };

  const useQuery = function(args?: A, initialData?: any) {
    if (!initialData) {
      // initialData will never change during the lifecycle of an app
      // eslint-disable-next-line react-hooks/rules-of-hooks
      initialData = useContext(useQuery.InitialDataContext);
    }
    return useSWR(keyBuilder(args), fetcher, { initialData });
  };

  useQuery.getInitialData = async (
    ctx: NextPageContext,
    args?: A,
    { required = false }: { required: boolean } = { required: false },
  ) => {
    const { token } = parseCookies(ctx);
    const url = `${getApiHostUrl(ctx)}${pathBuilder(args)}`;
    let data = undefined;
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

  useQuery.trigger = (args?: A) => trigger(keyBuilder(args));

  useQuery.clear = (args?: A) => mutate(keyBuilder(args), null);

  useQuery.mutate = (value: any, args?: A) => mutate(keyBuilder(args), value);

  return useQuery;
}
