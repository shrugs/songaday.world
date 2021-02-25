import React from 'react';

import { LocationViewConfig } from '../../lib/utils/constants';
import MiniMann, { MiniMannConfig } from './MiniMann';

export default function Avatar({ config }: { config: MiniMannConfig }) {
  return (
    <>
      <div className="aspect-container rounded-full square">
        {/* here, we assume that background images will cover up to 50%
          of their height which may or may not be true
          */}
        <div className="absolute-frame background-fill"></div>
        <div className="absolute-frame flex items-center justify-center magnify">
          <MiniMann {...config} />
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
          background-color: ${LocationViewConfig[config.location].color};
        }
      `}</style>
    </>
  );
}
