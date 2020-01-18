import handler from './_utils/handler';
import { NotImplementedError } from './_utils/KnownErrors';
import photon from './_utils/photon';

export default handler(async req => {
  const number = parseInt(req.query.number as string);

  switch (req.method) {
    case 'GET': {
      return await photon.songs.findOne({ where: { number } });
    }
    default:
      throw new NotImplementedError();
  }
});