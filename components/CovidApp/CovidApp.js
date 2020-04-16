import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

// import HeaderV2 from '../HeaderV2';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';

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
        {/* <h1 className={css.headerTitle}>Storylogue</h1> */}
        <h1 className={css.headerTitle}>The P.S. Files</h1>
        <SLNSWLogo className={css.headerLogo} />
      </header>

      <main className={css.main}>{children}</main>
    </div>
  );
};

CovidApp.propTypes = {
  className: PropTypes.string,
};

export default CovidApp;
