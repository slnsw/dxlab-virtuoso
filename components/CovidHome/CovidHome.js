import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import LoaderText from '../LoaderText';
import CTAButton from '../CTAButton';
import CovidPost from '../CovidPost';
import Typewriter from './Typewriter';

import css from './CovidHome.module.scss';

const CovidHome = ({ className }) => {
  const { loading, error, data } = useQuery(postsQuery);

  if (loading) {
    return <LoaderText />;
  }

  if (error) {
    return error.message;
  }

  const { covidExperiment } = data;
  const { posts } = covidExperiment;
  console.log(posts);

  return (
    <div className={[css.covidHome, className || ''].join(' ')}>
      <div className={css.masthead}>
        <Typewriter />
        <p>Everyone has a story to tell</p>

        <CTAButton href="/covid/write" className={css.mastheadButton}>
          Start writing
        </CTAButton>
      </div>

      {posts.map((post) => {
        return (
          <CovidPost
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
    covidExperiment {
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

CovidHome.propTypes = {
  className: PropTypes.string,
};

export default CovidHome;
