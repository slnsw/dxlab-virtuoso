import React from 'react';

import Button from '../Button';

import css from './CTAButton.module.scss';

type Props = {
  size?: 'sm' | 'md';
  theme?: 'dark' | 'light';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: Function;
};

const CTAButton: React.FC<Props> = ({
  size = 'md',
  theme = 'dark',
  variant = 'primary',
  disabled,
  className,
  children,
  ...restProps
}) => {
  return (
    <Button
      className={[
        css.ctaButton,
        size === 'sm' ? css.sm : '',
        theme === 'light' ? css.light : '',
        variant === 'secondary' ? css.secondary : '',
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
