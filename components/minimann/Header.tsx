import React from 'react';
import MiniMann from './MiniMann';
import SongCard from '../song/SongCard';

export default function Header({ song }: { song: any }) {
  return (
    <>
      <div className="relative flex flex-col">
        {song && <MiniMann {...song} offset />}
        <div className="relative top-0 right-0 bottom-0 left-0 lg:absolute lg:left-1/2 w-full lg:w-1/2 song-card-container">
          <div className="lg:w-10/12 flex flex-row justify-center">
            <SongCard song={song} />
          </div>
        </div>
      </div>
    </>
  );
}
