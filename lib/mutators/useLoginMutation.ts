import { useCallback } from 'react';
import mutator from '../mutator';

export default function useLoginMutation() {
  return useCallback(async (email: string) => mutator(null, '/api/login', { email }), []);
}
