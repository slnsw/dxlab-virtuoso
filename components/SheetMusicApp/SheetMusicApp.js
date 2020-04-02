import React from 'react';
import PropTypes from 'prop-types';
import { Song, Track, Instrument } from 'reactronica';
import SheetMusic from '@slnsw/react-sheet-music';

// import SheetMusic from '../SheetMusic';
import Sidebar from '../Sidebar';
import DXLabLogo from '../DXLabLogo';
import MenuIconButton from '../MenuIconButton';

import songs from './songs';
import samples from './samples';

import css from './SheetMusicApp.module.scss';
import Menu from '../Menu/Menu';

const SheetMusicApp = ({ slug, className }) => {
  const currentSong = songs.find((s) => s.slug === slug);
  const notation = `${currentSong.header}K:${
    currentSong.key
  }\n${currentSong.lines.join('\n')}`;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const [isPlaying, setIsPlaying] = React.useState(false);

  const [tempo, setTempo] = React.useState(currentSong.bpm);

  // Set up an array of sample statuses
  const [samplesStatus, setSamplesStatus] = React.useState(
    currentSong.instruments.map(() => 'loading'),
  );

  // Set up an array of instrument volumes
  const [instrumentVolume, setInstrumentVolume] = React.useState(
    currentSong.instruments.map((instrument) => instrument.volume),
  );

  // const [notes, setNotes] = React.useState([]);
  const [allNotes, setAllNotes] = React.useState([]);

  // Check if all samples have been loaded
  const isSamplesLoaded = samplesStatus.every((status) => status === 'loaded');

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

  const handleVolumeChange = (event) => {
    setInstrumentVolume(
      instrumentVolume.map((v, i) => {
        return i === parseInt(event.target.name, 10)
          ? parseFloat(event.target.value)
          : v;
      }),
    );
  };

  const handleTempoChangeUp = () => {
    const newTempo = tempo < 500 ? tempo + 1 : tempo;
    setTempo(newTempo);
  };

  const handleTempoChangeDown = () => {
    const newTempo = tempo > 9 ? tempo - 1 : tempo;
    setTempo(newTempo);
  };

  return (
    <div className={[css['sheet-music-app'], className || ''].join(' ')}>
      <header className={css.header}>
        <DXLabLogo />

        <span className={css.headerDivider}></span>

        <h1>
          Virtu<strong>OSO</strong>
        </h1>

        <MenuIconButton
          isOpen={isMobileMenuOpen}
          className={css.menuIconButton}
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
        />
      </header>

      <div className={css.content}>
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

          <div className={css['song-controls']}>
            <h1>Song Controls</h1>
            <button
              className={css['button--tempo']}
              onClick={handleTempoChangeDown}
            >
              -
            </button>
            <span>{tempo}</span>
            <button
              className={css['button--tempo']}
              onClick={handleTempoChangeUp}
            >
              +
            </button>
            {currentSong.instruments.map((instrument, i) => {
              return (
                <div key={i}>
                  <label htmlFor="volume">{instrument.name} volume</label>
                  <input
                    type="range"
                    id={`volume${i}`}
                    key={i}
                    name={i}
                    min="-96"
                    max="3"
                    value={instrumentVolume[i]}
                    step="0.5"
                    onChange={handleVolumeChange}
                  />
                  <span>{instrumentVolume[i]} dB</span>
                </div>
              );
            })}
          </div>
        </Sidebar>

        <div className={css.page}>
          <header className={css.pageHeader}>
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
              {!isSamplesLoaded ? (
                'Loading'
              ) : (
                <>{isPlaying ? 'Stop' : 'Play'}</>
              )}
            </button>
          </header>

          <SheetMusic
            isPlaying={isPlaying}
            bpm={tempo}
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
      </div>

      <Song bpm={tempo}>
        {currentSong.instruments.map((instrument, instrumentIndex) => {
          // const instrumentNotes = notes.filter(
          //   (note) => note.line === instrumentIndex,
          // );

          return (
            <Track
              volume={instrumentVolume[instrumentIndex]}
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
