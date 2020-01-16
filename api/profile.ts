import { NowRequest, NowResponse } from '@now/node';
import photon from './_utils/photon';
import { success } from './_utils/respond';
import requireUser from './_utils/requireUser';
import handler from './_utils/handler';
import { NotImplementedError } from './_utils/KnownErrors';

export default handler(async (req: NowRequest, res: NowResponse) => {
  const user = await requireUser(req);

  switch (req.method) {
    case 'GET': {
      return success(res, user);
    }
    case 'POST': {
      const { displayName } = req.body;
      const newUser = await photon.users.update({ where: { id: user.id }, data: { displayName } });
      return success(res, newUser);
    }
    default: {
      throw new NotImplementedError();
    }
  }
});
