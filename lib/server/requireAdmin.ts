import requireUser from './requireUser';
import { NotAdminError } from '../../common/KnownErrors';
import { NextApiRequest } from 'next';

const ADMIN_EMAIL = 'admin@example.com';

export default async function requireAdmin(req: NextApiRequest) {
  const user = await requireUser(req);
  if (!user || user.email !== ADMIN_EMAIL) {
    throw new NotAdminError();
  }

  return user;
}
