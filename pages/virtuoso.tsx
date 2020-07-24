import React from 'react';

import VirtuosoApp from '../components/VirtuosoApp/VirtuosoApp';
import VirtuosoHome from '../components/VirtuosoHome';
import VirtuosoSheetMusic from '../components/VirtuosoSheetMusic';
import VirtuosoAbout from '../components/VirtuosoAbout';

import songs from '../components/VirtuosoApp/songs';
import VirtuosoHomeMasthead from '../components/VirtuosoMasthead';
import Four04 from './_error';

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
  const currentSong = songs.find((s) => s.slug === slug);

  if (!currentSong) {
    return <Four04 />;
  }

  const title =
    pathname === '/virtuoso/song/[slug]'
      ? currentSong.title
      : config[pathname].title;
  const tempo = query.tempo || currentSong.tempo;
  const instrumentVolumes =
    query.vol || currentSong.instruments.map((instrument) => instrument.volume);
  const instrumentTypes =
    query.type || currentSong.instruments.map((instrument) => instrument.type);
  const songKey = query.key || currentSong.key;

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
      {pathname === '/virtuoso/song/[slug]' && (
        <VirtuosoSheetMusic
          song={currentSong}
          tempo={parseInt(tempo, 10)}
          instrumentVolumes={instrumentVolumes.map((volume) =>
            parseInt(volume, 10),
          )}
          instrumentTypes={instrumentTypes}
          songKey={songKey}
        />
      )}
    </VirtuosoApp>
  );
};

export default VirtuosoPage;
