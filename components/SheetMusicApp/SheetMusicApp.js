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
  F3: `${AUDIO_BASE_URL}/Upright+Piano/Player_dyn2_rr1_022.mp3`,
  A3: `${AUDIO_BASE_URL}/Upright+Piano/Player_dyn2_rr1_024.mp3`,
  'C#4': `${AUDIO_BASE_URL}/Upright+Piano/Player_dyn2_rr1_026.mp3`,
  F4: `${AUDIO_BASE_URL}/Upright+Piano/Player_dyn2_rr1_028.mp3`,
  G4: `${AUDIO_BASE_URL}/Upright+Piano/Player_dyn2_rr1_030.mp3`,
};

const SheetMusicApp = ({ className }) => {
  const [songIndex] = React.useState(0);
  const song = songs[songIndex];

  const [isPlaying, setIsPlaying] = React.useState(false);

  const [isVocalLoaded, setIsVocalLoaded] = React.useState(false);
  const [isPianoLoaded, setIsPianoLoaded] = React.useState(false);

  const [notes, setNotes] = React.useState([]);
  console.log(notes);

  const vocalNotes = notes.filter((note) => note.line === 0);
  const pianoNotes = notes.filter((note) => note.line === 1);

  // const [vocalNotes, setVocalNotes] = React.useState([]);
  // const [pianoNotes, setPianoNotes] = React.useState([]);

  const isSamplesLoaded = isVocalLoaded && isPianoLoaded;

  const handleBeat = (beatNumber, totalBeats) => {
    // console.log(beatNumber, totalBeats);

    if (beatNumber === totalBeats) {
      setIsPlaying(false);
    }
  };

  const handleEvent = (event) => {
    if (event && event.notes) {
      setNotes(event.notes);

      // const newVocalNotes = event.notes.filter((note) => note.line === 0);
      // const newPianoNotes = event.notes.filter((note) => note.line === 1);

      // if (newVocalNotes.length > 0) {
      //   setVocalNotes(newVocalNotes);
      // } else {
      //   setVocalNotes([]);
      // }

      // if (newPianoNotes.length > 0) {
      //   setPianoNotes(newPianoNotes);
      // } else {
      //   setPianoNotes([]);
      // }
    }
  };

  return (
    <div className={['sheet-music-app', className || ''].join(' ')}>
      <div className="sheet-music-app__page">
        <header>
          <a href={song.url}>
            <img
              className="sheet-music-app__thumbnail"
              src={song.imageUrl}
              alt={song.title}
            />
          </a>

          <h1 className={'sheet-music-app__title'}>{song.title}</h1>
          <p className="sheet-music-app__creator">{song.creator}</p>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="button--light"
            disabled={!isSamplesLoaded}
          >
            {!isSamplesLoaded ? 'Loading' : <>{isPlaying ? 'Stop' : 'Play'}</>}
          </button>
        </header>

        <SheetMusic
          isPlaying={isPlaying}
          bpm={song.bpm}
          scale={1}
          notation={song.notation}
          // staffWidth={width}
          oneSvgPerLine={true}
          className="sheet-music-app__sheet-music"
          // onClick={(element) => {
          // This is undocumented
          // console.log(element.abselem);
          // element.abselem.highlight('test', 'blue');
          // }}
          onBeat={handleBeat}
          onEvent={handleEvent}
          onLineEnd={() => {
            // setVocalNotes([]);
            // setPianoNotes([]);
          }}
        />
      </div>

      <Song bpm={song.bpm}>
        <Track volume={0}>
          <Instrument
            type="sampler"
            notes={vocalNotes}
            samples={pianoSamples}
            options={{
              release: '2n',
            }}
            onLoad={() => setIsVocalLoaded(true)}
          />
        </Track>

        <Track volume={0}>
          <Instrument
            type="sampler"
            notes={pianoNotes}
            samples={pianoSamples}
            onLoad={() => setIsPianoLoaded(true)}
            options={{
              release: '2n',
            }}
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
