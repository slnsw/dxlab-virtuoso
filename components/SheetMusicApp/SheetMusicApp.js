import React from 'react';
import PropTypes from 'prop-types';

import SheetMusic from '../SheetMusic';
import songs from './songs';

import './SheetMusicApp.css';

const SheetMusicApp = ({ className }) => {
  return (
    <div className={['sheet-music-app', className || ''].join(' ')}>
      <SheetMusic
        // isPlaying={isPlaying}
        // bpm={bpm}
        scale={2}
        notation={songs[0].notation}
        // onEvent={handleEvent.current}
        // onLineEnd={() => {
        //   setNotes([]);
        // }}
      />
    </div>
  );
};

SheetMusicApp.propTypes = {
  className: PropTypes.string,
};

export default SheetMusicApp;
