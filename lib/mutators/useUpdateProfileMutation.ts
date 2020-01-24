import { useCallback } from 'react';
import { mutate } from 'swr';
import mutator from '../mutator';
import APIToken from '../containers/APIToken';

export default function useUpdateProfileMutation() {
  const [token] = APIToken.useContainer();
  // TODO: handle errors thrown by mutator here with global error handler
  return useCallback(
    async (displayName: string) => {
      const data = await mutator(token, '/api/profile', { displayName });
      mutate('/api/profile', data);
      return data;
    },
    [token],
  );
}
