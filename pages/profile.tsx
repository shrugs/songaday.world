import React, { useCallback } from 'react';
import useSWR from 'swr';
import useUpdateProfileMutation from '../lib/mutators/useUpdateProfileMutation';
import useRequireToken from '../lib/useRequireToken';

export default function Profile() {
  useRequireToken();

  const { data, error, isValidating } = useSWR('/api/profile');
  const updateProfile = useUpdateProfileMutation();

  const handleClick = useCallback(() => updateProfile('matt'), [updateProfile]);
  return (
    <div className="flex flex-col">
      <p>{isValidating ? '' : '(not) '}loading</p>
      <p>i am {data && data.email}</p>
      <p>my display name (remote): {data && data.displayName}</p>
      <p>error? {JSON.stringify(error)}</p>
      <button onClick={handleClick}>update to new</button>
    </div>
  );
}
