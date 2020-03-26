import { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import Header from '../Header';
import SocialMetaHead from '../SocialMetaHead';
import Footer from '../Footer';

import { buildHeadTitle } from '../../lib';
import { initGA } from '../../lib/analytics'; // logPageView

// import './App.css';
// import '../../styles/loader.css';

const SCROLLTOP_THRESHOLD = 100;

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
  };

  static defaultProps = {
    headerMenuItems: [],
  };

  constructor() {
    super();

    this.state = {
      // isLoading: false,
      isHeaderBackgroundActive: false,
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleOnScroll);

    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }

    // logPageView();
  }

  // componentDidUpdate() {
  //   // console.log('componentDidUpdate', this.props.isLoading);
  //
  //   Router.onRouteChangeStart = () => {
  //     console.log('isLoading');
  //     this.setState({
  //       isLoading: true,
  //     });
  //   };
  // }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll = (event) => {
    if (event && event.srcElement && event.srcElement.scrollingElement) {
      const { scrollTop } = event.srcElement.scrollingElement;

      this.setState({
        isHeaderBackgroundActive: scrollTop > SCROLLTOP_THRESHOLD,
      });
    }
  };

  render() {
    const {
      title,
      children,
      pathname,
      isLoading,
      metaDescription,
      metaImageUrl,
      metaImageAlt,
      headerMenuItems,
      // metaUrl,
    } = this.props;

    // const baseUrl =
    //   process.env.DXLAB_WEBSITE_BASE_URL || 'https://dxlab.sl.nsw.gov.au';
    // const metaUrl = `${baseUrl}${pathname}`;

    return (
      <div className="app" onScroll={this.handleOnScroll}>
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
          // Add these when ready
          // imageWidth={metaImageWidth}
          // imageHeight={metaImageHeight}
          siteName="DX Lab | State Library of NSW"
          fbAppId={process.env.DXLAB_WEBSITE_FB_APP_ID}
          twitterUsername="@statelibrarynsw"
        />

        <Header pathname={pathname} menuItems={headerMenuItems} />
        {/*
          .header-bg is needed for tricky position: sticky css
          Includes line decoration for .primary-menu
        */}
        <div
          className={[
            'header-bg',
            this.state.isHeaderBackgroundActive ? 'is-active' : '',
          ].join(' ')}
        />

        <div
          className={`app__loading-screen ${isLoading &&
            'app__loading-screen--is-active'}`}
        >
          <div className="loader-wrapper">
            <div className="loader">
              <div className="ball" />
            </div>
          </div>
        </div>

        <main>{!isLoading && children}</main>

        <Footer pathname={pathname} />
      </div>
    );
  }
}

export default App;
