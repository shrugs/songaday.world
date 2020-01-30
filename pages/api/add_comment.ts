import handler from '../../lib/server/handler';
import { NotImplementedError, NotFoundError } from '../../common/KnownErrors';
import photon from '../../lib/server/photon';
import requireUser from '../../lib/server/requireUser';
import getFullSong from '../../lib/server/getFullSong';

export default handler(async req => {
  const user = await requireUser(req);

  switch (req.method) {
    case 'POST': {
      const number = parseInt(req.body.number as string);
      const text: string = req.body.text;
      const replyTo: string = req.body.replyTo;

      if (replyTo) {
        await photon.comment.update({
          where: { id: replyTo },
          data: { replies: { create: { author: { connect: { id: user.id } }, text } } },
        });

        return await getFullSong(number);
      } else {
        return await photon.song.update({
          where: { number },
          data: {
            comments: { create: { author: { connect: { id: user.id } }, text } },
          },
          include: {
            comments: { include: { author: true, replies: { include: { author: true } } } },
          },
        });
      }
    }
    default:
      throw new NotImplementedError();
  }
});
