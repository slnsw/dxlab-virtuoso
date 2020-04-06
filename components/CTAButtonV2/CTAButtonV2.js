import React from 'react';
import PropTypes from 'prop-types';

import css from './CTAButtonV2.module.scss';

const CTAButtonV2 = ({ className }) => {
  return <div className={[css.ctaButtonV2, className || ''].join(' ')}></div>;
};

CTAButtonV2.propTypes = {
  className: PropTypes.string,
};

export default CTAButtonV2;
