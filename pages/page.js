import { Component } from 'react';
// import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { initApolloClient } from '../lib/apollo';
import WebsiteApp from '../components/WebsiteApp';
import Masthead from '../components/Masthead';
import config from '../lib/config';

// import './post.css';

class Page extends Component {
  render() {
    const { title, router, content, excerpt, loading: isLoading } = this.props;
    const { pathname } = router;

    const slug = pathname.substr(1);
    const imageUrl = images[slug] ? images[slug].imageUrl : '';
    const caption = images[slug] ? images[slug].caption : '';

    return (
      <WebsiteApp
        pathname={`/${slug}`}
        isLoading={isLoading}
        title={title}
        metaDescription={excerpt}
        metaImageUrl={`${config.baseUrl}${imageUrl}`}
      >
        {!isLoading && (
          <Masthead
            title={title}
            backgroundImageUrl={imageUrl}
            slug={slug}
            caption={caption}
          />
        )}

        <article className="post antialiased container container--md">
          <div
            className="post__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </WebsiteApp>
    );
  }
}

export const pageQuery = gql`
  query Post($slug: String!) {
    pages(slug: $slug) {
      title
      excerpt
      content
    }
  }
`;

export const createGetStaticProps = (slug) => {
  return async () => {
    const client = initApolloClient();

    const { data } = await client.query({
      query: pageQuery,
      variables: {
        slug,
      },
    });

    const page = data.pages && data.pages[0];

    return {
      props: {
        ...data,
        ...page,
      },
    };
  };
};

export default Page;

const images = {
  about: {
    imageUrl: '/images/masthead-loom-bg.jpg',
    url: 'http://dxlab.sl.nsw.gov.au/loom',
    caption: 'Loom Index view',
  },
  experiments: {
    imageUrl: '/images/masthead-meridian-f.jpg',
    url: 'http://dxlab.sl.nsw.gov.au/meridian',
    caption: 'Meridian: Miranda Globe',
  },
  grants: {
    imageUrl: '/images/masthead-bookman.jpg',
    caption: 'Book projection',
  },
  code: {
    imageUrl: '/images/masthead-background-01.gif',
    url: 'http://dxlab.sl.nsw.gov.au/loom',
    caption: 'Loom Atlas View',
  },
  '80hz-sound-lab': {
    imageUrl: '/images/masthead-80hz.jpg',
    url: 'http://dxlab.sl.nsw.gov.au/80hz-sound-lab',
    caption: '80hz concept render',
  },
};
