import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
// import InfiniteScroll from 'react-infinite-scroller';
// import Router from 'next/router';

import LoaderText from '../LoaderText';
import CTAButton from '../CTAButton';
import Link from '../Link';
import DiaryFilesPost from '../DiaryFilesPost';
import Typewriter from './Typewriter';
// import HenryLawsonPen from './HenryLawsonPen';

import css from './DiaryFilesHome.module.scss';

const DiaryFilesHome = ({ className, limit = 30 }) => {
  const { loading, error, data = { diaryFiles: { posts: [] } } } = useQuery(
    postsQuery,
    {
      variables: {
        offset: 0,
        limit: limit > 100 ? 100 : limit,
      },
    },
  );

  let status;

  if (error) {
    status = 'error';
  } else if (loading) {
    status = 'loading';
  } else {
    status = 'loaded';
  }

  const { diaryFiles } = data;
  const { posts } = diaryFiles;
  const hasMorePosts = posts.length < 100;

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

        <CTAButton href="/diary-files/write" className={css.mastheadButton}>
          Start writing
        </CTAButton>

        <br />

        <div className={css.mastheadMenu}>
          <p className={css.smallText}>
            <Link href="/diary-files/about">
              <a>About</a>
            </Link>
          </p>

          <div className={css.verticalDivider}></div>

          <p className={css.smallText}>
            <Link href="/diary-files/search">
              <a>Search</a>
            </Link>
          </p>
        </div>
      </div>

      <h2 className={css.sectionTitle}>Recent Entries</h2>

      {status === 'error' && <p>{error.message}</p>}

      {posts.map((post) => {
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
            isLoading={false}
          />
        );
      })}

      {status === 'loading' && (
        <LoaderText
          style={{
            textAlign: 'center',
          }}
        />
      )}

      {status === 'loaded' && hasMorePosts && (
        <CTAButton
          href={`/diary-files?limit=${limit + 20}`}
          scroll={false}
          replace={true}
        >
          Show more
        </CTAButton>
      )}
    </div>
  );
};

const postsQuery = gql`
  query getPosts($limit: Int, $offset: Int) {
    diaryFiles {
      posts(limit: $limit, offset: $offset) {
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
