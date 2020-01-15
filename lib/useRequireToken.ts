import APIToken from './containers/APIToken';
import { useEffect } from 'react';
import Router from 'next/router';

export default function useRequireToken() {
  const [token] = APIToken.useContainer();
  useEffect(() => {
    if (!token) {
      Router.push('/login');
    }
  }, [token]);
}
