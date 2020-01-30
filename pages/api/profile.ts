import photon from '../../lib/server/photon';
import requireUser from '../../lib/server/requireUser';
import handler from '../../lib/server/handler';
import { NotImplementedError } from '../../common/KnownErrors';

export default handler(async req => {
  const user = await requireUser(req);

  switch (req.method) {
    case 'GET': {
      return await photon.user.findOne({
        where: { id: user.id },
        include: { collectedSongs: { include: { song: true } } },
      });
    }
    case 'POST': {
      const { displayName } = req.body;

      return await photon.user.update({ where: { id: user.id }, data: { displayName } });
    }
    default: {
      throw new NotImplementedError();
    }
  }
});
