import React from 'react';
import { Song, Track, Instrument } from 'reactronica';
import SheetMusic from '@slnsw/react-sheet-music';

import Select from '../Select/Select';
import samples from './samples';

import css from './SheetMusicContent.module.scss';
import Icon from '../Icon/Icon';

const SheetMusicContent = ({ song: currentSong }) => {
  const notation = `${currentSong.header}K:${
    currentSong.key
  }\n${currentSong.lines.join('\n')}`;

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [tempo, setTempo] = React.useState(currentSong.bpm);

  // Set up an array of sample statuses
  const [samplesStatus, setSamplesStatus] = React.useState(
    currentSong.instruments.map(() => 'loading'),
  );

  // Set up an array of instrument volumes
  const [instrumentVolumes, setInstrumentVolumes] = React.useState(
    currentSong.instruments.map((instrument) => instrument.volume),
  );
  const [instrumentTypes, setInstrumentTypes] = React.useState(
    currentSong.instruments.map((instrument) => instrument.type),
  );

  React.useEffect(() => {
    setInstrumentTypes(
      currentSong.instruments.map((instrument) => instrument.type),
    );
  }, [currentSong]);

  const [showMoreControls, setShowMoreControls] = React.useState(false);

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
          return (
            event.notes
              // Filter out other instruments/lines
              .filter((note) => note.line === instrumentIndex)
              // Add a key to enable same note retriggers
              .map((note) => {
                return {
                  ...note,
                  key: Date.now(),
                };
              })
          );
        },
      );

      // setNotes(event.notes);
      setAllNotes(allEventNotes);
    }
  };

  const handleVolumeChange = (event) => {
    setInstrumentVolumes(
      instrumentVolumes.map((v, i) => {
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

  const handleInstrumentChange = (option, i) => {
    // console.log(option, i);
    setInstrumentTypes(
      instrumentTypes.map((type, instrumentIndex) => {
        return instrumentIndex === i ? option.value : type;
      }),
    );
  };

  return (
    <div className={css.sheetMusicContent}>
      <div className={css.songControls}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={css['button--light']}
          disabled={!isSamplesLoaded}
        >
          {!isSamplesLoaded ? (
            'Loading'
          ) : (
            <>
              {isPlaying ? (
                <>
                  <Icon name="stop" /> Stop
                </>
              ) : (
                <>
                  <Icon name="play" /> Play
                </>
              )}
            </>
          )}
        </button>

        <div className={css.tempoControls}>
          <span>Tempo:</span>
          <button
            className={css['button--tempo']}
            onClick={handleTempoChangeDown}
            // disabled={isPlaying}
          >
            -
          </button>
          <span>{tempo}</span>
          <button
            className={css['button--tempo']}
            onClick={handleTempoChangeUp}
            // disabled={isPlaying}
          >
            +
          </button>
        </div>

        <button
          onClick={() => setShowMoreControls(!showMoreControls)}
          className={css['button--light']}
        >
          {showMoreControls ? 'Hide' : 'More'}
        </button>

        {showMoreControls && (
          <div className={css.instrumentControls}>
            {currentSong.instruments.map((instrument, i) => {
              const sampleOptions = Object.entries(samples).map(([key]) => {
                return {
                  label: key,
                  value: key,
                };
              });

              return (
                <div className={css.instrumentControlGroup} key={i}>
                  <p>{instrument.name}</p>
                  <label htmlFor={`volume${i}`}>volume</label>
                  <input
                    type="range"
                    id={`volume${i}`}
                    key={i}
                    name={i}
                    min="-96"
                    max="3"
                    value={instrumentVolumes[i]}
                    step="0.5"
                    onChange={handleVolumeChange}
                    // disabled={isPlaying}
                  />
                  <span className={css['dB-level']}>
                    {instrumentVolumes[i]} dB
                  </span>

                  <label htmlFor={`instrument${i}`}>instrument</label>
                  <Select
                    variant="light"
                    value={{
                      value: instrumentTypes[i],
                      label: instrumentTypes[i],
                      // value: instrument.type,
                      // label: instrument.type,
                    }}
                    // menuIsOpen={true}
                    options={sampleOptions}
                    onChange={(option) => handleInstrumentChange(option, i)}
                  />

                  {/* {Object.entries(samples).map(([key]) => {
                    return (
                      <div key={`${i}${key}`}>
                        <input
                          type="radio"
                          id={`instrument${i}${key}`}
                          name={`instrument${i}`}
                          value={key}
                          checked={false}
                          onChange={handleInstrumentChange}
                        />
                        <label htmlFor={key}>{key}</label>
                      </div>
                    );
                  })} */}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <header className={css.header}>
        <a href={currentSong.url}>
          <img
            className={css.thumbnail}
            src={currentSong.imageUrl}
            alt={currentSong.title}
          />
        </a>

        <h1 className={css.title}>{currentSong.title}</h1>
        <p className={css.creator}>{currentSong.creator}</p>
      </header>

      <SheetMusic
        isPlaying={isPlaying}
        bpm={tempo}
        scale={1}
        notation={notation}
        // staffWidth={width}
        oneSvgPerLine={true}
        className={css.sheetMusic}
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

      <Song bpm={tempo}>
        {currentSong.instruments.map((instrument, instrumentIndex) => {
          const instrumentType = instrumentTypes[instrumentIndex];
          const notes = allNotes[instrumentIndex] || [];

          return (
            <Track
              volume={instrumentVolumes[instrumentIndex]}
              key={`${instrument.type}${instrumentIndex}`}
            >
              <Instrument
                type="sampler"
                // Need to pass key prop here to flush sample changes. Otherwise previous instrument sample buffers will overlap and may play
                key={instrumentType}
                notes={notes}
                samples={samples[instrumentType]}
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

export default SheetMusicContent;
