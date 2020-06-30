import React from 'react';

import Link from '../Link';

import css from './VirtuosoHomeMasthead.module.scss';

type Props = {
  className?: string;
};

const VirtuosoHomeMasthead: React.FC<Props> = ({ className }) => {
  return (
    <div className={[css.virtuosoHomeMasthead, className || ''].join(' ')}>
      <p>
        <Link href="/virtuoso/about">
          <a>About</a>
        </Link>
      </p>
    </div>
  );
};

export default VirtuosoHomeMasthead;
