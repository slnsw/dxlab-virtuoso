import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import LoaderText from '../LoaderText';
import DiaryFilesPost from '../DiaryFilesPost';

/* eslint-disable */
import css from '../DiaryFilesSearch/DiaryFilesSearch.module.scss';
/* eslint-enable */

const DiaryFilesSearch = ({ className, search }) => {
  // const idAsInt = parseInt(id, 10);
  const { loading, error, data } = useQuery(searchQuery, {
    variables: { term: search },
  });
  const posts = data && data.diaryFiles && data.diaryFiles.posts;
  // const { title, authorName, relatedPosts } = posts[0] || {};

  if (loading) {
    return <LoaderText />;
  }

  if (error) {
    // title === 'Hello World' ||
    return (
      <div className={[css.diaryFilesSearch, className || ''].join(' ')}>
        <h1>No stories found</h1>
      </div>
    );
  }

  return (
    <>
      <h2 className={css.sectionTitle}>
        <span>Search results for</span> '{search}'{' '}
        <span>[{posts.length} found]</span>
      </h2>

      {posts &&
        posts
          .sort((a, b) => a.id - b.id)
          .map((p, i) => {
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
                className={[css.diaryFilesSearch, className || ''].join(' ')}
                singleView={i === 0}
                hasReadMore={true}
                isLoading={loading}
              />
            );
          })}
    </>
  );
};

const searchQuery = gql`
  query diaryFiles($term: String!) {
    diaryFiles {
      posts(search: $term) {
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
        }
      }
    }
  }
`;

DiaryFilesSearch.propTypes = {
  className: PropTypes.string,
  term: PropTypes.string,
};

export default DiaryFilesSearch;
