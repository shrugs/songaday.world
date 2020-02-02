import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>

        <style jsx>{`
          body {
            width: 100%;
            min-height: 100vh;
          }
        `}</style>
      </Html>
    );
  }
}

export default MyDocument;
