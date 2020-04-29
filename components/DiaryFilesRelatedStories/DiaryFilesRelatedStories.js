import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import DiaryFilesPost from '../DiaryFilesPost';

/* eslint-disable */
import css from '../DiaryFilesRelatedStories/DiaryFilesRelatedStories.module.scss';
/* eslint-enable */

const DiaryFilesRelatedStories = ({ className, id }) => {
  const idAsInt = parseInt(id, 10);
  const {
    // loading,
    error,
    data,
  } = useQuery(storyQuery, {
    variables: { id: idAsInt },
  });

  const post = data && data.diaryFiles && data.diaryFiles.post;

  const {
    title,
    // content,
    // city,
    // state,
    // dateText,
    authorName,
    // postcode,
    // outsideAustralia,
    // age,
    relatedPosts,
  } = post || {};

  if (title === 'Hello World' || error) {
    return (
      <div
        className={[css.diaryFilesRelatedStories, className || ''].join(' ')}
      >
        <h1>No story found</h1>
      </div>
    );
  }

  return (
    <>
      <h2 className={css.sectionTitle}>All entries by {authorName}</h2>
      {/* <DiaryFilesPost
        key={id}
        id={id}
        content={content}
        dateText={dateText}
        authorName={authorName}
        city={city}
        state={state}
        age={age}
        postcode={postcode}
        outsideAustralia={outsideAustralia}
        className={[css.diaryFilesRelatedStories, className || ''].join(' ')}
        relatedPosts={null}
        singleView={true}
      /> */}
      {relatedPosts &&
        relatedPosts.map((p) => {
          return (
            <DiaryFilesPost
              key={p.id}
              id={p.id}
              content={p.content}
              dateText={p.dateText}
              authorName={p.authorName}
              city={p.city}
              state={p.state}
              age={p.age}
              postcode={p.postcode}
              outsideAustralia={p.outsideAustralia}
              className={[css.diaryFilesRelatedStories, className || ''].join(
                ' ',
              )}
              singleView={true}
            />
          );
        })}
    </>
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
        relatedPosts {
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
  }
`;

DiaryFilesRelatedStories.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
};

export default DiaryFilesRelatedStories;
