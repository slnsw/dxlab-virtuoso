import React from 'react';
import PropTypes from 'prop-types';

// import SheetMusic from '../SheetMusic';
import Sidebar from '../Sidebar';
import DXLabLogo from '../DXLabLogo';
import MenuIconButton from '../MenuIconButton';
import SheetMusicContent from './SheetMusicContent';

import songs from './songs';

import css from './SheetMusicApp.module.scss';
import Menu from '../Menu/Menu';

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
    <div className={[css.sheetMusicApp, className || ''].join(' ')}>
      <header className={css.header}>
        <DXLabLogo className={css.dxlabLogo} />

        <span className={css.headerDivider}></span>

        <h1 className={css.virtuosoLogo}>
          Virtu<strong>OSO</strong>
        </h1>

        <p className={css.virtuosoLogoSub}>
          <strong>O</strong>nline <strong>S</strong>heet <strong>O</strong>
          rchestra
        </p>

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
                isActive: song.slug === currentSong.slug,
              };
            })}
          />
        </Sidebar>
      </header>

      <div className={css.content}>
        <SheetMusicContent song={currentSong} />
      </div>
    </div>
  );
};

SheetMusicApp.propTypes = {
  className: PropTypes.string,
};

export default SheetMusicApp;
