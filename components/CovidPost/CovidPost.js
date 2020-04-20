import React from 'react';
import PropTypes from 'prop-types';

import css from './CovidPost.module.scss';

const CovidPost = ({
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
}) => {
  return (
    <article className={[css.covidPost, className || ''].join(' ')}>
      {/* <h1>{title}</h1> */}
      <p className={css.date}>{dateText}</p>
      <div
        className={css.content}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      {
        <p className={css.authorName}>
          {authorName || 'anonymous'}
          {age && <span>{`, ${age}`}</span>}
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

CovidPost.propTypes = {
  className: PropTypes.string,
};

export default CovidPost;
