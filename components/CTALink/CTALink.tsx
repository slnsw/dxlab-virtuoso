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
  href,
  size = 'md',
  variant = 'primary',
  target,
  scroll,
  replace,
  className,
  children,
}) => {
  const newClassName = [
    css.ctaLink,
    className || '',
    size === 'sm' ? css.sm : '',
    variant === 'secondary' ? css.secondary : '',
  ].join(' ');

  if (href && href.match('^http')) {
    return (
      <a href={href} className={newClassName} target={target}>
        {children}
      </a>
    );
  }

  return (
    <Link as={href} scroll={scroll} replace={replace}>
      <a className={newClassName} target={target}>
        {children}
      </a>
    </Link>
  );
};

export default CTALink;
