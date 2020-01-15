import { useCallback } from 'react';
import Mutator from '../containers/Mutator';

export default function useLoginMutation() {
  const mutator = Mutator.useContainer();

  return useCallback(async (email: string) => mutator('/api/login', { email }), [mutator]);
}
