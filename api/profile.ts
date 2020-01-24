import photon from './_utils/photon';
import requireUser from './_utils/requireUser';
import handler from './_utils/handler';
import { NotImplementedError } from './_utils/KnownErrors';

export default handler(async req => {
  const user = await requireUser(req);

  switch (req.method) {
    case 'GET': {
      return await photon.users.findOne({
        where: { id: user.id },
        include: { collectedSongs: { include: { song: true } } },
      });
    }
    case 'POST': {
      const { displayName } = req.body;

      return await photon.users.update({ where: { id: user.id }, data: { displayName } });
    }
    default: {
      throw new NotImplementedError();
    }
  }
});
