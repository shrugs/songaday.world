import { NowRequest, NowResponse } from '@now/node';
import { success, error } from './_utils/respond';
import { getValidUserIdForCode } from './_utils/code';
import Errors from './_utils/errors';
import { createToken } from './_utils/jwt';

export default async (req: NowRequest, res: NowResponse) => {
  // get code from body
  const { code } = req.body;

  // pull user from magic link
  const userId = await getValidUserIdForCode(code);
  if (!userId) {
    return error(res, Errors.InvalidCode);
  }

  // generate JWT
  const token = createToken({ id: userId });

  // return token
  return success(res, { token });
};
