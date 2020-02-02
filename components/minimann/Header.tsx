import React from 'react';
import MiniMann from './MiniMann';
import SongCard from '../song/SongCard';
import useSong from '../../lib/queries/useSong';

export default function Header({ number, initialSong }: { number: string; initialSong?: any }) {
  const { data: song } = useSong({ number }, initialSong);

  return (
    <>
      <div className="relative flex flex-col">
        {song && <MiniMann {...song} offset />}
        <div className="relative top-0 right-0 bottom-0 left-0 lg:absolute lg:left-1/2 w-full lg:w-1/2 song-card-container">
          <div className="lg:w-2/3 lg:card-offset flex flex-row justify-center">
            <SongCard number={number} initialSong={initialSong} />
          </div>
        </div>
      </div>
    </>
  );
}
