import mapValues from 'lodash/mapValues';
import take from 'lodash/take';
import uniq from 'lodash/uniq';

import { Song, SongsResponse } from './types';
import { Beard, Instrument, Location, Mood, Topic } from './utils/constants';

const MAX_SONGS = 11;

export function findSongs({
  location,
  topic,
  mood,
  beard,
  instrument,
}: {
  location: Location;
  topic: Topic;
  mood: Mood;
  beard: Beard;
  instrument: Instrument;
}): SongsResponse {
  // first, find available songs by filter criteria in req.query.
  // then take the valid songs and find all of their available filters
  // TODO: filter in-mem songs db by values
  const songs = db;

  const filters = mapValues(
    songs.reduce(
      (memo, song) => {
        memo.location.push(song.location);
        memo.topic.push(song.topic);
        memo.mood.push(song.mood);
        memo.beard.push(song.beard);
        memo.instrument.push(song.instrument);
        return memo;
      },
      {
        location: [],
        topic: [],
        mood: [],
        beard: [],
        instrument: [],
      },
    ),
    (values) => uniq(values),
  );

  return {
    songs: take(songs, MAX_SONGS),
    filters,
    hasMore: songs.length > MAX_SONGS,
  };
}

export function getSong(number: number): Song {
  return db.find((song) => song.number === number);
}

export const db: Song[] = [
  {
    number: 1,
    beard: Beard.Shadow,
    description: 'ok',
    instrument: Instrument.Banjo,
    location: Location.Berkeley,
    mood: Mood.Anxious,
    youtubeId: '',
    releasedAt: '',
    tags: ['tag 1'],
    title: 'test',
    topic: Topic.Animals,
  },
];
