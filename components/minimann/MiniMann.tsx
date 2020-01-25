import React from 'react';
import cx from 'classnames';

const uriFromKey = (prefix: string, key: string) => `/images/${prefix}_${key.toLowerCase()}.svg`;

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
  const conditionalOffset = cx({ 'lg:offset-layer-in-frame': offset });
  return (
    <>
      <div className="minimann w-full aspect-location">
        <div className={`mood ${conditionalOffset}`}></div>
        <div className={`beard ${conditionalOffset}`}></div>
        <div className={`topic ${conditionalOffset}`}></div>
        <div className={`instrument ${conditionalOffset}`}></div>
      </div>

      <style jsx>{`
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
