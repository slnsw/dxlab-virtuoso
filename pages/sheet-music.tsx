import React from 'react';

import SheetMusicApp from '../components/SheetMusicApp/SheetMusicApp';
import SheetMusicHome from '../components/SheetMusicHome';
import SheetMusicContent from '../components/SheetMusicApp/SheetMusicContent';
import SheetMusicAbout from '../components/SheetMusicAbout';

import songs from '../components/SheetMusicApp/songs';

const SheetMusicPage = ({ router }) => {
  const { pathname, query } = router;
  const slug = query.slug || 'national-song-our-sailor-prince';

  // console.log('pathname', pathname);

  let currentSong = songs.find((s) => s.slug === slug);
  // need to handle if slug doesn't exist - for now just go to first song
  if (!currentSong) {
    [currentSong] = songs;
  }

  return (
    <SheetMusicApp pathname={pathname}>
      {pathname === '/sheet-music' && <SheetMusicHome />}
      {pathname === '/sheet-music/about' && <SheetMusicAbout />}
      {pathname === '/sheet-music/song/[slug]' && currentSong && (
        <SheetMusicContent song={currentSong} />
      )}
    </SheetMusicApp>
  );
};

export default SheetMusicPage;
