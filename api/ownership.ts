import handler from './_utils/handler';
import { NotImplementedError, SongAlreadyOwnedError, NotFoundError } from './_utils/KnownErrors';
import requireUser from './_utils/requireUser';
import photon from './_utils/photon';

export default handler(async req => {
  switch (req.method) {
    case 'POST': {
      const user = await requireUser(req);
      const number = parseInt(req.body.number);

      // check ownership
      const song = await photon.songs.findOne({ where: { number }, include: { owner: true } });
      if (!song) {
        throw new NotFoundError();
      }

      const isOwned = !!song.owner;
      if (isOwned) {
        throw new SongAlreadyOwnedError();
      }

      // assign ownership
      return await photon.songs.update({
        where: { number },
        data: { owner: { connect: { id: user.id } } },
      });
    }
    default: {
      throw new NotImplementedError();
    }
  }
});
