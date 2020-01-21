import useSWR, { trigger, mutate } from 'swr';
import { useContext, createContext } from 'react';
import { NextPageContext } from 'next';
import makeServerFetcher from '../server/makeServerFetcher';
import getApiHostUrl from '../server/getApiHostUrl';

type PathBuilder<A> = (args?: A) => string;

export default function makeQuery<A>(pathBuilder: PathBuilder<A>) {
  const useQuery = function(args?: A, initialData?: any) {
    if (!initialData) {
      // initialData will never change during the lifecycle of an app
      // eslint-disable-next-line react-hooks/rules-of-hooks
      initialData = useContext(useQuery.InitialDataContext);
    }

    return useSWR(pathBuilder(args), { initialData });
  };

  useQuery.getInitialData = async (ctx: NextPageContext, args?: A) => {
    const fetcher = makeServerFetcher(ctx);
    const url = `${getApiHostUrl(ctx)}${pathBuilder(args)}`;
    return await fetcher(url);
  };

  useQuery.InitialDataContext = createContext<any>(null);

  useQuery.trigger = (args?: A) => trigger(pathBuilder(args));

  useQuery.clear = (args?: A) => mutate(pathBuilder(args), null);

  return useQuery;
}
