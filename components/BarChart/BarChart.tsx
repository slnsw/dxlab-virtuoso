import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import render from 'd3-render';

import useDimensions from '../../lib/hooks/use-dimensions';

import css from './BarChart.module.scss';

type Props = {
  data: {
    name: string;
    value: number;
  };
  height?: number;
  margin?: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  direction?: 'vertical' | 'horizontal';
  rotateXAxis?: boolean;
  showValues?: boolean;
  id?: string;
  className?: string;
};

const BarChart: React.FC<Props> = ({
  data = [],
  // width: propWidth,
  height = 200,
  margin = {
    top: 10,
    left: 40,
    right: 10,
    bottom: 20,
  },
  direction = 'vertical',
  rotateXAxis = false,
  showValues = false,
  id = 'bar-chart',
  className,
  ...restProps
}) => {
  const [svgRef, dimensions, svgNode] = useDimensions();
  const { width } = dimensions;

  React.useEffect(() => {
    if (svgNode && data.length > 0 && width) {
      let x;
      let y;
      let xAxis;
      let yAxis;
      const maximum = d3.max(data, (d) => d.count);
      const svg = d3.select(svgNode);

      if (direction === 'vertical') {
        x = d3
          .scaleBand()
          .domain(d3.range(data.length))
          .range([margin.left, width - margin.right])
          .padding(0.1);

        y = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => d.count)])
          .nice()
          .range([height - margin.bottom, margin.top]);

        xAxis = d3
          .axisBottom(x)
          .tickFormat((i) => data[i].item || data[i].word)
          .tickSizeOuter(0);

        yAxis = (g) =>
          g
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, 's'))
            .call((selection) => selection.select('.domain').remove());

        render(svg, [
          {
            append: 'g',
            fill: 'var(--colour-primary)',
            children: data.map((d, i) => {
              return {
                append: 'g',
                children: [
                  {
                    append: 'rect',
                    x: x(i),
                    y: y(d.count),
                    width: x.bandwidth(),
                    height: y(0) - y(d.count),
                  },
                  {
                    append: 'text',
                    text: showValues && d.count,
                    x: x(i) + x.bandwidth() / 2,
                    y: y(d.count) - 6,
                    style: { fill: 'white', textAnchor: 'middle' },
                  },
                ],
              };
            }),
          },
          {
            append: 'g',
            class: 'x-axis',
            key: width,
            transform: `translate(0, ${height - margin.bottom})`,
            call: xAxis,
          },
          {
            append: 'g',
            call: yAxis,
          },
        ]);

        if (rotateXAxis) {
          d3.selectAll(`#${id} .x-axis text`)
            .style('text-anchor', 'end')
            .attr('dx', '-1em')
            .attr('dy', '-.5em')
            .attr('transform', 'rotate(-90)');
        }
      } else {
        y = d3
          .scaleOrdinal()
          .domain(data.map((d) => d.item))
          .range(
            data.map(
              (_, i) =>
                ((height - margin.top - margin.bottom) / data.length) * i +
                margin.top,
            ),
          );

        x = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => d.count)])
          .range([margin.left, width - margin.right]);

        xAxis = d3.axisBottom(x);

        yAxis = (g) =>
          g
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, 's'));

        render(svg, [
          {
            append: 'g',
            fill: 'var(--colour-primary)',
            children: data.map((d, i) => {
              return {
                append: 'rect',
                x: margin.left + 1,
                y:
                  ((height - margin.top - margin.bottom) / data.length) * i +
                  margin.top / 2,
                width:
                  (d.count / maximum) * (width - margin.left - margin.right),
                height: (height - margin.top - margin.bottom) / data.length - 1,
              };
            }),
          },
          {
            append: 'g',
            key: width,
            transform: `translate(0, ${height - margin.bottom})`,
            call: xAxis,
          },
          {
            append: 'g',
            call: yAxis,
          },
        ]);
      }
    }
  }, [svgNode, data, width, height, margin, id, showValues, direction]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      id={id}
      className={[css.barChart, className || ''].join(' ')}
      {...restProps}
    />
  );
};

BarChart.propTypes = {
  className: PropTypes.string,
};

export default BarChart;
