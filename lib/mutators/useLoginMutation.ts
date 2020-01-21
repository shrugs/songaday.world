import { useCallback } from 'react';
import Mutator from '../containers/Mutator';
import useProfile from '../queries/useProfile';

export default function useLoginMutation() {
  const mutator = Mutator.useContainer();

  return useCallback(
    async (email: string) => {
      await mutator('/api/login', { email });
      useProfile.trigger();
    },
    [mutator],
  );
}
