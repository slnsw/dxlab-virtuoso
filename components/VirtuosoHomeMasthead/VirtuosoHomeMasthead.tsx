import React from 'react';
import SheetMusic from '@slnsw/react-sheet-music';

import css from './VirtuosoHomeMasthead.module.scss';
import VirtuosoLogo from '../VirtuosoApp/VirtuosoLogo';

import songs from '../VirtuosoApp/songs';
import CTALink from '../CTALink';

type Props = {
  className?: string;
};

const VirtuosoHomeMasthead: React.FC<Props> = ({ className }) => {
  const currentSong = songs[0];
  const notation2 = `${currentSong.header}K:${
    currentSong.key
  }\n${currentSong.lines.join('\n')}`;

  console.log(notation2);
  const notation = `X:1
M:4/4
L:1/4
K:A
V:1
|A G/ B/ E F|E A/ c/ B G/F/|`;

  return (
    <div className={[css.virtuosoHomeMasthead, className || ''].join(' ')}>
      <p className={css.aboutLink}>
        <CTALink href="/virtuoso/about">About</CTALink>
      </p>

      <SheetMusic
        id="masthead"
        notation={notation}
        responsive={true}
        // staffWidth={800}
        className={css.staff}
      />

      <p className={css.description}>
        Play sheet music
        <br />
        from the Library's
        <br />
        collection
      </p>

      <VirtuosoLogo className={css.virtuosoLogo} />

      <div className={css.oso}>Online sheet orchestra</div>

      <div className={[css.musicSymbol, css.musicSymbol1].join(' ')}>
        <p>♬</p>
      </div>

      <div className={[css.musicSymbol, css.musicSymbol2].join(' ')}>
        <p>♩</p>
      </div>

      <div className={[css.musicSymbol, css.musicSymbol3].join(' ')}>
        <p>♫</p>
      </div>

      {/* <p>♩ ♪ ♫ ♭</p> */}
    </div>
  );
};

export default VirtuosoHomeMasthead;
