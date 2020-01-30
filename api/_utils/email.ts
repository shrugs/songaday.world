import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// TODO: implement email sending
export const sendEmail = async (email: string, code: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`code for ${email}: ${code}`);
  }

  const link = `https://songaday.world/auth/${code}`;

  await sendgrid.send({
    to: email,
    from: 'matt@bydot.app',
    subject: `Your Temporary Song a Day Login Code is "${code}"`,
    text: `Login

Copy and paste this magic link:

${link}

Or, copy and paste this temporary login code:

${code}

---

If you didn't try to login, you can safely ignore this email.
    `,
    html: `
    <h1>Login</h2>

    <a href="${link}" target="_blank">Click here to log in with this magic link ✨</a>

    <p>Or, copy and paste this temporary login code:</p>

    <pre style="padding:16px 24px;border:1px solid #eeeeee;background-color:#f4f4f4;border-radius:3px;font-family:monospace;margin-bottom:24px"><img style="display:none;width:0;height:0;color:transparent;background:transparent">${code}</pre>

    <div style="color:#aaaaaa;margin-top:12px"><img style="display:none;width:0;height:0;color:transparent;background:transparent">If you didn't try to login, you can safely ignore this email.</div>
    `,
  });
};
