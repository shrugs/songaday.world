import React from 'react';
import _ErrorPage from './_error';
import { NextPageContext } from 'next';

function ErrorPage({ status }: { status: number }) {
  return <_ErrorPage statusCode={status} />;
}

ErrorPage.getInitialProps = async (ctx: NextPageContext) => {
  let status: number;
  try {
    status = parseInt(ctx.query.status as string) || 500;
  } catch {
    status = 500;
  }
  return { status, code: ctx.query.code };
};

export default ErrorPage;
