import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import render from 'd3-render';

import useDimensions from '../../lib/hooks/use-dimensions';

import css from './BarChart.module.scss';

const BarChart = ({
  data = [],
  // width: propWidth,
  height = 200,
  margin = {
    top: 10,
    left: 40,
    right: 10,
    bottom: 20,
  },
  className,
  ...restProps
}) => {
  const [svgRef, dimensions, svgNode] = useDimensions();
  const { width } = dimensions;

  React.useEffect(() => {
    if (svgNode && data.length > 0 && width) {
      const x = d3
        .scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.count)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const xAxis = d3
        .axisBottom(x)
        .tickFormat((i) => data[i].item || data[i].word)
        .tickSizeOuter(0);

      const yAxis = (g) =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(null, 's'))
          .call((selection) => selection.select('.domain').remove());
      // .call((selection) =>
      //   selection
      //     .append('text')
      //     .attr('x', -margin.left)
      //     .attr('y', 10)
      //     .attr('fill', 'currentColor')
      //     .attr('text-anchor', 'start')
      //     .text(data.y),
      // );

      const svg = d3.select(svgNode);

      render(svg, [
        {
          append: 'g',
          fill: 'var(--colour-primary)',
          children: data.map((d, i) => {
            return {
              append: 'rect',
              x: x(i),
              y: y(d.count),
              width: x.bandwidth(),
              height: y(0) - y(d.count),
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
  }, [svgNode, data, width, height, margin]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={[css.barChart, className || ''].join(' ')}
      {...restProps}
    />
  );
};

BarChart.propTypes = {
  className: PropTypes.string,
};

export default BarChart;
