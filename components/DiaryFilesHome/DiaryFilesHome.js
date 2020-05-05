import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import LoaderText from '../LoaderText';
import CTAButton from '../CTAButton';
import Link from '../Link';
import DiaryFilesPost from '../DiaryFilesPost';
import Typewriter from './Typewriter';
// import HenryLawsonPen from './HenryLawsonPen';

import css from './DiaryFilesHome.module.scss';

const DiaryFilesHome = ({ className }) => {
  const { loading, error, data = { diaryFiles: {} } } = useQuery(postsQuery);

  let status;

  if (error) {
    status = 'error';
  } else if (loading) {
    status = 'loading';
  } else {
    status = 'loaded';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { q } = e && e.target && e.target.elements;
    if (q && q.value) Router.push(`/diary-files/search?q=${q.value}`);
  };

  const { diaryFiles } = data;
  const { posts } = diaryFiles;

  return (
    <div className={[css.diaryFilesHome, className || ''].join(' ')}>
      <div className={css.masthead}>
        <a
          href="https://collection.sl.nsw.gov.au/digital/Rao2vze3g6okP"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typewriter />
        </a>

        <p className={css.kicker}>Everyone has a story to tell</p>

        <CTAButton
          // onClick={() => setIsFormModalActive(true)}
          href="/diary-files/write"
          className={css.mastheadButton}
        >
          Start writing
        </CTAButton>

        <div className={css['formSection']}>
          <form onSubmit={handleSubmit}>
            <div className={css['searchInput']}>
              <input
                name="q"
                aria-label="q"
                type="text"
                aria-required="true"
                placeholder={'Type something...'}
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
          </form>
        </div>

        <div className={css.divider}></div>

        <div className={css.aboutLink}>
          <p className={css.smallText}>
            <Link href="/diary-files/about">
              <a>About this project</a>
            </Link>
          </p>
        </div>

        {/* <HenryLawsonPen className={css.henryLawsonPen} /> */}

        <div className={css.divider}></div>
      </div>

      <h2 className={css.sectionTitle}>Recent Entries</h2>

      {status === 'error' && error.message}

      {status === 'loading' && <LoaderText />}

      {status === 'loaded' &&
        posts.map((post) => {
          return (
            <DiaryFilesPost
              id={post.id}
              key={post.id}
              title={post.title}
              content={post.content}
              dateText={post.dateText}
              authorName={post.authorName}
              city={post.city}
              state={post.state}
              postcode={post.postcode}
              outsideAustralia={post.outsideAustralia}
              age={post.age}
              relatedPosts={post.relatedPosts}
              singleView={false}
              hasReadMore={true}
              isLoading={loading}
            />
          );
        })}
      {/* <Modal
        isActive={isFormModalActive}
        onClose={() => setIsFormModalActive(false)}
      >
        <div className={css.diaryFilesModalWrapper}>
          <DiaryFilesForm onClose={() => setIsFormModalActive(false)} />
        </div>
      </Modal> */}
    </div>
  );
};

const postsQuery = gql`
  {
    diaryFiles {
      posts(limit: 100) {
        id
        title
        content
        dateText
        authorName
        city
        state
        postcode
        outsideAustralia
        age
        relatedPosts {
          id
        }
      }
    }
  }
`;

DiaryFilesHome.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesHome;
