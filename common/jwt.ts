import { sign, verify, decode } from 'jsonwebtoken';

const AUTH_TOKEN_EXPIRES_IN = '7d';

interface AuthPayload {
  id: string;
}

export const createToken = (payload: AuthPayload): string =>
  sign(payload, process.env.JWT_SIGNING_SECRET, { expiresIn: AUTH_TOKEN_EXPIRES_IN });

export const verifyToken = (token: string): AuthPayload =>
  verify(token, process.env.JWT_SIGNING_SECRET) as AuthPayload;

export const decodeToken = (token: string): AuthPayload => decode(token) as AuthPayload;
