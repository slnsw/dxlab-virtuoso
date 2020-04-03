import React from 'react';
import PropTypes from 'prop-types';

import App from '../App';
import Menu from '../Menu/Menu';
import Sidebar from '../Sidebar';
import DXLabLogo from '../DXLabLogo';
import MenuIconButton from '../MenuIconButton';
import SheetMusicContent from './SheetMusicContent';
// import SheetMusic from '../SheetMusic';

import songs from './songs';

import css from './SheetMusicApp.module.scss';
import Select from '../Select/Select';

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
      <header className={css.header}>
        <DXLabLogo className={css.dxlabLogo} />

        <span className={css.headerDivider}></span>

        <h1 className={css.virtuosoLogo}>
          Virtu<strong>OSO</strong>
          <svg width="2em" height="1.5em">
            <ellipse
              cx="0.15em"
              cy="0.9em"
              rx="0.2em"
              ry="0.3em"
              style={{ fill: 'var(--colour-primary)' }}
            />
            <ellipse
              cx="1.5em"
              cy="0.9em"
              rx="0.2em"
              ry="0.3em"
              style={{ fill: 'var(--colour-primary)' }}
            />
            <rect
              x="0.3em"
              width={1}
              height="0.9em"
              style={{ fill: 'var(--colour-primary)' }}
            />
            <rect
              x="1.7em"
              width={1}
              height="0.9em"
              style={{ fill: 'var(--colour-primary)' }}
            />
            <rect
              x="0.3em"
              width="1.4em"
              height={3}
              style={{ fill: 'var(--colour-primary)' }}
            />
          </svg>
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

          <Select
            options={[
              {
                value: 'test-1',
                label: 'Test 1',
              },
              {
                value: 'test-2',
                label: 'Test 2',
              },
            ]}
          />
        </Sidebar>
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
