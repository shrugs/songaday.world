import React, { useState, useCallback, useMemo } from 'react';
import NoticeBox from './NoticeBox';

function CommentBox({
  isReply,
  onSubmit,
}: {
  onSubmit: (text: string) => Promise<void>;
  isReply: boolean;
}) {
  const [isCommenting, setIsCommenting] = useState(!isReply);

  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const canComment = useMemo(() => text.length > 0 && !submitting, [submitting, text.length]);

  const submit = useCallback(async () => {
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(text);
      setText('');
      setIsCommenting(false);
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }
  }, [onSubmit, text]);

  const handleCommentIntent = useCallback(() => setIsCommenting(true), []);

  return (
    <div className="my-1">
      {!isCommenting && (
        <button className="text-md text-gray-700 underline" onClick={handleCommentIntent}>
          {isReply ? 'Reply' : 'Add a Comment'}
        </button>
      )}
      {isCommenting && (
        <div className="flex flex-col">
          <textarea
            autoFocus={isReply}
            className="mb-1 p-1 bg-gray-100 border-gray-200 placeholder-gray-700 rounded focus:border-gray-400 border-2 disabled:opacity-50"
            placeholder="Add a comment..."
            value={text}
            disabled={submitting}
            onChange={e => setText(e.target.value)}
          ></textarea>

          <button
            className="rounded py-2 px-4 bg-purple-500 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
            onClick={canComment ? submit : null}
            disabled={!canComment}
          >
            {isReply ? 'Reply' : 'Comment'}
          </button>

          {error && <NoticeBox color="gray">Error submitting comment. Try again?</NoticeBox>}

          <style jsx>{`
            textarea {
              min-height: 2rem;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default CommentBox;
