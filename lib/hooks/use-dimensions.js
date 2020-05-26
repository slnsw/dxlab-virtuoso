import { useState, useCallback, useEffect } from 'react';
// import { DimensionObject, UseDimensionsArgs, UseDimensionsHook } from "./types";

// https://github.com/Swizec/useDimensions/blob/master/src/index.ts

function getDimensionObject(node) {
  const rect = node.getBoundingClientRect();
  const { scrollWidth, scrollLeft } = node;

  return {
    width: rect.width,
    height: rect.height,
    top: 'x' in rect ? rect.x : rect.top,
    left: 'y' in rect ? rect.y : rect.left,
    x: 'x' in rect ? rect.x : rect.left,
    y: 'y' in rect ? rect.y : rect.top,
    right: rect.right,
    bottom: rect.bottom,
    scrollWidth,
    scrollLeft,
  };
}

function useDimensions({ liveMeasure = true } = {}) {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState(null);

  const ref = useCallback((refNode) => {
    setNode(refNode);
  }, []);

  // Was previously useLayoutEffect, but this was causing SSR issues.
  /* eslint-disable consistent-return */
  useEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node)),
        );
      measure();

      if (liveMeasure) {
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure);

        return () => {
          window.removeEventListener('resize', measure);
          window.removeEventListener('scroll', measure);
        };
      }
    }
  }, [liveMeasure, node]);
  /* eslint-enable consistent-return */

  return [ref, dimensions, node];
}

export default useDimensions;
