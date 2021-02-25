import mapValues from 'lodash/mapValues';
import take from 'lodash/take';
import uniq from 'lodash/uniq';

import _db from '../generated/db.json';
import { Song, SongsResponse } from './types';
import { Beard, Instrument, Location, Mood, Topic } from './utils/constants';

const db = _db as Song[];

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
  const songs = db.filter((song) =>
    [
      location ? song.location === location : true,
      topic ? song.topic === topic : true,
      mood ? song.mood === mood : true,
      beard ? song.beard === beard : true,
      instrument ? song.instrument === instrument : true,
    ].every(Boolean),
  );

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
