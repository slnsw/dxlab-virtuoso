// import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';

export const initGA = () => {
  if (process.env.GTM_ID) {
    const tagManagerArgs = {
      gtmId: process.env.GTM_ID,
    };
    TagManager.initialize(tagManagerArgs);
  }
};

/*
export const initGA = () => {
  if (process.env.GOOGLE_ANALYTICS_ID) {
    // console.log('GA init');
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID);
  }
};

export const logPageView = () => {
  if (process.env.GOOGLE_ANALYTICS_ID) {
    // console.log(
    //   `Logging pageview for ${window.location.pathname +
    //     window.location.search}`,
    // );
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
};

export const logEvent = (category = '', action = '', label = '') => {
  if (process.env.GOOGLE_ANALYTICS_ID) {
    if (category && action && label) {
      ReactGA.event({ category, action, label });
    }
  }
};

export const logException = (description = '', fatal = false) => {
  if (process.env.GOOGLE_ANALYTICS_ID) {
    if (description) {
      ReactGA.exception({ description, fatal });
    }
  }
};
*/
