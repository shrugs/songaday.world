import { NextPageContext } from 'next';
import Router from 'next/router';

export default (handler: (ctx: NextPageContext) => Promise<any>) => async (
  ctx: NextPageContext,
) => {
  try {
    return await handler(ctx);
  } catch (error) {
    // if (ctx.res) {
    //   ctx.res.writeHead(302, { Location: '/login' }).end();
    // } else {
    //   Router.push('/login');
    // }
  }
};
