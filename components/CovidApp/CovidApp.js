import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import Link from '../Link';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
import Footer from '../Footer';

import css from './CovidApp.module.scss';

const CovidApp = ({ children, className }) => {
  return (
    <div className={[css.covidApp, className || ''].join(' ')}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className={css.header}>
        <DXLabLogo className={css.headerLogo} />
        <h1 className={css.headerTitle}>
          <Link href="/covid">
            <a>The Diary Files</a>
          </Link>
        </h1>
        <SLNSWLogo className={css.headerLogo} />
      </header>

      <main className={css.main}>{children}</main>

      <Footer />
    </div>
  );
};

CovidApp.propTypes = {
  className: PropTypes.string,
};

export default CovidApp;
