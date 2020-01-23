import React, { useMemo } from 'react';
import UserAvatar from './UserAvatar';
import { DateTime } from 'luxon';

export default function UserComment({ comment }: { comment: any }) {
  const createdAtString = useMemo(
    () => DateTime.fromISO(comment.createdAt).toLocaleString(DateTime.DATETIME_MED),
    [comment.createdAt],
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <UserAvatar id={comment.author.id} />
        <div className="ml-2 flex flex-col justify-center">
          <div className="leading-tight font-semibold">{comment.author.displayName}</div>
          <div className="leading-none text-xs italic text-gray-600">{createdAtString}</div>
        </div>
      </div>
      <div className="mt-1">{comment.text}</div>
    </div>
  );
}
