import React, { useCallback } from 'react';
import useSong from '../lib/queries/useSong';
import CommentBox from './CommentBox';
import useAddCommentMutation from '../lib/mutators/useAddCommentMutation';
import UserComment from './UserComment';

function CommentThread({ number }: { number: string }) {
  const { data: song } = useSong({ number });
  const addComment = useAddCommentMutation();
  const onSubmitTopLevelComment = useCallback(
    async (text: string) => {
      console.log('submitting:', text);
      addComment({ number, text });
    },
    [addComment, number],
  );

  return (
    <div className="flex flex-col rounded-lg shadow-lg m-4 p-2 bg-white">
      {song.comments.length === 0 && (
        <div className="bg-gray-100 rounded border-2 border-gray-200 px-4 py-2 text-center text-gray-600">
          Be the first to comment on{' '}
          <span className="font-semibold">
            Song &#35;{song.number} — {song.title}
          </span>
          .
        </div>
      )}
      {song.comments.map(comment => (
        <UserComment key={comment.id} comment={comment} />
      ))}
      <CommentBox isReply={false} onSubmit={onSubmitTopLevelComment} />
    </div>
  );
}

export default CommentThread;
