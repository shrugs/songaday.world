import { generateCode } from '../../lib/server/code';
import photon from '../../lib/server/photon';
import { sendEmail } from '../../lib/server/email';
import validateEmail from '../../lib/server/validateEmail';
import handler from '../../lib/server/handler';
import { InvalidEmailError } from '../../common/KnownErrors';

export default handler(async req => {
  // get email from query
  const { email } = req.body;

  // validate email
  const isValid = validateEmail(email);
  if (!isValid) {
    throw new InvalidEmailError();
  }

  // pull user
  let user = await photon.user.findOne({ where: { email } });
  if (!user) {
    // does not exist, create the user
    user = await photon.user.create({ data: { email } });
  }

  // generate code
  const code = await generateCode(user.id);

  // send email
  await sendEmail(email, code);

  // return code
  // TODO: don't return code
  return { code };
});
