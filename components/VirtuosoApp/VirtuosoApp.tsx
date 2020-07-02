import React from 'react';
import PropTypes from 'prop-types';

import App from '../App';
import HeaderNavV2 from '../HeaderNavV2';
import Menu from '../Menu';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
import MenuIconButton from '../MenuIconButton';
import Footer from '../Footer';
import VirtuosoLogo from './VirtuosoLogo';

import { useLockBodyScroll } from '../../lib/hooks/use-lock-body-scroll';

import css from './VirtuosoApp.module.scss';

const VirtuosoApp = ({ className, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Override default body styles
  // React.useEffect(() => {
  //   document
  //     .getElementsByTagName('body')[0]
  //     .classList.add(css.sheetMusicAppBody);

  //   return () => {
  //     document
  //       .getElementsByTagName('body')[0]
  //       .classList.remove(css.sheetMusicAppBody);
  //   };
  // });

  useLockBodyScroll(isMobileMenuOpen);

  return (
    <App
      title="Virtuoso"
      className={[css.sheetMusicApp, className || ''].join(' ')}
    >
      <header className={css.header}>
        <DXLabLogo className={css.dxlabLogo} />

        <span className={css.headerDivider}></span>

        <VirtuosoLogo className={css.virtuosoLogo} />

        <HeaderNavV2 isOpen={isMobileMenuOpen}>
          <div className={css.headerNavInside}>
            <Menu
              className={css.menu}
              menuItemClassName={css.menuItem}
              menuItems={[
                {
                  name: 'Home',
                  url: '/virtuoso',
                  isActive: false,
                  ariaLabel: 'Home',
                },
                {
                  name: 'About',
                  url: '/virtuoso/about',
                  isActive: false,
                  ariaLabel: 'About',
                },
              ]}
            />
          </div>
        </HeaderNavV2>

        <MenuIconButton
          isOpen={isMobileMenuOpen}
          className={css.menuIconButton}
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        />

        <SLNSWLogo className={css.slnswLogo} />
      </header>

      <div className={css.content}>{children}</div>

      <Footer />
    </App>
  );
};

VirtuosoApp.propTypes = {
  className: PropTypes.string,
};

export default VirtuosoApp;
