import React from 'react';
import cx from 'classnames';

const uriFromKey = (prefix: string, key: string) => `/images/${prefix}_${key.toLowerCase()}.png`;

export interface MiniMannConfig {
  location: string;
  topic: string;
  mood: string;
  beard: string;
  instrument: string;
}

interface MiniMannProps extends MiniMannConfig {
  offset?: boolean;
}
// expects parent to provide sizing
// renders a minimann, given their configuration
// TODO: arguments—id or full config?
export default function MiniMann({
  location,
  topic,
  mood,
  beard,
  instrument,
  offset = false,
}: MiniMannProps) {
  return (
    <>
      <div className="minimann w-full aspect-16/9">
        <div className={`topic ${cx({ offset })}`}></div>
        <div className={`mood ${cx({ offset })}`}></div>
        <div className={`beard ${cx({ offset })}`}></div>
        <div className={`instrument ${cx({ offset })}`}></div>
      </div>

      <style jsx>{`
        .offset {
          transform: translateX(-12%);
        }

        .minimann {
          background-image: url(${uriFromKey('location', location)});
        }
        .topic {
          background-image: url(${uriFromKey('topic', topic)});
        }
        .mood {
          background-image: url(${uriFromKey('mood', mood)});
        }
        .beard {
          background-image: url(${uriFromKey('beard', beard)});
        }
        .instrument {
          background-image: url(${uriFromKey('instrument', instrument)});
        }
      `}</style>
    </>
  );
}
