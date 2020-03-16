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
            const note = notation.slice(event.startChar, event.endChar);
            const type = note.includes('z') ? 'rest' : 'note';

            if (typeof onEvent === 'function') {
              onEvent({
                ...event,
                note: parseAbcNote(note),
              });
            }

            const notes = document.getElementsByClassName('abcjs-note');
            const rests = document.getElementsByClassName('abcjs-rest');

            // Remove all highlighted notes
            /* eslint-disable */
            for (let note of notes) {
              note.classList.remove('abcjs-note-playing');
            }

            for (let rest of rests) {
              rest.classList.remove('abcjs-rest-playing');
            }
            /* eslint-enable */

            // Highlight current playing notes
            event.elements.forEach((element, index) => {
              element[index].classList.add(`abcjs-${type}-playing`);
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
