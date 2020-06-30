import React from 'react';

import Link from '../Link';

import css from './SheetMusicHome.module.scss';

import songs from '../SheetMusicApp/songs';

type Props = {
  className?: string;
};

const SheetMusicHome: React.FC<Props> = ({ className }) => {
  return (
    <div className={[css.sheetMusicHome, className || ''].join(' ')}>
      <p>
        <Link href="/sheet-music/about">
          <a>About</a>
        </Link>
      </p>

      <section className={css.songList}>
        {songs.map((song) => {
          return (
            <article className={css.song} key={song.slug}>
              <div className={css.songImageWrapper}>
                <Link href={`/sheet-music/song/${song.slug}`}>
                  <a>
                    <img src={song.imageUrl} alt={song.title} />
                  </a>
                </Link>
              </div>

              <div className={css.songContent}>
                <h1>
                  <Link href={`/sheet-music/song/${song.slug}`}>
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

export default SheetMusicHome;
