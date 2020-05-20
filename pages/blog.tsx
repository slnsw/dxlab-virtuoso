import { Component } from 'react';
// import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// import InfiniteScroll from 'react-infinite-scroller';

import {
  // withApollo,
  initApolloClient,
} from '../lib/apollo';
import WebsiteApp from '../components/WebsiteApp';
import Masthead from '../components/Masthead';
import SimpleTile from '../components/SimpleTile';
import SectionTitle from '../components/SectionTitle';
// import LoaderText from '../components/LoaderText';
import { mapPostToTile } from '../lib';
import config from '../lib/config';

// import './blog.css';

const client = initApolloClient();

class Blog extends Component {
  render() {
    const {
      router,
      posts,
      // postTotal,
      // loading: isLoading,
      // loadMore,
    } = this.props;
    const { pathname } = router;

    return (
      <WebsiteApp
        pathname={pathname}
        // isLoading={isLoading}
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

          <div>
            {posts.map((post, i) => (
              <SimpleTile
                subtitle={post.date}
                title={post.title}
                url={`/blog/${post.slug}`}
                imageUrl={post.smallImageUrl}
                imageAltText={post.imageAltText}
                imageWidth={post.smallImageWidth}
                imageHeight={post.smallImageHeight}
                content={post.content}
                key={`tile-${i}`}
              />
            ))}
          </div>

          {/* {posts && (
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
          )} */}
        </div>
      </WebsiteApp>
    );
  }
}

const postsTotalQuery = gql`
  {
    postTotal
  }
`;

const postsQuery = gql`
  query Posts($offset: Int) {
    posts(limit: 20, offset: $offset) {
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
            width
            height
          }
        }
      }
    }
  }
`;

const fetchBlogPosts = async (expectedTotal = 0, currentLoaded = []) => {
  if (currentLoaded.length >= expectedTotal) {
    return currentLoaded;
  }

  try {
    const { data } = await client.query({
      query: postsQuery,
      variables: {
        offset: currentLoaded.length,
      },
    });

    const nextCurrentLoaded = currentLoaded.concat(data.posts);

    return fetchBlogPosts(expectedTotal, nextCurrentLoaded);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: postsTotalQuery,
  });

  const posts = await fetchBlogPosts(data.postTotal);

  return {
    props: {
      posts: posts.map((post) => mapPostToTile(post)),
    },
  };
};

export default Blog;

// export default withApollo(
//   graphql(postsQuery, {
//     options: () => {
//       return {
//         variables: {
//           offset: 0,
//         },
//       };
//     },
//     props: ({ data }) => {
//       return {
//         ...data,
//         posts:
//           data && data.posts && data.posts.map((post) => mapPostToTile(post)),
//         loadMore() {
//           return data.fetchMore({
//             variables: {
//               offset: data.posts.length,
//             },
//             updateQuery: (previousResult, { fetchMoreResult }) => {
//               if (!fetchMoreResult) {
//                 return previousResult;
//               }

//               return {
//                 ...previousResult,
//                 posts: [...previousResult.posts, ...fetchMoreResult.posts],
//               };
//             },
//           });
//         },
//       };
//     },
//   })(Blog),
// );
