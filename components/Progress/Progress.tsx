import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { NProgress } from '@tanem/react-nprogress';

import css from './Progress.module.scss';

const Progress = ({ className, loadingKey = 'n-progress' }) => {
  const [isRouteChanging, setIsRouteChanging] = React.useState(false);

  React.useEffect(() => {
    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);

    return function cleanUp() {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
  }, []);

  const routeChangeStart = () => {
    setIsRouteChanging(true);
  };

  const routeChangeEnd = () => {
    setIsRouteChanging(false);
  };

  // return <div className={['n-progress', className || ''].join(' ')}></div>;

  return (
    <NProgress isAnimating={isRouteChanging} key={loadingKey}>
      {({ isFinished, progress, animationDuration }) => (
        <div
          className={[className || ''].join(' ')}
          style={{
            opacity: isFinished ? 0 : 1,
            pointerEvents: 'none',
            transition: `opacity ${animationDuration}ms linear`,
          }}
        >
          <div
            className={css.bar}
            style={{
              marginLeft: `${(-1 + progress) * 100}%`,
              transition: `margin-left ${animationDuration}ms linear`,
            }}
          ></div>
        </div>
      )}
    </NProgress>
  );
};

Progress.propTypes = {
  className: PropTypes.string,
};

export default Progress;
