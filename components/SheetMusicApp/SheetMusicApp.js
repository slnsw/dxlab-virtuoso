import React from 'react';
import PropTypes from 'prop-types';
import { Song, Track, Instrument } from 'reactronica';
import SheetMusic from '@slnsw/react-sheet-music';

// import SheetMusic from '../SheetMusic';

import songs from './songs';

import css from './SheetMusicApp.module.scss';

const AUDIO_BASE_URL = 'https://dxlab.sl.nsw.gov.au/files/audio/vsco-2-ce';

const pianoSamples = {
  A1: `${AUDIO_BASE_URL}/Keys/Upright+Piano/Player_dyn3_rr1_012.mp3`,
  'C#2': `${AUDIO_BASE_URL}/Keys/Upright+Piano/Player_dyn3_rr1_014.mp3`,
  F2: `${AUDIO_BASE_URL}/Keys/Upright+Piano/Player_dyn3_rr1_016.mp3`,
  A2: `${AUDIO_BASE_URL}/Keys/Upright+Piano/Player_dyn3_rr1_018.mp3`,
  'C#3': `${AUDIO_BASE_URL}/Keys/Upright+Piano/Player_dyn3_rr1_020.mp3`,
  F3: `${AUDIO_BASE_URL}/Keys/Upright+Piano/Player_dyn3_rr1_022.mp3`,
  A3: `${AUDIO_BASE_URL}/Keys/Upright+Piano/Player_dyn3_rr1_024.mp3`,
  'C#4': `${AUDIO_BASE_URL}/Keys/Upright+Piano/Player_dyn3_rr1_026.mp3`,
  F4: `${AUDIO_BASE_URL}/Keys/Upright+Piano/Player_dyn3_rr1_028.mp3`,
  A4: `${AUDIO_BASE_URL}/Keys/Upright+Piano/Player_dyn3_rr1_030.mp3`,
};

// const fluteSamples = {
//   A3: `${AUDIO_BASE_URL}/Woodwinds/Flute/expvib/LDFlute_expvib_A3_v1_1.mp3`,
//   C3: `${AUDIO_BASE_URL}/Woodwinds/Flute/expvib/LDFlute_expvib_C3_v1_1.mp3`,
//   E3: `${AUDIO_BASE_URL}/Woodwinds/Flute/expvib/LDFlute_expvib_E3_v1_1.mp3`,
//   A4: `${AUDIO_BASE_URL}/Woodwinds/Flute/expvib/LDFlute_expvib_A4_v1_1.mp3`,
//   C4: `${AUDIO_BASE_URL}/Woodwinds/Flute/expvib/LDFlute_expvib_C4_v1_1.mp3`,
//   E4: `${AUDIO_BASE_URL}/Woodwinds/Flute/expvib/LDFlute_expvib_E4_v1_1.mp3`,
//   A5: `${AUDIO_BASE_URL}/Woodwinds/Flute/expvib/LDFlute_expvib_A5_v1_1.mp3`,
//   C5: `${AUDIO_BASE_URL}/Woodwinds/Flute/expvib/LDFlute_expvib_C5_v1_1.mp3`,
//   E5: `${AUDIO_BASE_URL}/Woodwinds/Flute/expvib/LDFlute_expvib_E5_v1_1.mp3`,
// };

const clariSamples = {
  D2: `${AUDIO_BASE_URL}/Woodwinds/Clarinet/susLong/DCClar_susLong_D2_v3_rr1_sum.mp3`,
  F2: `${AUDIO_BASE_URL}/Woodwinds/Clarinet/susLong/DCClar_susLong_F2_v3_rr1_sum.mp3`,
  'A#2': `${AUDIO_BASE_URL}/Woodwinds/Clarinet/susLong/DCClar_susLong_A%232_v3_rr1_sum.mp3`,
  D3: `${AUDIO_BASE_URL}/Woodwinds/Clarinet/susLong/DCClar_susLong_D3_v3_rr1_sum.mp3`,
  F3: `${AUDIO_BASE_URL}/Woodwinds/Clarinet/susLong/DCClar_susLong_F3_v3_rr1_sum.mp3`,
  'A#3': `${AUDIO_BASE_URL}/Woodwinds/Clarinet/susLong/DCClar_susLong_A%233_v3_rr1_sum.mp3`,
  D4: `${AUDIO_BASE_URL}/Woodwinds/Clarinet/susLong/DCClar_susLong_D4_v3_rr1_sum.mp3`,
  F4: `${AUDIO_BASE_URL}/Woodwinds/Clarinet/susLong/DCClar_susLong_F4_v3_rr1_sum.mp3`,
  'A#4': `${AUDIO_BASE_URL}/Woodwinds/Clarinet/susLong/DCClar_susLong_A%234_v3_rr1_sum.mp3`,
};

const SheetMusicApp = ({ className }) => {
  const [songIndex] = React.useState(0);
  const song = songs[songIndex];

  const [isPlaying, setIsPlaying] = React.useState(false);

  const [isVocalLoaded, setIsVocalLoaded] = React.useState(false);
  const [isPianoLoaded, setIsPianoLoaded] = React.useState(false);

  const [notes, setNotes] = React.useState([]);

  const vocalNotes = notes.filter((note) => note.line === 0);
  const pianoNotes = notes.filter((note) => note.line === 1 || note.line === 2);

  // console.log(pianoNotes);

  // const [vocalNotes, setVocalNotes] = React.useState([]);
  // const [pianoNotes, setPianoNotes] = React.useState([]);

  const isSamplesLoaded = isVocalLoaded && isPianoLoaded;

  const handleBeat = (beatNumber, totalBeats) => {
    if (beatNumber === totalBeats) {
      setIsPlaying(false);
    }
  };

  const handleEvent = (event) => {
    if (event && event.notes) {
      setNotes(event.notes);
    }
  };

  return (
    <div className={[css['sheet-music-app'], className || ''].join(' ')}>
      <div className={css.page}>
        <header>
          <a href={song.url}>
            <img
              className={css.thumbnail}
              src={song.imageUrl}
              alt={song.title}
            />
          </a>

          <h1 className={css.title}>{song.title}</h1>
          <p className={css.creator}>{song.creator}</p>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={css['button--light']}
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
          className={css['sheet-music']}
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
            samples={clariSamples}
            options={{
              release: '2n',
            }}
            onLoad={() => setIsVocalLoaded(true)}
          />
        </Track>

        <Track volume={-6}>
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
