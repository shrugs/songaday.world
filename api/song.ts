import handler from './_utils/handler';
import { NotImplementedError, NotFoundError } from './_utils/KnownErrors';
import photon from './_utils/photon';

export default handler(async req => {
  const number = parseInt(req.query.number as string);

  switch (req.method) {
    case 'GET': {
      const song = await photon.songs.findOne({ where: { number } });
      if (!song) {
        throw new NotFoundError();
      }

      return song;
    }
    default:
      throw new NotImplementedError();
  }
});
