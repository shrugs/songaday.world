import { useCallback } from 'react';
import mutator from '../mutator';
import APIToken from '../containers/APIToken';
import useProfile from '../queries/useProfile';

export default function useCollectSongMutation() {
  const [token] = APIToken.useContainer();
  // TODO: handle errors thrown by mutator here with global error handler
  return useCallback(
    async (number: string) => {
      const data = await mutator(token, '/api/collection', { number });
      useProfile.mutate(token, data);
      return data;
    },
    [token],
  );
}
