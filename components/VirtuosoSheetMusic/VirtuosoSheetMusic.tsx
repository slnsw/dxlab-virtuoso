import React from 'react';
import { Song, Track, Instrument } from 'reactronica';
import { useRouter } from 'next/router';
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
import { songKeySwap } from './keySwap';

import css from './VirtuosoSheetMusic.module.scss';
import VirtuosoLeafDivider from '../VirtuosoApp/VirtuosoLeafDivider';

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

  const parsedLines =
    currentSong.key !== songKey
      ? songKeySwap(currentSong.lines)
      : currentSong.lines;

  const notation = `${currentSong.header}K:${songKey}\n${parsedLines.join(
    '\n',
  )}`;

  const scroller = React.useRef<{
    start: Function;
    stop: Function;
    updateIncrement: Function;
    destroy: Function;
    status: Function;
    getIncrement: Function;
  }>();

  // Flag to prevent multiple scrollTo's
  const isScrollingToRef = React.useRef(false);
  const currentBeatRef = React.useRef(0);
  const totalTimeRef = React.useRef(70000);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [
    wasStoppedByVisibilityChange,
    setWasStoppedByVisibilityChange,
  ] = React.useState(false);
  const [songPercentage, setSongPercentage] = React.useState(0);

  const originalIncrement = 0.5;
  const [increment] = React.useState(originalIncrement);

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

  const [totalBeatsInSong, setTotalBeatsInSong] = React.useState(100);
  const [allNotes, setAllNotes] = React.useState([]);

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
    if (scroller?.current) {
      scroller.current.destroy();
      scroller.current = createWindowScroller({ increment: originalIncrement });
    }

    return function cleanup() {
      scroller.current.destroy();
    };
  }, [currentSong]);

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
    } else {
      // Clear previously played notes, otherwise Reactronica will trigger again
      setAllNotes([]);
    }
  }, [isPlaying]);

  // Check if all samples have been loaded
  const isSamplesLoaded = samplesStatus.every((status) => status === 'loaded');

  /*
   * Handle page being off screen
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

  const handleBeat = (beatNumber, totalBeats, totalTime) => {
    if (beatNumber && beatNumber > 0) {
      currentBeatRef.current = beatNumber;
    }

    if (totalBeats && totalBeats > 0) {
      setTotalBeatsInSong(totalBeats);
    }

    if (totalTime && totalTime > 0) {
      totalTimeRef.current = totalTime;
    }

    // End of song reached
    if (beatNumber === totalBeats) {
      setIsPlaying(false);
      setIsAtStart(true);
    }
  };

  const handleEvent = (event) => {
    // console.log(event);
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
        const topStaffNotes = event.elements[0];
        // If an invisible rest (x in ABC notation) is used, in a
        // song the array of notes may be empty. Need to handle this.
        const bottomStaffNotes =
          event.elements[event.elements.length - 1].length > 0
            ? event.elements[event.elements.length - 1]
            : topStaffNotes; // use top staff if bottom staff note array is empty
        const bottomNote = bottomStaffNotes[bottomStaffNotes.length - 1];
        const topNote = topStaffNotes[0];
        const topOfTopNote = topNote ? topNote.getBoundingClientRect().y : null;
        const bottomOfTopNote = topNote
          ? topNote.getBoundingClientRect().y +
            topNote.getBoundingClientRect().height
          : null;
        const bottomOfBottomNote = bottomNote
          ? bottomNote.getBoundingClientRect().y +
            bottomNote.getBoundingClientRect().height
          : null;
        const topOfBottomNote = bottomNote
          ? bottomNote.getBoundingClientRect().y
          : null;

        const playheadTop =
          topOfTopNote || topOfBottomNote
            ? Math.min(topOfTopNote || 999999, topOfBottomNote || 9999999)
            : null;
        const playheadBottom =
          bottomOfTopNote || bottomOfBottomNote
            ? Math.max(
                bottomOfTopNote || -999999,
                bottomOfBottomNote || -999999,
              )
            : null;
        // console.log(playheadTop, playheadBottom);
        // if (playheadTop && playheadTop < 0) {
        //   console.log('off the top!');
        // }
        if (playheadTop && playheadTop < window.innerHeight * 0.2) {
          // console.log('close to top!');
          // playhead is getting dangerously close to the top of the
          // viewPort - slow down...
          const newIncrement = 0; // actually just stop
          scroller.current.updateIncrement(newIncrement);
        } else if (
          playheadBottom &&
          playheadBottom > window.innerHeight * 0.85
        ) {
          // console.log('close to bottom!');
          // playhead is getting dangerously close to the bottom
          // of our viewPort - speed up!
          const newIncrement =
            scroller.current.getIncrement() + originalIncrement;
          scroller.current.updateIncrement(newIncrement);
        } else {
          // Playhead is back in the middle - ease our way back to normal speed
          const currentIncrement = scroller.current.getIncrement();
          let newIncrement;
          if (currentIncrement > originalIncrement) {
            newIncrement = currentIncrement - originalIncrement;
            scroller.current.updateIncrement(newIncrement);
          } else if (currentIncrement < originalIncrement) {
            newIncrement = originalIncrement;
            scroller.current.updateIncrement(newIncrement);
          }
        }

        if (
          playheadTop &&
          playheadBottom &&
          isScrollingToRef.current === false &&
          event.measureStart
        ) {
          // const { y } = bottomNote.getBoundingClientRect();

          if (playheadTop < 60 || playheadBottom > window.innerHeight) {
            isScrollingToRef.current = true;
            scroller.current.stop();

            // NOTE: 200 is best guess for now
            if (playheadBottom > window.innerHeight) {
              windowScrollTo.start(
                window.pageYOffset + playheadBottom - window.innerHeight + 200,
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
              windowScrollTo.start(window.pageYOffset + playheadTop - 200, {
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

  const handleNoteClick = (element) => {
    // console.log(element);
    const percentage =
      Math.round(
        (element.currentTrackMilliseconds[0] / totalTimeRef.current) * 10000,
      ) / 100;
    // console.log(percentage);
    setSongPercentage(percentage);
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

  const handleInstrumentTypeChange = (newTypes, instrumentIndex) => {
    const newSamplesStatus = samplesStatus.map((status, i) => {
      // Synth is generated from browser, so no loading needed
      if (newTypes[i] === 'synth') {
        return 'loaded';
      }

      if (i === instrumentIndex) {
        return 'loading';
      }

      return status;
    });

    setSamplesStatus(newSamplesStatus);

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

  return (
    <div className={css.virtuosoSheetMusic}>
      <Link as="/virtuoso">
        <a className={css.backLink}>
          <Icon name="chevron-back" size="sm" />{' '}
          <span className={css.backLinkText}>Home</span>
        </a>
      </Link>

      <div className={css.sheetMusicContent}>
        <VirtuosoMusicControls
          className={css.songControls}
          instruments={currentSong.instruments}
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
          onInstrumentVolumeChange={handleInstrumentVolumeChange}
          onInstrumentTypeChange={handleInstrumentTypeChange}
          onKeyClick={handleKeyClick}
        />

        <header className={css.header}>
          <div className={css.images}>
            <a href={currentSong.files[0].url} className={css.imageHolder}>
              <img
                className={css.image}
                src={currentSong.imageUrl}
                alt={`${currentSong.title}, file 1`}
              />
            </a>

            <div className={css.thumbnails}>
              {currentSong.files
                .slice(1, currentSong.files.length)
                .map((file, index) => {
                  return (
                    <a
                      href={file.url}
                      className={css.thumbnailHolder}
                      key={file.imageUrl}
                    >
                      <img
                        className={css.thumbnail}
                        src={file.imageUrl}
                        alt={`${currentSong.title}, file ${index + 1}`}
                      />
                    </a>
                  );
                })}
            </div>
          </div>

          <CTAButton
            theme="light"
            disabled={!isSamplesLoaded}
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}
          >
            {isSamplesLoaded ? (
              <>
                <Icon name={isPlaying ? 'pause' : 'play'} />{' '}
                {isPlaying ? 'Pause' : 'Play'}
              </>
            ) : (
              <>
                <Icon name="reload" className={css.loadingIcon} /> {'Loading'}
              </>
            )}
          </CTAButton>

          <br />

          <h1 className={css.title}>{currentSong.title}</h1>
          <p className={css.creator}>{currentSong.creator}</p>
          <VirtuosoLeafDivider theme="light" />
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
          onClick={handleNoteClick}
          onBeat={handleBeat}
          onEvent={handleEvent}
          songPercentage={songPercentage}
        />

        <ShareBox
          title={currentSong.title}
          pathname={`/virtuoso/song/${currentSong.slug}`}
          text={currentSong.description}
          imageUrl={currentSong.imageUrl}
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
                    release: instrumentType === 'violin' ? 3 : 1,
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

export default VirtuosoSheetMusic;
