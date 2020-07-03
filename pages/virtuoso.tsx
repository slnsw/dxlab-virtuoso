import React from 'react';

import VirtuosoApp from '../components/VirtuosoApp/VirtuosoApp';
import VirtuosoHome from '../components/VirtuosoHome';
import VirtuosoSheetMusic from '../components/VirtuosoSheetMusic';
import VirtuosoAbout from '../components/VirtuosoAbout';

import songs from '../components/VirtuosoApp/songs';
import VirtuosoHomeMasthead from '../components/VirtuosoMasthead';

const config = {
  '/virtuoso': {
    title: 'Home',
  },
  '/virtuoso/about': {
    title: 'About',
  },
  '/virtuoso/song/[slug]': {
    title: 'Song',
  },
};

const VirtuosoPage = ({ router }) => {
  const { pathname, query } = router;
  const slug = query.slug || 'national-song-our-sailor-prince';

  // console.log('pathname', pathname);

  let currentSong = songs.find((s) => s.slug === slug);
  // need to handle if slug doesn't exist - for now just go to first song
  if (!currentSong) {
    [currentSong] = songs;
  }

  const title =
    pathname === '/virtuoso/song/[slug]'
      ? currentSong.title
      : config[pathname].title;

  return (
    <VirtuosoApp
      title={title}
      // TODO: Add this when ready
      // metaImageUrl
    >
      {(pathname === '/virtuoso' || pathname === '/virtuoso/about') && (
        <VirtuosoHomeMasthead pathname={pathname} />
      )}

      {pathname === '/virtuoso' && <VirtuosoHome />}
      {pathname === '/virtuoso/about' && <VirtuosoAbout />}
      {pathname === '/virtuoso/song/[slug]' && currentSong && (
        <VirtuosoSheetMusic song={currentSong} />
      )}
    </VirtuosoApp>
  );
};

export default VirtuosoPage;
