import React from 'react';
import PropTypes from 'prop-types';

import './SheetMusic.css';

const SheetMusic = ({
  // isPlaying,
  notation,
  bpm,
  scale = 1,
  className,
  onBeat,
  onEvent,
  onLineEnd,
}) => {
  const paper = React.useRef();
  const abcjs = React.useRef();
  const timer = React.useRef();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      /* eslint-disable */
      abcjs.current = require('abcjs');
      /* eslint-enable */

      if (abcjs?.current) {
        const tune = abcjs.current.renderAbc('paper', notation, {
          add_classes: true,
          scale,
          staffwidth: 1200,
        });

        timer.current = new abcjs.current.TimingCallbacks(tune[0], {
          qpm: bpm,
          beatSubdivisions: 4,
          beatCallback: (beatNumber, totalBeats, totalTime) => {
            if (typeof onBeat === 'function') {
              onBeat(beatNumber, totalBeats, totalTime);
            }
          },
          lineEndCallback: (info) => {
            if (typeof onLineEnd === 'function') {
              onLineEnd(info);
            }
          },
          eventCallback: (event) => {
            if (typeof onEvent === 'function') {
              if (event === null) {
                onEvent(null);
              } else {
                // Event.midiPitches isn't working, so we need to work out pitch from ABC notation
                // const note = notation[event.startChar];
                const note = notation.slice(event.startChar, event.endChar);

                onEvent({
                  ...event,
                  note,
                });
              }
            }

            if (!event) {
              return null;
            }

            const notes = document.getElementsByClassName('abcjs-note');
            const rests = document.getElementsByClassName('abcjs-rest');

            notes.forEach((note) => {
              note.classList.remove('abcjs-note-playing');
            });

            rests.forEach((rest) => {
              rest.classList.remove('abcjs-note-playing');
            });

            event.elements.forEach((element) => {
              element[0].classList.add('abcjs-note-playing');
            });
          },
        });
      }
    }

    /* eslint-disable */
  }, [JSON.stringify(notation)]);
  /* eslint-enable */

  // React.useEffect(() => {
  //   if (isPlaying) {
  //     timer.current.start();
  //   } else {
  //     timer.current.stop();
  //   }
  // }, [isPlaying]);

  return (
    <>
      <div id="paper" ref={paper} className={className || ''}></div>

      <style>
        {`
          #paper {
            width: 1300px;
            margin: 0 auto 2rem auto;
            background-color: #DDD;
            border-radius: 8px;
          }

          #paper .abcjs-note, #paper .abcjs-rest {
            transition: 0.2s;
          }

          #paper .abcjs-note-playing {
            fill: #d10fc9;
          }
        `}
      </style>
    </>
  );
};

SheetMusic.propTypes = {
  className: PropTypes.string,
};

export default SheetMusic;
