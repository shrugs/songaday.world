import { Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

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
  const fragments: ReactNode[] = [];
  if (location) {
    fragments.push(<React.Fragment key="in"> in </React.Fragment>);
    fragments.push(
      <Text as="span" key="in-value" fontWeight="semibold">
        {HumanLocation[location] ?? `'${location}'`}
      </Text>,
    );
  }

  if (topic) {
    fragments.push(<React.Fragment key="about"> about </React.Fragment>);
    fragments.push(
      <Text as="span" key="about-value" fontWeight="semibold">
        {HumanTopic[topic] ?? `'${topic}'`}
      </Text>,
    );
  }

  if (instrument) {
    fragments.push(<React.Fragment key="on"> on the </React.Fragment>);
    fragments.push(
      <Text as="span" key="on-value" fontWeight="semibold">
        {HumanInstrument[instrument] ?? `'${instrument}'`}
      </Text>,
    );
  }

  if (mood) {
    fragments.push(<React.Fragment key="while"> while </React.Fragment>);
    fragments.push(
      <Text as="span" key="while-value" fontWeight="semibold">
        {HumanMood[mood] ?? `'${mood}'`}
      </Text>,
    );
  }

  if (beard) {
    fragments.push(<React.Fragment key="with"> with a </React.Fragment>);
    fragments.push(
      <Text as="span" key="with-value" fontWeight="semibold">
        {HumanBeard[beard] ?? `'${beard}'`} beard
      </Text>,
    );
  }

  return <span>recorded{fragments}</span>;
}
