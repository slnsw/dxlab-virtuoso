import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import LoaderText from '../LoaderText';
import CTAButton from '../CTAButton';
import CTAButtonV2 from '../CTAButtonV2';
import Link from '../Link';
import DiaryFilesPost from '../DiaryFilesPost';
import Typewriter from './Typewriter';

import css from './DiaryFilesHome.module.scss';

const DiaryFilesHome = ({ className }) => {
  const [offset, setOffset] = React.useState(0);
  const {
    loading,
    error,
    data = { diaryFiles: { posts: [], postTotal: null } },
    fetchMore,
  } = useQuery(postsQuery, {
    variables: {
      offset: 0,
      limit: 20,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { diaryFiles } = data;
  const { posts, postTotal } = diaryFiles;
  const hasMorePosts = posts.length < postTotal;

  React.useEffect(() => {
    if (offset > 0) {
      fetchMore({
        variables: {
          offset,
          limit: 20,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          // Merge new posts with existing posts
          return {
            diaryFiles: {
              ...fetchMoreResult.diaryFiles,
              posts: [
                ...prev.diaryFiles.posts,
                ...fetchMoreResult.diaryFiles.posts,
              ],
            },
          };
        },
      });
    }
  }, [offset, fetchMore]);

  let status;

  if (error) {
    status = 'error';
  } else if (loading) {
    status = 'loading';
  } else {
    status = 'loaded';
  }

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
        <CTAButtonV2
          className={css.wideButton}
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
      postTotal
    }
  }
`;

DiaryFilesHome.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesHome;
