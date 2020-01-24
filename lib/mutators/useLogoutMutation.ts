import { useCallback } from 'react';
import Router from 'next/router';
import APIToken from '../containers/APIToken';
import useProfile from '../queries/useProfile';

export default function useLogoutMutation() {
  const [token, setToken] = APIToken.useContainer();

  return useCallback(() => {
    // clear cache for current token
    useProfile.clear(token);
    // clear token
    setToken(undefined);
    // navigate to home
    Router.push('/');
  }, [setToken, token]);
}
