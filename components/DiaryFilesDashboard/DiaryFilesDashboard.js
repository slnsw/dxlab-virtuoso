import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Router from 'next/router';

// import Link from '../Link';
import LoaderText from '../LoaderText';
// import HenryLawsonPen from '../DiaryFilesHome/HenryLawsonPen';
import BubbleChart from '../BubbleChart';
import CTAButtonV2 from '../CTAButtonV2';

import css from './DiaryFilesDashboard.module.scss';

const BarChart = dynamic(() => import('../BarChart'));

const DiaryFilesDashboard = ({ className }) => {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [popularWordsOffset, setPopularWordsOffset] = React.useState(16);

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
  const agesData =
    data && data.ages ? data.ages.sort((a, b) => b.item - a.item) : [];

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

      <section>
        <h2>Popular words</h2>

        <BubbleChart
          data={wordsData
            .slice(popularWordsOffset - 16, popularWordsOffset)
            .map((d) => {
              return {
                name: d.word,
                value: d.count,
              };
            })}
          height={400}
          className={css.popularWordsChart}
          renderBubble={(d) => {
            return {
              append: 'g',
              transform: `translate(${d.x},${d.y})`,
              duration: 1000,
              children: [
                {
                  append: 'circle',
                  data: d.data,
                  r: { enter: d.r, exit: 0 },
                  fill: 'var(--colour-primary)',
                  duration: 1000,
                  onClick: (_, circleData) =>
                    Router.push(
                      `/diary-files/search?q=${circleData.data.name}`,
                    ),
                },
                {
                  append: 'text',
                  key: d.data.name,
                  fill: 'var(--colour-white)',
                  fontWeight: 600,
                  text: d.data.name,
                  opacity: { enter: 1, exit: 0 },
                  duration: 1000,
                  y: '-0.2em',
                },
                {
                  append: 'text',
                  fill: 'var(--colour-white)',
                  text: d.data.value,
                  opacity: 0.8,
                  y: '0.9em',
                },
              ],
            };
          }}
          // onBubbleClick={(_, d) => {
          //   Router.push(`/diary-files/search?q=${d.data.name}`);
          // }}
        />

        <p>
          <CTAButtonV2
            disabled={popularWordsOffset - 16 <= 0}
            onClick={() => setPopularWordsOffset(popularWordsOffset - 16)}
          >
            Prev
          </CTAButtonV2>
          &#160; &#160;
          <CTAButtonV2
            disabled={popularWordsOffset + 16 >= wordsData.length}
            onClick={() => setPopularWordsOffset(popularWordsOffset + 16)}
          >
            Next
          </CTAButtonV2>
        </p>
        <p>
          <strong>{data.uniqueWordsCount}</strong> unique words used in{' '}
          <strong>{data.entriesCount}</strong> entries.
        </p>
      </section>

      <section>
        <h2>Entries by age</h2>

        <BarChart data={agesData.slice(0, 100)} />
      </section>

      {/* <div>
        <p>Entries by age</p>
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
      </div> */}

      <section>
        <h2>Cities</h2>
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
      </section>

      <section>
        <h2>Postcodes</h2>
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
      </section>

      <section>
        <h2>States</h2>
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
      </section>

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
