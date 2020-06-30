import React from 'react';

import VirtuosoHomeMasthead from '../VirtuosoHomeMasthead';
import Link from '../Link';

import songs from '../VirtuosoApp/songs';

import css from './VirtuosoHome.module.scss';

type Props = {
  className?: string;
};

const VirtuosoHome: React.FC<Props> = ({ className }) => {
  return (
    <div className={[css.sheetMusicHome, className || ''].join(' ')}>
      <VirtuosoHomeMasthead />

      <h2>Sheet music</h2>
      <section className={css.songList}>
        {songs.map((song) => {
          return (
            <article className={css.song} key={song.slug}>
              <div className={css.songImageWrapper}>
                <Link href={`/virtuoso/song/${song.slug}`}>
                  <a>
                    <img src={song.imageUrl} alt={song.title} />
                  </a>
                </Link>
              </div>

              <div className={css.songContent}>
                <h1>
                  <Link href={`/virtuoso/song/${song.slug}`}>
                    <a>{song.title}</a>
                  </Link>
                </h1>

                <div className={css.songBase}>
                  <p>{song.creator}</p>

                  <p>Key: {song.key}</p>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default VirtuosoHome;
