import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <style>{`
          .preload-transitions * {
            -webkit-transition: none !important;
            -moz-transition: none !important;
            -ms-transition: none !important;
            -o-transition: none !important;
            transition: none !important;
          }`}</style>
        </Head>

        <body className="preload-transitions">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
