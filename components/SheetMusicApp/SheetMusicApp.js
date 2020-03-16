import React from 'react';
import PropTypes from 'prop-types';

import SheetMusic from '../SheetMusic';
import songs from './songs';

import './SheetMusicApp.css';

const SheetMusicApp = ({ className }) => {
  const [songIndex] = React.useState(0);
  const song = songs[songIndex];

  return (
    <div className={['sheet-music-app', className || ''].join(' ')}>
      <SheetMusic
        // isPlaying={isPlaying}
        // bpm={bpm}
        scale={2}
        notation={song.notation}
        // onEvent={handleEvent.current}
        // onLineEnd={() => {
        //   setNotes([]);
        // }}
      />

      <a href={song.url}>{song.title}</a>
    </div>
  );
};

SheetMusicApp.propTypes = {
  className: PropTypes.string,
};

export default SheetMusicApp;
