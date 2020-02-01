import { MinimannPropertyFilter } from './utils/constants';

export default function buildSongListDescription({
  location,
  topic,
  mood,
  beard,
  instrument,
}: MinimannPropertyFilter) {
  if (!location && !topic && !mood && !beard && !instrument) {
    return `in the catalog`;
  }

  const fragments = [];
  if (location) {
    fragments.push(`in ${location}`);
  }

  if (topic) {
    fragments.push(`about ${topic}`);
  }

  if (mood) {
    fragments.push(`while ${mood}`);
  }

  if (beard) {
    fragments.push(`with a ${beard} beard`);
  }

  if (instrument) {
    fragments.push(`on a ${instrument}`);
  }

  return `recorded ${fragments.join('')}`;
}
