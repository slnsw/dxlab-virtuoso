import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import LoaderText from '../LoaderText';
import Icon from '../Icon';
import Link from '../Link';
import setupSocials from '../../lib/social';
import config from '../../lib/config';

import css from './DiaryFilesPost.module.scss';
import TextTruncate from '../TextTruncate/TextTruncate';

const DiaryFilesPost = ({
  id,
  // title,
  content,
  dateText,
  authorName: rawAuthorName,
  className,
  city,
  state,
  age,
  postcode,
  outsideAustralia,
  relatedPosts,
  singleView = true,
  isLoading = true,
}) => {
  const authorName = rawAuthorName || 'Anonymous';

  // set up social data
  const text =
    'Check out this diary entry from @statelibrarynsw #TheDiaryFiles #dxlab';

  const imageUrl = `/images/typewriter.gif`;
  const pathname = `/diary-files/entry/${id}`;
  const title = `${dateText}, ${authorName} - The Diary Files`;

  const { fbLink, twitterLink } = setupSocials(title, text, pathname, imageUrl);

  if (isLoading)
    return (
      <article
        id={id}
        className={[
          // singleView ? '' : css.diaryFilesAllowHover,
          css.diaryFilesPost,
          className || '',
        ].join(' ')}
      >
        <LoaderText className={css.darkLoaderText} />
      </article>
    );

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

        <TextTruncate showButton={true} limit={600}>
          <div
            className={css.content}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </TextTruncate>

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
            <Icon name="facebook" size="md" />
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
            <Icon name="twitter" size="md" />
          </a>

          {!singleView && (
            <Link as={`/diary-files/entry/${id}`}>
              <a
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <Icon name="arrow-redo" size="md" />
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
