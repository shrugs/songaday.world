import useSWR from 'swr';
import { NextPageContext } from 'next';
import makeServerFetcher from '../server/makeServerFetcher';
import getApiHostUrl from '../server/getApiHostUrl';

const pathFor = (number: string) => `/api/song?${new URLSearchParams({ number })}`;

function useSong(number: string, initialData?: any) {
  return useSWR(pathFor(number), { initialData });
}

useSong.getInitialData = async (ctx: NextPageContext, number: string) => {
  const fetcher = makeServerFetcher(ctx);
  const url = `${getApiHostUrl(ctx)}${pathFor(number)}`;
  return await fetcher(url);
};

export default useSong;
