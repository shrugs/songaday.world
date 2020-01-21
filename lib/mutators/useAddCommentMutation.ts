import { useCallback } from 'react';
import { mutate } from 'swr';
import Mutator from '../containers/Mutator';

export default function useAddCommentMutation() {
  const mutator = Mutator.useContainer();
  return useCallback(
    (args: { number: string; replyTo?: string; text: string }) =>
      mutate(
        `/api/song?${new URLSearchParams({ number: args.number })}`,
        mutator('/api/add_comment', args),
      ),
    [mutator],
  );
}
