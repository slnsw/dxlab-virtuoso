// import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';

export const initGA = () => {
  if (process.env.DXLAB_WEBSITE_GTM_ID) {
    const tagManagerArgs = {
      gtmId: process.env.DXLAB_WEBSITE_GTM_ID,
    };
    TagManager.initialize(tagManagerArgs);
  }
};
