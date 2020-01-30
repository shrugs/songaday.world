import handler from './_utils/handler';
import { NotImplementedError, NotFoundError } from './_utils/KnownErrors';
import photon from './_utils/photon';
import requireUser from './_utils/requireUser';
import getFullSong from './_utils/getFullSong';

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
