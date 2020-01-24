import { useCallback } from 'react';
import mutator from '../mutator';
import APIToken from '../containers/APIToken';
import useSong from '../queries/useSong';

export default function useAddCommentMutation() {
  const [token] = APIToken.useContainer();
  return useCallback(
    async (args: { number: string; replyTo?: string; text: string }) => {
      const data = await mutator(token, '/api/add_comment', args);
      useSong.mutate(data, { number: args.number });
      return data;
    },
    [token],
  );
}
