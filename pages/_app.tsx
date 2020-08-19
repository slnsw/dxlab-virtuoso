import React from 'react';
import { useRouter } from 'next/router';

import '../styles/custom-properties.scss';
import '../styles/base.scss';
import '../styles/fonts.scss'; // Icons
import '../styles/loader.scss';

// Pages CSS
import './_error.scss';

// Components CSS
import '../components/App/App.scss';
import '../components/Footer/Footer.scss';
import '../components/Header/Header.scss';
import '../components/LoaderText/LoaderText.scss';
import '../components/Menu/Menu.scss';
import '../components/NoImage/NoImage.scss';
import '../components/WebsiteApp/WebsiteApp.scss';

// Sheet Music App
import '../components/SheetMusic/SheetMusic.scss';
// import '@slnsw/react-sheet-music/dist/SheetMusic.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  React.useEffect(() => {
    // Removes .preload-transitions class on body in _document.tsx
    // Otherwise some transitions will animate on load
    // http://joshfrankel.me/blog/prevent-css-transitions-on-page-load-with-es6/

    const node = document.querySelector('.preload-transitions');
    node.classList.remove('preload-transitions');
  }, []);

  return <Component router={router} {...pageProps} />;
}

export default MyApp;
