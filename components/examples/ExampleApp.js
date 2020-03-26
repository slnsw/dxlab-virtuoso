import Head from 'next/head';

export default ({ children }) => (
  <main>
    <Head>
      <title>Home | DX Lab - State Library of NSW</title>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Lekton:400,400i,700"
        rel="stylesheet"
      />
    </Head>

    {children}
  </main>
);
