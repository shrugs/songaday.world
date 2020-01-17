import React from 'react';
import MiniMann, { MiniMannConfig } from './MiniMann';
import SongCard from '../song/SongCard';

interface HeaderProps {
  config: MiniMannConfig;
  number: number;
}
export default function Header({ config, number }: HeaderProps) {
  return (
    <>
      <div className="relative flex flex-col">
        <div className="relative top-0 right-0 bottom-0 left-0 lg:absolute">
          <MiniMann {...config} offset />
        </div>
        <div className="relative top-0 right-0 bottom-0 left-0 lg:absolute lg:left-1/2 w-full lg:w-1/2 song-card-container">
          <div className="mt-4 lg:w-10/12 flex flex-row justify-center">
            <SongCard number={number} />
          </div>
        </div>
      </div>
    </>
  );
}
