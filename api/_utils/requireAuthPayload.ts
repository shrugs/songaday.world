import { NowRequest } from '@now/node';
import { verifyToken } from './jwt';

export default (req: NowRequest) => {
  const header = req.headers.authorization;
  if (!header) {
    throw new Error('No Authorization header provided.');
  }

  const parts = header.split('Bearer ');
  if (parts.length !== 2) {
    throw new Error('Malformed Authorization header');
  }

  const token = parts[1];
  return verifyToken(token);
};
