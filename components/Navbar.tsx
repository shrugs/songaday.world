import React from 'react';
import useProfile from '../lib/queries/useProfile';
import Link from 'next/link';

function Navbar() {
  const { data: profile } = useProfile();

  return (
    <div className="flex flex-row flex-wrap p-4">
      <img className="h-8 sm:h-12 md:h-16" src="/images/logo.svg"></img>
      <div className="ml-2 flex-auto flex flex-row justify-end items-center">
        {!profile && (
          <Link href="/login">
            <a className="font-medium text-sm">Login / Signup</a>
          </Link>
        )}
        {profile && (
          <Link href="/profile">
            <a className="flex flex-row items-center">
              {profile.displayName && (
                <span className="font-semibold text-md mr-1">{profile.displayName}</span>
              )}
              <span className="font-small text-sm">{profile.email}</span>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
