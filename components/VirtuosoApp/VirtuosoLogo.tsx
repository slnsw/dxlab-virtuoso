import React from 'react';

import Link from '../Link';

import css from './VirtuosoLogo.module.scss';

type Props = {
  fontWeight?: 'normal' | 'bold';
  className?: string;
};

type ThinLogoProps = {
  className?: string;
};

const VirtuosoLogo: React.FC<Props> = ({
  fontWeight = 'normal',
  className,
}) => {
  return (
    <div className={[className].join(' ')}>
      <h1 className={css.virtuosoLogo}>
        <Link href="/virtuoso">
          <a
            style={{
              fontWeight,
            }}
          >
            Virtu<strong>OSO</strong>
            <svg width="2em" height="1.4em">
              <ellipse
                cx="0.17em"
                cy="0.85em"
                rx="0.2em"
                ry="0.3em"
                style={{ fill: 'var(--colour-primary)' }}
              />
              <ellipse
                cx="1.6em"
                cy="0.85em"
                rx="0.2em"
                ry="0.3em"
                style={{ fill: 'var(--colour-primary)' }}
              />
              {/* | */}
              <rect
                x="0.38em"
                width={fontWeight === 'bold' ? 3 : 1}
                height="0.9em"
                style={{ fill: 'var(--colour-primary)' }}
                shapeRendering="crispEdges"
              />
              {/* | */}
              <rect
                x="1.78em"
                // width={1}
                width={fontWeight === 'bold' ? 3 : 1}
                height="0.9em"
                style={{ fill: 'var(--colour-primary)' }}
                shapeRendering="crispEdges"
              />
              {/* - */}
              <rect
                x="0.4em"
                // y="-0.01em"
                width="1.4em"
                // height={3}
                height={'0.15em'}
                style={{ fill: 'var(--colour-primary)' }}
                shapeRendering="crispEdges"
              />
              {/* - */}
              <rect
                x="0.5em"
                // y={5}
                y="0.22em"
                width="1.22em"
                height={1}
                style={{ fill: 'var(--colour-primary)' }}
                shapeRendering="crispEdges"
              />
            </svg>
          </a>
        </Link>
      </h1>

      <p className={css.virtuosoLogoSub}>
        <strong>O</strong>nline {/* <br /> */}
        <strong>S</strong>heet {/* <br /> */}
        <strong>O</strong>
        rchestra
      </p>
    </div>
  );
};

export const VirtuosoThickLogo = ({ className }) => {
  return (
    <svg
      id="bd928903-6f89-4f08-91e7-fd78f1356af0"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 430.42 93.04"
      className={className}
    >
      <defs>
        <style>{`.0fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2{fill:#fff;}.dd5c426-6dd7-4e70-8ca5-e8eb10f0fd04{fill:#e2097e;}.ae5b3313-3ec5-4500-83c8-11d69d94930f{fill:#e6007e;}.f958760c-b948-4258-b902-fe85fc2d8da8{fill:none;stroke:#e6007e;stroke-miterlimit:10;}`}</style>
      </defs>
      <title>Virtuoso Thick Logo</title>
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
      {/* O */}
      <path
        className="4dd5c426-6dd7-4e70-8ca5-e8eb10f0fd04"
        d="M413.17,94q-9.74,0-13.89-6.71t-4.15-20.55q0-13.85,4.27-20.23t13.89-6.39q9.61,0,13.69,6.31t4.07,20.47q0,14.16-4.07,20.63T413.17,94Z"
        transform="translate(-0.63 -1)"
        fill="var(--colour-primary)"
      />
      <polygon
        className="ae5b3313-3ec5-4500-83c8-11d69d94930f"
        points="317.87 67.5 317.87 12.5 427.87 12.5 427.87 67 430.37 67 430.37 0 315.37 0 315.37 67.5 317.87 67.5"
        shapeRendering="crispEdges"
      />
      <line
        className="f958760c-b948-4258-b902-fe85fc2d8da8"
        x1="322.37"
        y1="18"
        x2="423.37"
        y2="18"
        strokeWidth="2"
        shapeRendering="crispEdges"
      />
    </svg>
  );
};

export const VirtuosoThinLogo: React.FC<ThinLogoProps> = ({ className }) => {
  return (
    <svg
      id="539056c8-7db2-4b0a-8b2f-1a1d486e8cbb"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 99.73 21.75"
      className={className}
    >
      <defs>
        <style>{`.c3c2523a-5674-4bbb-84c4-d533cbb21f65{fill:#fff;}.b4526d41-8f40-480b-b758-b8ab12a4fff6{fill:#e2097e;}.b78306f2-a88f-4fc1-a1da-fa5df2a1f06a{fill:#e6007e;}
        .89e65a0f-7041-40a4-9847-bc52c8172e60{fill:none;stroke:#e6007e;stroke-miterlimit:10;}`}</style>
      </defs>
      <title>Virtuoso Thin Logo</title>
      <path
        className="c3c2523a-5674-4bbb-84c4-d533cbb21f65"
        d="M3.21,21.56.27,9.34H1.35L4,20.63h.33L7,9.34H8L5.08,21.56Z"
        transform="translate(-0.27)"
      />
      <path
        className="c3c2523a-5674-4bbb-84c4-d533cbb21f65"
        d="M14.67,21.56v-.93h2.11V10.28H14.67V9.34h5.21v.94H17.81V20.63h2.07v.93Z"
        transform="translate(-0.27)"
      />
      <path
        className="c3c2523a-5674-4bbb-84c4-d533cbb21f65"
        d="M30.74,16.55l-1.31.05H27.9v5h-1V9.34h2.75a5.63,5.63,0,0,1,3.34.79A3.2,3.2,0,0,1,34,12.89,3.86,3.86,0,0,1,33.49,15a3.72,3.72,0,0,1-1.71,1.3,43.72,43.72,0,0,1,2.32,5.24H33A46.76,46.76,0,0,0,30.74,16.55Zm-1.16-6.27H27.9v5.39h1.49A4.6,4.6,0,0,0,32,15a2.41,2.41,0,0,0,.92-2.15,2.32,2.32,0,0,0-.81-2.07A4.7,4.7,0,0,0,29.58,10.28Z"
        transform="translate(-0.27)"
      />
      <path
        className="c3c2523a-5674-4bbb-84c4-d533cbb21f65"
        d="M39.77,10.29V9.34h7.5v.95H44V21.56H43V10.29Z"
        transform="translate(-0.27)"
      />
      <path
        className="c3c2523a-5674-4bbb-84c4-d533cbb21f65"
        d="M53,18V9.34h1v8.57c0,1.91.88,2.87,2.63,2.87a2.4,2.4,0,0,0,2-.79,3.14,3.14,0,0,0,.65-2.08V9.34h1V18a3.75,3.75,0,0,1-.94,2.76,3.73,3.73,0,0,1-2.75.95,3.5,3.5,0,0,1-2.72-1A3.88,3.88,0,0,1,53,18Z"
        transform="translate(-0.27)"
      />
      <path
        className="b4526d41-8f40-480b-b758-b8ab12a4fff6"
        d="M65.89,15.33a14.22,14.22,0,0,1,.19-2.52,7.32,7.32,0,0,1,.59-1.92,3.16,3.16,0,0,1,3.14-1.73,3.32,3.32,0,0,1,3.43,2.44,9.87,9.87,0,0,1,.49,3.29,18.52,18.52,0,0,1-.19,3,7.5,7.5,0,0,1-.6,2,3.58,3.58,0,0,1-6.25,0A10.77,10.77,0,0,1,65.89,15.33Z"
        transform="translate(-0.27)"
      />
      <path
        className="b4526d41-8f40-480b-b758-b8ab12a4fff6"
        d="M92.16,15.33a15.23,15.23,0,0,1,.19-2.52,7,7,0,0,1,.6-1.92,3.14,3.14,0,0,1,3.13-1.73,3.32,3.32,0,0,1,3.43,2.44,9.87,9.87,0,0,1,.49,3.29,18.52,18.52,0,0,1-.19,3,7.88,7.88,0,0,1-.59,2,3.58,3.58,0,0,1-6.25,0A10.61,10.61,0,0,1,92.16,15.33Z"
        transform="translate(-0.27)"
      />
      <polygon
        className="b78306f2-a88f-4fc1-a1da-fa5df2a1f06a"
        points="73 20 73 3 99 3 99 17 100 17 100 0 72 0 72 20 73 20"
        shapeRendering="crispEdges"
      />
      <line
        className="89e65a0f-7041-40a4-9847-bc52c8172e60"
        x1="75"
        y1="5"
        x2="98"
        y2="5"
        strokeWidth="1"
        shapeRendering="crispEdges"
        stroke="var(--colour-primary)"
      />
      {/* S */}
      <path
        className="b4526d41-8f40-480b-b758-b8ab12a4fff6"
        d="M79.06,12.61c0-2.3,1.39-3.45,4.15-3.45a10.1,10.1,0,0,1,3.32.65l-.43,1.7a11.18,11.18,0,0,0-3-.61,2.6,2.6,0,0,0-1.57.36A1.55,1.55,0,0,0,81,12.57a1.33,1.33,0,0,0,.54,1.07,5,5,0,0,0,1.83.78,5.49,5.49,0,0,1,2.69,1.34,3.62,3.62,0,0,1,.73,2.45q0,3.52-4.22,3.52a13.92,13.92,0,0,1-3.53-.59l.39-1.78a3.12,3.12,0,0,0,.58.17,12.32,12.32,0,0,0,2.81.47,2,2,0,0,0,1.49-.51,1.72,1.72,0,0,0,.5-1.27,1.55,1.55,0,0,0-.42-1.17,3.72,3.72,0,0,0-1.54-.73A7.22,7.22,0,0,1,80,14.94,3,3,0,0,1,79.06,12.61Z"
        transform="translate(-0.27)"
      />
    </svg>
  );
};

export default VirtuosoLogo;
