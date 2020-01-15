import { createContainer } from 'unstated-next';
import APIToken from './APIToken';
import makeMutator from '../mutator';

function useMutator() {
  const [token] = APIToken.useContainer();
  return makeMutator(token);
}

export default createContainer(useMutator);
