import React from 'react';

import VirtuosoApp from '../components/VirtuosoApp/VirtuosoApp';
import VirtuosoHome from '../components/VirtuosoHome';
import VirtuosoSheetMusic from '../components/VirtuosoSheetMusic';
import VirtuosoAbout from '../components/VirtuosoAbout';

import VirtuosoHomeMasthead from '../components/VirtuosoMasthead';
import Four04 from './_error';

import songs from '../lib/songs';

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

const VirtuosoPage = ({ query, pathname }) => {
  const { slug } = query;
  const currentSong = songs.find((s) => s.slug === slug);
  const currentSongIndex = songs.findIndex((s) => s.slug === slug);
  let prevSong = null;
  let nextSong = null;

  if (currentSongIndex > 0) {
    prevSong = songs[currentSongIndex - 1].slug;
  }

  if (currentSongIndex < songs.length - 1) {
    nextSong = songs[currentSongIndex + 1].slug;
  }

  if (pathname === '/virtuoso/song/[slug]' && !currentSong) {
    return <Four04 />;
  }

  const title =
    pathname === '/virtuoso/song/[slug]'
      ? currentSong.title
      : config[pathname].title;
  const tempo = query.tempo || currentSong?.tempo;
  const instrumentVolumes =
    query.vol ||
    currentSong?.instruments.map((instrument) => instrument.volume);
  const instrumentTypes =
    query.type || currentSong?.instruments.map((instrument) => instrument.type);
  const songKey = query.key || currentSong?.key;

  const metaDescription =
    currentSong?.description ||
    "Listen to interactive sheet music from The State Library of NSW's Library's collection";
  const metaImageUrl =
    currentSong?.metaImageUrl || '/virtuoso/images/virtuoso-social.jpg';
  const metaImageWidth = currentSong?.metaImageWidth || 1200;
  const metaImageHeight = currentSong?.metaImageHeight || 638;

  return (
    <VirtuosoApp
      title={title}
      metaDescription={metaDescription}
      metaImageUrl={metaImageUrl}
      metaImageWidth={metaImageWidth}
      metaImageHeight={metaImageHeight}
    >
      {(pathname === '/virtuoso' || pathname === '/virtuoso/about') && (
        <VirtuosoHomeMasthead pathname={pathname} />
      )}

      {pathname === '/virtuoso' && <VirtuosoHome />}
      {pathname === '/virtuoso/about' && <VirtuosoAbout />}
      {pathname === '/virtuoso/song/[slug]' && (
        <VirtuosoSheetMusic
          song={currentSong}
          prevSong={prevSong}
          nextSong={nextSong}
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

/*
 * Without getInitialProps, query in router of component starts off as {} and then changes to { slug: 'blah' }. This is annoying.
 * Now query resolves straight to { slug: 'blah' }, immediately bypassing a 404 page check, which is a good thing.
 */
VirtuosoPage.getInitialProps = ({ query, pathname }) => {
  return {
    query,
    pathname,
  };
};

export default VirtuosoPage;
