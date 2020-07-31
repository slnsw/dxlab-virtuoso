import React from 'react';
import SheetMusic from '@slnsw/react-sheet-music';

import css from './VirtuosoMasthead.module.scss';
import VirtuosoLogo from '../VirtuosoApp/VirtuosoLogo';

// import songs from '../VirtuosoApp/songs';
import CTALink from '../CTALink';
import VirtuosoVertDivider from '../VirtuosoApp/VirtuosoVertDivider';

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
        <VirtuosoLogoSVG />

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

        <VirtuosoVertDivider className={css.vertDivider} />

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

const VirtuosoLogoSVG = () => {
  return (
    <svg
      id="bd928903-6f89-4f08-91e7-fd78f1356af0"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 430.42 93.04"
    >
      <defs>
        <style>{`.0fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2{fill:#fff;}.dd5c426-6dd7-4e70-8ca5-e8eb10f0fd04{fill:#e2097e;}.ae5b3313-3ec5-4500-83c8-11d69d94930f{fill:#e6007e;}.f958760c-b948-4258-b902-fe85fc2d8da8{fill:none;stroke:#e6007e;stroke-miterlimit:10;}`}</style>
      </defs>
      <title>Virtuoso Large Logo 02</title>
      <path
        className="50fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2"
        d="M12.2,93.24.63,41H9.41l9.82,44.86H20.9L30.32,41h8.54L27.69,93.24Z"
        transform="translate(-0.63 -1)"
        fill="var(--colour-white)"
      />
      <path
        className="50fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2"
        d="M61.77,93.24V85.82H72.06V48.38H61.77V41H89.94v7.42H80.36V85.82h9.58v7.42Z"
        transform="translate(-0.63 -1)"
        fill="var(--colour-white)"
      />
      <path
        className="50fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2"
        d="M132,74.16c-2.87.16-4.47.24-4.79.24h-3.75V93.24h-8.3V41H131.6q8.7,0,13.17,3.87t4.47,12.89q0,10.38-8.94,14.61a163.11,163.11,0,0,1,9.26,20.91h-8.94A157,157,0,0,0,132,74.16ZM130,48.3h-6.54V66.74h6.62q10.69,0,10.7-9,0-5-2.56-7.22C136.52,49,133.78,48.3,130,48.3Z"
        transform="translate(-0.63 -1)"
        fill="var(--colour-white)"
      />
      <path
        className="50fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2"
        d="M170.63,48.46V41H205.9v7.5H192.42V93.24h-8.3V48.46Z"
        transform="translate(-0.63 -1)"
        fill="var(--colour-white)"
      />
      <path
        className="50fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2"
        d="M226.65,75.68V41H235V74.72q0,6.15,2,8.94c1.28,1.86,3.72,2.79,7.34,2.79s6.12-.9,7.5-2.71,2.08-4.82,2.08-9V41h8.38V75.68q0,9.33-4,13.81T244.21,94q-10.05,0-13.8-4.55T226.65,75.68Z"
        transform="translate(-0.63 -1)"
        fill="var(--colour-white)"
      />
      <path
        className="4dd5c426-6dd7-4e70-8ca5-e8eb10f0fd04"
        d="M300.8,94q-9.74,0-13.89-6.71t-4.15-20.55q0-13.85,4.27-20.23t13.89-6.39q9.61,0,13.69,6.31t4.07,20.47q0,14.16-4.07,20.63T300.8,94Z"
        transform="translate(-0.63 -1)"
        fill="var(--colour-primary)"
      />
      <path
        className="4dd5c426-6dd7-4e70-8ca5-e8eb10f0fd04"
        d="M340.3,54.93q0-14.76,17.72-14.77A43.51,43.51,0,0,1,372.23,43l-1.84,7.26q-8.13-2.55-12.81-2.59t-6.74,1.55c-1.38,1.07-2.08,2.93-2.08,5.59a5.72,5.72,0,0,0,2.32,4.59q2.31,1.88,7.82,3.31,8.39,2.23,11.49,5.75t3.11,10.45q0,15.09-18,15.09a57.85,57.85,0,0,1-15.09-2.56l1.68-7.58a17.26,17.26,0,0,0,2.47.72,51.86,51.86,0,0,0,12,2c2.84,0,5-.71,6.38-2.15A7.44,7.44,0,0,0,365,79a6.71,6.71,0,0,0-1.79-5c-1.2-1.17-3.39-2.2-6.58-3.11q-8.62-2.4-12.5-5.91T340.3,54.93Z"
        transform="translate(-0.63 -1)"
        fill="var(--colour-primary)"
      />
      <path
        className="4dd5c426-6dd7-4e70-8ca5-e8eb10f0fd04"
        d="M413.17,94q-9.74,0-13.89-6.71t-4.15-20.55q0-13.85,4.27-20.23t13.89-6.39q9.61,0,13.69,6.31t4.07,20.47q0,14.16-4.07,20.63T413.17,94Z"
        transform="translate(-0.63 -1)"
        fill="var(--colour-primary)"
      />
      <polygon
        className="ae5b3313-3ec5-4500-83c8-11d69d94930f"
        points="317.87 67.5 317.87 12.5 427.87 12.5 427.87 67 430.37 67 430.37 0 315.37 0 315.37 67.5 317.87 67.5"
      />
      <line
        className="f958760c-b948-4258-b902-fe85fc2d8da8"
        x1="322.37"
        y1="18"
        x2="423.37"
        y2="18"
      />
    </svg>
  );
};

export default VirtuosoMasthead;
