import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import css from './CTAButtonV2.module.scss';

const CTAButtonV2 = ({ theme, className, children, ...restProps }) => {
  return (
    <Button
      className={[
        css.ctaButtonV2,
        theme === 'light' ? css.light : '',
        className || '',
      ].join(' ')}
      {...restProps}
    >
      {children}
    </Button>
  );
};

CTAButtonV2.propTypes = {
  theme: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default CTAButtonV2;
