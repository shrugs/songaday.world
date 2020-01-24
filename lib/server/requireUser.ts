import { NextPageContext } from 'next';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { decodeToken } from '../../common/jwt';

// require user in getInitialProps and redirect if not available
export default function requireUser(ctx: NextPageContext) {
  const bail = () => {
    const url = `/login?${new URLSearchParams({ to: ctx.pathname })}`;
    if (ctx.res) {
      return ctx.res.writeHead(302, { Location: url }).end();
    } else {
      return Router.push(url);
    }
  };

  const { token } = parseCookies(ctx);
  if (!token) return bail();

  const { id } = decodeToken(token);
  if (!id) return bail();

  return;
}
