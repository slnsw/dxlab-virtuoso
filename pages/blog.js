import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';

import withData from '../lib/withData';
import App from '../components/App';
import Masthead from '../components/Masthead';
import SimpleTile from '../components/SimpleTile';
import SectionTitle from '../components/SectionTitle';
import { formatDate } from '../lib';

class Blog extends Component {

  render() {
    const {
      url,
      posts,
      loading: isLoading,
      loadMore,
    } = this.props;

    return (
      <App pathname={url.pathname} isLoading={isLoading}>

        <Masthead
          // subtitle="Welcome to the DX Lab:"
          title={(
            <div>
              BLOG<br/>
              <a href="https://twitter.com">#dxlab</a>
            </div>
          )}
          // text="We build and support new ways of design thinking, experimentation and deep research with digital technologies."
          backgroundImageUrl="/static/images/masthead-portico.jpg"
          slug="BLOG"
          size="md"
        />

        <div className="posts container container--lg">
          <SectionTitle title="Posts"></SectionTitle>

          {posts && (
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={posts.length < 46}
                loader={<div className="loader">Loading ...</div>}
            >
              {posts.map((post, i) => (
                <SimpleTile
                  subtitle={post.date}
                  title={post.title}
                  url={`/blog/${post.slug}`}
                  imageUrl={post.imageUrl}
                  imageAltText={post.imageAltText}
                  content={post.content}
                  key={`tile-${i}`}
                />
              ))}
            </InfiniteScroll>
          )}
        </div>

        {/* <style global jsx>{styles}</style> */}
      </App>
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
          full {
            sourceUrl
          }
        }
      }
    }
  }
`;

export default withData(graphql(query, {
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
      posts: data && data.posts && data.posts.map((post) => {
        return {
          title: post.title,
          date: formatDate(post.date),
          content: post.excerpt,
          slug: post.slug,
          imageUrl: post.featuredMedia && post.featuredMedia.sizes.full.sourceUrl,
          imageAltText: post.featuredMedia && post.featuredMedia.sizes.full.altText,
        };
      }),
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
})(Blog));
