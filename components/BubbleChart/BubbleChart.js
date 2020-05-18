import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import render from 'd3-render';

import useDimensions from '../../lib/hooks/use-dimensions';

import css from './BubbleChart.module.scss';

// function format() {
//   return d3.format(",d")
// }

const BubbleChart = ({ data = [], height = 200, className, ...restProps }) => {
  const [svgRef, dimensions, svgNode] = useDimensions();
  const { width } = dimensions;

  React.useEffect(() => {
    if (svgNode && data.length > 0 && width) {
      const root = pack(data, width, height);

      // const svg = d3
      //   .create('svg')
      //   .attr('viewBox', [0, 0, width, height])
      //   .attr('font-size', 10)
      //   .attr('font-family', 'sans-serif')
      //   .attr('text-anchor', 'middle');

      const renderData = root.leaves().map((d) => {
        return {
          append: 'g',
          transform: `translate(${d.x + 1},${d.y + 1})`,
          children: [
            {
              append: 'circle',
              // id: (d.clipUid = DOM.uid('clip')).id,
              r: d.r,
              fill: 'var(--colour-primary)',
            },
            {
              append: 'clipPath',
              // id: (d.clipUid = DOM.uid('clip')).id,
              children: [
                {
                  append: 'use',
                  // 'xlink:href':
                },
              ],
            },
            {
              append: 'text',
              clipPath: d.clipUid,
              children: [
                {
                  append: 'tspan',
                  x: 0,
                  text: d.data.name,
                  // y:
                },
              ],
            },
          ],
        };
      });

      render(svgNode, renderData);
    }
  }, [svgNode, data, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={[css.bubbleChart, className || ''].join(' ')}
      {...restProps}
    />
  );
};

function pack(data, width, height) {
  return d3
    .pack()
    .size([width - 2, height - 2])
    .padding(3)(d3.hierarchy({ children: data }).sum((d) => d.value));
}

BubbleChart.propTypes = {
  className: PropTypes.string,
};

export default BubbleChart;
