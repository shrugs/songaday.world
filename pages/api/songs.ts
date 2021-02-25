import mapValues from 'lodash/mapValues';
import take from 'lodash/take';
import uniq from 'lodash/uniq';

import { guardOnlyGet, handler, yup } from '../../lib/server/handler';
import { Song } from '../../lib/types';
import { Beard, Instrument, Location, Mood, Topic } from '../../lib/utils/constants';

const MAX_SONGS = 11;

export default handler(async (req, res) => {
  guardOnlyGet(req, res);

  const location = req.query.location as Location;
  const topic = req.query.topic as Topic;
  const mood = req.query.mood as Mood;
  const beard = req.query.beard as Beard;
  const instrument = req.query.instrument as Instrument;

  // first, find available songs by filter criteria in req.query.
  // then take the valid songs and find all of their available filters
  // TODO: filter in-mem songs db by values
  const songs: Song[] = [
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

  return yup(res, {
    songs: take(songs, MAX_SONGS),
    filters,
    hasMore: songs.length > MAX_SONGS,
  });
});
