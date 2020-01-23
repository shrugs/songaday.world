import { useCallback } from 'react';
import { mutate } from 'swr';
import Mutator from '../containers/Mutator';

export default function useUpdateProfileMutation() {
  const mutator = Mutator.useContainer();
  // TODO: handle errors thrown by mutator here with global error handler
  return useCallback(
    async (displayName: string) => {
      const data = await mutator('/api/profile', { displayName });
      mutate('/api/profile', data);
      return data;
    },
    [mutator],
  );
}
