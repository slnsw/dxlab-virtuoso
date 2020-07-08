import React from 'react';

import { parseJSON, computeNoteAndOctaveFromMidiNoteNumber } from './utils';

// import './SheetMusic.css';

type Props = {
  id?: string;
  isPlaying?: boolean;
  /** In ABC notation format */
  notation?: string;
  bpm?: number;
  scale?: number;
  staffWidth?: number;
  responsive?: boolean;
  oneSvgPerLine?: boolean;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  className?: string;
  onClick?: Function;
  onBeat?: Function;
  onEvent?: Function;
  onLineEnd?: Function;
  returnFormat?: string;
};

export type Note = {
  name: string;
  duration: number;
  octave: number;
  line: number;
};

const SheetMusic: React.FunctionComponent<Props> = ({
  id = 'sheet-music',
  isPlaying,
  notation,
  bpm = 80,
  scale = 1,
  staffWidth = 800,
  responsive = 'resize',
  oneSvgPerLine = false,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  className,
  onClick,
  onBeat,
  onEvent,
  onLineEnd,
  // returnFormat = 'event',
}) => {
  console.log(paddingRight);
  const timer = React.useRef<{
    start: Function;
    stop: Function;
  }>();
  const abcjs = React.useRef<{
    renderAbc: Function;
    parseOnly: Function;
    TimingCallbacks: any;
  }>();
  const tune = React.useRef<{
    setTiming: Function;
  }>();
  const json = React.useRef<{}>();
  const noteList = React.useRef<{}>();

  // let noteList;
  // let json;

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      /* eslint-disable */
      abcjs.current = require('abcjs');
      /* eslint-enable */

      if (notation && abcjs?.current) {
        // Use abcjs' built in parser to turn the
        // text string into structured JSON:
        json.current = abcjs.current.parseOnly(notation);
        // now use our function to turn that into an array
        // of notes or chords using note names and durations
        // that things like Tone.js and Reactronica understand:
        noteList.current = parseJSON(json.current, { bpm });

        // Now render actual score:
        tune.current = abcjs.current.renderAbc(id, notation, {
          add_classes: true,
          scale,
          staffwidth: staffWidth,
          responsive,
          oneSvgPerLine,
          paddingtop: paddingTop,
          paddingright: paddingRight,
          paddingbottom: paddingBottom,
          paddingleft: paddingLeft,
          ...(typeof onClick === 'function'
            ? {
                clickListener: onClick,
              }
            : {}),
        });
      }
    }
    /* eslint-disable */
  }, [JSON.stringify(notation)]);
  /* eslint-enable */

  React.useEffect(() => {
    if (notation && abcjs?.current && tune?.current && json?.current) {
      timer.current = new abcjs.current.TimingCallbacks(tune.current[0], {
        qpm: bpm,
        beatSubdivisions: json.current[0].lines[0].staff[0].meter.value[0].num, // 4,
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
          console.log('event', event);
          if (typeof onEvent === 'function') {
            if (event === null) {
              onEvent(null);
            } else {
              // This is just here for testing - it outputs the midiNote data and our conversion
              if (event.midiPitches) {
                event.midiPitches.forEach((p) => {
                  if (p.pitch) {
                    const m = computeNoteAndOctaveFromMidiNoteNumber(p.pitch);
                    console.log(p.pitch, m);
                    console.log(p);
                  }
                });
              }

              // Event.midiPitches didn't use to be working, so we needed to work out pitch from ABC notation.
              // We use the event's array of start and end positions (positions in the notation string)
              // that point out which notes are being played at this point in time (ie event).
              // Each pair of these is formed into a unique key for our array of notes: noteList.
              const allNotes = event.startCharArray.map((_, index) => {
                const startChar = event.startCharArray[index];
                const endChar = event.endCharArray[index];
                if (noteList?.current) {
                  // console.log(noteList.current[`s${startChar}e${endChar}`]);
                  // console.log(event.midiPitches);
                  return noteList.current[`s${startChar}e${endChar}`];
                }
                // else {
                //   return null;
                // }
              });
              // now smoosh all the notes into one array and remove nulls (rests)
              const charNotes = []
                .concat(...allNotes)
                .filter((char) => Boolean(char));

              const newNotes = charNotes.map((nt) => {
                const m = computeNoteAndOctaveFromMidiNoteNumber(
                  nt['midiNoteNumber'],
                );
                // const name = `${m.note}${m.acc}${m.octave}`;
                // const duration =

                return { line: nt['line'], ...m };
              });

              if (typeof onEvent === 'function') {
                onEvent({
                  ...event,
                  notes: charNotes,
                  newNotes,
                });
              }
            }
          }
          if (!event) {
            return null;
          }

          const notes = document.getElementsByClassName('abcjs-note');
          const rests = document.getElementsByClassName('abcjs-rest');
          const lyrics = document.getElementsByClassName('abcjs-lyric');

          // Remove all highlighted notes
          for (let note of [].slice.call(notes)) {
            note.classList.remove('abcjs-note_playing');
          }

          // Remove all highlighted rests
          for (let rest of [].slice.call(rests)) {
            rest.classList.remove('abcjs-rest_playing');
          }

          // Remove all highlighted lyrics
          for (let lyric of [].slice.call(lyrics)) {
            lyric.classList.remove('abcjs-lyric_playing');
          }

          // Highlight current playing lyric/rest/note
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

              node.classList.add(`abcjs-${type}_playing`);
            });
          });
          return null;
        },
      });
    }
    // NOTE! changing bpm while song is playing causes ugly things to happen!
    // may want to add something to prevent changes if isPlaying...
    /* eslint-disable */
  }, [notation, bpm]);
  /* eslint-enable */

  React.useEffect(() => {
    if (timer && timer.current) {
      if (isPlaying) {
        timer.current.start();
      } else {
        timer.current.stop();
      }
    }
  }, [isPlaying]);

  if (!notation) {
    return null;
  }

  return <div id={id} className={['sheet-music', className || ''].join(' ')} />;
};

export default SheetMusic;
