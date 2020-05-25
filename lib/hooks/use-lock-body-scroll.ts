import { useEffect } from 'react';

export const useLockBodyScroll = (isActive = true) => {
  useEffect(() => {
    if (process.browser) {
      // Get original body overflow
      const originalStyle = window.getComputedStyle(document.body).overflow;

      if (isActive) {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
      } else {
        // Re-enable scrolling
        document.body.style.overflow = originalStyle;
      }

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isActive]);
};

// const $body = document.querySelector('body');
// let scrollPosition = 0;

// export const scrollLockEnable = () => {
//   scrollPosition = window.pageYOffset;
//   $body.style.overflow = 'hidden';
//   $body.style.position = 'fixed';
//   $body.style.top = `-${scrollPosition}px`;
//   $body.style.width = '100%';
// };

// export const scrollLockDisable = () => {
//   $body.style.removeProperty('overflow');
//   $body.style.removeProperty('position');
//   $body.style.removeProperty('top');
//   $body.style.removeProperty('width');
//   window.scrollTo(0, scrollPosition);
// };
