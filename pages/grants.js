import { Component } from 'react';

import Page, { createGetStaticProps } from './page';

class GrantsPage extends Component {
  render() {
    return <Page {...this.props} />;
  }
}

export const getStaticProps = createGetStaticProps('about');

export default GrantsPage;
