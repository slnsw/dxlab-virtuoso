/**
 * Window scroll utility
 */
export function createWindowScrollTo(callback = null) {
  let currentTime = 0;
  let interval;

  return {
    start: (to, { duration = 5000, increment = 10 } = {}) => {
      const start = window.pageYOffset;
      const change = to - start;

      interval = setInterval(() => {
        currentTime += increment;

        window.scroll(0, easeInOutQuad(currentTime, start, change, duration));

        if (currentTime >= duration) {
          clearInterval(interval);

          if (typeof callback === 'function') {
            callback();
          }
        }
      }, increment);
    },
    stop: () => {
      clearInterval(interval);

      if (typeof callback === 'function') {
        callback();
      }
    },
    status: () => {
      return interval;
    },
  };
}

/**
 * Easing function easeInOutQuad.
 * @param t Current time.
 * @param b Start value.
 * @param c The change in value over the entire period.
 * @param d The total time of transition.
 */
const easeInOutQuad = (t, b, c, d) => {
  let tt = t;
  tt /= d / 2;
  if (tt < 1) return (c / 2) * tt * tt + b;
  tt -= 1;
  return (-c / 2) * (tt * (tt - 2) - 1) + b;
};
