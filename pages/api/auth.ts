import { getValidUserIdForCode } from '../../lib/server/code';
import { createToken } from '../../common/jwt';
import handler from '../../lib/server/handler';
import { InvalidCodeError } from '../../common/KnownErrors';

export default handler(async req => {
  // get code from body
  const { code } = req.body;

  // pull user from magic link
  const userId = await getValidUserIdForCode(code);
  if (!userId) {
    throw new InvalidCodeError();
  }

  // generate JWT
  const token = createToken({ id: userId });

  // return token
  return { token };
});
