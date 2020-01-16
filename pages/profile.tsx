import React, { useCallback } from 'react';
import useUpdateProfileMutation from '../lib/mutators/useUpdateProfileMutation';
import useRequireToken from '../lib/useRequireToken';
import useProfile from '../lib/queries/useProfile';
import useLogoutMutation from '../lib/mutators/useLogoutMutation';

export default function Profile() {
  useRequireToken();
  const logoutMutation = useLogoutMutation();

  const { data, error, isValidating } = useProfile();
  const updateProfile = useUpdateProfileMutation();

  const handleClick = useCallback(() => updateProfile('matt'), [updateProfile]);
  const clearName = useCallback(() => updateProfile(null), [updateProfile]);

  return (
    <div className="flex flex-col">
      <p>{isValidating ? '' : '(not) '}loading</p>
      <p>i am {data && data.email}</p>
      <p>my display name (remote): {data && data.displayName}</p>
      <p>error? {JSON.stringify(error)}</p>
      <button onClick={handleClick}>update to new</button>
      <button onClick={clearName}>clear name</button>
      <button onClick={logoutMutation}>signout</button>
    </div>
  );
}
