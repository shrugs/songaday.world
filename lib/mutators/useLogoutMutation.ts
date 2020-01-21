import { useCallback } from 'react';
import Router from 'next/router';
import APIToken from '../containers/APIToken';
import useProfile from '../queries/useProfile';

export default function useLogoutMutation() {
  const [, setToken] = APIToken.useContainer();

  return useCallback(() => {
    setToken(null);
    useProfile.clear();
    Router.push('/');
  }, [setToken]);
}
