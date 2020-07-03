import React from 'react';
// import PropTypes from 'prop-types';

import Button from '../Button';

import css from './CTAButton.module.scss';

type Props = {
  theme?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: Function;
};

const CTAButton: React.FC<Props> = ({
  theme,
  disabled,
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
      disabled={disabled}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default CTAButton;
