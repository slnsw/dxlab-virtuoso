import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import LoaderText from '../LoaderText';
import DiaryFilesPost from '../DiaryFilesPost';
import DiaryFilesSuggestedSearches from '../DiaryFilesSuggestedSearches';
import CTAButtonV2 from '../CTAButtonV2';

import css from './DiaryFilesSearch.module.scss';
import useDiaryFilesPostsQuery from '../../lib/hooks/use-diary-files-posts-query';

const DiaryFilesSearch = ({ className, search }) => {
  const [offset, setOffset] = React.useState(0);
  const [inputValue, setInputValue] = React.useState(search);

  React.useEffect(() => {
    setInputValue(search);
  }, [search]);

  const {
    status,
    posts,
    postTotal,
    hasMorePosts,
    error,
  } = useDiaryFilesPostsQuery({
    search,
    offset,
    skip: Boolean(!search),
  });

  const showPosts = status !== 'loading' || offset > 0;

  const handleInputChange = (event) => {
    setOffset(0);
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

      {status === 'loaded' && (
        <h2 className={css.sectionTitle}>
          <span>
            {posts.length === 0
              ? 'No entries found'
              : `${postTotal} results for`}
          </span>
          {posts.length > 0 && ` '${search}' `}
        </h2>
      )}

      {status === 'initial' && <DiaryFilesSuggestedSearches />}

      {showPosts &&
        posts
          // .sort((a, b) => a.id - b.id)
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
                isLoading={false}
              />
            );
          })}

      {status === 'loading' && <LoaderText className={css.loader} />}

      {status === 'loaded' && hasMorePosts && (
        <CTAButtonV2
          style={{
            width: '100%',
          }}
          // className={css.wideButton}
          onClick={() => {
            setOffset(posts.length);
          }}
        >
          Show more
        </CTAButtonV2>
      )}
    </div>
  );
};

DiaryFilesSearch.propTypes = {
  className: PropTypes.string,
  search: PropTypes.string,
};

export default DiaryFilesSearch;
