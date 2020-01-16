import { NowRequest } from '@now/node';
import requireAuthPayload from './requireAuthPayload';
import photon from './photon';

export default async function requireUser(req: NowRequest) {
  const payload = requireAuthPayload(req);
  return await photon.users.findOne({ where: { id: payload.id } });
}
