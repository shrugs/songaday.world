import handler from './_utils/handler';
import { NotImplementedError, SongAlreadyOwnedError, NotFoundError } from './_utils/KnownErrors';
import requireUser from './_utils/requireUser';
import photon from './_utils/photon';

export default handler(async req => {
  switch (req.method) {
    case 'POST': {
      const user = await requireUser(req);
      const number = parseInt(req.body.number);

      const song = await photon.song.findOne({ where: { number }, include: { owner: true } });
      if (!song) {
        throw new NotFoundError();
      }

      const alreadyCollectedSongs = await photon.user
        .findOne({ where: { id: user.id } })
        .collectedSongs({ where: { song: { number } } });

      if (alreadyCollectedSongs.length > 0) {
        throw new SongAlreadyOwnedError();
      }

      // add a collected song record
      await photon.user.update({
        where: { id: user.id },
        data: { collectedSongs: { create: { song: { connect: { number } } } } },
      });

      // TODO: dedup with profile/get
      return await photon.user.findOne({
        where: { id: user.id },
        include: { collectedSongs: { include: { song: true } } },
      });
    }
    default: {
      throw new NotImplementedError();
    }
  }
});
