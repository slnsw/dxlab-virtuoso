import React from 'react';
import { Song, Track, Instrument } from 'reactronica';
import SheetMusic from '@slnsw/react-sheet-music';
import { Range } from 'react-range';

import Select from '../Select/Select';
import CTAButton from '../CTAButton';
import Icon from '../Icon/Icon';

import samples from './samples';

import css from './SheetMusicContent.module.scss';

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
    setInstrumentVolumes(
      currentSong.instruments.map((instrument) => instrument.volume),
    );
    setTempo(currentSong.bpm);
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

  const handleVolumeChange = (vol, i) => {
    setInstrumentVolumes(
      instrumentVolumes.map((v, index) => {
        return i === index // parseInt(event.target.name, 10)
          ? parseFloat(vol)
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
        console.log(samplesStatus);
        return instrumentIndex === i ? option.value : type;
      }),
    );
  };

  return (
    <div className={css.sheetMusicContent}>
      <div className={css.songControls}>
        <CTAButton
          onClick={() => setIsPlaying(!isPlaying)}
          // className={css['button--light']}
          theme="light"
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
        </CTAButton>

        {/* <CTAButton>Play</CTAButton> */}

        <div className={css.tempoControls}>
          <span>Tempo:</span>
          <CTAButton
            theme="light"
            className={css['button--tempo']}
            onClick={handleTempoChangeDown}
            disabled={isPlaying}
          >
            <Icon name="remove" />
          </CTAButton>
          <span>{tempo}</span>
          <CTAButton
            theme="light"
            className={css['button--tempo']}
            onClick={handleTempoChangeUp}
            disabled={isPlaying}
          >
            <Icon name="add" />
          </CTAButton>
        </div>

        <CTAButton
          onClick={() => setShowMoreControls(!showMoreControls)}
          theme="light"
          className={css['button--light']}
        >
          {showMoreControls ? 'Hide' : 'More'}
        </CTAButton>

        {showMoreControls && (
          <div className={css.instrumentControls}>
            {currentSong.instruments.map((instrument, i) => {
              const sampleOptions = Object.entries(samples).map(([key]) => {
                return {
                  label: key,
                  value: key,
                };
              });

              // console.log(instrumentVolumes[i]);

              return (
                <div className={css.instrumentControlGroup} key={i}>
                  <p>{instrument.name}</p>
                  <label htmlFor={`volume${i}`}>
                    volume {instrumentVolumes[i].toFixed(1)} <span>d</span>B
                  </label>
                  <Range
                    className={css.volumeSlider}
                    id={`volume${i}`}
                    key={i}
                    name={i}
                    min={-48}
                    max={3}
                    values={[instrumentVolumes[i]]}
                    step={0.5}
                    onChange={(vol) => handleVolumeChange(vol, i)}
                    // disabled={isPlaying}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '6px',
                          width: '100%',
                          backgroundColor: '#ccc',
                          marginTop: '1.2rem',
                          marginBottom: '1.6rem',
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '40px',
                          width: '16px',
                          backgroundColor: 'white',
                          border: '1px solid black',
                        }}
                      />
                    )}
                  />
                  {/* <span className={css['dB-level']}>
                    {instrumentVolumes[i]} dB
                  </span> */}

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
                    isDisabled={isPlaying} // why u no work?
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
