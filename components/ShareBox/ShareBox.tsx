import React from 'react';

import setupSocials from '../../lib/social';

import css from './ShareBox.module.scss';

type Props = {
  title: string;
  text: string;
  pathname: string;
  imageUrl: string;
  theme?: 'dark' | 'light';
};

const ShareBox: React.FC<Props> = ({
  title,
  text,
  pathname,
  imageUrl,
  theme = 'dark',
}) => {
  const { fbLink, twitterLink } = setupSocials(title, text, pathname, imageUrl);

  return (
    <div
      className={[css.shareBox, theme === 'light' ? css.light : ''].join(' ')}
    >
      <div className={css.title}>Share</div>

      <div className={css.icons}>
        <a
          href={fbLink}
          aria-label="Share this post on Facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            className={[css.icon, 'slnsw-icon-facebook'].join(' ')}
            aria-hidden="true"
          />
        </a>

        <a
          href={twitterLink}
          aria-label="Share this post on Twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            className={[css.icon, 'slnsw-icon-twitter'].join(' ')}
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
};

export default ShareBox;
