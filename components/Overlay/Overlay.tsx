import React from 'react';
import PropTypes from 'prop-types';

import css from './Overlay.module.scss';

const Overlay = ({ isActive, className, onClick }) => {
  return (
    <div
      className={[
        css.overlay,
        isActive ? css.isActive : '',
        className || '',
      ].join(' ')}
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
      }}
    ></div>
  );
};

Overlay.propTypes = {
  isActive: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Overlay;
