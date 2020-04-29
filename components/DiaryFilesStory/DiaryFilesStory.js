import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import LoaderText from '../LoaderText';
import DiaryFilesPost from '../DiaryFilesPost';

/* eslint-disable */
import css from '../DiaryFilesPost/DiaryFilesPost.module.scss';
/* eslint-enable */

const DiaryFilesStory = ({ className, id, singleView }) => {
  const idAsInt = parseInt(id, 10);
  const { loading, error, data } = useQuery(storyQuery, {
    variables: { id: idAsInt },
  });

  const post = data && data.diaryFiles && data.diaryFiles.post;

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
    relatedPosts,
  } = post || {};

  if (loading) {
    return <LoaderText />;
  }

  if (title === 'Hello World' || error) {
    return (
      <div className={[css.diaryFilesPost, className || ''].join(' ')}>
        <h1>No story found</h1>
      </div>
    );
  }

  return (
    <DiaryFilesPost
      id={id}
      content={content}
      dateText={dateText}
      authorName={authorName}
      city={city}
      state={state}
      age={age}
      postcode={postcode}
      outsideAustralia={outsideAustralia}
      className={[css.diaryFilesPost, className || ''].join(' ')}
      relatedPosts={relatedPosts}
      singleView={singleView}
    />
  );
};

const storyQuery = gql`
  query diaryFiles($id: Int!) {
    diaryFiles {
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
        # relatedPosts
      }
    }
  }
`;

DiaryFilesStory.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
};

export default DiaryFilesStory;
