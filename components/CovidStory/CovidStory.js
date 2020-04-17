import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import css from './CovidStory.module.scss';

const CovidStory = ({ className, id }) => {
  const idAsInt = parseInt(id, 10);
  const {
    // loading,
    error,
    data,
  } = useQuery(storyQuery, {
    variables: { id: idAsInt },
  });

  const post = data && data.covidExperiment && data.covidExperiment.post;

  const {
    title,
    content,
    city,
    state,
    dateText,
    authorName,
    // state, // problem! appears 'state' is a reserved name??
    // postcode,
    // outsideAustralia,
    age,
  } = post || {};

  if (title === 'Hello World' || error) {
    return (
      <div className={[css.covidStory, className || ''].join(' ')}>
        <h1>No story found</h1>
      </div>
    );
  }

  return (
    <article className={[css.covidStory, className || ''].join(' ')}>
      {/* <h1>{title}</h1> */}
      <p className={css.date}>{dateText}</p>
      <div
        className={css.content}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      <p className={css.authorName}>
        {authorName || 'anonymous'}
        {age && `, ${age}`}
        {city && ` of ${city}${state && `, ${state}`}`}
      </p>
    </article>
  );
};

const storyQuery = gql`
  query covidExperiment($id: Int) {
    covidExperiment {
      post(id: $id) {
        id
        title
        content
        city
        state
        dateText
        authorName
        state
        postcode
        outsideAustralia
        age
      }
    }
  }
`;

CovidStory.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
};

export default CovidStory;
