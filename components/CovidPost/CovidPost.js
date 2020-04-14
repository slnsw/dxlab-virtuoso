import React from 'react';
import PropTypes from 'prop-types';

import css from './CovidPost.module.scss';

const CovidPost = ({ title, content, dateText, className }) => {
  return (
    <article className={[css.covidPost, className || ''].join(' ')}>
      <h1>{title}</h1>
      <p>{dateText}</p>
      <div>{content}</div>
    </article>
  );
};

CovidPost.propTypes = {
  className: PropTypes.string,
};

export default CovidPost;
