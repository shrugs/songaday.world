import Mutator from '../containers/Mutator';
import { useCallback } from 'react';
import APIToken from '../containers/APIToken';
import useProfile from '../queries/useProfile';

export default function useAuthMutation() {
  const mutator = Mutator.useContainer();
  const [, setToken] = APIToken.useContainer();

  return useCallback(
    async (code: string) => {
      const { token } = await mutator('/api/auth', { code });
      setToken(token);
      useProfile.trigger();
    },
    [mutator, setToken],
  );
}
