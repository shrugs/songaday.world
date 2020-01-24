import { useCallback } from 'react';
import APIToken from '../containers/APIToken';
import useProfile from '../queries/useProfile';
import mutator from '../mutator';

export default function useAuthMutation() {
  const [, setToken] = APIToken.useContainer();

  return useCallback(
    async (code: string) => {
      const { token } = await mutator(null, '/api/auth', { code });
      setToken(token);
      useProfile.trigger(token);
    },
    [setToken],
  );
}
