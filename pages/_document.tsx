import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head></Head>
        {/* <Head>
          <link rel="stylesheet" href="/_next/style.css" />
        </Head> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
