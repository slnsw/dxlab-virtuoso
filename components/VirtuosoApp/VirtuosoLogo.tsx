import React from 'react';

import Link from '../Link';

import css from './VirtuosoLogo.module.scss';

type Props = {
  fontWeight?: 'normal' | 'bold';
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

// const VirtuosoThickLogo = () => {
//   return (
//     <svg
//       id="bd928903-6f89-4f08-91e7-fd78f1356af0"
//       data-name="Layer 1"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 430.42 93.04"
//     >
//       <defs>
//         <style>{`.0fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2{fill:#fff;}.dd5c426-6dd7-4e70-8ca5-e8eb10f0fd04{fill:#e2097e;}.ae5b3313-3ec5-4500-83c8-11d69d94930f{fill:#e6007e;}.f958760c-b948-4258-b902-fe85fc2d8da8{fill:none;stroke:#e6007e;stroke-miterlimit:10;}`}</style>
//       </defs>
//       <title>Virtuoso Large Logo 02</title>
//       <path
//         className="50fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2"
//         d="M12.2,93.24.63,41H9.41l9.82,44.86H20.9L30.32,41h8.54L27.69,93.24Z"
//         transform="translate(-0.63 -1)"
//         fill="var(--colour-white)"
//       />
//       <path
//         className="50fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2"
//         d="M61.77,93.24V85.82H72.06V48.38H61.77V41H89.94v7.42H80.36V85.82h9.58v7.42Z"
//         transform="translate(-0.63 -1)"
//         fill="var(--colour-white)"
//       />
//       <path
//         className="50fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2"
//         d="M132,74.16c-2.87.16-4.47.24-4.79.24h-3.75V93.24h-8.3V41H131.6q8.7,0,13.17,3.87t4.47,12.89q0,10.38-8.94,14.61a163.11,163.11,0,0,1,9.26,20.91h-8.94A157,157,0,0,0,132,74.16ZM130,48.3h-6.54V66.74h6.62q10.69,0,10.7-9,0-5-2.56-7.22C136.52,49,133.78,48.3,130,48.3Z"
//         transform="translate(-0.63 -1)"
//         fill="var(--colour-white)"
//       />
//       <path
//         className="50fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2"
//         d="M170.63,48.46V41H205.9v7.5H192.42V93.24h-8.3V48.46Z"
//         transform="translate(-0.63 -1)"
//         fill="var(--colour-white)"
//       />
//       <path
//         className="50fd017d-f693-4ee3-a0c4-e4cf4cd8d2b2"
//         d="M226.65,75.68V41H235V74.72q0,6.15,2,8.94c1.28,1.86,3.72,2.79,7.34,2.79s6.12-.9,7.5-2.71,2.08-4.82,2.08-9V41h8.38V75.68q0,9.33-4,13.81T244.21,94q-10.05,0-13.8-4.55T226.65,75.68Z"
//         transform="translate(-0.63 -1)"
//         fill="var(--colour-white)"
//       />
//       <path
//         className="4dd5c426-6dd7-4e70-8ca5-e8eb10f0fd04"
//         d="M300.8,94q-9.74,0-13.89-6.71t-4.15-20.55q0-13.85,4.27-20.23t13.89-6.39q9.61,0,13.69,6.31t4.07,20.47q0,14.16-4.07,20.63T300.8,94Z"
//         transform="translate(-0.63 -1)"
//         fill="var(--colour-primary)"
//       />
//       <path
//         className="4dd5c426-6dd7-4e70-8ca5-e8eb10f0fd04"
//         d="M340.3,54.93q0-14.76,17.72-14.77A43.51,43.51,0,0,1,372.23,43l-1.84,7.26q-8.13-2.55-12.81-2.59t-6.74,1.55c-1.38,1.07-2.08,2.93-2.08,5.59a5.72,5.72,0,0,0,2.32,4.59q2.31,1.88,7.82,3.31,8.39,2.23,11.49,5.75t3.11,10.45q0,15.09-18,15.09a57.85,57.85,0,0,1-15.09-2.56l1.68-7.58a17.26,17.26,0,0,0,2.47.72,51.86,51.86,0,0,0,12,2c2.84,0,5-.71,6.38-2.15A7.44,7.44,0,0,0,365,79a6.71,6.71,0,0,0-1.79-5c-1.2-1.17-3.39-2.2-6.58-3.11q-8.62-2.4-12.5-5.91T340.3,54.93Z"
//         transform="translate(-0.63 -1)"
//         fill="var(--colour-primary)"
//       />
//       <path
//         className="4dd5c426-6dd7-4e70-8ca5-e8eb10f0fd04"
//         d="M413.17,94q-9.74,0-13.89-6.71t-4.15-20.55q0-13.85,4.27-20.23t13.89-6.39q9.61,0,13.69,6.31t4.07,20.47q0,14.16-4.07,20.63T413.17,94Z"
//         transform="translate(-0.63 -1)"
//         fill="var(--colour-primary)"
//       />
//       <polygon
//         className="ae5b3313-3ec5-4500-83c8-11d69d94930f"
//         points="317.87 67.5 317.87 12.5 427.87 12.5 427.87 67 430.37 67 430.37 0 315.37 0 315.37 67.5 317.87 67.5"
//       />
//       <line
//         className="f958760c-b948-4258-b902-fe85fc2d8da8"
//         x1="322.37"
//         y1="18"
//         x2="423.37"
//         y2="18"
//       />
//     </svg>
//   );
// };

// const VirtuosoThinLogo = () => {
//   return (
//     <svg
//       id="586299b2-a295-4850-9b02-b1a3acd78a87"
//       data-name="Layer 1"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 426.58 93.04"
//     >
//       <defs>
//         <style>{`.5d47cc7-f970-477e-943d-bd63ab1564b6{fill:#fff;}.46b7c95-5e80-46f9-afe6-fc46703607dc{fill:#e2097e;}.eb20b131-6eca-4e79-8c34-f8ace14632c3{fill:#e6007e;}.f9a3d765-4227-4b45-b441-1ec7b91fe650{fill:none;stroke:#e6007e;stroke-miterlimit:10;}`}</style>
//       </defs>
//       <title>virtuoso-thin-logo</title>
//       <path
//         className="25d47cc7-f970-477e-943d-bd63ab1564b6"
//         d="M13.88,93.24,1.27,41H5.9L17.23,89.25h1.43L30,41h4.47L21.86,93.24Z"
//         transform="translate(-1.27 -1)"
//       />
//       <path
//         className="25d47cc7-f970-477e-943d-bd63ab1564b6"
//         d="M62.88,93.24v-4h9V45h-9V41H85.15v4H76.29v44.3h8.86v4Z"
//         transform="translate(-1.27 -1)"
//       />
//       <path
//         className="25d47cc7-f970-477e-943d-bd63ab1564b6"
//         d="M131.6,71.77c-2.88.16-4.74.24-5.59.24h-6.55V93.24h-4.38V41h11.73q9.74,0,14.28,3.35t4.55,11.82a16.25,16.25,0,0,1-2.27,9.09,16,16,0,0,1-7.31,5.59A185.23,185.23,0,0,1,146,93.24h-4.79A187,187,0,0,0,131.6,71.77ZM126.65,45h-7.19V68h6.39c4.89,0,8.65-.89,11.25-2.68S141,60.49,141,56.13s-1.15-7.32-3.47-8.86S131.6,45,126.65,45Z"
//         transform="translate(-1.27 -1)"
//       />
//       <path
//         className="25d47cc7-f970-477e-943d-bd63ab1564b6"
//         d="M170.22,45V41h32.09V45H188.42V93.24H184V45Z"
//         transform="translate(-1.27 -1)"
//       />
//       <path
//         className="25d47cc7-f970-477e-943d-bd63ab1564b6"
//         d="M226.89,78.15V41h4.39V77.59q0,12.3,11.25,12.3,5.67,0,8.46-3.4a13.54,13.54,0,0,0,2.79-8.9V41h4.39V78.15q0,7.74-4,11.81T242.37,94q-7.74,0-11.61-4.23T226.89,78.15Z"
//         transform="translate(-1.27 -1)"
//       />
//       <path
//         className="146b7c95-5e80-46f9-afe6-fc46703607dc"
//         d="M282,66.58a62.32,62.32,0,0,1,.8-10.77,31.41,31.41,0,0,1,2.55-8.22q3.6-7.43,13.41-7.43,11.17.09,14.68,10.46a42.9,42.9,0,0,1,2.08,14.09,82.15,82.15,0,0,1-.8,12.88,33.85,33.85,0,0,1-2.55,8.62Q308.46,94,298.72,94t-13.33-7.83Q282,79.12,282,66.58Z"
//         transform="translate(-1.27 -1)"
//       />
//       <path
//         className="146b7c95-5e80-46f9-afe6-fc46703607dc"
//         d="M353,68.14q-7.14-1.73-10.46-5t-3.31-9.62a11.93,11.93,0,0,1,4.35-9.82q4.35-3.51,11.22-3.51a42.25,42.25,0,0,1,14,2.48l-1.12,4.07a35.94,35.94,0,0,0-12.17-2.4q-5.55,0-8.5,2.36a8.2,8.2,0,0,0-2.95,6.82q0,4.47,2.39,6.79T356,64.47q7.14,1.88,10.34,4.94t3.19,9.9q0,6.82-4.59,10.77t-11.85,4a53.43,53.43,0,0,1-13.73-2.32l1-4.07a52.27,52.27,0,0,0,13.09,2.24,12,12,0,0,0,8.14-2.76,9.61,9.61,0,0,0,3.19-7.7q0-5-2.31-7.26T353,68.14Z"
//         transform="translate(-1.27 -1)"
//       />
//       <path
//         className="146b7c95-5e80-46f9-afe6-fc46703607dc"
//         d="M394.33,66.58a63.34,63.34,0,0,1,.8-10.77,31.41,31.41,0,0,1,2.55-8.22q3.6-7.43,13.41-7.43,11.18.09,14.69,10.46a43.18,43.18,0,0,1,2.07,14.09,82.15,82.15,0,0,1-.8,12.88,33.85,33.85,0,0,1-2.55,8.62Q420.83,94,411.09,94q-9.57,0-13.33-7.83Q394.33,79.12,394.33,66.58Z"
//         transform="translate(-1.27 -1)"
//       />
//       <polygon
//         className="eb20b131-6eca-4e79-8c34-f8ace14632c3"
//         points="313.93 67.5 313.93 12.5 423.93 12.5 423.93 67 426.43 67 426.43 0 311.43 0 311.43 67.5 313.93 67.5"
//       />
//       <line
//         className="f9a3d765-4227-4b45-b441-1ec7b91fe650"
//         x1="317.73"
//         y1="16.67"
//         x2="419.73"
//         y2="16.67"
//       />
//     </svg>
//   );
// };

export default VirtuosoLogo;
