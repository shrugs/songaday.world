import useSWR from 'swr';
import { NextPageContext } from 'next';
import makeServerFetcher from '../server/makeServerFetcher';
import getApiHostUrl from '../server/getApiHostUrl';

const pathFor = () => `/api/profile`;

function useProfile(initialData?: any) {
  return useSWR(pathFor(), { initialData });
}

useProfile.getInitialData = async (ctx: NextPageContext) => {
  const fetcher = makeServerFetcher(ctx);
  const url = `${getApiHostUrl(ctx)}${pathFor()}`;
  return await fetcher(url);
};

export default useProfile;
