import { useRouter } from 'next/router';
// import App from 'next/app'

import '../styles/base.css';
import '../styles/globals.css';

import './index.css';
import '../components/Masthead/Masthead.css';
import '../components/Header/Header.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return <Component router={router} {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
