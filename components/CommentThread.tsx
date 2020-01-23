import React, { useCallback } from 'react';
import useSong from '../lib/queries/useSong';
import CommentBox from './CommentBox';
import useAddCommentMutation from '../lib/mutators/useAddCommentMutation';
import UserComment from './UserComment';
import NoticeBox from './NoticeBox';

function CommentThread({ number }: { number: string }) {
  const { data: song } = useSong({ number });
  const addComment = useAddCommentMutation();
  const onSubmitTopLevelComment = useCallback(
    async (text: string) => {
      console.log('submitting:', text);
      await addComment({ number, text });
    },
    [addComment, number],
  );

  const replyTo = useCallback(
    comment => async (text: string) => {
      console.log(`replying to ${comment.id} with ${text}`);
      await addComment({ number, text, replyTo: comment.id });
    },
    [addComment, number],
  );

  return (
    <div className="flex flex-col rounded-lg shadow-lg m-4 p-2 bg-white">
      {song.comments.length === 0 && (
        <NoticeBox color="gray">
          Be the first to comment on{' '}
          <span className="font-semibold">
            Song &#35;{song.number} — {song.title}
          </span>
          .
        </NoticeBox>
      )}
      <CommentBox isReply={false} onSubmit={onSubmitTopLevelComment} />
      {song.comments.map(comment => (
        <div key={comment.id} className="mb-2">
          <UserComment comment={comment} />
          {comment.replies.map(reply => (
            <div key={reply.id} className="ml-4">
              <UserComment comment={reply} />
            </div>
          ))}
          <CommentBox isReply={true} onSubmit={replyTo(comment)} />
        </div>
      ))}
    </div>
  );
}

export default CommentThread;
