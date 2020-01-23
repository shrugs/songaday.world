import { useCallback } from 'react';
import { mutate } from 'swr';
import Mutator from '../containers/Mutator';

export default function useAddCommentMutation() {
  const mutator = Mutator.useContainer();
  return useCallback(
    async (args: { number: string; replyTo?: string; text: string }) => {
      const data = await mutator('/api/add_comment', args);
      mutate(`/api/song?${new URLSearchParams({ number: args.number })}`, data);
      return data;
    },
    [mutator],
  );
}
