import React from 'react';

import Link from '../Link';

import css from './CTALink.module.scss';

type Props = {
  href: string;
  size?: 'sm' | 'md';
  variant?: 'primary' | 'secondary';
  target?: string;
  scroll?: boolean;
  replace?: boolean;
  className?: string;
};

const CTALink: React.FC<Props> = ({
  children,
  href,
  size = 'md',
  variant = 'primary',
  target,
  scroll,
  replace,
  className,
}) => {
  return (
    <Link as={href} scroll={scroll} replace={replace}>
      <a
        className={[
          css.ctaLink,
          size === 'sm' ? css.sm : '',
          variant === 'secondary' ? css.secondary : '',
          className || '',
        ].join(' ')}
        target={target}
      >
        {children}
      </a>
    </Link>
  );
};

export default CTALink;
