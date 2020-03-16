import React from 'react';
import PropTypes from 'prop-types';

import './SheetMusic.css';

const SheetMusic = ({
  isPlaying,
  notation,
  bpm,
  scale = 1,
  staffWidth = 800,
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
          staffwidth: staffWidth,
          responsive: 'resize',
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
            if (!event) {
              return null;
            }

            // Event.midiPitches isn't working, so we need to work out pitch from ABC notation
            const charNotes = event.startCharArray
              .map((_, index) => {
                const startChar = event.startCharArray[index];
                const endChar = event.endCharArray[index];
                const chars = notation.slice(startChar, endChar);

                return chars;
              })
              .map((char) => parseAbcNote(char))
              .filter((char) => Boolean(char));

            console.log(charNotes);

            if (typeof onEvent === 'function') {
              onEvent({
                ...event,
                notes: charNotes,
              });
            }

            const notes = document.getElementsByClassName('abcjs-note');
            const rests = document.getElementsByClassName('abcjs-rest');
            const lyrics = document.getElementsByClassName('abcjs-lyric');

            // Remove all highlighted notes
            /* eslint-disable */
            for (let note of notes) {
              note.classList.remove('abcjs-note-playing');
            }

            for (let rest of rests) {
              rest.classList.remove('abcjs-rest-playing');
            }

            for (let lyric of lyrics) {
              lyric.classList.remove('abcjs-lyric-playing');
            }
            /* eslint-enable */

            // console.log(event.elements);

            // Highlight current playing notes
            event.elements.forEach((nodes) => {
              nodes.forEach((node) => {
                const classes = node.className.baseVal;
                let type;

                if (classes.indexOf('abcjs-lyric') > -1) {
                  type = 'lyric';
                } else if (classes.indexOf('abcjs-rest') > -1) {
                  type = 'rest';
                } else if (classes.indexOf('abcjs-note') > -1) {
                  type = 'note';
                }

                node.classList.add(`abcjs-${type}-playing`);
              });
            });
          },
        });
      }
    }

    /* eslint-disable */
  }, [JSON.stringify(notation), staffWidth]);
  /* eslint-enable */

  React.useEffect(() => {
    if (isPlaying) {
      timer.current.start();
    } else {
      timer.current.stop();
    }
  }, [isPlaying]);

  return (
    <>
      <div id="paper" ref={paper} className={className || ''}></div>

      <style>
        {`
          #paper {
            // width: 1300px;
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

          #paper .abcjs-rest-playing {
            fill: #d10fc9;
          }

          #paper .abcjs-lyric-playing {
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

const parseAbcNote = (abcNote) => {
  // Return null for rests
  if (abcNote.includes('z')) {
    return null;
  }

  // Luke
  // Need to parse the array! Maybe call parseAbcNote recursively?
  if (abcNote.includes('[')) {
    // This is a chord.
    return null;
  }

  let octave = 3;
  let duration;
  const noteName = abcNote.slice(0, 1);

  // Higher octave for lower case notes
  if (['c', 'd', 'e', 'f', 'g', 'a', 'b'].includes(noteName)) {
    octave = 4;
  }

  if (abcNote.includes('/')) {
    duration = '8n';
  } else if (abcNote.includes('2')) {
    duration = '2n';
  } else {
    duration = '4n';
  }

  return {
    name: `${noteName}${octave}`,
    duration,
    octave,
  };
};

export default SheetMusic;
