import { Component } from 'react';

import Page, { createGetStaticProps } from './page';

class SoundLabPage extends Component {
  render() {
    return <Page {...this.props} />;
  }
}

export const getStaticProps = createGetStaticProps('80hz-sound-lab');

export default SoundLabPage;
