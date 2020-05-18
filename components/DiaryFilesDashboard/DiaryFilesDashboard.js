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
  const wordsRef = React.useRef();

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

  React.useEffect(() => {
    if (wordsRef?.current) {
      if (data.wordsAndCounts) {
        const { wordsAndCounts } = data;

        const wordsData = wordsAndCounts.slice(0, 10);
        const width = 500;
        const height = 200;
        const margin = {
          top: 10,
          left: 40,
          right: 10,
          bottom: 10,
        };

        const x = d3
          .scaleBand()
          .domain(d3.range(wordsData.length))
          .range([margin.left, width - margin.right])
          .padding(0.1);

        const y = d3
          .scaleLinear()
          .domain([0, d3.max(wordsData, (d) => d.count)])
          .nice()
          .range([height - margin.bottom, margin.top]);

        const xAxis = d3
          .axisBottom(x)
          .tickFormat((i) => wordsData[i].word)
          .tickSizeOuter(0);

        const yAxis = (g) =>
          g
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, 's'))
            .call((selection) => selection.select('.domain').remove())
            .call((selection) =>
              selection
                .append('text')
                .attr('x', -margin.left)
                .attr('y', 10)
                .attr('fill', 'currentColor')
                .attr('text-anchor', 'start')
                .text(data.y),
            );

        render(wordsRef.current, [
          {
            append: 'g',
            fill: 'var(--colour-primary)',
            children: wordsData.map((d, i) => {
              return {
                append: 'rect',
                x: x(i),
                y: y(d.count),
                width: x.bandwidth(),
                height: y(0) - y(d.count),
              };
            }),
          },
        ]);

        const chart = d3.select(wordsRef.current);
        chart
          .append('g')
          .attr('transform', `translate(0, ${height - margin.bottom})`)
          .call(xAxis);
        chart.append('g').call(yAxis);
      }
    }

    // console.log(`${data.length} items retrieved from data.json`);
    // console.log(data?.postcodes);
  }, [data]);

  const wordsData = data && data.wordsAndCounts ? data.wordsAndCounts : [];

  // console.log({wordsData});

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

        {/* <svg width="500" height="300" ref={wordsRef}></svg> */}

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
