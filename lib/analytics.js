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
