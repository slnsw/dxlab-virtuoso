import React from 'react';
import PropTypes from 'prop-types';
import { Song, Track, Instrument } from 'reactronica';
import SheetMusic from '@slnsw/react-sheet-music';

// import SheetMusic from '../SheetMusic';
import Sidebar from '../Sidebar/Sidebar';

import songs from './songs';
import samples from './samples';

import css from './SheetMusicApp.module.scss';
import Menu from '../Menu/Menu';

const SheetMusicApp = ({ slug, className }) => {
  const currentSong = songs.find((s) => s.slug === slug);
  const notation = `${currentSong.header}K:${
    currentSong.key
  }\n${currentSong.lines.join('\n')}`;

  const [isPlaying, setIsPlaying] = React.useState(false);

  // Set up an array of sample statuses
  const [samplesStatus, setSamplesStatus] = React.useState(
    currentSong.instruments.map(() => 'loading'),
  );
  // const [notes, setNotes] = React.useState([]);
  const [allNotes, setAllNotes] = React.useState([]);

  // Check if all samples have been loaded
  const isSamplesLoaded = samplesStatus.every((status) => status === 'loaded');

  const handleBeat = (beatNumber, totalBeats) => {
    if (beatNumber === totalBeats) {
      setIsPlaying(false);
    }
  };

  const handleEvent = (event) => {
    if (event && event.notes) {
      const allEventNotes = currentSong.instruments.map(
        (_, instrumentIndex) => {
          return event.notes.filter((note) => note.line === instrumentIndex);
        },
      );

      // setNotes(event.notes);
      setAllNotes(allEventNotes);
    }
  };

  return (
    <div className={[css['sheet-music-app'], className || ''].join(' ')}>
      <Sidebar className={css.sidebar}>
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
        {currentSong.instruments.map((instrument, instrumentIndex) => {
          // const instrumentNotes = notes.filter(
          //   (note) => note.line === instrumentIndex,
          // );

          return (
            <Track
              volume={instrument.volume}
              key={`${instrument.sampleType}${instrumentIndex}`}
            >
              <Instrument
                type="sampler"
                // notes={vocalNotes}
                // notes={instrumentNotes}
                notes={allNotes[instrumentIndex]}
                samples={samples[instrument.sampleType]}
                options={{
                  release: 1,
                }}
                // onLoad={() => setIsVocalLoaded(true)}
                onLoad={() =>
                  setSamplesStatus((prevSamplesStatus) => {
                    return prevSamplesStatus.map((status, i) => {
                      if (i === instrumentIndex) {
                        return 'loaded';
                      }

                      return status;
                    });
                  })
                }
              />
            </Track>
          );
        })}
      </Song>
    </div>
  );
};

SheetMusicApp.propTypes = {
  className: PropTypes.string,
};

export default SheetMusicApp;
