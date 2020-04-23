import React from 'react';
// import Head from 'next/head';
import PropTypes from 'prop-types';
import Router from 'next/router';
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
      {/* <Head>
        <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
      </Head> */}
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
        {/* <h1>{title}</h1> */}
        {singleView && (
          <CTAButton href={`/diary-files`} className={css.backButton}>
            back
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
            aria-label="Share this entry on Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className={css.sharingIcon}
          >
            <Icon name="facebook" />
          </a>

          <a
            href={twitterLink}
            aria-label="Share this entry on Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className={css.sharingIcon}
          >
            <Icon name="twitter" />
          </a>

          <a
            href={`/diary-files/${id}`}
            aria-label="View this entry"
            rel="noopener noreferrer"
            className={css.sharingIcon}
          >
            <Icon name="enter" />
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
