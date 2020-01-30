import { NowRequest } from '@now/node';
import requireAuthPayload from './requireAuthPayload';
import photon from './photon';
import { UnauthenticatedError } from './KnownErrors';

export default async function requireUser(req: NowRequest) {
  const payload = requireAuthPayload(req);
  const user = await photon.user.findOne({ where: { id: payload.id } });

  if (!user) {
    throw new UnauthenticatedError();
  }

  return user;
}
