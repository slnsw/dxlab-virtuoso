import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import LoaderText from '../LoaderText';

import css from './DiaryFilesSuggestedSearches.module.scss';

const DiaryFilesSuggestedSearches = ({ className }) => {
  const { data } = useQuery(suggestedSearchesQuery);
  const numberToShow = 5;
  const searches =
    data &&
    data.diaryFiles &&
    data.diaryFiles.pages &&
    data.diaryFiles.pages[0] &&
    data.diaryFiles.pages[0].content;
  let searchArray = searches && searches.split(/<[^>]+>(.+)<[^>]+>/i);
  let tempArray;
  if (searchArray) {
    searchArray = searchArray.filter((i) => i !== '\n' && i !== '');

    while (searchArray.length > numberToShow) {
      const randomIndex = Math.floor(Math.random() * searchArray.length) + 1;
      tempArray = searchArray
        .slice(0, randomIndex - 1)
        .concat(searchArray.slice(randomIndex, searchArray.length));
      searchArray = tempArray;
    }
  }
  if (!searchArray) {
    return <LoaderText className={css.loader} />;
  }
  return (
    <div className={[css.suggestedSearches, className].join(' ')}>
      <h2 className={css.sectionTitle}>Suggested searches</h2>

      {searchArray &&
        searchArray.map((search, i) => {
          return (
            <p key={i}>
              <a key={i} href={`/diary-files/search?q=${searchArray[i]}`}>
                {searchArray[i]}
              </a>
            </p>
          );
        })}
    </div>
  );
};

const suggestedSearchesQuery = gql`
  {
    diaryFiles {
      pages(slug: "suggested-searches") {
        content
      }
    }
  }
`;

DiaryFilesSuggestedSearches.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesSuggestedSearches;
