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
      <div className={css.inside}>
        <div className={css.image1}>
          {/* <img
          src="https://files02.sl.nsw.gov.au/fotoweb/thumbnails/3600_0/9759/97597875.jpg"
          alt="77 Squad R.A.A.F., October 1952"
        /> */}
        </div>

        <div className={css.image2}>
          <img
            src="https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_300/9577/95773440.jpg"
            alt=""
          />
        </div>

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

        {/* <SheetMusic
        id="masthead2"
        notation={notation}
        responsive={true}
        // staffWidth={800}
        className={css.staff2}
      /> */}

        <p className={css.description}>
          Play sheet music
          <br />
          from the Library's
          <br />
          collection
        </p>

        <VirtuosoLogo className={css.virtuosoLogo} />

        <p className={css.oso}>
          <span>O</span>nline <span>s</span>heet <span>o</span>rchestra
        </p>

        <div className={[css.musicSymbol, css.musicSymbol1].join(' ')}>
          <p>♬</p>
        </div>

        <div className={[css.musicSymbol, css.musicSymbol2].join(' ')}>
          <p>♩</p>
        </div>

        <div className={[css.musicSymbol, css.musicSymbol3].join(' ')}>
          <p>♫</p>
        </div>

        <div className={[css.musicSymbol, css.musicSymbol4].join(' ')}>
          <p>♭</p>
        </div>
      </div>

      {/* <p>♩ ♪ ♫ ♭</p> */}
    </div>
  );
};

export default VirtuosoHomeMasthead;
