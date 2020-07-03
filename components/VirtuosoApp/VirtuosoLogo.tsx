import React from 'react';

import Link from '../Link';

import css from './VirtuosoLogo.module.scss';

const VirtuosoLogo = ({ className }) => {
  return (
    <div className={[className].join(' ')}>
      <h1 className={css.virtuosoLogo}>
        <Link href="/virtuoso">
          <a>
            Virtu<strong>OSO</strong>
            <svg width="2em" height="1.4em">
              <ellipse
                cx="0.15em"
                cy="0.8em"
                rx="0.2em"
                ry="0.3em"
                style={{ fill: 'var(--colour-primary)' }}
              />
              <ellipse
                cx="1.6em"
                cy="0.8em"
                rx="0.2em"
                ry="0.3em"
                style={{ fill: 'var(--colour-primary)' }}
              />
              <rect
                x="0.4em"
                width={1}
                height="0.9em"
                style={{ fill: 'var(--colour-primary)' }}
              />
              <rect
                x="1.8em"
                width={1}
                height="0.9em"
                style={{ fill: 'var(--colour-primary)' }}
              />
              <rect
                x="0.4em"
                width="1.4em"
                // height={3}
                height={'0.15em'}
                style={{ fill: 'var(--colour-primary)' }}
              />
              <rect
                x="0.4em"
                // y={5}
                y="0.2em"
                width="1.4em"
                height={1}
                style={{ fill: 'var(--colour-primary)' }}
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

export default VirtuosoLogo;