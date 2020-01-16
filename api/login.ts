import { generateCode } from './_utils/code';
import photon from './_utils/photon';
import { sendEmail } from './_utils/email';
import validateEmail from './_utils/validateEmail';
import handler from './_utils/handler';
import { InvalidEmailError } from './_utils/KnownErrors';

export default handler(async req => {
  // get email from query
  const { email } = req.body;

  // validate email
  const isValid = validateEmail(email);
  if (!isValid) {
    throw new InvalidEmailError();
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
  // TODO: don't return code
  return { code };
});
