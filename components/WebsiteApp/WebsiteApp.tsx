import { Component } from 'react';
import PropTypes from 'prop-types';

import App from '../App';
import Header from '../Header';
import Footer from '../Footer';
import Progress from '../Progress/Progress';

import { initGA } from '../../lib/analytics'; // logPageView

type Props = {
  title?: string;
  metaDescription?: string;
  metaImageUrl?: string;
  metaImageWidth?: number;
  metaImageHeight?: number;
  pathname?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
};

type State = {
  isHeaderBackgroundActive: boolean;
};

declare global {
  interface Window {
    GA_INITIALIZED: boolean;
  }
}

const HEADER_MENU_ITEMS = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Experiments', url: '/experiments' },
  { name: 'Blog', url: '/blog' },
  { name: 'Grants', url: '/grants' },
  { name: 'Code', url: '/code' },
  {
    name: (
      <span>
        <span className="primary-menu__divider">/</span>{' '}
        <span className="slnsw-icon-ZoomOL2" />
      </span>
    ),
    url: '/search',
    ariaLabel: 'search',
  },
];

const SCROLLTOP_THRESHOLD = 100;

class WebsiteApp extends Component<Props, State> {
  static propTypes = {
    title: PropTypes.string,
    metaDescription: PropTypes.string,
    metaImageUrl: PropTypes.string,
    metaImageWidth: PropTypes.number,
    metaImageHeight: PropTypes.number,
    pathname: PropTypes.string,
    isLoading: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    headerMenuItems: [],
  };

  constructor(props) {
    super(props);

    this.state = {
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
      metaDescription,
      metaImageUrl,
      metaImageWidth,
      metaImageHeight,
      pathname,
      isLoading,
      children,
    } = this.props;

    return (
      <App
        // pathname={pathname}
        // isLoading={isLoading}
        title={title}
        metaDescription={metaDescription}
        metaImageUrl={metaImageUrl}
        metaImageWidth={metaImageWidth}
        metaImageHeight={metaImageHeight}
        // headerMenuItems={HEADER_MENU_ITEMS}
        className="website-app"
      >
        <Header pathname={pathname} menuItems={HEADER_MENU_ITEMS} />
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

        <Progress />

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

        <Footer />
      </App>
    );
  }
}

export default WebsiteApp;
