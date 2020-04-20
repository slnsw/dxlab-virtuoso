import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import LoaderText from '../LoaderText';
import CTAButton from '../CTAButton';
import DiaryFilesPost from '../DiaryFilesPost';
import Typewriter from './Typewriter';

import css from './DiaryFilesHome.module.scss';

const DiaryFilesHome = ({ className }) => {
  const { loading, error, data } = useQuery(postsQuery);

  if (loading) {
    return <LoaderText />;
  }

  if (error) {
    return error.message;
  }

  const { diaryFiles } = data;
  const { posts } = diaryFiles;
  console.log(posts);

  return (
    <div className={[css.diaryFilesHome, className || ''].join(' ')}>
      <div className={css.masthead}>
        <Typewriter />
        <p>Everyone has a story to tell</p>

        <CTAButton href="/diary-files/write" className={css.mastheadButton}>
          Start writing
        </CTAButton>
      </div>

      {posts.map((post) => {
        return (
          <DiaryFilesPost
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
          />
        );
      })}
    </div>
  );
};

const postsQuery = gql`
  {
    diaryFiles {
      posts {
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
      }
    }
  }
`;

DiaryFilesHome.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesHome;
