import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <header className="flex flex-row flex-wrap px-4 py-2 h-12 sm:h-16 md:h-20 lg:h-24">
      <Link href="/">
        <img
          className="h-full cursor-pointer"
          src="/images/logo.svg"
          alt="the Song a Day World logo"
        />
      </Link>
      <div className="ml-2 flex-auto flex flex-row justify-end items-center">
        <a
          className="font-normal text-sm underline text-gray-700 mr-4"
          href="https://www.jonathanmann.net/"
          rel="noopener noreferrer"
          target="_blank"
        >
          About Song a Day
        </a>
        <a
          className="font-normal text-sm underline text-gray-700"
          href="https://twitter.com/songadaymann"
          rel="noopener noreferrer"
          target="_blank"
        >
          @songadaymann 🐦
        </a>
      </div>
    </header>
  );
}

export default Navbar;
