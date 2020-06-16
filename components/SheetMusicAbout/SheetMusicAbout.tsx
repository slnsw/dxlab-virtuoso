import React from 'react';

import css from './SheetMusicAbout.module.scss';

const SheetMusicAbout = () => {
  return (
    <div className={css.sheetMusicAbout}>
      <h1>About yo</h1>
      <p>
        The State Library of NSW holds a range of sheet music in it’s
        collection. BLAH BLAH BLAH.(will get this from Curators/Meredith)
      </p>
      <p>
        The DX Lab are bringing some of these digitised sheet music samples to
        life by transcribing them and allowing you to play them.
      </p>
      <p>Tiny bit about the technology. Different instruments etc.</p>
      <p>
        We will continue to add samples to this website as soon as we have
        transcribed them. If you want to look through our sheet music in the
        meantime, you can find examples here. (link to catalogue)
      </p>
      <p>
        If you are a musician and would like to play one of these pieces for us
        please record yourself and share it via social media using the hashtag
        #dxlab #virtuoso @statelibrarynsw. We would love to hear how you make
        the digitised sheet music come to life.
      </p>
    </div>
  );
};

export default SheetMusicAbout;
