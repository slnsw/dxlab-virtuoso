import { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import SocialMetaHead from '../SocialMetaHead';

import { buildHeadTitle } from '../../lib';

type Props = {
  title: string;
  children?: React.ReactNode;
  metaDescription?: string;
  metaImageUrl?: string;
  metaImageAlt?: string;
  metaImageWidth?: number;
  metaImageHeight?: number;
  className?: string;
};

class App extends Component<Props> {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    // pathname: PropTypes.string,
    // isLoading: PropTypes.bool,
    metaDescription: PropTypes.string,
    metaImageUrl: PropTypes.string,
    metaImageAlt: PropTypes.string,
    metaImageWidth: PropTypes.number,
    metaImageHeight: PropTypes.number,
    // headerMenuItems: PropTypes.array,
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
        // onScroll={this.handleOnScroll}
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
            href="https://fonts.googleapis.com/css?family=Barlow:300,300i,400,400i,500,500i,600"
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
