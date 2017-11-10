import { Component } from 'react';

import Link from '../Link';
// import Menu from '../Menu';
import styles from './Header.css';

const menuItems = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Experiments', url: '/experiments' },
  { name: 'Blog', url: '/blog' },
  { name: 'Fellowships', url: '/fellowships' },
  { name: 'Code', url: '/code' },
];

class Header extends Component {

  constructor() {
    super();

    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  }

  render() {
    const {
      pathname,
    } = this.props;

    return (
      <header className="header">

        <div className="logo logo--dxlab">
          <img
            src="/static/images/logo-dxlab.png"
            alt="DX Lab Logo"
          />
        </div>

        <nav className={this.state.isMenuOpen ? 'is-active' : ''}>
          {/* <Menu
            id="primary-menu"
            className="primary-menu"
            labelledby="primary-menu-button"
            menuItems={menuItems}
            pathname={pathname}
          /> */}

          <ul
            id="primary-menu"
            className="primary-menu"
            role="menu"
            aria-labelledby="primary-menu-button"
          >
            {menuItems.map((item) => {
              return (
                <li role="menuitem">
                  <Link prefetch to={item.url} key={item.url}>
                    <a className={pathname === item.url && 'is-active'}>{item.name}</a>
                  </Link>
                </li>
              );
            })}

            <li role="menuitem">
              <Link prefetch to='search'>
                <a className={pathname === 'search' && 'is-active'}>
                  <span className="primary-menu__divider">/</span> <span className="slnsw-icon-ZoomOL2"></span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="logo logo--slnsw">
          <img
            // className="logo logo--slnsw"
            src="/static/images/logo-slnsw-white.png"
            alt="State Library Logo"
          />
        </div>

        <button
          id="primary-menu-button"
          className={`primary-menu-button ${this.state.isMenuOpen ? 'is-open' : ''}`}
          aria-haspopup="true"
          aria-controls="primary-menu"
          aria-expanded="false"
          onClick={this.toggleMenu}
        >
          <div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <style jsx>{styles}</style>

      </header>
    );
  }

}

export default Header;
