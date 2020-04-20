import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import css from './DiaryFilesAbout.module.scss';

const DiaryFilesAbout = ({ className }) => {
  const { data } = useQuery(aboutQuery); // loading, error,
  const page =
    data &&
    data.diaryFilesExperiment &&
    data.diaryFilesExperiment.pages &&
    data.diaryFilesExperiment.pages[0];

  return (
    <div className={[css.diaryFilesAbout, className || ''].join(' ')}>
      <h1>{page && page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page && page.content }} />
    </div>
  );
};

const aboutQuery = gql`
  {
    diaryFilesExperiment {
      pages(slug: "about") {
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
