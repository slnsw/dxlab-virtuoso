import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import App from '../App';
import Link from '../Link';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
import HeaderNavV2 from '../HeaderNavV2';
import MenuIconButton from '../MenuIconButton';
import Progress from '../Progress';
import Footer from '../Footer';

import { DiaryFilesProvider } from '../../lib/contexts/diary-files-context';
import { initGA } from '../../lib/analytics';
import config from '../../lib/config';
import { useLockBodyScroll } from '../../lib/scroll-lock';

import css from './DiaryFilesApp.module.scss';

const DiaryFilesApp = ({ title, children, className }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // const [isScrollLocked, setIsScrollLocked] = React.useState(false);

  const handleMenuToggle = () => {
    // if (isScrollLocked) {
    //   scrollLockDisable();
    //   setIsScrollLocked(false);
    // } else {
    //   scrollLockEnable();
    //   setIsScrollLocked(true);
    // }
    setIsMenuOpen(!isMenuOpen);
  };

  // function useLockBodyScroll() {
  //   React.useLayoutEffect(() => {
  //     // Get original body overflow
  //     const originalStyle = window.getComputedStyle(document.body).overflow;
  //     // Prevent scrolling on mount
  //     document.body.style.overflow = 'hidden';
  //     // Re-enable scrolling when component unmounts
  //     return () => (document.body.style.overflow = originalStyle);
  //   }, []); // Empty array ensures effect is only run on mount and unmount
  // }

  // TODO: Consider moving this into App
  React.useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
  }, []);

  useLockBodyScroll(isMenuOpen);

  return (
    <DiaryFilesProvider>
      <App
        title={title}
        metaImageUrl={`${config.baseUrl}/images/typewriter.gif`}
        metaImageWidth={1200}
        metaImageHeight={663}
        metaImageAlt="Vector line drawing of Remington portable typewriter belonging to Damien Parer, Paramount News"
        metaDescription="The Diary Files is an open platform for you to write a diary entry, on whatever subject you like."
        className={[css.diaryFilesApp, className || ''].join(' ')}
      >
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossOrigin=""
          />
        </Head>

        <header className={css.header}>
          <div className={css.libraryLogos}>
            <DXLabLogo className={[css.headerLogo, css.dxlabLogo].join(' ')} />

            <div className={css.headerDivider} />

            <SLNSWLogo
              className={[css.headerLogo, css.slnswLogoDesktop].join(' ')}
            />
          </div>

          <h1 className={css.headerTitle}>
            <Link href="/diary-files">
              <a>The Diary Files</a>
            </Link>
          </h1>

          <HeaderNavV2
            isOpen={isMenuOpen}
            className={css.headerNav}
            insideClassName={css.headerNavInside}
          >
            <div className={css.headerMenuWrapper}>
              <ul className={css.headerMenu}>
                <li>
                  <div className={css.headerMenuDivider}></div>
                  <Link as="/diary-files">
                    <a onClick={handleMenuToggle}>Home</a>
                  </Link>
                  <div className={css.headerMenuDivider}></div>
                </li>
                <li>
                  <Link as="/diary-files/write">
                    <a onClick={handleMenuToggle}>Write</a>
                  </Link>
                  <div className={css.headerMenuDivider}></div>
                </li>
                <li>
                  <Link as="/diary-files/about">
                    <a onClick={handleMenuToggle}>About</a>
                  </Link>
                  <div className={css.headerMenuDivider}></div>
                </li>
                <li>
                  <Link as="/diary-files/search">
                    <a onClick={handleMenuToggle}>Search</a>
                  </Link>
                  <div className={css.headerMenuDivider}></div>
                </li>
                <li>
                  <Link as="/diary-files/dashboard">
                    <a onClick={handleMenuToggle}>Dashboard</a>
                  </Link>
                  <div className={css.headerMenuDivider}></div>
                </li>
              </ul>

              <SLNSWLogo
                className={[css.slnswLogo].join(' ')}
                onClick={handleMenuToggle}
              />

              <div className={css.headerMenuDivider}></div>

              <div className={css.abcLogoWrapper}>
                <p>
                  Media
                  <br />
                  Partner
                </p>

                <a
                  href="https://www.abc.net.au/radio/sydney/"
                  onClick={handleMenuToggle}
                >
                  <img
                    src="/images/logo-abc-radio-sydney-white.png"
                    alt="ABC Radio Sydney Logo"
                    className={css.abcLogo}
                  />
                </a>
              </div>
            </div>
          </HeaderNavV2>

          <div className={css.abcLogoWrapperDesktop}>
            <p>
              Media
              <br />
              Partner
            </p>

            <a href="https://www.abc.net.au/radio/sydney/">
              <img
                src="/images/logo-abc-radio-sydney-white.png"
                alt="ABC Radio Sydney Logo"
                className={css.abcLogo}
              />
            </a>
          </div>

          <MenuIconButton
            isOpen={isMenuOpen}
            className={[
              css.menuButton,
              isMenuOpen ? css.menuButtonIsOpen : '',
            ].join(' ')}
            aria-controls="primary-menu"
            aria-label="primary menu"
            onClick={handleMenuToggle}
          />
        </header>

        <Progress />

        <main className={css.main}>{children}</main>

        <Footer />

        {/* Override body styles here if needed */}
        {/* <style>{`
        body {
          
        }
      `}</style> */}
      </App>
    </DiaryFilesProvider>
  );
};

DiaryFilesApp.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesApp;
