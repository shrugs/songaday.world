import React from 'react';
import AuthPage from '../../components/AuthPage';
import { NextPageContext } from 'next';

function AuthWithCode({ initialCode }: { initialCode: string }) {
  return <AuthPage initialCode={initialCode} />;
}

AuthWithCode.getInitialProps = async (ctx: NextPageContext) => {
  return { initialCode: ctx.query.code };
};

export default AuthWithCode;
