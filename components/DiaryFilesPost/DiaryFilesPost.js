import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

// import CTAButton from '../CTAButton';
// import CTAButtonV2 from '../CTAButtonV2';
import Icon from '../Icon';
import Link from '../Link';
import setupSocials from '../../lib/social';
import config from '../../lib/config';

import css from './DiaryFilesPost.module.scss';

const DiaryFilesPost = ({
  id,
  // title,
  content,
  dateText,
  authorName = 'Anonymous',
  className,
  city,
  state,
  age,
  postcode,
  outsideAustralia,
  relatedPosts,
  singleView = true,
}) => {
  // set up social data
  const text =
    'Check out this diary entry from @statelibrarynsw #TheDiaryFiles #dxlab';

  const imageUrl = `${config.baseUrl}/images/typewriter.gif`;
  const pathname = `${config.baseUrl}/diary-files/entry/${id}`;
  const title = `${dateText}, ${authorName} - The Diary Files`;

  const { fbLink, twitterLink } = setupSocials(title, text, pathname, imageUrl);

  return (
    <>
      {/* {singleView && (
        <CTAButtonV2
          onClick={() => Router.back()}
          // href={`/diary-files`}
          className={css.backButton}
        >
          back
        </CTAButtonV2>
      )} */}

      {singleView && (
        <button onClick={() => Router.back()} className={css.backButton}>
          {'<'} Back
        </button>
      )}

      <article
        id={id}
        className={[
          // singleView ? '' : css.diaryFilesAllowHover,
          css.diaryFilesPost,
          className || '',
        ].join(' ')}
        // onClick={() => {
        //   if (!singleView) {
        //     Router.push(
        //       `/diary-files/entry/[id]`,
        //       `/diary-files/entry/${id}`,
        //     ).then(() => window.scrollTo(0, 0));
        //   }
        // }}
      >
        <header className={css.header}>
          <p className={css.date}>{dateText}</p>

          <p className={css.authorInfo}>
            <span className={css.authorName}>{authorName}</span>
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
            {relatedPosts && relatedPosts.length > 1 && (
              <>
                <br />
                <Link as={`/diary-files/related/${id}#${id}`}>
                  <a
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    See all by author
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
            className={css.sharingIcon}
            aria-label="Share this entry on Facebook"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Icon name="facebook" size="lg" />
          </a>

          <a
            href={twitterLink}
            className={css.sharingIcon}
            aria-label="Share this entry on Twitter"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Icon name="twitter" size="lg" />
          </a>

          {!singleView && (
            <Link as={`/diary-files/entry/${id}`}>
              <a
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <Icon name="arrow-redo" size="lg" />
              </a>
            </Link>
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
