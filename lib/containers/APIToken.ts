import { useLocalStorageState } from 'react-storage-hooks';
import { createContainer } from 'unstated-next';

function useAPIToken() {
  return useLocalStorageState('token', null);
}

export default createContainer(useAPIToken);
