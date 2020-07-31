import React from 'react';

import VirtuosoLeafDivider from '../VirtuosoApp/VirtuosoLeafDivider';
import Link from '../Link';

import songs from '../VirtuosoApp/songs';

import css from './VirtuosoHome.module.scss';

type Props = {
  className?: string;
};

const VirtuosoHome: React.FC<Props> = ({ className }) => {
  return (
    <>
      <div className={[css.sheetMusicHome, className || ''].join(' ')}>
        <VirtuosoLeafDivider className={css.leafDivider} />
        <h2 className={css.heading}>Sheet music</h2>
        {/* <VirtuosoLeafDivider className={css.leafDivider} /> */}
        <section className={css.songList}>
          {songs.map((song) => {
            return (
              <article className={css.song} key={song.slug}>
                <div className={css.songImageWrapper}>
                  <Link as={`/virtuoso/song/${song.slug}`}>
                    <a>
                      <img src={song.imageUrl} alt={song.title} />
                    </a>
                  </Link>
                </div>

                <div className={css.songContent}>
                  <h1>
                    <Link as={`/virtuoso/song/${song.slug}`}>
                      <a>{song.title}</a>
                    </Link>
                  </h1>

                  <div className={css.songBase}>
                    <p className={css.songCreator}>{song.creator}</p>

                    <p className={css.songKey}>Key: {song.key}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </>
  );
};

const VirtuosoDivider = ({ className }) => {
  return (
    <svg width="100" height="12" className={className}>
      <path
        d="
        m 10,6
        a 3,2 0 0,0 0,5
        h 20 v -5 h 10 v -5 h 20 v 5 h 10 v 5 h 20
        a 3,2 0 0,0 0,-5
        "
        fill="transparent"
        stroke="var(--colour-white)"
        strokeWidth={1}
        // shapeRendering="optimizeSpeed"
      ></path>
    </svg>
  );
};

export default VirtuosoHome;
