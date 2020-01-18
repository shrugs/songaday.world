import { createContainer } from 'unstated-next';
import useCookieStorageState from '../useCookieStorageState';

function useAPIToken() {
  return useCookieStorageState('token');
}

export default createContainer(useAPIToken);
