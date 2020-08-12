import React from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';

import css from './DXLabLogo.module.scss';

const DXLabLogo = ({ href = '/', className }) => {
  return (
    <div className={[css.dxLabLogo, className || ''].join(' ')}>
      <Link href={href} prefetch={false}>
        <a>
          <img src="/images/logo-dxlab.png" alt="DX Lab Logo." />
        </a>
      </Link>
    </div>
  );
};

DXLabLogo.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
};

export default DXLabLogo;
