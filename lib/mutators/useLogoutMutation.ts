import { useCallback } from 'react';
import Router from 'next/router';
import APIToken from '../containers/APIToken';
import { clearAuthState } from '../cache/authState';

export default function useLogoutMutation() {
  const [, setToken] = APIToken.useContainer();

  return useCallback(() => {
    setToken(null);
    clearAuthState();
    Router.push('/');
  }, [setToken]);
}
