import React from 'react';

export function getSVG(name) {
  switch (name) {
    case 'enter-sharp':
      return (
        <g>
          <path d="M160,240H307.37l-64-64L266,153.37,368.63,256,266,358.63,243.37,336l64-64H160V420a12,12,0,0,0,12,12H468a12,12,0,0,0,12-12V92a12,12,0,0,0-12-12H172a12,12,0,0,0-12,12Z" />
          <rect x="32" y="240" width="128" height="32" />{' '}
        </g>
      );
    case 'logo-twitter':
      return (
        <g>
          <path d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z" />
        </g>
      );
    case 'logo-facebook':
      return (
        <g>
          <path d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z" />{' '}
        </g>
      );
    case 'close-sharp':
      return (
        <g>
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </g>
      );
    case 'chevron-back-sharp':
      return (
        <polyline
          points="328 112 184 256 328 400"
          style={{
            fill: 'none',
            stroke: '#FFF',
            strokeLinecap: 'square',
            strokeMiterlimit: 10,
            strokeWidth: '48px',
          }}
        />
      );
    case 'chevron-forward-sharp':
      return (
        <polyline
          points="184 112 328 256 184 400"
          style={{
            fill: 'none',
            stroke: '#FFF',
            strokeLinecap: 'square',
            strokeMiterlimit: 10,
            strokeWidth: '48px',
          }}
        />
      );
    case 'chevron-back-dark-sharp':
      return (
        <polyline
          points="328 112 184 256 328 400"
          style={{
            fill: 'none',
            stroke: '#000',
            strokeLinecap: 'square',
            strokeMiterlimit: 10,
            strokeWidth: '48px',
          }}
        />
      );
    case 'chevron-forward-dark-sharp':
      return (
        <polyline
          points="184 112 328 256 184 400"
          style={{
            fill: 'none',
            stroke: '#000',
            strokeLinecap: 'square',
            strokeMiterlimit: 10,
            strokeWidth: '48px',
          }}
        />
      );
    case 'arrow-redo-sharp':
      return (
        <g>
          <path d="M48,399.26C48,335.19,62.44,284,90.91,247c34.38-44.67,88.68-68.77,161.56-71.75V72L464,252,252.47,432V329.35c-44.25,1.19-77.66,7.58-104.27,19.84-28.75,13.25-49.6,33.05-72.08,58.7L48,440Z" />
        </g>
      );
    case 'search-sharp':
      return (
        <g>
          <path d="M464,428,339.92,303.9a160.48,160.48,0,0,0,30.72-94.58C370.64,120.37,298.27,48,209.32,48S48,120.37,48,209.32s72.37,161.32,161.32,161.32a160.48,160.48,0,0,0,94.58-30.72L428,464ZM209.32,319.69A110.38,110.38,0,1,1,319.69,209.32,110.5,110.5,0,0,1,209.32,319.69Z" />
        </g>
      );
    case 'remove-sharp':
      return (
        <g>
          <line
            x1="400"
            y1="256"
            x2="112"
            y2="256"
            style={{
              fill: 'none',
              stroke: '#000',
              strokeLinecap: 'square',
              strokeLinejoin: 'round',
              strokeWidth: '32px',
            }}
          />
        </g>
      );
    case 'add-sharp':
      return (
        <g>
          <line
            x1="256"
            y1="112"
            x2="256"
            y2="400"
            style={{
              fill: 'none',
              stroke: '#000',
              strokeLinecap: 'square',
              strokeLinejoin: 'round',
              strokeWidth: '32px',
            }}
          />
          <line
            x1="400"
            y1="256"
            x2="112"
            y2="256"
            style={{
              fill: 'none',
              stroke: '#000',
              strokeLinecap: 'square',
              strokeLinejoin: 'round',
              strokeWidth: '32px',
            }}
          />
        </g>
      );
    case 'play-sharp':
      return (
        <g>
          <polygon points="96 448 416 256 96 64 96 448" />
        </g>
      );
    case 'stop-sharp':
      return (
        <g>
          <rect x="80" y="80" width="352" height="352" />
        </g>
      );
    case 'pause-sharp':
      return (
        <g>
          <path d="M224,432H144V80h80Z" />
          <path d="M368,432H288V80h80Z" />
        </g>
      );
    case 'play-skip-back-sharp':
      return (
        <g>
          <polygon points="143.47 64 143.47 227.52 416 64 416 448 143.47 284.48 143.47 448 96 448 96 64 143.47 64" />
        </g>
      );
    case 'options-sharp':
      return (
        <g>
          <path d="M381.25,112a48,48,0,0,0-90.5,0H48v32H290.75a48,48,0,0,0,90.5,0H464V112Z" />
          <path d="M176,208a48.09,48.09,0,0,0-45.25,32H48v32h82.75a48,48,0,0,0,90.5,0H464V240H221.25A48.09,48.09,0,0,0,176,208Z" />
          <path d="M336,336a48.09,48.09,0,0,0-45.25,32H48v32H290.75a48,48,0,0,0,90.5,0H464V368H381.25A48.09,48.09,0,0,0,336,336Z" />
        </g>
      );
    case 'reload-sharp':
      return (
        <g>
          <path
            d="M400,148l-21.12-24.57A191.43,191.43,0,0,0,240,64C134,64,48,150,48,256s86,192,192,192A192.09,192.09,0,0,0,421.07,320"
            style={{
              fill: 'none',
              stroke: '#000',
              strokeLinecap: 'square',
              strokeMiterlimit: 10,
              strokeWidth: '32px',
            }}
          />
          <path d="M464,68.45V220a4,4,0,0,1-4,4H308.45a4,4,0,0,1-2.83-6.83L457.17,65.62A4,4,0,0,1,464,68.45Z" />
        </g>
      );

    default:
      return <path />;
  }
}
