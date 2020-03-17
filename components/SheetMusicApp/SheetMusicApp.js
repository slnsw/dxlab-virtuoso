import React from 'react';
import PropTypes from 'prop-types';
import { Song, Track, Instrument } from 'reactronica';

import SheetMusic from '../SheetMusic';

import songs from './songs';

import './SheetMusicApp.css';

const SheetMusicApp = ({ className }) => {
  const [songIndex] = React.useState(0);
  const song = songs[songIndex];

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isSoundsLoaded, setIsSoundsLoaded] = React.useState(false);
  const [notes, setNotes] = React.useState([]);

  const handleEvent = (event) => {
    if (event && event.notes) {
      console.log(event.notes);
      setNotes(event.notes);
    }
  };

  return (
    <div className={['sheet-music-app', className || ''].join(' ')}>
      <p>
        <a href={song.url}>{song.title}</a>
      </p>

      <SheetMusic
        isPlaying={isPlaying}
        bpm={song.bpm}
        scale={1}
        notation={song.notation}
        // staffWidth={width}
        onEvent={handleEvent}
        onLineEnd={() => {
          setNotes([]);
        }}
      />

      {isSoundsLoaded && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="button"
          style={{
            fontSize: '2rem',
          }}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      )}

      <Song bpm={song.bpm}>
        <Track volume={0}>
          <Instrument
            type="sampler"
            notes={notes}
            samples={{
              'C#3': `https://reactronica.com/reactconfau2020/audio/piano/Player_dyn2_rr1_020_louder.wav`,
              'D#3': `https://reactronica.com/reactconfau2020/audio/piano/Player_dyn2_rr1_022_louder.wav`,
              F3: `https://reactronica.com/reactconfau2020/audio/piano/Player_dyn2_rr1_024_louder.wav`,
            }}
            onLoad={() => setIsSoundsLoaded(true)}
          />
        </Track>
      </Song>
    </div>
  );
};

SheetMusicApp.propTypes = {
  className: PropTypes.string,
};

export default SheetMusicApp;
