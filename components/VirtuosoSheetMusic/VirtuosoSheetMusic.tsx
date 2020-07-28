import React from 'react';
import { Song, Track, Instrument } from 'reactronica';
import { useRouter } from 'next/router';
// import queryString from 'query-string';
// import SheetMusic from '@slnsw/react-sheet-music';

import Link from '../Link';
import Icon from '../Icon';
import SheetMusic from '../SheetMusic';
import VirtuosoMusicControls from '../VirtuosoMusicControls';
import CTAButton from '../CTAButton';
import ShareBox from '../ShareBox';

import samples from '../VirtuosoApp/samples';
import { createWindowScroller } from '../../lib/window-scroller';
import windowScrollTo from '../../lib/window-scroll-to';
import { useDocumentVisibility } from '../../lib/hooks/use-document-visibility';

import css from './VirtuosoSheetMusic.module.scss';

const VirtuosoSheetMusic = ({
  song: currentSong,
  prevSong,
  nextSong,
  tempo,
  songKey,
  instrumentVolumes,
  instrumentTypes,
}) => {
  const router = useRouter();

  const notation = `${currentSong.header}K:${songKey}\n${currentSong.lines.join(
    '\n',
  )}`;

  const scroller = React.useRef<{
    start: Function;
    stop: Function;
    updateIncrement: Function;
    destroy: Function;
    status: Function;
  }>();

  // Flag to prevent multiple scrollTo's
  const isScrollingToRef = React.useRef(false);
  const currentBeatRef = React.useRef(0);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [
    wasStoppedByVisibilityChange,
    setWasStoppedByVisibilityChange,
  ] = React.useState(false);
  const [songPercentage, setSongPercentage] = React.useState(0);
  // const [tempo, setTempo] = React.useState(currentSong.bpm);
  const [increment] = React.useState(0.5);

  // isAutoScroll is stale in handleEvent and is difficult to rebind in ABC JS
  // isAutoScrollRef is mutable so its value is fresh. Need to keep
  // isAutoScrollRef and isAutoScroll in sync though
  const isAutoScrollRef = React.useRef(true);
  const [isAutoScroll, setIsAutoScroll] = React.useState(true);

  // Set up an array of sample statuses
  const [samplesStatus, setSamplesStatus] = React.useState(
    currentSong.instruments.map((_, i) => {
      // Synth is generated from browser, so no loading needed
      if (instrumentTypes[i] === 'synth') {
        return 'loaded';
      }

      return 'loading';
    }),
  );

  // const [currentBeat, setCurrentBeat] = React.useState(0);
  const [totalBeatsInSong, setTotalBeatsInSong] = React.useState(100);

  // Set up an array of instrument volumes and types
  // const [instrumentVolumes, setInstrumentVolumes] = React.useState(
  //   currentSong.instruments.map((instrument) => instrument.volume),
  // );
  // const [instrumentTypes, setInstrumentTypes] = React.useState(
  //   currentSong.instruments.map((instrument) => instrument.type),
  // );
  const [allNotes, setAllNotes] = React.useState([]);

  // React.useEffect(() => {
  //   setInstrumentTypes(
  //     currentSong.instruments.map((instrument) => instrument.type),
  //   );
  //   setInstrumentVolumes(
  //     currentSong.instruments.map((instrument) => instrument.volume),
  //   );
  //   setTempo(currentSong.bpm);
  // }, [currentSong]);

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

  React.useEffect(() => {
    if (isPlaying) {
      setIsAtStart(false);
    }
  }, [isPlaying]);

  const keySwap = (k) => {
    if (k === 'treble' || k === 'bass') {
      return k;
    }
    return k.indexOf('m') > -1 ? k.replace('m', '') : `${k}m`;
  };

  React.useEffect(() => {
    console.log('Key changed: ', songKey);
    const re = /\[K:(.+)\]/g;
    const newLines = currentSong.lines.map((l) => {
      return l.match(re);
    });
    // console.log(newLines);
  }, [songKey]);

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

    // End of song reached
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

      // Triggers notes to be played
      setAllNotes(allEventNotes);

      // Need to check isAutoScrollRef as isAutoScroll is stale and it is difficult to rebind handler
      if (isAutoScrollRef.current) {
        // if (scroller.current.status()) {
        // console.log(scroller.current.status());
        const bottomStaffNotes = event.elements[event.elements.length - 1];
        const bottomNote = bottomStaffNotes[bottomStaffNotes.length - 1];

        if (
          bottomNote &&
          isScrollingToRef.current === false &&
          event.measureStart
        ) {
          const { y } = bottomNote.getBoundingClientRect();

          if (y < 0 || y > window.innerHeight) {
            isScrollingToRef.current = true;
            scroller.current.stop();

            // NOTE: 200 is best guess for now
            if (y > window.innerHeight) {
              windowScrollTo.start(
                window.pageYOffset + y - window.innerHeight + 200,
                {
                  callback: () => {
                    setTimeout(() => {
                      isScrollingToRef.current = false;

                      if (isAutoScrollRef.current) {
                        scroller.current.start();
                      }
                    }, 500);
                  },
                },
              );
            } else {
              windowScrollTo.start(window.pageYOffset + y - 200, {
                callback: () => {
                  setTimeout(() => {
                    isScrollingToRef.current = false;

                    if (isAutoScrollRef.current) {
                      scroller.current.start();
                    }
                  }, 500);
                },
              });
            }
          }
        }
      }
    }
  };

  const handleInstrumentLoad = (instrumentIndex) => {
    setSamplesStatus((prevSamplesStatus) => {
      return prevSamplesStatus.map((status, i) => {
        if (i === instrumentIndex) {
          return 'loaded';
        }

        return status;
      });
    });
  };

  const handlePlayClick = (newIsPlaying) => {
    if (newIsPlaying) {
      // We are stopping!
      // Make sure we know that we are not
      // stopping because of going out of focus:
      setWasStoppedByVisibilityChange(false);

      // Luke, I've commented this out, let me know if that is okay
      // } else {
      //   // We have started. Make sure we note that.
      //   setIsAtStart(false);
    }

    if (wasStoppedByVisibilityChange && !isPlaying) {
      // We are starting again after going out of focus,
      // make sure song position is correct
      const percentage =
        Math.round((currentBeatRef.current / totalBeatsInSong) * 10000) / 100;

      setSongPercentage(percentage);
    }

    // Toggle play status
    setIsPlaying(!isPlaying);
  };

  const handleAutoScrollClick = () => {
    setIsAutoScroll((isAuto) => !isAuto);
    isAutoScrollRef.current = !isAutoScrollRef.current;
  };

  const handleTempoChange = (newTempo) => {
    const query = buildQuery(router.query, {
      tempo: newTempo,
    });

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      {
        pathname: router.asPath.split('?')[0],
        query,
      },
    );
  };

  const handleInstrumentVolumeChange = (newVolumes) => {
    const query = buildQuery(router.query, {
      vol: newVolumes,
    });

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      {
        pathname: router.asPath.split('?')[0],
        query,
      },
    );
  };

  const handleInstrumentTypeChange = (newTypes) => {
    const query = buildQuery(router.query, {
      type: newTypes,
    });

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      {
        pathname: router.asPath.split('?')[0],
        query,
      },
    );
  };

  const handleKeyClick = (key) => {
    const query = buildQuery(router.query, {
      key: key.indexOf('m') > 0 ? key.replace('m', '') : `${key}m`,
    });

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      {
        pathname: router.asPath.split('?')[0],
        query,
      },
    );
  };

  const buildQuery = (oldQuery, newQuery) => {
    const query = {
      ...(oldQuery.tempo
        ? {
            tempo: oldQuery.tempo,
          }
        : {}),
      ...(oldQuery.vol
        ? {
            vol: oldQuery.vol,
          }
        : {}),
      ...(oldQuery.type
        ? {
            type: oldQuery.type,
          }
        : {}),
      ...(oldQuery.key
        ? {
            key: oldQuery.key,
          }
        : {}),
      ...newQuery,
    };

    return query;
  };

  return (
    <div className={css.virtuosoSheetMusic}>
      <Link as="/virtuoso">
        <a className={css.backLink}>
          <Icon name="chevron-back" size="sm" />{' '}
          <span className={css.backLinkText}>Back</span>
        </a>
      </Link>

      <div className={css.sheetMusicContent}>
        <VirtuosoMusicControls
          className={css.songControls}
          instruments={currentSong.instruments}
          // samples={samples}
          tempo={tempo}
          songKey={songKey}
          instrumentTypes={instrumentTypes}
          instrumentVolumes={instrumentVolumes}
          isPlaying={isPlaying}
          isAtStart={isAtStart}
          isSamplesLoaded={isSamplesLoaded}
          isAutoScroll={isAutoScroll}
          onPlayClick={handlePlayClick}
          onTempoChange={handleTempoChange}
          onSkipBackClick={() => setIsAtStart(true)}
          onAutoScrollClick={handleAutoScrollClick}
          // onInstrumentVolumeChange={setInstrumentVolumes}
          onInstrumentVolumeChange={handleInstrumentVolumeChange}
          // onInstrumentTypeChange={setInstrumentTypes}
          onInstrumentTypeChange={handleInstrumentTypeChange}
          onKeyClick={handleKeyClick}
        />

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
          <CTAButton
            theme="light"
            disabled={!isSamplesLoaded}
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
          >
            {isSamplesLoaded ? (
              <>
                <Icon name={isPlaying ? 'stop' : 'play'} />{' '}
                {isPlaying ? 'Stop' : 'Play'}
              </>
            ) : (
              'Loading'
            )}
          </CTAButton>
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
          //   // This is undocumented
          //   console.log(element);
          //   // element.abselem.highlight('test', 'blue');
          // }}
          onBeat={handleBeat}
          onEvent={handleEvent}
          songPercentage={songPercentage}
        />

        <ShareBox
          title={currentSong.title}
          pathname={`/virtuoso/song/${currentSong.slug}`}
          theme="light"
        />

        <div className={css.prevNextLinks}>
          {prevSong && (
            <Link as={`/virtuoso/song/${prevSong}`}>
              <a className={css.prevLink}>
                <Icon name="chevron-back-dark" size="sm" />{' '}
                <span className={css.prevLinkText}>Previous song</span>
              </a>
            </Link>
          )}
          {nextSong && (
            <Link as={`/virtuoso/song/${nextSong}`}>
              <a className={css.nextLink}>
                <span className={css.nextLinkText}>Next song</span>{' '}
                <Icon name="chevron-forward-dark" size="sm" />
              </a>
            </Link>
          )}
        </div>

        {/* Reactronica Audio */}
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
                  type={instrumentType === 'synth' ? 'synth' : 'sampler'}
                  oscillator={{
                    type: 'triangle',
                  }}
                  // Need to pass key prop here to flush sample changes. Otherwise previous instrument sample buffers will overlap and may play
                  key={instrumentType}
                  // NOTE: Fixes weird buffer bug when switching samples
                  // Consider making Reactronica more robust
                  notes={isPlaying ? notes : []}
                  samples={samples[instrumentType]}
                  options={{
                    release: 1,
                  }}
                  onLoad={() => handleInstrumentLoad(instrumentIndex)}
                />
              </Track>
            );
          })}
        </Song>
      </div>
    </div>
  );
};

export default VirtuosoSheetMusic;
