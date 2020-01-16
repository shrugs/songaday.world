import React from 'react';

const uriFromKey = (prefix: string, key: string) => `/images/${prefix}_${key.toLowerCase()}.png`;

export interface MiniMannConfig {
  location: string;
  topic: string;
  mood: string;
  beard: string;
  instrument: string;
}
// expects parent to provide sizing
// renders a minimann, given their configuration
// TODO: arguments—id or full config?
export default function MiniMann({ location, topic, mood, beard, instrument }: MiniMannConfig) {
  return (
    <>
      <div className="minimann w-full aspect">
        <div className="topic"></div>
        <div className="mood"></div>
        <div className="beard"></div>
        <div className="instrument"></div>
      </div>

      <style jsx>{`
        .aspect {
          padding-bottom: 56%;
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
