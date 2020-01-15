import { useCallback } from 'react';
import { mutate } from 'swr';
import Mutator from '../containers/Mutator';

export default function useUpdateProfileMutation() {
  const mutator = Mutator.useContainer();

  return useCallback(
    (displayName: string) => mutate('/api/profile', mutator('/api/profile', { displayName })),
    [mutator],
  );
}
