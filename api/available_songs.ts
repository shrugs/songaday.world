import photon from './_utils/photon';
import requireUser from './_utils/requireUser';
import handler from './_utils/handler';
import { NotImplementedError } from './_utils/KnownErrors';
import { Location, Topic, Mood, Beard, Instrument } from '@prisma/client';

export default handler(async req => {
  const user = await requireUser(req);

  switch (req.method) {
    case 'GET': {
      // first, find available songs by filter criteria in req.query.
      // then take the valid songs and find all of their available filters
      return {
        songs: [],
        filters: {
          location: Object.keys(Location),
          topic: Object.keys(Topic),
          mood: Object.keys(Mood),
          beard: Object.keys(Beard),
          instrument: Object.keys(Instrument),
        },
      };
    }
    default: {
      throw new NotImplementedError();
    }
  }
});
