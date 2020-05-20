import React from 'react';
// import PropTypes from 'prop-types';

import css from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

type Methods = null;

// React.forwardRef added because of:
// Warning: Function components cannot be given refs. Attempts to access
// this ref will fail. Did you mean to use React.forwardRef()? Check the
// render method of `Link`.
// https://github.com/zeit/next.js/issues/7915
const Button = React.forwardRef<Methods, Props>(
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

// Button.propTypes = {
//   className: PropTypes.string,
// };

export default Button;
