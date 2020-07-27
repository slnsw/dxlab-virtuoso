import React from 'react';
import SheetMusic from '@slnsw/react-sheet-music';

import css from './VirtuosoMasthead.module.scss';
import VirtuosoLogo from '../VirtuosoApp/VirtuosoLogo';

// import songs from '../VirtuosoApp/songs';
import CTALink from '../CTALink';

type Props = {
  pathname?: string;
  className?: string;
};

const VirtuosoMasthead: React.FC<Props> = ({ pathname, className }) => {
  const notation = `X:1
M:4/4
L:1/4
K:A
V:1
|A G/ B/ E F|E A/ c/ B G/F/|`;

  return (
    <div className={[css.virtuosoMasthead, className || ''].join(' ')}>
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

        <div className={css.image3}></div>

        <p className={css.aboutLink}>
          {pathname === '/virtuoso' && (
            <CTALink href="/virtuoso/about">About</CTALink>
          )}

          {pathname === '/virtuoso/about' && (
            <CTALink href="/virtuoso">Home</CTALink>
          )}
        </p>

        <SheetMusic
          id="masthead"
          notation={notation}
          responsive={true}
          // staffWidth={500}
          // paddingTop={0}
          // paddingLeft={0}
          // paddingRight={0}
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
          Listen to sheet music
          <br />
          from the Library's
          <br />
          collection
        </p>

        <VirtuosoLogo fontWeight="bold" className={css.virtuosoLogo} />

        <p className={css.oso}>
          <span>O</span>nline <span>s</span>heet <span>o</span>rchestra
        </p>

        {/* <div className={[css.musicSymbol, css.musicSymbol1].join(' ')}>
          <p>♬</p>
        </div> */}

        <div className={[css.musicSymbol, css.musicSymbol2].join(' ')}>
          <p
            style={{
              marginLeft: '-0.2em',
            }}
          >
            ♩
          </p>
        </div>

        {/* <div className={[css.musicSymbol, css.musicSymbol3].join(' ')}>
          <p>♫</p>
        </div> */}

        {/* <div className={[css.musicSymbol, css.musicSymbol4].join(' ')}>
          <p>♭</p>
        </div> */}
      </div>

      {/* <p>♩ ♪ ♫ ♭</p> */}
    </div>
  );
};

export default VirtuosoMasthead;
