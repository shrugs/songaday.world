import React from 'react';
import useSong from '../lib/queries/useSong';

function CommentThread({ number }: { number: string }) {
  const { data: song } = useSong({ number });
  return (
    <div className="flex flex-col rounded-lg shadow-lg m-4 p-2 bg-white">
      {song.comments.length === 0 && (
        <div className="bg-gray-100 rounded border-2 border-gray-200 px-4 py-2 text-center text-gray-600">
          tet
        </div>
      )}
    </div>
  );
}

export default CommentThread;
