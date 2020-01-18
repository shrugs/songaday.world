import makeFetcher from '../makeFetcher';
import { parseCookies } from 'nookies';
import { NextPageContext } from 'next';

export default function makeServerFetcher(ctx: NextPageContext) {
  const { token } = parseCookies(ctx);
  return makeFetcher(token);
}
