import { Component } from 'react';
import Head from 'next/head';

import { buildHeadTitle } from '../../lib';

type Props = {
  title: string;
};

class HeadMeta extends Component<Props> {
  render() {
    const { title } = this.props;

    return (
      <Head>
        <title>{buildHeadTitle(title)}</title>
      </Head>
    );
  }
}

export default HeadMeta;
