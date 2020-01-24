import { NextPageContext } from 'next';
import Router from 'next/router';
import {
  isKnownError,
  isKnownErrorOfType,
  UnauthenticatedError,
} from '../../api/_utils/KnownErrors';

export default (handler: (ctx: NextPageContext) => Promise<any>) => async (
  ctx: NextPageContext,
) => {
  try {
    return await handler(ctx);
  } catch (error) {
    console.error('[getInitialProps/error]', error);
    const bail = (url: string) => {
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: url }).end();
      } else {
        Router.push(url);
      }
    };

    if (isKnownError(error) && isKnownErrorOfType(error, UnauthenticatedError)) {
      return bail(`/login?${new URLSearchParams({ to: ctx.pathname })}`);
    }

    const code = isKnownError(error) ? error.code : 'InternalServerError';
    const status = isKnownError(error) ? error.status.toString() : '500';
    return bail(`/error?${new URLSearchParams({ code, status })}`);
  }
};
