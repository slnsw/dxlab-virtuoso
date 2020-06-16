import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import App from '../App';
import Menu from '../Menu/Menu';
import Link from '../Link';
import Sidebar from '../Sidebar';
import DXLabLogo from '../DXLabLogo';
import SLNSWLogo from '../SLNSWLogo';
import MenuIconButton from '../MenuIconButton';
// import CTAButton from '../CTAButton';
import SheetMusicContent from './SheetMusicContent';
import SheetMusicAbout from '../SheetMusicAbout';

import songs from './songs';

import css from './SheetMusicApp.module.scss';
import VirtuosoLogo from './VirtuosoLogo';

const SheetMusicApp = ({ slug, className }) => {
  let currentSong = songs.find((s) => s.slug === slug);
  // need to handle if slug doesn't exist - for now just go to first song
  if (!currentSong) {
    [currentSong] = songs;
  }

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

          <Menu
            menuItems={songs.map((song) => {
              return {
                name: song.title,
                url: `/sheet-music/song/${song.slug}`,
                isActive: slug !== 'about' && song.slug === currentSong.slug,
              };
            })}
          />
          <br />
          <Link to={'about'} key={'about'}>
            <a
              href="/sheet-music/about"
              // className={slug === 'about' ? 'is-active' : undefined}
              aria-label="about-page"
            >
              About
            </a>
          </Link>
        </Sidebar>

        <SLNSWLogo className={css.slnswLogo} />

        {/* <DXLabLogo className={css.dxlabLogo} /> */}
      </header>

      <div className={css.content}>
        {slug === 'about' ? (
          <SheetMusicAbout />
        ) : (
          <SheetMusicContent song={currentSong} />
        )}
      </div>
    </App>
  );
};

SheetMusicApp.propTypes = {
  className: PropTypes.string,
};

export default SheetMusicApp;
