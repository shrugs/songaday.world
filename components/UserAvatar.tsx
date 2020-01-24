import React, { useMemo } from 'react';
import useUser from '../lib/queries/useUser';
import Avatar from './minimann/Avatar';
import cx from 'classnames';
import get from 'lodash/get';

export default function UserAvatar({ id }: { id: string }) {
  const { data: user, error } = useUser({ id });
  const avatarSong = useMemo(() => get(user, ['collectedSongs', 0, 'song']), [user]);

  return (
    <div className="w-10 h-10">
      {avatarSong ? (
        <Avatar config={avatarSong} />
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
