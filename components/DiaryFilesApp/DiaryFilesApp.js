import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import Link from '../Link';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
import HeaderNavV2 from '../HeaderNavV2';
import MenuIconButton from '../MenuIconButton';
import Footer from '../Footer';

import css from './DiaryFilesApp.module.scss';

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
        <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
      </Head>

      <header className={css.header}>
        <DXLabLogo className={css.headerLogo} />
        <h1 className={css.headerTitle}>
          <Link href="/diary-files">
            <a>The Diary Files</a>
          </Link>
        </h1>

        <HeaderNavV2 isOpen={isMenuOpen} className={css.headerNav}>
          test
        </HeaderNavV2>

        <SLNSWLogo className={[css.headerLogo, css.slnswLogo].join(' ')} />

        <MenuIconButton
          isOpen={isMenuOpen}
          className={css.menuButton}
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
    </div>
  );
};

DiaryFilesApp.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesApp;
