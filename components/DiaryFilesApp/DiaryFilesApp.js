import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import App from '../App';
import Link from '../Link';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
import HeaderNavV2 from '../HeaderNavV2';
import MenuIconButton from '../MenuIconButton';
import Footer from '../Footer';

import { DiaryFilesContext } from '../../lib/contexts/diary-files-context';

import css from './DiaryFilesApp.module.scss';

const DiaryFilesApp = ({ title, children, className }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [hasVisitedHomePage, setHasVisitedHomePage] = React.useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <DiaryFilesContext.Provider
      value={{ hasVisitedHomePage, setHasVisitedHomePage }}
    >
      <App
        title={title}
        className={[css.diaryFilesApp, className || ''].join(' ')}
      >
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
            rel="stylesheet"
          />
          {/* <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script> */}
        </Head>

        <header className={css.header}>
          <DXLabLogo className={css.headerLogo} />

          <div className={css.headerDivider} />

          <h1 className={css.headerTitle}>
            <Link href="/diary-files">
              <a>The Diary Files</a>
            </Link>
          </h1>

          <HeaderNavV2 isOpen={isMenuOpen} className={css.headerNav}>
            <ul className={css.headerMenu}>
              <li>
                <div className={css.headerMenuDivider}></div>
                <Link as="/diary-files">
                  <a>Home</a>
                </Link>
                <div className={css.headerMenuDivider}></div>
              </li>
              <li>
                <Link as="/diary-files/write">
                  <a>Write</a>
                </Link>
                <div className={css.headerMenuDivider}></div>
              </li>
              <li>
                <Link as="/diary-files/about">
                  <a>About</a>
                </Link>
                <div className={css.headerMenuDivider}></div>
              </li>
            </ul>
          </HeaderNavV2>

          <SLNSWLogo className={[css.headerLogo, css.slnswLogo].join(' ')} />

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

        <main className={css.main}>{children}</main>

        <Footer />

        {/* Override body styles here if needed */}
        {/* <style>{`
        body {
          
        }
      `}</style> */}
      </App>
    </DiaryFilesContext.Provider>
  );
};

DiaryFilesApp.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesApp;
