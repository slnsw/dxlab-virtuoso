import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import css from './CTAButton.module.scss';

type Props = {
  theme?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: Function;
};

const CTAButton: React.FC<Props> = ({
  theme,
  className,
  children,
  ...restProps
}) => {
  return (
    <Button
      className={[
        css.ctaButton,
        theme === 'light' ? css.light : '',
        className || '',
      ].join(' ')}
      {...restProps}
    >
      {children}
    </Button>
  );
};

CTAButton.propTypes = {
  theme: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default CTAButton;