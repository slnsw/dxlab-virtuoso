import React from 'react';
import PropTypes from 'prop-types';

import css from './CovidApp.module.scss';

const CovidApp = ({ children, className }) => {
  return (
    <div className={[css.covidApp, className || ''].join(' ')}>
      <header>
        <h1>Storylogue</h1>
      </header>
      {children}
    </div>
  );
};

CovidApp.propTypes = {
  className: PropTypes.string,
};

export default CovidApp;
