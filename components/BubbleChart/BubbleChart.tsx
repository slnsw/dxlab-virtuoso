import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import render from 'd3-render';

import useDimensions from '../../lib/hooks/use-dimensions';

import css from './BubbleChart.module.scss';

type Props = {
  data: {
    name: string;
    value: number;
  }[];
  height?: number;
  bubblePadding?: number;
  className?: string;
  renderBubble?: Function;
  onBubbleClick?: Function;
};

const BubbleChart: React.FC<Props> = ({
  data = [],
  height = 200,
  bubblePadding = 3,
  className,
  renderBubble,
  onBubbleClick,
  ...restProps
}) => {
  const [svgRef, dimensions, svgNode] = useDimensions();
  const { width } = dimensions;

  React.useEffect(() => {
    if (svgNode && data.length > 0 && width) {
      const root = pack(data, { width, height, padding: bubblePadding });

      const renderData = root.leaves().map((d, i) => {
        if (typeof renderBubble === 'function') {
          return renderBubble(d, i);
        }

        return {
          append: 'g',
          transform: `translate(${d.x},${d.y})`,
          children: [
            {
              append: 'circle',
              data: d.data,
              r: d.r,
              fill: 'var(--colour-primary)',
              onClick: onBubbleClick,
            },
            {
              append: 'text',
              fill: 'var(--colour-white)',
              text: d.data.name,
              y: (_, index, node) => `${index - node.length / 2 + 0.8}em`,
            },
          ],
        };
      });

      render(svgNode, renderData);
    }
  }, [
    svgNode,
    data,
    width,
    height,
    bubblePadding,
    renderBubble,
    onBubbleClick,
  ]);

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

function pack(data, { width, height, padding }) {
  return d3
    .pack()
    .size([width - 2, height - 2])
    .padding(padding)(d3.hierarchy({ children: data }).sum((d) => d.value));
}

BubbleChart.propTypes = {
  className: PropTypes.string,
};

export default BubbleChart;
