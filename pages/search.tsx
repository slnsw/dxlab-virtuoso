import { Component } from 'react';

import WebsiteApp from '../components/WebsiteApp';
import SearchModal from '../components/SearchModal';
import { withApollo } from '../lib/apollo';
import config from '../lib/config';

class SearchPage extends Component {
  render() {
    const { router, posts, loading: isLoading } = this.props;
    const { pathname, query } = router;

    return (
      <WebsiteApp
        pathname={pathname}
        isLoading={isLoading}
        title="Search"
        metaImageUrl={`${config.baseUrl}/images/masthead-search-terms-projection.jpg`}
      >
        <div className="search-page container container--md">
          <SearchModal posts={posts} q={query.q} isLoading />
        </div>
      </WebsiteApp>
    );
  }
}

export default withApollo(SearchPage);
