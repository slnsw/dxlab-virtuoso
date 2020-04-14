import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import css from './CovidAbout.module.scss';

const CovidAbout = ({ className }) => {
  const { loading, error, data } = useQuery(aboutQuery);

  return <div className={[css.covidAbout, className || ''].join(' ')}></div>;
};

const aboutQuery = gql`
  {
    covidExperiment {
      pages(slug: "about")
    }
  }
`;

CovidAbout.propTypes = {
  className: PropTypes.string,
};

export default CovidAbout;
