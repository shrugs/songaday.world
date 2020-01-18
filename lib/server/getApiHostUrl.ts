import { NextPageContext } from 'next';

export default function getApiHostUrl(ctx: NextPageContext): string {
  if (!ctx || !ctx.req) {
    return '';
  }

  const host = ctx.req.headers['x-forwarded-host'] as string;

  if (host.startsWith('localhost')) {
    return `http://${host}`;
  }

  return `https://${host}`;
}
