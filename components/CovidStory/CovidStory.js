import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import CovidPost from '../CovidPost';

/* eslint-disable */
import css from '../CovidPost/CovidPost.module.scss';
/* eslint-enable */

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
    postcode,
    outsideAustralia,
    age,
  } = post || {};

  if (title === 'Hello World' || error) {
    return (
      <div className={[css.covidPost, className || ''].join(' ')}>
        <h1>No story found</h1>
      </div>
    );
  }

  return (
    <CovidPost
      content={content}
      dateText={dateText}
      authorName={authorName}
      city={city}
      state={state}
      age={age}
      postcode={postcode}
      outsideAustralia={outsideAustralia}
      className={[css.covidPost, className || ''].join(' ')}
    />
  );
};

const storyQuery = gql`
  query covidExperiment($id: Int!) {
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
