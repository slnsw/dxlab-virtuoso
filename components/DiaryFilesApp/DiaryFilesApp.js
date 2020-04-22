import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import Link from '../Link';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
import MenuIconButton from '../MenuIconButton';
import Footer from '../Footer';

import css from './DiaryFilesApp.module.scss';
import HeaderNav from '../HeaderNav/HeaderNav';

const DiaryFilesApp = ({ children, className }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={[css.diaryFilesApp, className || ''].join(' ')}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className={css.header}>
        <DXLabLogo className={css.headerLogo} />
        <h1 className={css.headerTitle}>
          <Link href="/diary-files">
            <a>The Diary Files</a>
          </Link>
        </h1>
        <SLNSWLogo className={[css.headerLogo, css.slnswLogo].join(' ')} />

        <HeaderNav isOpen={isMenuOpen}></HeaderNav>

        <MenuIconButton
          isOpen={isMenuOpen}
          className={css.menuButton}
          aria-haspopup="true"
          aria-controls="primary-menu"
          aria-expanded={isMenuOpen}
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
    </div>
  );
};

DiaryFilesApp.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesApp;
