import React from 'react';
import PropTypes from 'prop-types';

import css from './SLNSWLogo.module.scss';

const SLNSWLogo = ({ className, onClick }) => {
  return (
    <div className={[css.slnswLogo, className || ''].join(' ')}>
      <a
        href="http://sl.nsw.gov.au"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        <img src="/images/logo-slnsw-white.png" alt="State Library Logo." />
      </a>
    </div>
  );
};

SLNSWLogo.propTypes = {
  className: PropTypes.string,
};

export default SLNSWLogo;
