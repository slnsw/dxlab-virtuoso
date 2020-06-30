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
// import SheetMusicContent from './SheetMusicContent';
// import SheetMusicAbout from '../SheetMusicAbout';

import css from './SheetMusicApp.module.scss';
import VirtuosoLogo from './VirtuosoLogo';

const SheetMusicApp = ({ className, children }) => {
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
    <App className={[css.sheetMusicApp, className || ''].join(' ')}>
      {/* <Head>
        <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
      </Head> */}

      <header className={css.header}>
        <DXLabLogo className={css.dxlabLogo} />

        <span className={css.headerDivider}></span>

        <VirtuosoLogo className={css.virtuosoLogo} />

        {/* <p>♩ ♪ ♫ ♬ ♭</p> */}

        {/* <Menu
          className={css.menu}
          menuItemClassName={css.menuItem}
          menuItems={[
            {
              name: 'Home',
              url: '/sheet-music',
              isActive: false,
              ariaLabel: 'Home',
            },
            {
              name: 'About',
              url: '/sheet-music/about',
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

SheetMusicApp.propTypes = {
  className: PropTypes.string,
};

export default SheetMusicApp;
