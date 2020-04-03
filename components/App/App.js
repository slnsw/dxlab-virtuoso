import { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

// import Header from '../Header';
import SocialMetaHead from '../SocialMetaHead';
// import Footer from '../Footer';
// import Progress from '../Progress/Progress';

import { buildHeadTitle } from '../../lib';
// import { initGA } from '../../lib/analytics'; // logPageView

// import './App.css';
// import '../../styles/loader.css';

// const SCROLLTOP_THRESHOLD = 100;

class App extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    pathname: PropTypes.string,
    isLoading: PropTypes.bool,
    metaDescription: PropTypes.string,
    metaImageUrl: PropTypes.string,
    metaImageAlt: PropTypes.string,
    headerMenuItems: PropTypes.array,
    className: PropTypes.string,
  };

  render() {
    const {
      title,
      children,
      // pathname,
      // isLoading,
      metaDescription,
      metaImageUrl,
      metaImageAlt,
      metaImageWidth,
      metaImageHeight,
      // headerMenuItems,
      className,
      // metaUrl,
    } = this.props;

    // const baseUrl =
    //   process.env.DXLAB_WEBSITE_BASE_URL || 'https://dxlab.sl.nsw.gov.au';
    // const metaUrl = `${baseUrl}${pathname}`;

    return (
      <div
        className={['app', className || ''].join(' ')}
        onScroll={this.handleOnScroll}
      >
        <Head>
          {/* <meta httpEquiv="X-UA-Compatible" content="IE=edge" /> */}
          <title>{buildHeadTitle(title)}</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=1"
          />

          <link
            rel="shortcut icon"
            href="https://www.sl.nsw.gov.au/sites/all/themes/slnsw_frontend/favicon.ico"
            type="image/vnd.microsoft.icon"
          />

          <link
            href="https://fonts.googleapis.com/css?family=Lekton:400,400i,700"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Barlow:300,300i,400,400i,500,500i"
            rel="stylesheet"
          />
        </Head>

        <SocialMetaHead
          title={title}
          description={metaDescription}
          imageUrl={metaImageUrl}
          imageAlt={metaImageAlt}
          imageWidth={metaImageWidth}
          imageHeight={metaImageHeight}
          baseUrl="https://dxlab.sl.nsw.gov.au"
          siteName="DX Lab | State Library of NSW"
          fbAppId={process.env.DXLAB_WEBSITE_FB_APP_ID}
          twitterUsername="@statelibrarynsw"
        />

        {children}
      </div>
    );
  }
}

export default App;
