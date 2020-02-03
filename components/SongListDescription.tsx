import React from 'react';
import {
  MinimannPropertyFilter,
  HumanLocation,
  HumanTopic,
  HumanMood,
  HumanBeard,
  HumanInstrument,
} from '../lib/utils/constants';

export default function SongListDescription({
  filters: { location, topic, mood, beard, instrument },
}: {
  filters: MinimannPropertyFilter;
}) {
  const fragments = [];
  if (location) {
    fragments.push(<> in </>);
    fragments.push(<span className="font-semibold">{HumanLocation[location]}</span>);
  }

  if (topic) {
    fragments.push(<> about </>);
    fragments.push(<span className="font-semibold">{HumanTopic[topic]}</span>);
  }

  if (instrument) {
    fragments.push(<> on the </>);
    fragments.push(<span className="font-semibold">{HumanInstrument[instrument]}</span>);
  }

  if (mood) {
    fragments.push(<> while </>);
    fragments.push(<span className="font-semibold">{HumanMood[mood]}</span>);
  }

  if (beard) {
    fragments.push(<> with a </>);
    fragments.push(<span className="font-semibold">{HumanBeard[beard]} beard</span>);
  }

  return <span>recorded{fragments}</span>;
}
