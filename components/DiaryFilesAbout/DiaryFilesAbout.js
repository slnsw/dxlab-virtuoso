import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import css from './DiaryFilesAbout.module.scss';

const DiaryFilesAbout = ({ className }) => {
  const { data } = useQuery(aboutQuery);
  const page =
    data &&
    data.diaryFiles &&
    data.diaryFiles.pages &&
    data.diaryFiles.pages[0];

  const extraData = useQuery(aboutExtraQuery); // loading, error,
  const pageExtra =
    extraData &&
    extraData.data &&
    extraData.data.diaryFiles &&
    extraData.data.diaryFiles.pages &&
    extraData.data.diaryFiles.pages[0];
  // console.log(pageExtra);

  return (
    <article className={[css.diaryFilesAbout, className || ''].join(' ')}>
      <h1>{page && page.title}</h1>
      <div
        className={css.content}
        dangerouslySetInnerHTML={{ __html: page && page.content }}
      />
      <div
        className={css.diaryFilesAboutExtra}
        dangerouslySetInnerHTML={{ __html: pageExtra && pageExtra.content }}
      />
    </article>
  );
};

const aboutQuery = gql`
  {
    diaryFiles {
      pages(slug: "about") {
        id
        title
        content
      }
    }
  }
`;

const aboutExtraQuery = gql`
  {
    diaryFiles {
      pages(slug: "about-extra") {
        id
        title
        content
      }
    }
  }
`;

DiaryFilesAbout.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesAbout;
