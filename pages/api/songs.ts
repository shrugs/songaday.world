import { findSongs } from '../../lib/db';
import { guardOnlyGet, handler, yup } from '../../lib/server/handler';
import { Beard, Instrument, Location, Mood, Topic } from '../../lib/utils/constants';

export default handler(async (req, res) => {
  guardOnlyGet(req, res);

  const response = findSongs({
    location: req.query.location as Location,
    topic: req.query.topic as Topic,
    mood: req.query.mood as Mood,
    beard: req.query.beard as Beard,
    instrument: req.query.instrument as Instrument,
    page: req.query.page ? parseInt(req.query.page as string) : 0,
    size: req.query.size ? parseInt(req.query.size as string) : 12,
  });

  return yup(res, response);
});
