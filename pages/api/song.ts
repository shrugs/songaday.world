import handler from '../../lib/server/handler';
import { NotImplementedError, NotFoundError } from '../../common/KnownErrors';
import getFullSong from '../../lib/server/getFullSong';

export default handler(async req => {
  const number = parseInt(req.query.number as string);

  switch (req.method) {
    case 'GET': {
      const song = await getFullSong(number);

      if (!song) {
        throw new NotFoundError();
      }

      return song;
    }
    default:
      throw new NotImplementedError();
  }
});
