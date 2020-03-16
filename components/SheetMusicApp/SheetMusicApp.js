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
  const [notes, setNotes] = React.useState([]);

  const handleEvent = (event) => {
    // console.log(event);

    if (event && event.note && event.note !== 'z2') {
      const { name, duration } = parseAbcNote(event.note);

      // console.log(event, name, duration);

      setNotes([{ name, duration }]);
    }
  };

  return (
    <div className={['sheet-music-app', className || ''].join(' ')}>
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

      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Stop' : 'Play'}
      </button>

      <p>
        <a href={song.url}>{song.title}</a>
      </p>

      <Song bpm={song.bpm}>
        <Track volume={0}>
          <Instrument type="synth" notes={notes} />
        </Track>
      </Song>
    </div>
  );
};

SheetMusicApp.propTypes = {
  className: PropTypes.string,
};

const parseAbcNote = (abcNote) => {
  let octave = 3;
  let duration;
  const noteName = abcNote.slice(0, 1);

  // Higher octave for lower case notes
  if (['c', 'd', 'e', 'f', 'g', 'a', 'b'].includes(noteName)) {
    octave = 4;
  }

  if (abcNote.includes('/')) {
    duration = '8n';
  } else {
    duration = '4n';
  }

  return {
    name: `${noteName}${octave}`,
    duration,
    octave,
  };
};

export default SheetMusicApp;
