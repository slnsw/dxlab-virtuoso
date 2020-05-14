import React from 'react';
import PropTypes from 'prop-types';

import fetch from 'isomorphic-unfetch';

import LoaderText from '../LoaderText';
import HenryLawsonPen from '../DiaryFilesHome/HenryLawsonPen';

import css from './DiaryFilesDashboard.module.scss';

const DiaryFilesDashboard = ({ className }) => {
  const [text, setText] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/data/ages.json')
      .then((r) => r.json())
      .then((data) => {
        setText(processText(data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    console.log(`${text.length} items retrieved from data.json`);
  }, [text]);

  //   return { text, loading };
  // };

  function processText(t) {
    // return JSON.parse(t);
    return t;
  }

  return (
    <article className={[css.diaryFilesDashboard, className || ''].join(' ')}>
      <h1>Dashboard</h1>
      <HenryLawsonPen className={css.henryLawsonPen}></HenryLawsonPen>
      {loading && (
        <LoaderText
          style={{
            textAlign: 'center',
          }}
        />
      )}
      <div>{text}</div>
    </article>
  );
};

DiaryFilesDashboard.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesDashboard;
