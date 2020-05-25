import React from 'react';
// import PropTypes from 'prop-types';

import HeaderNav from '../HeaderNav/HeaderNav';
import Menu from '../Menu';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
import MenuIconButton from '../MenuIconButton/MenuIconButton';
import { useLockBodyScroll } from '../../lib/hooks/use-lock-body-scroll';

type Props = {
  menuItems?: any[];
  pathname: string;
};

const Header: React.FC<Props> = ({ menuItems = [], pathname }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useLockBodyScroll(isMenuOpen);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <DXLabLogo className="logo logo--dxlab" />

      <HeaderNav isOpen={isMenuOpen}>
        <Menu
          id="primary-menu"
          className={['primary-menu', isMenuOpen ? 'is-active' : ''].join(' ')}
          menuItemClassName="primary-menu__item"
          labelledby="primary-menu-button"
          menuItems={menuItems.map((item) => ({
            ...item,
            isActive:
              // Enable 'blog' to be highlighted on blog posts
              pathname &&
              pathname.split('/')[1] === 'blog' &&
              item.url === '/blog',
          }))}
          pathname={pathname}
          onMenuItemClick={handleMenuToggle}
        />
      </HeaderNav>

      <SLNSWLogo className="logo logo--slnsw" />

      <MenuIconButton
        isOpen={isMenuOpen}
        id="primary-menu-button"
        className="header__menu-button"
        aria-controls="primary-menu"
        aria-label="primary menu"
        onClick={handleMenuToggle}
      />
    </header>
  );
};

export default Header;
