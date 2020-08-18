import * as React from 'react';

export const useDocumentVisibility = (callback) => {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the visibility change listening.
  React.useEffect(() => {
    function tick(e) {
      savedCallback.current(e);
    }

    document.addEventListener('visibilitychange', tick);

    return () => {
      document.removeEventListener('visibilitychange', tick);
    };
  }, []);
};

// export default useDocumentVisibility;
