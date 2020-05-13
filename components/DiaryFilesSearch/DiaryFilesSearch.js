import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import LoaderText from '../LoaderText';
import DiaryFilesPost from '../DiaryFilesPost';
import DiaryFilesSuggestedSearches from '../DiaryFilesSuggestedSearches';

import css from './DiaryFilesSearch.module.scss';

const DiaryFilesSearch = ({ className, search }) => {
  const [inputValue, setInputValue] = React.useState(search);

  React.useEffect(() => {
    setInputValue(search);
  }, [search]);

  const {
    loading,
    error,
    data = { diaryFiles: { posts: [], postTotal: null } },
  } = useQuery(searchQuery, {
    variables: { search, skip: Boolean(!search) },
  });

  const { diaryFiles } = data;
  const { posts } = diaryFiles;

  let status;

  if (error) {
    status = 'error';
  } else if (loading) {
    status = 'loading';
  } else if (!search) {
    status = 'initial';
  } else {
    status = 'loaded';
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { q } = e && e.target && e.target.elements;
    if (q && q.value) Router.push(`/diary-files/search?q=${q.value}`);
  };

  return (
    <div className={css.diaryFilesSearch}>
      <h1>Search</h1>

      <form onSubmit={handleSubmit} role="search">
        <div className={css.formSection}>
          <div
            className={[
              css.searchInput,
              // search && css['termExists']
            ].join(' ')}
          >
            <input
              name="q"
              aria-label="Search"
              type="text"
              aria-required="true"
              placeholder={'Type something...'}
              value={inputValue || ''}
              onChange={handleInputChange}
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

      {status === 'error' && (
        <h2 className={css.sectionTitle}>Sorry there is an error: {error}</h2>
      )}

      {status === 'loading' && <LoaderText className={css.loader} />}

      {status === 'loaded' && (
        <h2 className={css.sectionTitle}>
          <span>
            {posts.length === 0
              ? 'No entries found'
              : `${posts.length} results for`}
          </span>
          {posts.length > 0 && ` '${search}' `}
        </h2>
      )}

      {status === 'initial' && <DiaryFilesSuggestedSearches />}

      {status === 'loaded' &&
        posts
          .sort((a, b) => a.id - b.id)
          .map((p) => {
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
                relatedPosts={p.relatedPosts}
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
      posts(search: $search, limit: 50) @skip(if: $skip) {
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
      postTotal(search: $search)
    }
  }
`;

DiaryFilesSearch.propTypes = {
  className: PropTypes.string,
  search: PropTypes.string,
};

export default DiaryFilesSearch;
