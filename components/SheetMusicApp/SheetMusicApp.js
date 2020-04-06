import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import App from '../App';
import Menu from '../Menu/Menu';
import Sidebar from '../Sidebar';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
import MenuIconButton from '../MenuIconButton';
// import CTAButton from '../CTAButton';
import CTAButtonV2 from '../CTAButtonV2';
import SheetMusicContent from './SheetMusicContent';
// import SheetMusic from '../SheetMusic';

import songs from './songs';

import css from './SheetMusicApp.module.scss';
import VirtuosoLogo from './VirtuosoLogo';

const SheetMusicApp = ({ slug, className }) => {
  const currentSong = songs.find((s) => s.slug === slug);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Override default body styles
  React.useEffect(() => {
    document
      .getElementsByTagName('body')[0]
      .classList.add(css.sheetMusicAppBody);

    return () => {
      document
        .getElementsByTagName('body')[0]
        .classList.remove(css.sheetMusicAppBody);
    };
  });

  return (
    <App className={[css.sheetMusicApp, className || ''].join(' ')}>
      <Head>
        <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
      </Head>

      <header className={css.header}>
        <DXLabLogo className={css.dxlabLogo} />

        <span className={css.headerDivider}></span>

        <VirtuosoLogo />

        {/* <p>♩ ♪ ♫ ♬ ♭</p> */}

        <MenuIconButton
          isOpen={isMobileMenuOpen}
          className={css.menuIconButton}
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        />

        <Sidebar
          className={[
            css.sidebar,
            isMobileMenuOpen ? css.isMobileSidebarOpen : '',
          ].join(' ')}
        >
          <h1>Songs</h1>

          {/* <CTAButton href="/test">Test</CTAButton> */}
          <CTAButtonV2>Test</CTAButtonV2>

          <Menu
            menuItems={songs.map((song) => {
              return {
                name: song.title,
                url: `/sheet-music/song/${song.slug}`,
                isActive: song.slug === currentSong.slug,
              };
            })}
          />
        </Sidebar>

        <SLNSWLogo className={css.slnswLogo} />

        {/* <DXLabLogo className={css.dxlabLogo} /> */}
      </header>

      <div className={css.content}>
        <SheetMusicContent song={currentSong} />
      </div>
    </App>
  );
};

SheetMusicApp.propTypes = {
  className: PropTypes.string,
};

export default SheetMusicApp;
