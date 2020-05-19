import { Component } from 'react';
import PropTypes from 'prop-types';

import App from '../App';

const HEADER_MENU_ITEMS = [
  {
    name: (
      <span>
        Experimental Collection&nbsp;&nbsp;
        {/* <span className="slnsw-icon-ZoomOL2" /> */}
        <span className="primary-menu__divider">/</span>{' '}
      </span>
    ),
    url: '/collection',
    ariaLabel: 'collection',
  },
  // { name: 'Home', url: '/collection' },
  { name: 'Search', url: '/collection/search' },
];

class CollectionApp extends Component {
  static propTypes = {
    title: PropTypes.string,
    metaDescription: PropTypes.string,
    metaImageUrl: PropTypes.string,
    pathname: PropTypes.string,
    isLoading: PropTypes.bool,
    // children: PropTypes.Component,
  };

  render() {
    const {
      title,
      metaDescription,
      metaImageUrl,
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
        headerMenuItems={HEADER_MENU_ITEMS}
      >
        {children}
      </App>
    );
  }
}

export default CollectionApp;
