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

            // Some scores can have multiple rows of staves per line. We need to know which
            // row our notes belong to so the right instrument can play them.
            // In the abc notation this is denoted by %%staves {1 2} in the header.
            let numStaves = 1;
            const staffEndPosns = [notation.length];
            let staffNums = [];
            const staves = notation.indexOf('%%staves');
            if (staves > -1) {
              // we do in fact have more than one staff per line, lets get a list of the nums
              const eol = notation.indexOf('\n', staves);
              staffNums = notation
                .slice(staves, eol)
                .match(/\d+/g)
                .map((n) => {
                  return parseInt(n, 10);
                });
              if (staffNums.length) {
                numStaves = Math.max(...staffNums);
              }
            }
            // So staffNums will be what was between the { } after %%staves in the header.
            // But we need the position of where the note data lies within the notation string for
            // each set of staves. These regions are prepended with V:1, V:2 etc
            if (numStaves > 1) {
              for (let i = staffNums.length - 1; i > 0; i--) {
                const pos = notation.indexOf(`V:${i + 1}`);
                staffEndPosns.unshift(pos);
              }
            }
            // Now we know where each region ends we can compare a note position with
            // those end points and deduce which staff it is a note for! Phew.

            // console.log('staves', staffEndPosns);

            // Event.midiPitches isn't working, so we need to work out pitch from ABC notation
            const allNotes = event.startCharArray
              .map((pos, index) => {
                const startChar = event.startCharArray[index];
                const endChar = event.endCharArray[index];
                // work out what staff line this note is on
                let line = null;
                let lineCounter = 0;
                while (!line) {
                  if (staffEndPosns[lineCounter] < startChar) {
                    lineCounter += 1;
                  } else {
                    line = lineCounter + 1;
                  }
                }
                const chars = {
                  notes: notation.slice(startChar, endChar),
                  line,
                };
                // console.log(chars, line);
                return chars;
              })
              .map((char) => parseNotesToArray(char));
            console.log('object:', allNotes);

            const charNotes = allNotes[0].filter((char) => Boolean(char));
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

const noteNames = [
  'c',
  'd',
  'e',
  'f',
  'g',
  'a',
  'b',
  'C',
  'D',
  'E',
  'F',
  'G',
  'A',
  'B',
];

const parseNotesToArray = (data) => {
  const abcNote = data.notes;
  const { line } = data;
  let out = [];
  if (abcNote.includes('[')) {
    // we have a chord, split it into notes. This is really not easy because
    // note may be things like ^E3/2 or =C, or _f/ or e'/4 etc
    const noteArray = [];
    const noteModifiers = ['^', '_', '='];
    const noteIndicies = [];

    // we know notes will always have a name, so make a list of their locations in the string
    for (let i = 1; i < abcNote.length - 1; i++) {
      if (noteNames.includes(abcNote.charAt(i))) {
        noteIndicies.push(i);
      }
    }

    // now for each note
    for (let i = 0; i < noteIndicies.length; i++) {
      // look back to see if there is a pitch modifier before it, and start building notes
      if (noteModifiers.includes(abcNote.charAt(noteIndicies[i] - 1))) {
        noteArray[i] =
          abcNote.charAt(noteIndicies[i] - 1) + abcNote.charAt(noteIndicies[i]);
      } else {
        noteArray[i] = abcNote.charAt(noteIndicies[i]);
      }
      // then look forward to either the closing ] or the next note name or modifier

      let j = noteIndicies[i] + 1;
      while (
        abcNote.charAt(j) !== ']' &&
        !noteNames.includes(abcNote.charAt(j)) &&
        !noteModifiers.includes(abcNote.charAt(j))
      ) {
        noteArray[i] += abcNote.charAt(j);
        j += 1;
      }
    }
    out = noteArray.map((note) => {
      return parseAbcNote(note, line);
    });
  } else {
    out = [parseAbcNote(abcNote, line)];
  }
  return out;
};

const getModifier = (note) => {
  let modifier = ''; // none
  if (note.slice(0, 1) === '^') {
    modifier = '#'; // sharp
  } else if (note.slice(0, 1) === '_') {
    modifier = 'b'; // flat
  } else if (note.slice(0, 1) === '=') {
    modifier = ''; // '=' is 'natural' - is this the same as none??
    // Also ABC notation allows ^^ and __ ... XXXX TODO later
  }
  return modifier;
};

const getNoteName = (abcNote) => {
  let out = null;
  for (let i = 0; i < abcNote.length; i++) {
    if (noteNames.includes(abcNote.charAt(i))) {
      out = abcNote.charAt(i).toUpperCase();
    }
  }
  return out;
};

const getOctave = (note) => {
  // note may be things like ^E3/2 or =C, or _f/ or e'/4 etc
  // ^ + and _ before letter - determine shap/flat modifier
  // comma (,) or ' after letter for octave, then other crap after for note length
  // So uppercase + comma (,) is lowest octave
  // uppercase is octave 2, lowercase is octave 3
  // uppercase + ' is octave 4.
  const highNoteRE = /[cdefgab]/;
  let octave = 2;
  if (note.includes(',')) {
    octave = 1;
  } else if (note.includes("'")) {
    octave = 4;
  } else if (highNoteRE.test(note)) {
    octave = 3;
  }
  return octave;
};

const getDuration = (note) => {
  // this is wrong and needs work... TODO
  let duration;
  if (note.includes('/')) {
    duration = '8n';
  } else if (note.includes('2')) {
    duration = '2n';
  } else {
    duration = '4n';
  }
  return duration;
};

const parseAbcNote = (abcNote, line) => {
  // Return null for rests
  if (abcNote.includes('z')) {
    return null;
  }

  const octave = getOctave(abcNote);
  const modifier = getModifier(abcNote);
  const duration = getDuration(abcNote);
  const noteName = getNoteName(abcNote);

  return {
    name: `${noteName}${modifier}${octave}`,
    duration,
    octave,
    line,
  };
};

export default SheetMusic;
