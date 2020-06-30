import React from 'react';

import Link from '../Link';

import css from './VirtuosoHomeMasthead.module.scss';

type Props = {
  className?: string;
};

const VirtuosoHomeMasthead: React.FC<Props> = ({ className }) => {
  return (
    <div className={[css.virtuosoHomeMasthead, className || ''].join(' ')}>
      <p className={css.aboutLink}>
        <Link href="/virtuoso/about">
          <a>About</a>
        </Link>
      </p>

      <div className={css.staff}></div>

      <div className={css.virtuosoLogo}>VIRTUOSO</div>

      <div className={css.oso}>Online sheet orchestra</div>

      <div className={[css.musicSymbol, css.musicSymbol1].join(' ')}>
        <p>♬</p>
      </div>

      <div className={[css.musicSymbol, css.musicSymbol2].join(' ')}>
        <p>♩</p>
      </div>

      <div className={[css.musicSymbol, css.musicSymbol3].join(' ')}>
        <p>♫</p>
      </div>

      {/* <p>♩ ♪ ♫ ♭</p> */}
    </div>
  );
};

export default VirtuosoHomeMasthead;
