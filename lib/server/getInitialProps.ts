import { NextPageContext } from 'next';
import Router from 'next/router';

export default (handler: (ctx: NextPageContext) => Promise<any>) => async (
  ctx: NextPageContext,
) => {
  try {
    return await handler(ctx);
  } catch (error) {
    if (ctx.res) {
      ctx.res.statusCode = 500;
      ctx.res.end();
    } else {
      Router.push('/error');
    }
  }
};
