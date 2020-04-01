import { Component } from 'react';
// import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import WebsiteApp from '../components/WebsiteApp';
import Masthead from '../components/Masthead';
import MainTile from '../components/MainTile';
import SimpleTile from '../components/SimpleTile';
import SectionTitle from '../components/SectionTitle';
import CTAButton from '../components/CTAButton';

import { initApolloClient } from '../lib/apollo';
import { formatDate } from '../lib';
// import './index.css';
import config from '../lib/config';

class HomePage extends Component {
  static defaultProps = {
    router: {},
  };

  render() {
    const { router, posts, experiments, loading: isLoading } = this.props;
    const { pathname } = router;

    return (
      <WebsiteApp
        pathname={pathname}
        isLoading={isLoading}
        title="Home"
        metaDescription="The State Library of NSW's experimental innovation lab."
        metaImageUrl={`${config.baseUrl}/images/masthead-background-01.gif`}
      >
        <Masthead
          className="home-page__masthead--main"
          subtitle="Welcome to the DX Lab:"
          titleSmall="The State Library of NSW's"
          title="Experimental"
          titleHighlight="Innovation Lab"
          text="We build and support new ways of design thinking, experimentation and research with digital technologies."
          // sideText="Collaborate / Experiment / Create / Engage / Be Open / Surprise"
          // backgroundImageUrl="/images/masthead-background-01.gif"
          backgroundImageUrl="/images/masthead-field-of-view-a.jpg"
          slug="Experimental"
          size="lg"
          caption="Field of View: Point Cloud of Mitchell Library"
        />

        <div className="posts container container--lg">
          <SectionTitle>Latest</SectionTitle>

          <div className="home-page__main-tiles">
            {posts &&
              posts.slice(0, 3).map((post, i) => (
                <MainTile
                  title={post.title}
                  subtitle={post.date}
                  url={`/blog/${post.slug}`}
                  // target={post.experimentUrl ? '_blank' : ''}
                  primaryText="Read"
                  secondaryUrl={post.experimentUrl}
                  secondaryText="Launch"
                  secondaryTarget="_blank"
                  tertiaryText="Code"
                  tertiaryUrl={post.githubUrl}
                  tertiaryTarget="_blank"
                  imageUrl={
                    getTileSize(i) === '1x2'
                      ? post.tallImageUrl
                      : post.mediumImageUrl
                  }
                  imageAltText={post.imageAltText}
                  content={post.content}
                  size={getTileSize(i)}
                  key={`tile-${i}`}
                />
              ))}
          </div>

          <SectionTitle>More posts</SectionTitle>

          <div className="home-page__simple-posts">
            {posts &&
              posts
                .slice(3, 7)
                .map((post, i) => (
                  <SimpleTile
                    subtitle={post.date}
                    title={post.title}
                    url={`/blog/${post.slug}`}
                    imageUrl={post.mediumImageUrl}
                    imageAltText={post.imageAltText}
                    content={post.content}
                    key={`simple-tile-${i}`}
                  />
                ))}
          </div>

          <div className="home-page__button-holder">
            <CTAButton href="/blog">Read All Posts</CTAButton>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Masthead
          className="home-page__masthead--experiments"
          // subtitle="We make experiments"
          title="We make"
          titleHighlight="Experiments"
          backgroundImageUrl="/images/masthead-meridian-f.jpg"
          slug="We Make"
        />

        <div className="container container--lg">
          <SectionTitle>Check out our work!</SectionTitle>
          {experiments &&
            experiments.map((experiment, i) => (
              <MainTile
                title={experiment.title}
                subtitle={experiment.date}
                url={experiment.url}
                // showTitleCTAButton={true}
                target="_blank"
                primaryText="Launch"
                secondaryText="Read"
                secondaryUrl={experiment.blogUrl}
                secondaryTarget=""
                tertiaryText="Code"
                tertiaryUrl={experiment.githubUrl}
                tertiaryTarget="_blank"
                imageUrl={
                  getExperimentTileSize(i) === '1x2'
                    ? experiment.tallImageUrl
                    : experiment.mediumImageUrl
                }
                imageAltText={experiment.imageAltText}
                content={experiment.content}
                size={getExperimentTileSize(i)}
                key={`experiment-${i}`}
              />
            ))}

          <div className="home-page__button-holder">
            <CTAButton href="/experiments">All Experiments</CTAButton>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />

        <Masthead
          className="home-page__masthead--grants"
          title="We run"
          titleHighlight="Grants"
          text="To support creative and innovative thinking we offer dedicated digital grants, including the DX Lab Fellowship and the Digital Learning Fellowship."
          backgroundImageUrl="/images/masthead-bookman.jpg"
          slug="We run"
        />

        <div className="container container--lg">
          <div className="home-page__button-holder">
            <CTAButton href="/grants">Read about our grants</CTAButton>
          </div>
        </div>
      </WebsiteApp>
    );
  }
}

function getTileSize(index) {
  if (index === 0 || index === 5) {
    return '1x2';
    // } else if (index === 3) {
    //   return '2x1';
  }
}

function getExperimentTileSize(index) {
  let size;
  if (index === 0 || index === 5) {
    size = '1x2';
  } else if (index === 3) {
    size = '2x1';
  }
  return size;
}

const homeQuery = gql`
  query {
    posts(limit: 13) {
      title
      slug
      excerpt
      date
      experiments {
        url
        githubUrl
      }
      featuredMedia {
        altText
        caption
        sizes {
          tallTile {
            sourceUrl
          }
          mediumTile {
            sourceUrl
          }
          full {
            sourceUrl
          }
        }
      }
    }
    experiments(limit: 3) {
      title
      slug
      excerpt
      date
      url
      githubUrl
      posts {
        slug
      }
      featuredMedia {
        altText
        caption
        sizes {
          tallTile {
            sourceUrl
          }
          mediumTile {
            sourceUrl
          }
          full {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const getStaticProps = async () => {
  const client = initApolloClient();

  const { data } = await client.query({
    query: homeQuery,
  });

  return {
    props: {
      // ...data,
      posts:
        data &&
        data.posts &&
        data.posts.map((item) => {
          return {
            ...mapItemToTile(item),
            experimentUrl:
              item.experiments &&
              item.experiments[0] &&
              item.experiments[0].url,
            githubUrl:
              item.experiments &&
              item.experiments[0] &&
              item.experiments[0].githubUrl,
          };
        }),
      experiments:
        data.experiments &&
        data.experiments.map((item) => {
          return {
            ...mapItemToTile(item),
            url: item.url,
            blogUrl: item.posts[0] && `/blog/${item.posts[0].slug}`,
            githubUrl: item.githubUrl,
          };
        }),
    },
  };
};

export default HomePage;

// TODO: Move to lib
function mapItemToTile(item) {
  return {
    title: item.title,
    content: item.excerpt,
    slug: item.slug,
    tallImageUrl:
      item.featuredMedia && item.featuredMedia.sizes.tallTile.sourceUrl,
    mediumImageUrl:
      item.featuredMedia && item.featuredMedia.sizes.mediumTile.sourceUrl,
    imageAltText: item.featuredMedia && item.featuredMedia.altText,
    date: formatDate(item.date),
  };
}
