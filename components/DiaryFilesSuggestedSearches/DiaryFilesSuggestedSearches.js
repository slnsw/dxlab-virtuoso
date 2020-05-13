import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import LoaderText from '../LoaderText';
import Link from '../Link';

import css from './DiaryFilesSuggestedSearches.module.scss';

const DiaryFilesSuggestedSearches = ({ className }) => {
  const [searchArray, setSearchArray] = React.useState([]);
  const numberToShow = 5;

  const { data, loading, error } = useQuery(suggestedSearchesQuery);

  React.useEffect(() => {
    let tempArray;
    let newSearchArray = data?.diaryFiles?.pages[0]?.content
      ?.split(/<[^>]+>(.+)<[^>]+>/i)
      .filter((i) => i !== '\n' && i !== '');

    while (newSearchArray?.length > numberToShow) {
      const randomIndex = Math.floor(Math.random() * newSearchArray.length) + 1;
      tempArray = newSearchArray
        .slice(0, randomIndex - 1)
        .concat(newSearchArray.slice(randomIndex, newSearchArray.length));
      newSearchArray = tempArray;
    }
    setSearchArray(newSearchArray);
  }, [data]);

  if (error) {
    return null;
  }

  if (!error && (loading || !searchArray)) {
    return <LoaderText className={css.loader} />;
  }

  return (
    <div className={[css.suggestedSearches, className].join(' ')}>
      <h2 className={css.sectionTitle}>Suggestions</h2>

      {searchArray &&
        searchArray.map((search) => {
          return (
            <p key={search}>
              <Link href={`/diary-files/search?q=${search}`}>
                <a>{search}</a>
              </Link>
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
