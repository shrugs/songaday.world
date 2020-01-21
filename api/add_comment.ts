import handler from './_utils/handler';
import { NotImplementedError, NotFoundError } from './_utils/KnownErrors';
import photon from './_utils/photon';
import requireUser from './_utils/requireUser';

export default handler(async req => {
  const user = await requireUser(req);

  switch (req.method) {
    case 'POST': {
      const number = parseInt(req.body.number as string);
      const text: string = req.body.text;
      const replyTo: string = req.body.replyTo;

      if (replyTo) {
      } else {
        return await photon.songs.update({
          where: { number },
          data: {
            comments: { create: { author: { connect: { id: user.id } }, text } },
          },
          include: { comments: { include: { author: true } } },
        });
      }
    }
    default:
      throw new NotImplementedError();
  }
});
