import React from 'react';
import PropTypes from 'prop-types';
import CTAButton from '../CTAButton';

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
  // relatedPosts,
  singleView = true,
}) => {
  return (
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
        <p className={css.authorName}>
          {authorName || 'anonymous'}
          {age && <span>{`, ${age}`}</span>}
          {relatedPosts && relatedPosts.length > 0 && (
            <>
              <br />
              <span>
                <a href={`/diary-files/related/${id}`}>
                  see all by this author
                </a>
              </span>
            </>
          )}
        </p>
      }

      {!outsideAustralia && (city || state || postcode) && (
        <p className={css.authorLocation}>
          {'of '}
          {city}
          {city && (state || postcode) && ', '}
          {state}
          {postcode && state && `, `}
          {postcode}
        </p>
      )}

      {/* <div className={css.hole}></div> */}
    </article>
  );
};

DiaryFilesPost.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesPost;
