import React from 'react';
import MiniMann from './MiniMann';

export default function Avatar(props) {
  return (
    <>
      <div className="aspect-container rounded-full square shadow-xl">
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
      `}</style>
    </>
  );
}
