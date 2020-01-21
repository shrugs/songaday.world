import photon from './_utils/photon';
import requireUser from './_utils/requireUser';
import handler from './_utils/handler';
import { NotImplementedError, NotFoundError } from './_utils/KnownErrors';

export default handler(async req => {
  await requireUser(req);

  switch (req.method) {
    case 'GET': {
      const id = req.query.id as string;
      const user = await photon.users.findOne({ where: { id }, include: { song: true } });
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
