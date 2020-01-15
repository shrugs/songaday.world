import { NowRequest, NowResponse } from '@now/node';
import { success, error } from './_utils/respond';
import { generateCode } from './_utils/code';
import photon from './_utils/photon';
import { sendEmail } from './_utils/email';
import validateEmail from './_utils/validateEmail';
import Errors from './_utils/errors';

export default async (req: NowRequest, res: NowResponse) => {
  // get email from query
  const { email } = req.body;

  // validate email
  const isValid = validateEmail(email);
  if (!isValid) {
    return error(res, Errors.InvalidEmail);
  }

  // pull user
  let user = await photon.users.findOne({ where: { email } });
  if (!user) {
    // does not exist, create the user
    user = await photon.users.create({ data: { email } });
  }

  // generate code
  const code = await generateCode(user.id);

  // send email
  await sendEmail(email, code);

  // return code
  return success(res, { code });
};
