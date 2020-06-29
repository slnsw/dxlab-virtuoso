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
      {songs.map((song) => {
        return (
          <article>
            <Link href={`/sheet-music/song/${song.slug}`} key={song.slug}>
              <a>{song.title}</a>
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default SheetMusicHome;
