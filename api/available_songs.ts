import photon from './_utils/photon';
import requireUser from './_utils/requireUser';
import handler from './_utils/handler';
import { NotImplementedError } from './_utils/KnownErrors';
import { Location, Topic, Mood, Beard, Instrument } from '@prisma/client';
import uniq from 'lodash/uniq';
import mapValues from 'lodash/mapValues';
import take from 'lodash/take';

const MAX_SONGS = 20;

export default handler(async req => {
  // const user = await requireUser(req);

  const location = req.query.location as Location;
  const topic = req.query.topic as Topic;
  const mood = req.query.mood as Mood;
  const beard = req.query.beard as Beard;
  const instrument = req.query.instrument as Instrument;

  switch (req.method) {
    case 'GET': {
      // first, find available songs by filter criteria in req.query.
      // then take the valid songs and find all of their available filters
      const songs = await photon.songs.findMany({
        where: {
          location,
          topic,
          mood,
          beard,
          instrument,
          NOT: {
            owner: {},
          },
        },
      });

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
        values => uniq(values),
      );

      return {
        songs: take(songs, MAX_SONGS),
        filters,
      };
    }
    default: {
      throw new NotImplementedError();
    }
  }
});
