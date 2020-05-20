import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Router from 'next/router';

// import Link from '../Link';
import LoaderText from '../LoaderText';
import HenryLawsonPen from '../DiaryFilesHome/HenryLawsonPen';
import BubbleChart from '../BubbleChart';
// import CTAButtonV2 from '../CTAButtonV2';

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

  const agesData = data && data.agesGrouped ? data.agesGrouped : [];

  const statesData = data?.states?.map((p) => {
    return { item: p.item === '' ? 'Not supplied' : p.item, count: p.count };
  });
  return (
    <article className={[css.diaryFilesDashboard, className || ''].join(' ')}>
      <h1>Dashboard</h1>

      <a
        href="https://collection.sl.nsw.gov.au/record/YezdP8A9#26x6POGQkAdo0"
        target="_blank"
        rel="noopener noreferrer"
      >
        <HenryLawsonPen className={css.henryLawsonPen}></HenryLawsonPen>
      </a>
      {loading && (
        <LoaderText
          style={{
            textAlign: 'center',
          }}
        />
      )}

      <section>
        <h2>Popular words</h2>
        <p>
          <strong>{data.uniqueWordsCount}</strong> unique words used in{' '}
          <strong>{data.entriesCount}</strong> entries.
        </p>

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
            // TODO: Consider `provider` API like React Select
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
      </section>

      <section>
        <h2>Ages of contributors</h2>
        <p>Number of entries by age group</p>
        <BarChart
          data={agesData}
          direction={'vertical'}
          showValues={true}
          height={agesData.length * 20}
          margin={{ top: 10, left: 40, right: 10, bottom: 20 }}
        />
      </section>

      <section>
        <h2>States</h2>
        <p>Number of entries by state</p>
        <BarChart data={statesData} direction={'vertical'} showValues={true} />

        <p>
          {data?.overseasEntriesCount} entr
          {data?.overseasEntriesCount === 1 ? 'y' : 'ies'} from outside
          Australia
        </p>
      </section>
      <section>
        <h2>location</h2>
        <div style={{ border: '1px solid white', height: '400px' }}>
          MAP placeholder
        </div>
      </section>
    </article>
  );
};

DiaryFilesDashboard.propTypes = {
  className: PropTypes.string,
};

export default DiaryFilesDashboard;
