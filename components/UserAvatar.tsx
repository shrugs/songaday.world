import React from 'react';
import useUser from '../lib/queries/useUser';
import Avatar from './minimann/Avatar';

export default function UserAvatar({ id }: { id: string }) {
  const { data: user, error } = useUser({ id });

  if (!user || error) {
    return <div>Loading or Error</div>;
  }

  if (!user.song) {
    return null;
  }

  return (
    <div className="w-10">
      <Avatar config={user.song} />
    </div>
  );
}
