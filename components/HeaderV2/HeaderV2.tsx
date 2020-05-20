import React from 'react';
import PropTypes from 'prop-types';

import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
import MenuIconButton from '../MenuIconButton/MenuIconButton';

import css from './HeaderV2.module.scss';

const HeaderV2 = ({ isMenuOpen, children, className, onMenuClick }) => {
  const handleMenuClick = () => {
    if (typeof onMenuClick === 'function') {
      onMenuClick();
    }
  };

  return (
    <header className={[css.headerV2, className || ''].join(' ')}>
      <DXLabLogo className={[css.logo, css['logo--dxlab']].join(' ')} />

      <div className={[css.content].join(' ')}>{children}</div>

      <SLNSWLogo className={[css.logo, css['logo--slnsw']].join(' ')} />

      <MenuIconButton
        isOpen={isMenuOpen}
        id="primary-menu-button"
        className="header__menu-button"
        aria-haspopup="true"
        aria-controls="primary-menu"
        aria-expanded={isMenuOpen}
        aria-label="primary menu"
        onClick={handleMenuClick}
      />
    </header>
  );
};

HeaderV2.propTypes = {
  className: PropTypes.string,
};

export default HeaderV2;
