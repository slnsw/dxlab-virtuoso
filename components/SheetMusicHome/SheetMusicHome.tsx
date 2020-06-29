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
      <section className={css.songList}>
        {songs.map((song) => {
          return (
            <article className={css.song} key={song.slug}>
              <Link href={`/sheet-music/song/${song.slug}`}>
                <a>
                  <img src={song.imageUrl} alt={song.title} />
                </a>
              </Link>

              <h1>
                <Link href={`/sheet-music/song/${song.slug}`}>
                  <a>{song.title}</a>
                </Link>
              </h1>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default SheetMusicHome;
