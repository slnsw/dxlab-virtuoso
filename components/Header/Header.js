import { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from '../Menu';
// import Link from '../Link';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
import MenuIconButton from '../MenuIconButton/MenuIconButton';

// const menuItems = [
//   { name: 'Home', url: '/' },
//   { name: 'About', url: '/about' },
//   { name: 'Experiments', url: '/experiments' },
//   { name: 'Blog', url: '/blog' },
//   { name: 'Grants', url: '/grants' },
//   { name: 'Code', url: '/code' },
//   {
//     name: (
//       <span>
//         <span className="primary-menu__divider">/</span>{' '}
//         <span className="slnsw-icon-ZoomOL2" />
//       </span>
//     ),
//     url: '/search',
//     ariaLabel: 'search',
//   },
// ];

class Header extends Component {
  static propTypes = {
    menuItems: PropTypes.array,
    pathname: PropTypes.string,
  };

  constructor() {
    super();

    this.state = {
      isMenuOpen: false,
    };
  }

  handleMenuToggle = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  };

  render() {
    const { pathname = '', menuItems = [] } = this.props;

    return (
      <header className="header">
        <DXLabLogo className="logo logo--dxlab" />

        <nav
          className={`header__nav ${this.state.isMenuOpen ? 'is-active' : ''}`}
        >
          <Menu
            id="primary-menu"
            className="primary-menu"
            menuItemClassName="primary-menu__item"
            labelledby="primary-menu-button"
            menuItems={menuItems.map((item) => ({
              ...item,
              isActive:
                // Enable 'blog' to be highlighted on blog posts
                pathname.split('/')[1] === 'blog' && item.url === '/blog',
            }))}
            pathname={pathname}
            onMenuItemClick={this.handleMenuToggle}
          />
        </nav>

        <SLNSWLogo className="logo logo--slnsw" />

        <MenuIconButton
          isOpen={this.state.isMenuOpen}
          id="primary-menu-button"
          className="header__menu-button"
          aria-haspopup="true"
          aria-controls="primary-menu"
          aria-expanded={this.state.isMenuOpen}
          aria-label="primary menu"
          onClick={this.handleMenuToggle}
        />
      </header>
    );
  }
}

export default Header;
