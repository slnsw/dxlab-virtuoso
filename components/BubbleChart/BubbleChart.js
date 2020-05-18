import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import render from 'd3-render';

import useDimensions from '../../lib/hooks/use-dimensions';

import css from './BubbleChart.module.scss';

// function format() {
//   return d3.format(",d")
// }

const BubbleChart = ({
  data = [],
  height = 200,
  className,
  onBubbleClick,
  ...restProps
}) => {
  const [svgRef, dimensions, svgNode] = useDimensions();
  const { width } = dimensions;

  React.useEffect(() => {
    if (svgNode && data.length > 0 && width) {
      const root = pack(data, width, height);

      const renderData = root.leaves().map((d) => {
        // const clipUid = DOM.uid('clip');
        // console.log(clipUid);
        const text = d.data.name.split(/(?=[A-Z][a-z])|\s+/g);

        return {
          append: 'g',
          transform: `translate(${d.x + 1},${d.y + 1})`,
          children: [
            {
              append: 'circle',
              // id: (d.clipUid = DOM.uid('clip')).id,
              data: d.data,
              r: d.r,
              fill: 'var(--colour-primary)',
              onClick: onBubbleClick,
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
              fill: 'var(--colour-white)',
              // clipPath: d.clipUid,
              children: [
                {
                  append: 'tspan',
                  x: 0,
                  text,
                  y: (_, i, node) => `${i - node.length / 2 + 0.8}em`,
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
