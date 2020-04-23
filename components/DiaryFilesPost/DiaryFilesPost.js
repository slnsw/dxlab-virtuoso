import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import CTAButton from '../CTAButton';
import Icon from '../Icon';

import css from './DiaryFilesPost.module.scss';

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
  // REPLACE WITH REAL CONTENT!!! XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const text = 'Check out this Diary Files entry. #dxlab @statelibrarynsw';
  const tweetText = encodeURIComponent(
    `Check out this Diary Files entry. #dxlab @statelibrarynsw`,
  );
  const fbAppId = process.env.DXLAB_WEBSITE_FB_APP_ID;

  const imageUrl = 'http://dxlab.sl.nsw.gov.au/images/typewriter.png';
  // TODO: Use baseUrl variable
  const url = encodeURIComponent(
    `http://dxlab.sl.nsw.gov.au/diary-files/${id}`,
  );
  const fbLink = `https://www.facebook.com/dialog/share?app_id=${fbAppId}&href=${url}&redirect_uri=${url}&name=%${encodeURIComponent(
    'Diary Files',
  )}&description=${encodeURIComponent(text)}${
    imageUrl ? `&picture=${imageUrl}` : ''
  }`;

  const twitterLink = `https://twitter.com/intent/tweet?text=${tweetText}&url=${url}`;

  return (
    <>
      <article className={[css.diaryFilesPost, className || ''].join(' ')}>
        {/* <h1>{title}</h1> */}
        {singleView ? (
          <CTAButton href={`/diary-files`} className={css.backButton}>
            back
          </CTAButton>
        ) : (
          <CTAButton href={`/diary-files/${id}`} className={css.viewButton}>
            view
          </CTAButton>
        )}
        <p className={css.date}>{dateText}</p>
        <div
          className={css.content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        {
          <div className={css.authorName}>
            {authorName || 'anonymous'}
            {age && <span>{`, ${age}`}</span>}
            {relatedPosts && relatedPosts.length > 0 && (
              <>
                <br />
                {!outsideAustralia && (city || state || postcode) && (
                  <div className={css.authorLocation}>
                    {'of '}
                    {city}
                    {city && (state || postcode) && ', '}
                    {state}
                    {postcode && state && `, `}
                    {postcode}
                    <br />
                  </div>
                )}
                <span>
                  <a href={`/diary-files/related/${id}`}>
                    See all by this author
                  </a>
                </span>
              </>
            )}
          </div>
        }

        {/* <div className={css.hole}></div> */}
        <div className={css.sharingIcons}>
          <a
            href={fbLink}
            aria-label="Share this post on Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className={css.sharingIcon}
          >
            <Icon name="facebook" />
          </a>

          <a
            href={twitterLink}
            aria-label="Share this post on Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className={css.sharingIcon}
          >
            <Icon name="twitter" />
          </a>
        </div>
      </article>
    </>
  );
};

DiaryFilesPost.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesPost;
