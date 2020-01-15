import React, { useCallback } from 'react';
import useSWR from 'swr';
import useUpdateProfileMutation from '../lib/mutators/useUpdateProfileMutation';

export default function Profile() {
  const { data, error } = useSWR('/api/profile');
  const updateProfile = useUpdateProfileMutation();

  const handleClick = useCallback(() => updateProfile('matt'), [updateProfile]);
  return (
    <div className="flex flex-col">
      <p>my display name (remote): {data && data.displayName}</p>
      <p>error? {JSON.stringify(error)}</p>
      <button onClick={handleClick}>update to new</button>
    </div>
  );
}
