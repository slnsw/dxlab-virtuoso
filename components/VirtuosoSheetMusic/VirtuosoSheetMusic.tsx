import React from 'react';
import { Song, Track, Instrument } from 'reactronica';
// import SheetMusic from '@slnsw/react-sheet-music';
// import { Range } from 'react-range';

import SheetMusic from '../SheetMusic';
import VirtuosoMusicControls from '../VirtuosoMusicControls';
// import Select from '../Select/Select';
// import CTAButton from '../CTAButton';
// import Icon from '../Icon/Icon';
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
  const [increment] = React.useState(0.5);
  const [isAutoScroll, setIsAutoScroll] = React.useState(true);

  // Set up an array of sample statuses
  const [samplesStatus, setSamplesStatus] = React.useState(
    currentSong.instruments.map(() => 'loading'),
  );

  // const [showMoreControls, setShowMoreControls] = React.useState(false);
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
    // setTempoFieldValue(currentSong.bpm);
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

  const handleInstrumentLoad = (instrumentIndex) =>
    setSamplesStatus((prevSamplesStatus) => {
      return prevSamplesStatus.map((status, i) => {
        if (i === instrumentIndex) {
          return 'loaded';
        }

        return status;
      });
    });

  const handlePlayClick = (newIsPlaying) => {
    if (newIsPlaying) {
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
        Math.round((currentBeatRef.current / totalBeatsInSong) * 10000) / 100;

      setSongPercentage(percentage);
    }

    // Toggle play status
    setIsPlaying(!isPlaying);
  };

  // const handleAutoScrollClick = () => {
  //   setIsAutoScroll(!isAutoScroll);
  //   isAutoScrollRef.current = !isAutoScrollRef.current;
  // };

  return (
    <div className={css.sheetMusicContent}>
      <VirtuosoMusicControls
        className={css.songControls}
        instruments={currentSong.instruments}
        samples={samples}
        instrumentTypes={instrumentTypes}
        tempo={tempo}
        instrumentVolumes={instrumentVolumes}
        isPlaying={isPlaying}
        isAtStart={isAtStart}
        isSamplesLoaded={isSamplesLoaded}
        isAutoScroll={isAutoScroll}
        onPlayClick={handlePlayClick}
        onTempoChange={setTempo}
        onSkipBackClick={() => setIsAtStart(true)}
        onAutoScrollClick={setIsAutoScroll}
        onInstrumentVolumeChange={setInstrumentVolumes}
        onInstrumentTypeChange={setInstrumentTypes}
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
        // onLineEnd={() => {
        //   // setVocalNotes([]);
        //   // setPianoNotes([]);
        // }}
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
                onLoad={() => handleInstrumentLoad(instrumentIndex)}
              />
            </Track>
          );
        })}
      </Song>
    </div>
  );
};

export default VirtuosoContent;
