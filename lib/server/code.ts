import { randomBytes } from 'crypto';
import { patq } from 'urbit-ob';
import photon from './photon';
import ms from 'ms';

const KEY_LENGTH = 8; // bytes
const KEY_TIMEOUT = ms('15m');

export const generateCode = async (id: string) => {
  const code = patq(randomBytes(KEY_LENGTH));

  await photon.user.update({
    where: { id },
    data: {
      magicCode: {
        upsert: {
          update: { code },
          create: { code },
        },
      },
    },
  });

  return code;
};

export const getValidUserIdForCode = async (code: string): Promise<string | null> => {
  const magicCode = await photon.magicCode.findOne({
    where: { code },
    select: { updatedAt: true, user: { select: { id: true } } },
  });

  // if code does not exist...
  if (!magicCode) {
    return null;
  }

  // if code has expired...
  if (Date.now() > magicCode.updatedAt.getTime() + KEY_TIMEOUT) {
    return null;
  }

  // otherwise it's valid, so delete it
  await photon.magicCode.delete({ where: { code } });

  // return user id
  return magicCode.user.id;
};
