import React from 'react';
import { Song, Track, Instrument } from 'reactronica';
// import SheetMusic from '@slnsw/react-sheet-music';
import { Range } from 'react-range';

import SheetMusic from '../SheetMusic';
import Select from '../Select/Select';
import CTAButton from '../CTAButton';
import Icon from '../Icon/Icon';
// import ShareBox from '../ShareBox';

import samples from '../VirtuosoApp/samples';
import { createWindowScroller } from '../../lib/window-scroller';
import { createWindowScrollTo } from '../../lib/window-scroll-to';
import { useDocumentVisibility } from '../../lib/hooks/use-document-visibility';

import css from './VirtuosoSheetMusic.module.scss';

const VirtuosoContent = ({ song: currentSong }) => {
  const notation = `${currentSong.header}K:${
    currentSong.key
  }\n${currentSong.lines.join('\n')}`;

  const scroller = React.useRef<{
    start: Function;
    stop: Function;
    updateIncrement: Function;
    destroy: Function;
  }>();

  // Experimenting... KH
  const isScrollingRef = React.useRef(false);
  const isAutoScrollRef = React.useRef(true);
  const currentBeatRef = React.useRef(0);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [
    wasStoppedByVisibilityChange,
    setWasStoppedByVisibilityChange,
  ] = React.useState(false);
  const [songPercentage, setSongPercentage] = React.useState(0);
  const [tempo, setTempo] = React.useState(currentSong.bpm);
  const [tempoFieldValue, setTempoFieldValue] = React.useState(currentSong.bpm);
  const [increment] = React.useState(0.5);
  const [isAutoScroll, setIsAutoScroll] = React.useState(true);

  // Set up an array of sample statuses
  const [samplesStatus, setSamplesStatus] = React.useState(
    currentSong.instruments.map(() => 'loading'),
  );

  const [showMoreControls, setShowMoreControls] = React.useState(false);
  // const [currentBeat, setCurrentBeat] = React.useState(0);
  const [totalBeatsInSong, setTotalBeatsInSong] = React.useState(100);

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
    setTempoFieldValue(currentSong.bpm);
  }, [currentSong]);

  React.useEffect(() => {
    if (scroller) {
      if (!scroller.current) {
        scroller.current = createWindowScroller({ increment });
      } else {
        scroller.current.updateIncrement(increment);
      }
    }

    return function cleanup() {
      scroller.current.destroy();
    };
  }, [increment]);

  React.useEffect(() => {
    if (isPlaying && isAutoScroll) {
      scroller.current.start();
    } else {
      scroller.current.stop();
    }
  }, [isPlaying, isAutoScroll]);

  const [allNotes, setAllNotes] = React.useState([]);

  // Check if all samples have been loaded
  const isSamplesLoaded = samplesStatus.every((status) => status === 'loaded');

  /*
   * handle page being off screen
   */
  useDocumentVisibility((e) => {
    const document = e.target as HTMLDocument;
    if (
      isPlaying &&
      (document.hidden || document.visibilityState === 'hidden')
    ) {
      setWasStoppedByVisibilityChange(true);
      setIsPlaying(false);
    }
  });

  const handleBeat = (beatNumber, totalBeats) => {
    if (beatNumber && beatNumber > 0) {
      // setCurrentBeat(beatNumber);
      currentBeatRef.current = beatNumber;
    }
    if (totalBeats && totalBeats > 0) {
      setTotalBeatsInSong(totalBeats);
    }
    // end of song reached
    if (beatNumber === totalBeats) {
      setIsPlaying(false);
      setIsAtStart(true);
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

      // Need to check isAutoScrollRef as isAutoScroll is stale and it is difficult to rebind handler
      if (isAutoScrollRef.current) {
        const bottomStaffNotes = event.elements[event.elements.length - 1];
        const bottomNote = bottomStaffNotes[bottomStaffNotes.length - 1];

        if (
          bottomNote &&
          isScrollingRef.current === false &&
          event.measureStart
        ) {
          const { y } = bottomNote.getBoundingClientRect();

          if (y < 0 || y > window.innerHeight) {
            isScrollingRef.current = true;
            scroller.current.stop();

            const scrollTo = createWindowScrollTo(() => {
              setTimeout(() => {
                isScrollingRef.current = false;
                scroller.current.start();
              }, 500);
            });

            // NOTE: 200 is best guess for now
            if (y > window.innerHeight) {
              scrollTo.start(window.pageYOffset + y - window.innerHeight + 200);
            } else {
              scrollTo.start(window.pageYOffset + y - 200);
            }
          }
        }
      }
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
    setTempoFieldValue(newTempo);
  };

  const handleTempoChangeDown = () => {
    const newTempo = tempo > 9 ? tempo - 1 : tempo;
    setTempo(newTempo);
    setTempoFieldValue(newTempo);
  };

  const handleTempoChange = (e) => {
    setTempoFieldValue(e.target.value);
  };

  const handleTempoExit = (event) => {
    let newTempo = Number.parseInt(tempoFieldValue, 10) || 1;
    if (newTempo > 500) {
      newTempo = 500;
    }
    if (newTempo < 1) {
      newTempo = 1;
    }
    setTempo(newTempo);
    setTempoFieldValue(newTempo);
    event.preventDefault();
  };

  const handleInstrumentChange = (option, i) => {
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
        {/* <CTAButton
          onClick={() => {
            const scrollTo = createWindowScrollTo({
              duration: 500,
            });
            scrollTo.start(500);
          }}
          theme="light"
        >
          Test scroll
        </CTAButton> */}
        <CTAButton
          onClick={() => setIsAtStart(true)}
          theme="light"
          disabled={!isSamplesLoaded || isAtStart}
        >
          <Icon name="play-skip-back" />
        </CTAButton>
        &nbsp;
        <CTAButton
          onClick={() => {
            if (isPlaying) {
              // We are stopping!
              // Make sure we know that we are not
              // stopping because of going out of focus:
              setWasStoppedByVisibilityChange(false);
            } else {
              // We have started. Make sure we note that.
              setIsAtStart(false);
            }
            if (wasStoppedByVisibilityChange && !isPlaying) {
              // We are starting again after going out of focus,
              // make sure song position is correct
              const percentage =
                Math.round(
                  (currentBeatRef.current / totalBeatsInSong) * 10000,
                ) / 100;
              console.log(percentage);
              setSongPercentage(percentage);
            }
            // Either way toggle play status
            setIsPlaying(!isPlaying);
          }}
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
        &nbsp;
        <CTAButton
          theme="light"
          onClick={() => {
            setIsAutoScroll(!isAutoScroll);
            isAutoScrollRef.current = !isAutoScrollRef.current;
          }}
          // disabled={isPlaying}
        >
          Auto scroll: {isAutoScroll ? 'on' : 'off'}
        </CTAButton>
        {/* <CTAButton>Play</CTAButton> */}
        <form onSubmit={handleTempoExit} className={css.tempoControls}>
          <label>Tempo:</label>
          <CTAButton
            theme="light"
            className={css['button--tempo']}
            onClick={handleTempoChangeDown}
            disabled={isPlaying}
          >
            <Icon name="remove" />
          </CTAButton>
          <input
            type="text"
            value={tempoFieldValue}
            className={css['tempoInput']}
            onChange={handleTempoChange}
            onBlur={handleTempoExit}
          />
          <CTAButton
            theme="light"
            className={css['button--tempo']}
            onClick={handleTempoChangeUp}
            disabled={isPlaying}
          >
            <Icon name="add" />
          </CTAButton>
        </form>
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
        isAtStart={isAtStart}
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
        songPercentage={songPercentage}
      />

      {/* <ShareBox title="test" pathname="/virtuoso" /> */}

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

export default VirtuosoContent;
