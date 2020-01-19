import { NextPageContext } from 'next';
import Router from 'next/router';
import { isKnownError } from '../../api/_utils/KnownErrors';

export default (handler: (ctx: NextPageContext) => Promise<any>) => async (
  ctx: NextPageContext,
) => {
  try {
    return await handler(ctx);
  } catch (error) {
    console.error('[getInitialProps/error]', error);
    const code = isKnownError(error) ? error.code : 'InternalServerError';
    const status = isKnownError(error) ? error.status.toString() : '500';
    const url = `/error?${new URLSearchParams({ code, status })}`;

    console.log(code, status, url);
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: url }).end();
    } else {
      Router.push(url);
    }
  }
};
