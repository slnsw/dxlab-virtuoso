import React from 'react';
import PropTypes from 'prop-types';
import { Song, Track, Instrument } from 'reactronica';

import SheetMusic from '../SheetMusic';

import songs from './songs';

import './SheetMusicApp.css';

const AUDIO_BASE_URL =
  'https://dxlab-website.s3-ap-southeast-2.amazonaws.com/audio/vsco-2-ce';

const pianoSamples = {
  'C#3': `${AUDIO_BASE_URL}/Upright+Piano/Player_dyn2_rr1_020.mp3`,
  'D#3': `${AUDIO_BASE_URL}/Upright+Piano/Player_dyn2_rr1_022.mp3`,
  F3: `${AUDIO_BASE_URL}/Upright+Piano/Player_dyn2_rr1_024.mp3`,
  G3: `${AUDIO_BASE_URL}/Upright+Piano/Player_dyn2_rr1_026.mp3`,
  A3: `${AUDIO_BASE_URL}/Upright+Piano/Player_dyn2_rr1_028.mp3`,
  B3: `${AUDIO_BASE_URL}/Upright+Piano/Player_dyn2_rr1_030.mp3`,
  'C#4': `${AUDIO_BASE_URL}/Upright+Piano/Player_dyn2_rr1_032.mp3`,
};

const SheetMusicApp = ({ className }) => {
  const [songIndex] = React.useState(0);
  const song = songs[songIndex];

  const [isPlaying, setIsPlaying] = React.useState(false);

  const [isVocalLoaded, setIsVocalLoaded] = React.useState(false);
  const [isPianoLoaded, setIsPianoLoaded] = React.useState(false);

  const [vocalNotes, setVocalNotes] = React.useState([]);
  const [pianoNotes, setPianoNotes] = React.useState([]);

  const isSamplesLoaded = isVocalLoaded && isPianoLoaded;

  const handleEvent = (event) => {
    if (event && event.notes) {
      // console.log(event.notes);

      const newVocalNotes = event.notes.filter((note) => note.line === 1);
      const newPianoNotes = event.notes.filter((note) => note.line === 2);

      if (newVocalNotes.length > 0) {
        setVocalNotes(newVocalNotes);
      }

      if (newPianoNotes.length > 0) {
        setPianoNotes(newPianoNotes);
      }
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
          setVocalNotes([]);
          setPianoNotes([]);
        }}
      />

      {isSamplesLoaded && (
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
            notes={vocalNotes}
            samples={pianoSamples}
            onLoad={() => setIsVocalLoaded(true)}
          />
        </Track>

        <Track volume={0}>
          <Instrument
            type="sampler"
            notes={pianoNotes}
            samples={pianoSamples}
            onLoad={() => setIsPianoLoaded(true)}
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
