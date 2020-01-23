import handler from './_utils/handler';
import { NotImplementedError, NotFoundError } from './_utils/KnownErrors';
import getFullSong from './_utils/getFullSong';

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
