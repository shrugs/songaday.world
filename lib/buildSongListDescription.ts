import {
  MinimannPropertyFilter,
  HumanLocation,
  HumanTopic,
  HumanMood,
  HumanBeard,
  HumanInstrument,
} from './utils/constants';

export default function buildSongListDescription({
  location,
  topic,
  mood,
  beard,
  instrument,
}: MinimannPropertyFilter) {
  if (!location && !topic && !mood && !beard && !instrument) {
    return `like this in the catalog`;
  }

  const fragments = [];
  if (location) {
    fragments.push(`in ${HumanLocation[location]}`);
  }

  if (topic) {
    fragments.push(`about ${HumanTopic[topic]}`);
  }

  if (mood) {
    fragments.push(`while ${HumanMood[mood]}`);
  }

  if (beard) {
    fragments.push(`with a ${HumanBeard[beard]} beard`);
  }

  if (instrument) {
    fragments.push(`on a ${HumanInstrument[instrument]}`);
  }

  return `recorded ${fragments.join('')}`;
}
