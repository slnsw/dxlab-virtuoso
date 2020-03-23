import { Component } from 'react';

import Page, { createGetStaticProps } from './page';

class CodePage extends Component {
  render() {
    return <Page {...this.props} />;
  }
}

export const getStaticProps = createGetStaticProps('code');

export default CodePage;
