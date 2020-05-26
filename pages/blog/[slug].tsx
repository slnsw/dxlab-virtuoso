import { Component } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from '@apollo/react-hooks';
// import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import WebsiteApp from '../../components/WebsiteApp';
import Image from '../../components/Image';
import ShareBox from '../../components/ShareBox';
import CTALink from '../../components/CTALink';
import Comments from '../../components/Comments';
import Four04 from '../_error';

import {
  // withApollo,
  initApolloClient,
} from '../../lib/apollo';
import { formatDate } from '../../lib';

const client = initApolloClient();

class Post extends Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    excerpt: PropTypes.string,
    featuredMedia: PropTypes.object,
    author: PropTypes.object,
    router: PropTypes.object,
    date: PropTypes.string,
    loading: PropTypes.bool,
    comments: PropTypes.array,
  };

  componentDidMount() {
    this.addModals();
  }

  componentWillUnmount() {
    this.removeModal();
  }

  addModals = () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.id = 'postModal';
    div.className = 'post__modal';
    div.innerHTML =
      '<span class="post__modal_close"><a>&times;</a></span><img id="postModalImg" src=""/>';

    const modal = document.getElementById('postModal');
    const modalImg = document.getElementById('postModalImg');
    const span = document.getElementsByClassName('post__modal_close')[0];

    span.onclick = function closeModal() {
      modal.style.display = 'none';
    };

    const imgDivs = document.getElementsByClassName('gallery-icon');
    for (let i = 0, len = imgDivs.length; i < len; i++) {
      const bigImgUrl = imgDivs[i].childNodes[1].href;
      const a = imgDivs[i].childNodes[1];
      // eslint-disable-next-line
      a.href = 'javascript:void(0)';
      a.setAttribute('aria-label', 'click to expand image');
      a.onclick = function openModal() {
        modalImg.src = bigImgUrl;
        modalImg.onclick = function closeModal() {
          modal.style.display = 'none';
        };
        modal.style.display = 'block';
      };
    }
  };

  removeModal = () => {
    const modalToKill = document.getElementById('postModal');
    if (modalToKill) {
      modalToKill.parentNode.removeChild(modalToKill);
    }
  };

  render() {
    const {
      id,
      title,
      content,
      excerpt,
      featuredMedia,
      author,
      date,
      // loading,
      comments,
      experiments,
      posts,
      router,
    } = this.props;

    // console.log(router);

    const featuredImageUrl =
      featuredMedia && featuredMedia.sizes?.full?.sourceUrl;
    const featuredImageDescription = featuredMedia && featuredMedia.description;
    const featuredImageWidth =
      featuredMedia && featuredMedia.sizes?.full?.width;
    const featuredImageHeight =
      featuredMedia && featuredMedia.sizes?.full?.height;
    const authorName = author && author.name;
    const experimentUrl = experiments && experiments[0] && experiments[0].url;
    const githubUrl = experiments && experiments[0] && experiments[0].githubUrl;
    const dateString = formatDate(date);

    if (posts && posts.length === 0) {
      return <Four04 />;
    }

    return (
      <ApolloProvider client={client}>
        <WebsiteApp
          isLoading={router?.isFallback}
          pathname={`/blog/${router.query.slug}`}
          title={title}
          metaDescription={excerpt}
          metaImageUrl={featuredImageUrl}
          metaImageAlt={featuredImageDescription}
          metaImageWidth={featuredImageWidth}
          metaImageHeight={featuredImageHeight}
        >
          <article className="post container container--md">
            <div>
              <div className="post__featured-image-holder">
                {/* <img
                  className="post__featured-image"
                  src={featuredImageUrl}
                  alt={featuredImageDescription}
                /> */}
                <Image
                  className="post__featured-image"
                  src={featuredImageUrl}
                  alt={featuredImageDescription}
                  width={featuredImageWidth}
                  height={featuredImageHeight}
                />
                <div className="post__date">{dateString}</div>
              </div>

              <header className="post__header">
                <h1 className="post__title">{title}</h1>
                <div className="post__author">
                  By <a href={`/search?q=${authorName}`}>{authorName}</a>
                </div>

                <div className="post__cta">
                  {experimentUrl && (
                    <CTALink href={experimentUrl} target="_blank">
                      Launch experiment
                    </CTALink>
                  )}
                  {githubUrl && (
                    <>
                      &#160;
                      <CTALink href={githubUrl} target="_blank">
                        Code
                      </CTALink>
                    </>
                  )}
                </div>
              </header>

              <div
                className="post__content"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              <ShareBox
                title={title}
                text={`${excerpt} #dxlab @statelibrarynsw`}
                pathname={`/blog/${router.query.slug}`}
              />

              <br />
              <br />
              <br />

              {id && <Comments postId={id} comments={comments} />}
            </div>
          </article>
        </WebsiteApp>
      </ApolloProvider>
    );
  }
}

const postQuery = gql`
  query Post($slug: String!) {
    posts(slug: $slug) {
      id
      title
      content
      excerpt
      featuredMedia {
        description
        sizes {
          full {
            sourceUrl
            width
            height
          }
        }
      }
      author {
        name
      }
      date
      comments {
        id
        content
        authorName
        date
        parentId
      }
      experiments {
        url
        githubUrl
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
// export default withApollo(
//   graphql(postQuery, {
//     options: ({
//       router: {
//         query: { slug },
//       },
//     }) => {
//       return {
//         variables: {
//           slug,
//         },
//       };
//     },
//     props: ({ data }) => {
//       const post = data.posts && data.posts[0];

//       return {
//         ...data,
//         ...post,
//       };
//     },
//   })(Post),
// );

// Attempt to get dynamic static site working
// When deployed, Zeit is unable to build fallback posts
const postsQuery = gql`
  query Posts {
    posts(limit: 5) {
      slug
    }
  }
`;

export const getStaticPaths = async () => {
  // console.log('getStaticPaths');
  // console.log(process.env.DXLAB_WEBSITE_GRAPHQL_URL);

  const { data } = await client.query({
    query: postsQuery,
  });

  // console.log(data);

  const paths = data.posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  // console.log(paths);

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  // console.log('getStaticProps');
  // console.log(process.env.DXLAB_WEBSITE_GRAPHQL_URL);
  // console.log(params);

  const { data } = await client.query({
    query: postQuery,
    variables: {
      slug: params.slug,
    },
  });

  // console.log(data);

  const post = data.posts && data.posts[0];

  return {
    props: { ...data, ...post },
  };
};

export default Post;
