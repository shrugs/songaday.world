import { useCallback } from 'react';
import Mutator from '../containers/Mutator';
import { triggerAuthState } from '../cache/authState';

export default function useLoginMutation() {
  const mutator = Mutator.useContainer();

  return useCallback(
    async (email: string) => {
      await mutator('/api/login', { email });
      triggerAuthState();
    },
    [mutator],
  );
}
