import { NowRequest, NowResponse } from '@now/node';
import requireAuthPayload from './_utils/requireAuthPayload';
import photon from './_utils/photon';
import { success } from './_utils/respond';

export default async (req: NowRequest, res: NowResponse) => {
  const auth = requireAuthPayload(req);

  switch (req.method) {
    case 'GET': {
      const user = await photon.users.findOne({ where: { id: auth.id } });

      return success(res, user);
    }
    case 'POST': {
      const { displayName } = req.body;
      const user = await photon.users.update({ where: { id: auth.id }, data: { displayName } });
      return success(res, user);
    }
    default:
      throw new Error('Unsupported method.');
  }
};
