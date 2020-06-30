import React from 'react';
import PropTypes from 'prop-types';
// import Head from 'next/head';

import App from '../App';
// import Menu from '../Menu/Menu';
// import Link from '../Link';
// import Sidebar from '../Sidebar';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
import MenuIconButton from '../MenuIconButton';
// import CTAButton from '../CTAButton';
// import VirtuosoContent from './VirtuosoContent';
// import VirtuosoAbout from '../VirtuosoAbout';

import css from './VirtuosoApp.module.scss';
import VirtuosoLogo from './VirtuosoLogo';

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

  return (
    <App
      title="Virtuoso"
      className={[css.sheetMusicApp, className || ''].join(' ')}
    >
      <header className={css.header}>
        <DXLabLogo className={css.dxlabLogo} />

        <span className={css.headerDivider}></span>

        <VirtuosoLogo className={css.virtuosoLogo} />

        {/* <Menu
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
        /> */}

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
    </App>
  );
};

VirtuosoApp.propTypes = {
  className: PropTypes.string,
};

export default VirtuosoApp;
