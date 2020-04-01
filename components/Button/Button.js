import React from 'react';
import PropTypes from 'prop-types';

import css from './Button.module.scss';

// React.forwardRef added because of:
// Warning: Function components cannot be given refs. Attempts to access
// this ref will fail. Did you mean to use React.forwardRef()? Check the
// render method of `Link`.
// https://github.com/zeit/next.js/issues/7915
const Button = React.forwardRef(
  ({ children, className, ...restProps }, ref) => {
    return (
      <button
        className={[css.button, className || ''].join(' ')}
        {...restProps}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

Button.propTypes = {
  className: PropTypes.string,
};

export default Button;
