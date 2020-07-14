/**
 * Scroll controller for the window
 */
export const createWindowScroller = ({
  increment: initialIncrement = 0.4,
  fps = 60,
} = {}) => {
  let increment = initialIncrement;
  const fpsInterval = 1000 / fps;
  // Get complete height of window
  // https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
  const max = document.documentElement.scrollHeight;

  // Date variables to compute elapsed time
  let then = Date.now();
  let now;
  // RequestAnimationFrame id
  let requestId;
  let scrollCount = 0;
  let userTimeout;

  /**
   * Step function runs on every RAF loop
   */
  function step() {
    // Calculate elapsed time since last loop
    now = Date.now();
    const elapsed = now - then;

    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
      const { pageYOffset, innerHeight } = window;

      // Work out whether there is enough space to keep scrolling
      const canScroll = pageYOffset + innerHeight < max;
      // console.log(canScroll, pageYOffset, innerHeight, max);

      // If not, increment by 0.
      scrollCount += canScroll ? increment : 0;

      window.scroll(0, scrollCount);
    }

    requestId = window.requestAnimationFrame(step);
  }

  function start() {
    if (!requestId) {
      // Ensure page starts scrolling from current offset
      scrollCount = window.pageYOffset;

      // Add listeners for user scrolling
      // TODO: Add touch
      document.addEventListener('mousewheel', handleUserScroll);

      // Kick off step loop
      step();
    }
  }

  function stop() {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;

    destroy();
  }

  function updateIncrement(updatedIncrement) {
    increment = updatedIncrement;
  }

  function destroy() {
    document.removeEventListener('mousewheel', handleUserScroll);
  }

  /**
   * Handle any user interaction that causes scroll changes
   */
  function handleUserScroll(e) {
    // Detect when scrolling is stopped, in particular momentum scrolling.
    if (userTimeout) {
      // Keep on clearing timeout until scrolling stops
      window.clearTimeout(userTimeout);
    }

    stop();

    // If timeout triggers, it means that scrolling has stopped
    userTimeout = window.setTimeout(() => {
      // Track scrolling position so when scroll starts up again, we are in the right spot.
      scrollCount = window.pageYOffset;

      start();
    }, 200);
  }

  return {
    start,
    stop,
    updateIncrement,
    destroy,
  };
};
