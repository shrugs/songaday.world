import { getValidUserIdForCode } from './_utils/code';
import { createToken } from './_utils/jwt';
import handler from './_utils/handler';
import { InvalidCodeError } from './_utils/KnownErrors';

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
