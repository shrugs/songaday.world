import photon from '../../lib/server/photon';
import requireUser from '../../lib/server/requireUser';
import handler from '../../lib/server/handler';
import { NotImplementedError, NotFoundError } from '../../common/KnownErrors';

export default handler(async req => {
  await requireUser(req);

  switch (req.method) {
    case 'GET': {
      const id = req.query.id as string;
      const user = await photon.user.findOne({
        where: { id },
        include: { collectedSongs: { include: { song: true } } },
      });
      if (!user) {
        throw new NotFoundError();
      }

      return user;
    }
    default: {
      throw new NotImplementedError();
    }
  }
});
