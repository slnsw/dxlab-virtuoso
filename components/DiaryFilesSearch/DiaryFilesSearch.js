import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { q } = e.target.elements;
    console.log(q);
    Router.push(`/diary-files/search?q=${q.value}`);
  };

  if (loading) {
    return <LoaderText />;
  }

  if (search && (error || posts.length === 0)) {
    // title === 'Hello World' ||
    return (
      <div className={[css.diaryFilesSearch, className || ''].join(' ')}>
        <h1>No stories found</h1>
      </div>
    );
  }

  if (!search) {
    return (
      <form onSubmit={handleSubmit}>
        <div
          className={`${css['diaryFilesForm__section']} ${css['diaryFilesForm__date']}`}
        >
          <label htmlFor="q">Search</label>
          <input
            name="q"
            aria-label="q"
            type="text"
            aria-required="true"
            placeholder="Type something..."
          />
        </div>
        <div className={css['diaryFilesForm__submitWrapper']}>
          <button className="button" type="submit" aria-label="Submit Button.">
            Search
          </button>
        </div>
      </form>
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
