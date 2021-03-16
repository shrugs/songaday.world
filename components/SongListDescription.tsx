import React from 'react';

import {
  HumanBeard,
  HumanInstrument,
  HumanLocation,
  HumanMood,
  HumanTopic,
  MinimannPropertyFilter,
} from '../lib/utils/constants';

export default function SongListDescription({
  filters: { location, topic, mood, beard, instrument },
}: {
  filters: MinimannPropertyFilter;
}) {
  const fragments = [];
  if (location) {
    fragments.push(<React.Fragment key="in"> in </React.Fragment>);
    fragments.push(
      <span className="font-semibold" key="in-value">
        {HumanLocation[location]}
      </span>,
    );
  }

  if (topic) {
    fragments.push(<React.Fragment key="about"> about </React.Fragment>);
    fragments.push(
      <span className="font-semibold" key="about-value">
        {HumanTopic[topic]}
      </span>,
    );
  }

  if (instrument) {
    fragments.push(<React.Fragment key="on"> on the </React.Fragment>);
    fragments.push(
      <span className="font-semibold" key="on-value">
        {HumanInstrument[instrument]}
      </span>,
    );
  }

  if (mood) {
    fragments.push(<React.Fragment key="while"> while </React.Fragment>);
    fragments.push(
      <span className="font-semibold" key="while-value">
        {HumanMood[mood]}
      </span>,
    );
  }

  if (beard) {
    fragments.push(<React.Fragment key="with"> with a </React.Fragment>);
    fragments.push(
      <span className="font-semibold" key="with-value">
        {HumanBeard[beard]} beard
      </span>,
    );
  }

  return <span>recorded{fragments}</span>;
}
