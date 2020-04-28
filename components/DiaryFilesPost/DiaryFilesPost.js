import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import CTAButton from '../CTAButton';
// import Icon from '../Icon';

import css from './DiaryFilesPost.module.scss';
import setupSocials from '../../lib/social';

const DiaryFilesPost = ({
  id,
  // title,
  content,
  dateText,
  authorName,
  className,
  city,
  state,
  age,
  postcode,
  outsideAustralia,
  relatedPosts,
  singleView = true,
}) => {
  const text =
    'Check out this diary entry from @statelibrarynsw #TheDiaryFiles #dxlab';
  // const tweetText = encodeURIComponent(
  //   `Check out this Diary Files entry. #dxlab @statelibrarynsw`,
  // );
  // // const fbAppId = process.env.DXLAB_WEBSITE_FB_APP_ID;

  const imageUrl = 'http://dxlab.sl.nsw.gov.au/images/typewriter.png';
  const pathname = `/diary-files/${id}`;
  const title = 'Diary Files';
  // TODO: Use baseUrl variable
  // const url = encodeURIComponent(
  //   `http://dxlab.sl.nsw.gov.au/diary-files/${id}`,
  // );

  const { fbLink, twitterLink } = setupSocials(title, text, pathname, imageUrl);

  // const fbLink = `https://www.facebook.com/dialog/share?app_id=${fbAppId}&href=${url}&redirect_uri=${url}&name=%${encodeURIComponent(
  //   'Diary Files',
  // )}&description=${encodeURIComponent(text)}${
  //   imageUrl ? `&picture=${imageUrl}` : ''
  // }`;

  // const twitterLink = `https://twitter.com/intent/tweet?text=${tweetText}&url=${url}`;

  return (
    <>
      {singleView && (
        <CTAButton href={`/diary-files`} className={css.backButton}>
          back
        </CTAButton>
      )}

      <article
        className={[
          singleView ? '' : css.diaryFilesAllowHover,
          css.diaryFilesPost,
          className || '',
        ].join(' ')}
        onClick={() => {
          if (!singleView) {
            Router.push(`/diary-files/${id}`);
          }
        }}
      >
        <p className={css.date}>{dateText}</p>
        <div
          className={css.content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        <p className={css.authorInfo}>
          <span className={css.authorName}>{authorName || 'anonymous'}</span>
          {age && `, ${age}`}
          {!outsideAustralia && (city || state || postcode) && (
            <>
              <br />
              {'of '}
              {city}
              {city && (state || postcode) && ', '}
              {state}
              {postcode && state && `, `}
              {postcode}
            </>
          )}
          {relatedPosts && relatedPosts.length > 0 && (
            <>
              <br />
              <a href={`/diary-files/related/${id}`}>See all by this author</a>
            </>
          )}
        </p>

        <div>
          <a
            href={fbLink}
            aria-label="Share this entry on Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className={css.sharingIcon}
          >
            {/* <Icon name="facebook" /> */}
            <img
              src="/images/icons/logo-facebook.svg"
              alt="Share this entry on Facebook"
            />
          </a>

          <a
            href={twitterLink}
            aria-label="Share this entry on Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className={css.sharingIcon}
          >
            {/* <Icon name="twitter" /> */}
            <img
              src="/images/icons/logo-twitter.svg"
              alt="Share this entry on Twitter"
            />
          </a>

          {!singleView && (
            <a
              href={`/diary-files/${id}`}
              aria-label="View this entry"
              rel="noopener noreferrer"
              className={css.sharingIcon}
            >
              {/* <Icon name="enter" /> */}
              <img src="/images/icons/enter-sharp.svg" alt="View this entry" />
            </a>
          )}
        </div>
      </article>
    </>
  );
};

DiaryFilesPost.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesPost;
