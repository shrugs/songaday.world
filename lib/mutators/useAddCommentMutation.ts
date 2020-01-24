import { useCallback } from 'react';
import { mutate } from 'swr';
import mutator from '../mutator';
import APIToken from '../containers/APIToken';

export default function useAddCommentMutation() {
  return useCallback(async (args: { number: string; replyTo?: string; text: string }) => {
    const [token] = APIToken.useContainer();
    const data = await mutator(token, '/api/add_comment', args);
    mutate(`/api/song?${new URLSearchParams({ number: args.number })}`, data);
    return data;
  }, []);
}
