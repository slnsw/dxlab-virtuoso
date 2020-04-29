import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

// import CTAButton from '../CTAButton';
import CTAButtonV2 from '../CTAButtonV2';
import Icon from '../Icon';
import Link from '../Link';
import setupSocials from '../../lib/social';

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

  return (
    <>
      {singleView && (
        <CTAButtonV2
          onClick={() => Router.back()}
          // href={`/diary-files`}
          className={css.backButton}
        >
          back
        </CTAButtonV2>
      )}

      <article
        className={[
          singleView ? '' : css.diaryFilesAllowHover,
          css.diaryFilesPost,
          className || '',
        ].join(' ')}
        onClick={() => {
          if (!singleView) {
            Router.push(
              `/diary-files/entry/[id]`,
              `/diary-files/entry/${id}`,
            ).then(() => window.scrollTo(0, 0));
          }
        }}
      >
        <header className={css.header}>
          <p className={css.date}>{dateText}</p>

          <p className={css.authorInfo}>
            <span className={css.authorName}>{authorName || 'anonymous'}</span>
            {age && (
              <>
                <br />
                {age}
              </>
            )}
            {!outsideAustralia && (city || state || postcode) && (
              <>
                <br />
                {/* {'of '} */}
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
                <Link as={`/diary-files/related/${id}`}>
                  <a
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    See all by this author
                  </a>
                </Link>
              </>
            )}
          </p>
        </header>

        <div
          className={css.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div>
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
            {/* <img
              src="/images/icons/logo-twitter.svg"
              alt="Share this entry on Twitter"
            /> */}
          </a>
          {/* 
          {!singleView && (
            <a
              href={`/diary-files/entry/${id}`}
              aria-label="View this entry"
              rel="noopener noreferrer"
              className={css.sharingIcon}
            >
              <Icon name="enter" />
              
            </a>
          )} */}
        </div>
      </article>
    </>
  );
};

DiaryFilesPost.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesPost;
