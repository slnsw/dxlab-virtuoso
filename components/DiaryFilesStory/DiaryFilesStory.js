import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import SocialMetaHead from '../SocialMetaHead';
import LoaderText from '../LoaderText';
import DiaryFilesPost from '../DiaryFilesPost';

/* eslint-disable */
import css from '../DiaryFilesPost/DiaryFilesPost.module.scss';
import { buildHeadTitle } from '../../lib';
import config from '../../lib/config';
/* eslint-enable */

const DiaryFilesStory = ({ className, id, singleView }) => {
  const idAsInt = parseInt(id, 10);
  const { loading, error, data } = useQuery(storyQuery, {
    variables: { id: idAsInt },
  });

  const post = data && data.diaryFiles && data.diaryFiles.post;

  const {
    title,
    content,
    city,
    state,
    dateText,
    authorName,
    postcode,
    outsideAustralia,
    age,
    relatedPosts,
  } = post || {};

  if (loading) {
    return <LoaderText />;
  }

  if (title === 'Hello World' || error) {
    return (
      <div className={[css.diaryFilesPost, className || ''].join(' ')}>
        <h1>No story found</h1>
      </div>
    );
  }

  const metaTitle = buildHeadTitle(
    `${dateText}, ${authorName} - The Diary Files`,
  );

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
      </Head>

      <SocialMetaHead
        title={metaTitle}
        description={content.replace(/<p>/g, '').replace(/<\/p>/g, '')}
        baseUrl={config.baseUrl}
      />

      <DiaryFilesPost
        id={id}
        content={content}
        dateText={dateText}
        authorName={authorName}
        city={city}
        state={state}
        age={age}
        postcode={postcode}
        outsideAustralia={outsideAustralia}
        className={[css.diaryFilesPost, className || ''].join(' ')}
        relatedPosts={relatedPosts}
        singleView={singleView}
        isLoading={loading}
      />
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
        # relatedPosts
      }
    }
  }
`;

DiaryFilesStory.propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
};

export default DiaryFilesStory;
