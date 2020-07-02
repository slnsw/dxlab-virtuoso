import React from 'react';

import css from './VirtuosoAbout.module.scss';

const VirtuosoAbout = () => {
  return (
    <div className={css.sheetMusicAbout}>
      <h1>About</h1>

      <p>
        Welcome to VirtuOSO, the{' '}
        <a href="https://dxlab.sl.nsw.gov.au">DX Lab</a>’s experiment that plays
        transcribed sheet music from the Library’s collection.
      </p>
      <p>
        Did you know that the State Library of NSW has a large and significant
        collection of sheet music? Over 300 examples of rare 19th century
        Australian sheet music have been{' '}
        <a href="https://collection.sl.nsw.gov.au/search?search=digitised%20for%20the%20MusicAustralia%20project">
          digitised and are available
        </a>{' '}
        for you to download and play.
      </p>
      <p>
        Composers and music publishers of the day found that there was a ready
        market for patriotic songs and music about local suburbs and events. Who
        could resist titles like{' '}
        <a href="/virtuoso/song/the-glebe-rowing-club-polka">
          The Glebe Rowing Club Polka
        </a>
        ,{' '}
        <a href="/virtuoso/song/the-glebe-rowing-club-polka">
          The Sutherland Waltz
        </a>
        ,{' '}
        <a href="/virtuoso/song/overland-mail-galop">The Overland Mail Galop</a>{' '}
        or The Cricketers’ Quadrille?
      </p>
      <p>
        We have transcribed the sheet music using{' '}
        <a href="'https://en.wikipedia.org/wiki/ABC_notation">ABC Notation</a>{' '}
        to render the music in beautifully clear notation in your browser. Then,
        by writing some extra code, the note and timing information has been
        sent to our <a href="https://reactronica.com/">audio engine</a> so you
        can hear it played back while following along in the music.
      </p>
      <p>
        If you can play any of these scores, we would love to hear your version.
        Please share these in social media using this #DXLab #VirtuOSO.
      </p>
    </div>
  );
};

export default VirtuosoAbout;
