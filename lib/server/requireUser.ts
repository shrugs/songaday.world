import requireAuthPayload from './requireAuthPayload';
import photon from './photon';
import { UnauthenticatedError } from '../../common/KnownErrors';
import { NextApiRequest } from 'next';

export default async function requireUser(req: NextApiRequest) {
  const payload = requireAuthPayload(req);
  const user = await photon.user.findOne({ where: { id: payload.id } });

  if (!user) {
    throw new UnauthenticatedError();
  }

  return user;
}
