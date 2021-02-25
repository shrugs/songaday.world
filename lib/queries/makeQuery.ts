import useSWR, { trigger, mutate } from 'swr';
import { useContext, createContext, useRef } from 'react';
import fetcher from '../fetcher';

type PathBuilder<A> = (args?: A) => string;

export default function makeQuery<A>(pathBuilder: PathBuilder<A>, debugLabel = 'makeQuery') {
  const keyBuilder = (args?: A) => [pathBuilder(args)];

  const useQuery = function(args?: A, initialData?: any) {
    const count = useRef(0);
    if (!initialData) {
      // initialData will never change during the lifecycle of an app
      // eslint-disable-next-line react-hooks/rules-of-hooks
      initialData = useContext(useQuery.InitialDataContext);
    }

    return useSWR(keyBuilder(args), fetcher, {
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

  useQuery.InitialDataContext = createContext<any>(null);

  useQuery.trigger = (args?: A) => trigger(keyBuilder(args));

  // can't use undefined in cache because of https://github.com/zeit/swr/blob/master/src/use-swr.ts#L119
  useQuery.clear = (args?: A) => mutate(keyBuilder(args), null);

  useQuery.mutate = (value: any, args?: A) => mutate(keyBuilder(args), value);

  return useQuery;
}
