import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import css from './CovidAbout.module.scss';

const CovidAbout = ({ className }) => {
  const { data } = useQuery(aboutQuery); // loading, error,
  const page =
    data &&
    data.covidExperiment &&
    data.covidExperiment.pages &&
    data.covidExperiment.pages[0];

  return (
    <div className={[css.covidAbout, className || ''].join(' ')}>
      <h1>{page && page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page && page.content }} />
    </div>
  );
};

const aboutQuery = gql`
  {
    covidExperiment {
      pages(slug: "about") {
        id
        title
        content
      }
    }
  }
`;

CovidAbout.propTypes = {
  className: PropTypes.string,
};

export default CovidAbout;
