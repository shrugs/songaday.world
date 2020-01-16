import { NowRequest } from '@now/node';
import requireUser from './requireUser';
import { NotAdminError } from './KnownErrors';

const ADMIN_EMAIL = 'admin@example.com';

export default async function requireAdmin(req: NowRequest) {
  const user = await requireUser(req);
  if (user.email !== ADMIN_EMAIL) {
    throw new NotAdminError();
  }

  return user;
}
