import React from 'react';
import useProfile from '../lib/queries/useProfile';
import Link from 'next/link';
import Avatar from './minimann/Avatar';

function Navbar() {
  const { data: profile } = useProfile();

  return (
    <div className="flex flex-row flex-wrap px-4 py-2 h-12 sm:h-16 md:h-20 lg:h-24">
      <Link href="/">
        <img className="h-full cursor-pointer" src="/images/logo.svg"></img>
      </Link>
      <div className="ml-2 flex-auto flex flex-row justify-end items-center">
        {!profile && (
          <Link href="/login">
            <a className="font-medium text-sm">Login / Signup</a>
          </Link>
        )}
        {profile && (
          <Link href="/profile">
            <a className="flex flex-row items-center">
              {profile.song && (
                <div className="h-8 w-8 lg:w-12 lg:h-12 mr-2">
                  <Avatar config={profile.song} />
                </div>
              )}
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
