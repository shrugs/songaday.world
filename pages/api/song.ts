import handler from '../../lib/server/handler';
import { NotImplementedError, NotFoundError } from '../../common/KnownErrors';

export default handler(async req => {
  const number = parseInt(req.query.number as string);

  switch (req.method) {
    case 'GET': {
      // TODO: look up song by number
      const song = undefined;

      if (!song) {
        throw new NotFoundError();
      }

      return song;
    }
    default:
      throw new NotImplementedError();
  }
});
