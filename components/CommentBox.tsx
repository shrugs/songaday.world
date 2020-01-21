import React, { useState, useCallback, useMemo } from 'react';

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

  return (
    <div className="my-1">
      {!isCommenting && (
        <button className="text-md text-gray-700 underline" onClick={() => setIsCommenting(true)}>
          {isReply ? 'Reply' : 'Comment'}
        </button>
      )}
      {isCommenting && (
        <div className="flex flex-col">
          <textarea
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

          {error && (
            <div className="mt-1 bg-red-100 rounded border-2 border-red-200 px-4 py-2 text-center text-gray-600">
              Error submitting comment. Try again?
            </div>
          )}

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
