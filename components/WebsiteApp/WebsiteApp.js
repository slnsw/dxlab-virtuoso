import { Component } from 'react';
import PropTypes from 'prop-types';

// import './WebsiteApp.css';
import App from '../App';

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

class WebsiteApp extends Component {
  static propTypes = {
    title: PropTypes.string,
    metaDescription: PropTypes.string,
    metaImageUrl: PropTypes.string,
    metaImageWidth: PropTypes.number,
    metaImageHeight: PropTypes.number,
    pathname: PropTypes.string,
    isLoading: PropTypes.bool,
    // children: PropTypes.Component,
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
        pathname={pathname}
        isLoading={isLoading}
        title={title}
        metaDescription={metaDescription}
        metaImageUrl={metaImageUrl}
        metaImageWidth={metaImageWidth}
        metaImageHeight={metaImageHeight}
        headerMenuItems={HEADER_MENU_ITEMS}
      >
        {children}
      </App>
    );
  }
}

export default WebsiteApp;
