import cx from 'classnames';
import React from 'react';

import { Song } from '../../lib/types';
import { Topic } from '../../lib/utils/constants';
import { nameFromKey, resolveTopic } from '../../lib/utils/images';

const uriFromKey = (prefix: string, key: string) => `/images/${nameFromKey(prefix, key)}`;

export type MiniMannConfig = Pick<
  Song,
  'location' | 'topic' | 'mood' | 'beard' | 'instrument' | 'releasedAt'
>;

interface MiniMannProps extends MiniMannConfig {
  offset?: boolean;
}

// expects parent to provide sizing
// renders a minimann, given their configuration
export default function MiniMann({
  location,
  topic,
  mood,
  beard,
  instrument,
  releasedAt,
  offset = false,
}: MiniMannProps) {
  const conditionalOffset = cx({ 'lg:offset-layer-in-frame': offset });
  // all instrumental topics use the same "topic" graphic
  const isInstrumental = topic && topic.startsWith('Instrumental');
  topic = isInstrumental ? Topic.Instrumental : topic;

  return (
    <>
      <div className="minimann w-full aspect-location">
        <div className={`topic ${conditionalOffset}`}></div>
        <div className={`mood ${conditionalOffset}`}></div>
        <div className={`beard ${conditionalOffset}`}></div>
        <div className={`instrument ${conditionalOffset}`}></div>
      </div>

      <style jsx>{`
        .minimann {
          background-image: url(${uriFromKey('location', location)});
        }
        .topic {
          background-image: url(${uriFromKey('topic', resolveTopic(topic, releasedAt))});
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
