/**
 * Window scroll utility
 * TODO: Make cancelable + X axis
 */
export function createWindowScrollTo() {
  let interval;

  function handleUserScroll() {
    removeListeners();
    clearInterval(interval);
  }

  function addListeners() {
    // document.addEventListener('mousewheel', handleUserScroll);
    document.addEventListener('wheel', handleUserScroll);
    document.addEventListener('touchmove', handleUserScroll);
    document.addEventListener('touchend', handleUserScroll);
  }

  function removeListeners() {
    // document.removeEventListener('mousewheel', handleUserScroll);
    document.removeEventListener('wheel', handleUserScroll);
    document.removeEventListener('touchmove', handleUserScroll);
    document.removeEventListener('touchend', handleUserScroll);
  }

  return {
    start: (to, { duration = 500, increment = 10, callback = null } = {}) => {
      addListeners();

      let currentTime = 0;
      const start = window.pageYOffset;
      const change = to - start;

      interval = setInterval(() => {
        currentTime += increment;

        window.scroll(0, easeInOutQuad(currentTime, start, change, duration));

        if (currentTime >= duration) {
          clearInterval(interval);
        }
      }, increment);

      const timeout = setTimeout(() => {
        if (typeof callback === 'function') {
          callback();
        }

        clearTimeout(timeout);
      }, duration);
    },
    stop: () => {
      removeListeners();
      clearInterval(interval);
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

export default createWindowScrollTo();
