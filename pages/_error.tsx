import React from 'react';
import Link from 'next/link';

function ErrorPage({ statusCode }: { statusCode: number }) {
  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center">
          <p className="mr-4 text-4xl text-black font-bold">Error {statusCode}</p>
          <Link href="/">
            <a className="text-base underline">👉 Home</a>
          </Link>
        </div>
        <p className="text-sm text-gray-600">¯\_(ツ)_/¯</p>
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
