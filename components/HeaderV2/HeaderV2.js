import React from 'react';
import PropTypes from 'prop-types';

import css from './HeaderV2.module.scss';

const HeaderV2 = ({ className }) => {
  return <div className={[css.headerV2, className || ''].join(' ')}></div>;
};

HeaderV2.propTypes = {
  className: PropTypes.string,
};

export default HeaderV2;
