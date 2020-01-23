import React from 'react';
import useUser from '../lib/queries/useUser';
import Avatar from './minimann/Avatar';
import cx from 'classnames';

export default function UserAvatar({ id }: { id: string }) {
  const { data: user, error } = useUser({ id });

  return (
    <div className="w-10 h-10">
      {user && user.song ? (
        <Avatar config={user.song} />
      ) : (
        <div
          className={cx('h-full w-full rounded-full', {
            'bg-gray-300': !error,
            'bg-red-300': error,
          })}
        ></div>
      )}
    </div>
  );
}
