import React from 'react';
import PropTypes from 'prop-types';
import { Song, Track, Instrument } from 'reactronica';
import SheetMusic from '@slnsw/react-sheet-music';

// import SheetMusic from '../SheetMusic';
// import Sidebar from '../Sidebar/Sidebar';

import songs from './songs';
import { pianoSamples, clariSamples } from './samples';

import css from './SheetMusicApp.module.scss';

const SheetMusicApp = ({ slug, className }) => {
  const currentSong = songs.find((s) => s.slug === slug);
  const notation = `${currentSong.header}K:${
    currentSong.key
  }\n${currentSong.lines.join('\n')}`;

  const [isPlaying, setIsPlaying] = React.useState(false);

  const [isVocalLoaded, setIsVocalLoaded] = React.useState(false);
  const [isPianoLoaded, setIsPianoLoaded] = React.useState(false);

  const [notes, setNotes] = React.useState([]);

  const vocalNotes = notes.filter((note) => note.line === 0);
  const pianoNotes = notes.filter((note) => note.line === 1 || note.line === 2);

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
      {/* <Sidebar>
        <ul>
          {songs.map((song) => (
            <li>{song.title}</li>
          ))}
        </ul>
      </Sidebar> */}
      <div className={css.page}>
        <header>
          <a href={currentSong.url}>
            <img
              className={css.thumbnail}
              src={currentSong.imageUrl}
              alt={currentSong.title}
            />
          </a>

          <h1 className={css.title}>{currentSong.title}</h1>
          <p className={css.creator}>{currentSong.creator}</p>

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
          bpm={currentSong.bpm}
          scale={1}
          notation={notation}
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

      <Song bpm={currentSong.bpm}>
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
