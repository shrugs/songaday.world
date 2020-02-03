import { verifyToken } from '../../common/jwt';
import {
  NoAuthorizationHeaderError,
  MalformedAuthorizationHeaderError,
} from '../../common/KnownErrors';
import { NextApiRequest } from 'next';

export default function requireAuthPayload(req: NextApiRequest) {
  const header = req.headers.authorization;
  if (!header) {
    throw new NoAuthorizationHeaderError();
  }

  const parts = header.split('Bearer ');
  if (parts.length !== 2) {
    throw new MalformedAuthorizationHeaderError();
  }

  const token = parts[1];
  return verifyToken(token);
}
