/**
 * Scroller Factory
 */

export const scroller = {
  // Pixel or sub-pixel amount to scroll
  increment: undefined,
  direction: 'forward',
  scrollCount: 0,
  element: undefined,
  max: undefined,
  requestId: undefined,
  axis: undefined,
  firstStart: true,
  scrollTimer: false,
  disableOnScroll: false,
  // Back and forth scrolling
  isPingPong: false,
  fps: 30,
  canScroll: false,
  init(
    element,
    // laidOutItems,
    {
      axis = 'y',
      increment = 0.4,
      isPingPong = false,
      fps = 30,
      onWait,
      onResume,
    } = {},
  ) {
    this.element = element;
    this.axis = axis;
    this.increment = increment;
    this.isPingPong = isPingPong;
    this.fps = fps;
    // Callbacks for when scroller waits for more elements to scroll towards
    this.onWait = onWait;
    this.onResume = onResume;

    // Work out size of element
    this.updateLaidOutItems(
      this.element.clientWidth,
      this.element.clientHeight,
    );

    // Listen for scroll events on element's parent
    // this.element.parentElement.addEventListener(
    this.element.addEventListener('scroll', this.handleUserScroll.bind(this));

    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();
    this.startTime = this.then;
  },
  updateLaidOutItems(maxX, maxY) {
    // const { maxX, maxY } = laidOutItems;

    if (this.axis === 'y') {
      this.max = maxY - window.innerHeight;
    } else if (this.axis === 'x') {
      this.max = maxX - window.innerWidth;
    }
  },
  updateIncrement(increment) {
    this.increment = increment;
  },
  step() {
    // Calculate elapsed time since last loop
    this.now = Date.now();
    this.elapsed = this.now - this.then;

    // If enough time has elapsed, draw the next frame
    if (this.elapsed > this.fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      this.then = this.now - (this.elapsed % this.fpsInterval);

      this.requestId = undefined;

      // Update max
      this.updateLaidOutItems(
        this.element.clientWidth,
        this.element.clientHeight,
      );
      // console.log(this.max, this.scrollCount, this.element.clientWidth);

      // Work out scroll amount
      // (Switch direction if needed)
      if (this.direction === 'forward') {
        // const { scrollLeft } = this.element.parentElement;
        const { scrollTop } = this.element;
        // console.log(scrollTop);

        // if (this.scrollCount >= this.max - scrollLeft && this.isPingPong) {
        //   this.scrollCount -= this.increment;
        //   this.direction = 'backward';
        // } else {

        // Work out whether there is enough space to keep scrolling
        const canScroll = this.scrollCount < this.max - scrollTop;

        // If not, increment by 0.
        this.scrollCount += canScroll ? this.increment : 0;

        console.log(this.scrollCount);

        if (canScroll && this.canScroll === false) {
          this.canScroll = true;

          if (typeof this.onResume === 'function') {
            this.onResume();
          }
        } else if (canScroll === false && this.canScroll === true) {
          this.canScroll = false;

          if (typeof this.onWait === 'function') {
            this.onWait();
          }
        }
        // }
      } else if (this.direction === 'backward') {
        if (this.scrollCount < 0 && this.isPingPong) {
          this.scrollCount += this.increment;
          this.direction = 'forward';
        } else {
          this.scrollCount -= this.increment;
        }
      }

      // Increment element
      // if (this.axis === 'y') {
      //   this.element.style.transform = `translateY(${this.scrollCount *
      //     -1}px) translateZ(0)`;
      // } else if (this.axis === 'x') {
      //   this.element.style.transform = `translateX(${this.scrollCount *
      //     -1}px) translateZ(0)`;

      // This works, but is very jittery on HiDef screens
      // Hence why we are using CSS translate and doing sneaky scrollLeft changes
      // on start and stop
      // this.element.parentElement.scrollLeft = this.scrollCount;
      // }

      // this.element.scrollTop = this.scrollCount;
      window.scroll(0, this.scrollCount);

      // NOTE: Disabled for now
      // Only allow animation if max width/height of element is larger than screen width/height
      // if (this.max > 0) {
      // this.start();
      // }
    }
    // this.start();

    this.requestId = window.requestAnimationFrame(this.step.bind(this));
  },
  start() {
    if (!this.requestId && this.element) {
      // Trigger only on first step iteration
      // if (this.firstStart) {
      // Set disableOnScroll here because changing scrollLeft will trigger scroll listener.
      // this.disableOnScroll = true;
      // Quickly move element scroll back to beginning
      // this.element.parentElement.scrollLeft = 0;
      // Sneakily offset this by using CSS translate
      // this.element.style.transform = `translate(${this.scrollCount * -1}px)`;

      // Ensure following steps do not trigger this block
      // this.firstStart = false;
      // }

      this.step();
      // this.requestId = window.requestAnimationFrame(this.step.bind(this));
    }
  },
  stop() {
    if (this.element && this.element.style) {
      window.cancelAnimationFrame(this.requestId);

      // Reinitialise state
      this.firstStart = true;
      this.requestId = undefined;

      // // Reset CSS transform
      // this.element.style.transform = `translate(0)`;

      // // Offset scroll by scrollCount, taking into account user scrolling during animation
      // this.element.parentElement.scrollLeft =
      //   this.scrollCount + this.element.parentElement.scrollLeft;

      // // Reset disableOnScroll back to normal
      // this.disableOnScroll = false;
    }
  },
  handleUserScroll(e) {
    // This is triggered by any scrollLeft changes
    // We do some sneaky scrolling, so we use the disableOnScroll flag to bypass the block
    // Can be fixed if there is a way to detect user vs code scrolling.
    if (this.disableOnScroll === false) {
      // Detect when scrolling is stopped, in particular momentum scrolling.
      if (this.scrollTimer) {
        // Keep on clearing timeout until scrolling stops
        window.clearTimeout(this.scrollTimer);
      }

      // If timeout triggers, it means that scrolling has stopped
      this.scrollTimer = window.setTimeout(() => this.onTimeout(e), 200);
    }
  },
  onTimeout(e) {
    // Track scrolling position so when scroll starts up again, we are in the right spot.
    this.scrollCount = e.target.scrollLeft;
  },
  getBoundingClientRect() {
    return this.element && this.element.getBoundingClientRect();
  },
  resetScrollCount(scrollCount = 0) {
    this.scrollCount = scrollCount;
    this.element.style.width = '1px';
  },
  adjustScrollCount(scrollCount = 0) {
    // this.scrollCount = this.scrollCount - scrollCount;
  },
};
