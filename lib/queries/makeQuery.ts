import useSWR, { trigger, mutate } from 'swr';
import { useContext, createContext } from 'react';
import { NextPageContext } from 'next';
import getApiHostUrl from '../server/getApiHostUrl';
import APIToken from '../containers/APIToken';
import { parseCookies } from 'nookies';
import fetcher from '../fetcher';

type PathBuilder<A> = (args?: A) => string;

export default function makeQuery<A>(pathBuilder: PathBuilder<A>) {
  const useQuery = function(args?: A, initialData?: any) {
    const [token] = APIToken.useContainer();
    if (!initialData) {
      // initialData will never change during the lifecycle of an app
      // eslint-disable-next-line react-hooks/rules-of-hooks
      initialData = useContext(useQuery.InitialDataContext);
    }
    return useSWR([token || '', pathBuilder(args)], fetcher, { initialData });
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

  useQuery.trigger = (args?: A) => trigger(pathBuilder(args));

  useQuery.clear = (args?: A) => mutate(pathBuilder(args), null);

  return useQuery;
}
