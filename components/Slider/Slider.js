import React from 'react';
import PropTypes from 'prop-types';

import css from './Slider.module.scss';

const Slider = ({ className }) => {
  return <div className={[css.slider, className || ''].join(' ')}></div>;
};

Slider.propTypes = {
  className: PropTypes.string,
};

export default Slider;
