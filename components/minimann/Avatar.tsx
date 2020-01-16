import React from 'react';
import MiniMann, { MiniMannConfig } from './MiniMann';
import { BackgroundThemes } from '../../lib/utils/constants';

export default function Avatar(props: MiniMannConfig) {
  return (
    <>
      <div className="aspect-container rounded-full square shadow-xl">
        {/* here, we assume that background images will cover up to 50%
          of their height which may or may not be true
          */}
        <div className="absolute-frame background-fill"></div>
        <div className="absolute-frame flex items-center justify-center magnify">
          <MiniMann {...props} />
        </div>
      </div>

      <style jsx>{`
        .square {
          padding-bottom: 100%;
        }

        .magnify {
          transform: scale(1.5);
        }

        .background-fill {
          top: 50%;
          background-color: ${BackgroundThemes[props.location]};
        }
      `}</style>
    </>
  );
}
