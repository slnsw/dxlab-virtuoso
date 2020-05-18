import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import * as d3 from 'd3';
import render from 'd3-render';
import dynamic from 'next/dynamic';
import Router from 'next/router';

import Link from '../Link';
import LoaderText from '../LoaderText';
// import HenryLawsonPen from '../DiaryFilesHome/HenryLawsonPen';
import BubbleChart from '../BubbleChart';

import css from './DiaryFilesDashboard.module.scss';

const BarChart = dynamic(() => import('../BarChart'));

const DiaryFilesDashboard = ({ className }) => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/data/diaryFilesDashboardData.json')
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const wordsData = data && data.wordsAndCounts ? data.wordsAndCounts : [];

  return (
    <article className={[css.diaryFilesDashboard, className || ''].join(' ')}>
      <h1>Dashboard</h1>

      {/* <HenryLawsonPen className={css.henryLawsonPen}></HenryLawsonPen> */}

      {loading && (
        <LoaderText
          style={{
            textAlign: 'center',
          }}
        />
      )}

      <div>
        <h2>Popular words</h2>

        <BubbleChart
          data={wordsData.slice(0, 20).map((d) => {
            return {
              name: d.word,
              value: d.count,
            };
          })}
          height={400}
          className={css.popularWordsChart}
          onBubbleClick={(_, d) => {
            Router.push(`/diary-files/search?q=${d.data.name}`);
          }}
        />

        <BarChart data={wordsData.slice(0, 10)} />

        <p>
          {data.uniqueWordsCount} unique words used in {data.entriesCount}{' '}
          entries.
        </p>
        <p>Most commonly used words</p>
        <ul>
          {data?.wordsAndCounts
            ?.sort((a, b) => b.count - a.count)
            .slice(0, 25)
            .map((p) => {
              return (
                p.word.length > 1 && (
                  <li key={p.word}>
                    <Link href={`/diary-files/search?q=${p.word}`}>
                      <a>{p.word}</a>
                    </Link>
                    <span> ({p.count})</span>
                  </li>
                )
              );
            })}
        </ul>
      </div>

      <div>
        <p>Ages</p>
        <ul>
          {data?.ages
            ?.sort((a, b) => b.count - a.count)
            .slice(0, 25)
            ?.map((p) => {
              return (
                <li key={p.item}>
                  {p.item === '' ? 'Not supplied' : p.item}{' '}
                  <span>({p.count})</span>
                </li>
              );
            })}
        </ul>
      </div>

      <div>
        <p>Cities</p>
        <ul>
          {data?.cities
            ?.sort((a, b) => b.count - a.count)
            .slice(0, 25)
            ?.map((p) => {
              return (
                <li key={p.item}>
                  {p.item === '' ? 'Not supplied' : p.item}{' '}
                  <span>({p.count})</span>
                </li>
              );
            })}
        </ul>
      </div>

      <div>
        <p>Postcodes</p>
        <ul>
          {data?.postcodes
            ?.sort((a, b) => b.count - a.count)
            .slice(0, 25)
            ?.map((p) => {
              return (
                <li key={p.item}>
                  {p.item === '0' ? 'Not supplied' : p.item}{' '}
                  <span>({p.count})</span>
                </li>
              );
            })}
        </ul>
      </div>

      <div>
        <p>States</p>
        <ul>
          {data?.states
            ?.sort((a, b) => b.count - a.count)
            .slice(0, 25)
            ?.map((p) => {
              return (
                <li key={p.item}>
                  {p.item === '' ? 'Not supplied' : p.item}{' '}
                  <span>({p.count})</span>
                </li>
              );
            })}
        </ul>
      </div>

      <div>
        <p>
          {data?.overseasEntriesCount} entr
          {data?.overseasEntriesCount === 1 ? 'y' : 'ies'} from outside
          Australia
        </p>
      </div>
    </article>
  );
};

DiaryFilesDashboard.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesDashboard;
