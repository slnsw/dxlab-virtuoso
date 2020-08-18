import React from 'react';
// import SheetMusic from '@slnsw/react-sheet-music';

import css from './VirtuosoMasthead.module.scss';
import { VirtuosoThickLogo } from '../VirtuosoApp/VirtuosoLogo';

// import songs from '../VirtuosoApp/songs';
import CTALink from '../CTALink';
import VirtuosoVertDivider from '../VirtuosoApp/VirtuosoVertDivider';

type Props = {
  pathname?: string;
  className?: string;
};

const VirtuosoMasthead: React.FC<Props> = ({ pathname, className }) => {
  const [images, setImages] = React.useState([]);

  const imageData = {
    1: {
      url: 'https://collection.sl.nsw.gov.au/digital/02Neq6GwgxdND',
      alt: '77 Squad R.A.A.F., October 1952',
    },
    2: {
      url: 'https://collection.sl.nsw.gov.au/digital/ZkJj2bVZmNypQ',
      alt: 'A.B.C. Symphony Orchestra, 1946',
    },
    3: {
      url: 'https://collection.sl.nsw.gov.au/digital/RaWJxy0G34w82',
      alt:
        'George Shearing Show ATN, 21 September 1960. Photographs by C. Lynch',
    },
    4: {
      url: 'https://collection.sl.nsw.gov.au/digital/AGOPNWDKkPEG5',
      alt:
        'George Shearing Show ATN, 21 September 1960. Photographs by Cec Lynch',
    },
    5: {
      url: 'https://collection.sl.nsw.gov.au/digital/0OVPMppQJe52P',
      alt: 'Portrait of woman at piano, March 1956. Photographed by Max Dupain',
    },
    6: {
      url: 'https://collection.sl.nsw.gov.au/digital/zQ2q4wWDKqWDv',
      alt: '7th Day Adventist College, 4 October 1953',
    },
    7: {
      url: 'https://collection.sl.nsw.gov.au/digital/NNwaN67ZZ3jj',
      alt:
        'U.S. Negro concert party, 19 August 1944. Photographed by Ivan Ives',
    },
    8: {
      url: 'https://collection.sl.nsw.gov.au/digital/5JemAqXEZjVBw',
      alt:
        'W.E.A. Summer School at Newport, 24 June 1942. Photographed by Ivan Ives',
    },
    9: {
      url: 'https://collection.sl.nsw.gov.au/digital/2BLoqa7v5PDQB',
      alt: 'Hammond organ, 2 February 1939. Photographed by Ivan Ives',
    },
    10: {
      url: 'https://collection.sl.nsw.gov.au/digital/3mG5xygzWD6ZN',
      alt:
        'Sabatino - boxer training, 13 February 1939. Photographed by R. Wolfe',
    },
    11: {
      url: 'https://collection.sl.nsw.gov.au/digital/7v2y6X37bvPDO',
      alt:
        'Women in Symphony Orchestra, 29 August 1944. Photographed by Ivan Ives',
    },
    12: {
      url: 'https://collection.sl.nsw.gov.au/digital/N3wLKVO5yqbB7',
      alt:
        'Violin maker Mrs E. A. Hawnt (Smith), 31 January 1945. Photographed by Alec Iverson',
    },
    13: {
      url: 'https://collection.sl.nsw.gov.au/digital/3rbVWNpNZvaoW',
      alt: 'Wynn Richmond, 29 October 1943. Photographed by F. R. Johnson',
    },
    14: {
      url: 'https://collection.sl.nsw.gov.au/digital/yN3rBX7OmjpOz',
      alt:
        'Symphony Orchestra rehearsal at Marrickville. Photographed by Ivan Ives',
    },
    15: {
      url: 'https://collection.sl.nsw.gov.au/digital/3qbdqmNR0pPxN',
      alt:
        'Home for blind women at Woollahra, 28 June 1943. Photographed by N. Herfort',
    },
    16: {
      url: 'https://collection.sl.nsw.gov.au/digital/2pJMVGp885Aex',
      alt: 'Studio shot of violinist playing, 14 December 1938',
    },
    17: {
      url: 'https://collection.sl.nsw.gov.au/digital/WeGDkdAolL6P0',
      alt: 'A.B.C. Symphony Orchestra',
    },
    18: {
      url: 'https://collection.sl.nsw.gov.au/digital/waXx2dJpEGWZ0',
      alt: 'Opium poppies at Armidale, N.S.W., 24 November 1943',
    },
    19: {
      url: 'https://collection.sl.nsw.gov.au/digital/Nplv77mGMq4o0',
      alt: 'Waltz dream. Woman posing with violin, 31 March 1939',
    },
  };

  React.useEffect(() => {
    const image1 = Math.floor(Math.random() * 19) + 1;
    let image2 = image1;

    while (image2 === image1) {
      image2 = Math.floor(Math.random() * 19) + 1;
    }

    setImages([image1, image2]);
  }, []);

  return (
    <div className={[css.virtuosoMasthead, className || ''].join(' ')}>
      <div className={css.inside}>
        {images[0] && (
          <div className={css.image1}>
            <img
              // src="https://files02.sl.nsw.gov.au/fotoweb/thumbnails/3600_0/9759/97597875.jpg"
              // alt="77 Squad R.A.A.F., October 1952"
              src={`/virtuoso/images/masthead/${images[0]}.jpg`}
              alt={imageData[images[0]].alt}
            />
          </div>
        )}

        {images[1] && (
          <div className={css.image2}>
            <img
              // src="https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_300/9577/95773440.jpg"
              // src="/virtuoso/images/masthead/18.jpg"
              src={`/virtuoso/images/masthead/${images[1]}.jpg`}
              alt={imageData[images[1]].alt}
            />
          </div>
        )}

        <div className={css.image3}></div>

        <p className={css.aboutLink}>
          {pathname === '/virtuoso' && (
            <CTALink href="/virtuoso/about">About</CTALink>
          )}

          {pathname === '/virtuoso/about' && (
            <CTALink href="/virtuoso">Home</CTALink>
          )}
        </p>

        {/* <SheetMusic
          id="masthead"
          notation={notation}
          responsive={true}
          // staffWidth={500}
          // paddingTop={0}
          // paddingLeft={0}
          // paddingRight={0}
          className={css.staff}
        /> */}

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

        {/* <VirtuosoLogo fontWeight="bold" className={css.virtuosoLogo} /> */}
        <VirtuosoThickLogo className={css.virtuosoLogo} />

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

export default VirtuosoMasthead;
