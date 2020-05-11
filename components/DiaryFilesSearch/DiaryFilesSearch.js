import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import LoaderText from '../LoaderText';
import DiaryFilesPost from '../DiaryFilesPost';

import css from './DiaryFilesSearch.module.scss';

const DiaryFilesSearch = ({ className, search }) => {
  const [inputValue, setInputValue] = React.useState(search || '');

  const updateInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const { loading, error, data } = useQuery(searchQuery, {
    variables: { search, skip: Boolean(!search) },
  });
  const posts = search && data && data.diaryFiles && data.diaryFiles.posts;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { q } = e && e.target && e.target.elements;
    if (q && q.value) Router.push(`/diary-files/search?q=${q.value}`);
  };

  if (search && error) {
    // title === 'Hello World' ||
    return (
      <div className={[css.diaryFilesSearch, className || ''].join(' ')}>
        <h1>No stories found</h1>
      </div>
    );
  }

  return (
    <div className={css.diaryFilesSearch}>
      <h1>Search</h1>

      <form onSubmit={handleSubmit}>
        <div className={css.formSection}>
          <div
            className={[css.searchInput, search && css['termExists']].join(' ')}
          >
            <input
              name="q"
              aria-label="q"
              type="text"
              aria-required="true"
              placeholder={'Type something...'}
              value={inputValue}
              onChange={updateInputValue}
            />
          </div>
          <div className={css['submitButton']}>
            <button
              className="button"
              type="submit"
              aria-label="Submit Button."
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {loading && <LoaderText />}

      {search && posts && (
        <h2 className={css.sectionTitle}>
          <span>
            {posts.length === 0 ? 'No entries found' : 'Search results for'}
          </span>
          {posts && posts.length > 0 && ` '${search}' `}
          <span>{posts && posts.length > 0 && `[${posts.length} found]`}</span>
        </h2>
      )}

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
                singleView={false}
                hasReadMore={true}
                isLoading={loading}
              />
            );
          })}
    </div>
  );
};

const searchQuery = gql`
  query diaryFiles($search: String, $skip: Boolean!) {
    diaryFiles {
      posts(search: $search) @skip(if: $skip) {
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
  search: PropTypes.string,
};

export default DiaryFilesSearch;
