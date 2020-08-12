import React from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';

import css from './DXLabLogo.module.scss';

const DXLabLogo = ({ href = '/', prefetch, className }) => {
  return (
    <div className={[css.dxLabLogo, className || ''].join(' ')}>
      {href.indexOf('http') === 0 ? (
        <a href={href}>
          <img src="/images/logo-dxlab.png" alt="DX Lab Logo." />
        </a>
      ) : (
        <Link href={href} prefetch={prefetch}>
          <a>
            <img src="/images/logo-dxlab.png" alt="DX Lab Logo." />
          </a>
        </Link>
      )}
    </div>
  );
};

DXLabLogo.propTypes = {
  href: PropTypes.string,
  prefetch: PropTypes.bool,
  className: PropTypes.string,
};

export default DXLabLogo;
