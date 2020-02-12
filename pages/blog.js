import { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import InfiniteScroll from 'react-infinite-scroller';

import { withApollo } from '../lib/apollo';
import WebsiteApp from '../components/WebsiteApp';
import Masthead from '../components/Masthead';
import SimpleTile from '../components/SimpleTile';
import SectionTitle from '../components/SectionTitle';
import LoaderText from '../components/LoaderText';
import { mapPostToTile } from '../lib';
import config from '../lib/config';

import './blog.css';

class Blog extends Component {
  render() {
    const { url, posts, postTotal, loading: isLoading, loadMore } = this.props;

    return (
      <WebsiteApp
        pathname={url.pathname}
        isLoading={isLoading}
        title="Blog"
        metaImageUrl={`${config.baseUrl}/images/masthead-portico.jpg`}
      >
        <Masthead
          title="Blog"
          // titleHighlight="#DXLAB"
          backgroundImageUrl="/images/masthead-portico.jpg"
          slug="BLOG"
          size="md"
          caption="Portico"
        />

        <div className="blog__posts container container--lg">
          <SectionTitle>Read our posts</SectionTitle>

          {posts && (
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={posts.length < postTotal}
              loader={<LoaderText className="blog__loader" />}
            >
              {posts.map((post, i) => (
                <SimpleTile
                  subtitle={post.date}
                  title={post.title}
                  url={`/blog/${post.slug}`}
                  imageUrl={post.smallImageUrl}
                  imageAltText={post.imageAltText}
                  content={post.content}
                  key={`tile-${i}`}
                />
              ))}
            </InfiniteScroll>
          )}
        </div>
      </WebsiteApp>
    );
  }
}

// TODO: Create totalPosts field in Graphql
const query = gql`
  query Posts($offset: Int) {
    posts(limit: 10, offset: $offset) {
      title
      slug
      excerpt
      date
      featuredMedia {
        altText
        caption
        sizes {
          smallTile {
            sourceUrl
          }
        }
      }
    }
    postTotal
  }
`;

export default withApollo(
  graphql(query, {
    options: () => {
      return {
        variables: {
          offset: 0,
        },
      };
    },
    props: ({ data }) => {
      return {
        ...data,
        posts:
          data && data.posts && data.posts.map((post) => mapPostToTile(post)),
        loadMore() {
          return data.fetchMore({
            variables: {
              offset: data.posts.length,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }

              return {
                ...previousResult,
                posts: [...previousResult.posts, ...fetchMoreResult.posts],
              };
            },
          });
        },
      };
    },
  })(Blog),
);
