import { createContainer } from 'unstated-next';
import APIToken from './APIToken';
import makeFetcher from '../makeFetcher';

function useFetcher() {
  const [token] = APIToken.useContainer();
  return makeFetcher(token);
}

export default createContainer(useFetcher);
