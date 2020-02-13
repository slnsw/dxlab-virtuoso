import { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { PhotoSwipeGallery } from 'react-photoswipe';
import Head from 'next/head';

import { withApollo } from '../../lib/apollo';
import CollectionApp from '../../components/CollectionApp';
import Table from '../../components/Table';
import Link from '../../components/Link';
import ShareBox from '../../components/ShareBox';
import LoaderText from '../../components/LoaderText';
import RelatedCollectionItems from '../../components/RelatedCollectionItems';
import CollectionParts from '../../components/CollectionParts';
import './item.css';

const NUMBER_OF_THUMBNAILS = 5;

class CollectionItemPage extends Component {
  static defaultProps = {
    url: {},
    item: {
      holdings: [],
    },
  };

  constructor() {
    super();

    this.state = {
      images: [],
    };
  }

  render() {
    const { loading: isLoading, item, router } = this.props;
    const { asPath, pathname } = router;

    const images =
      item &&
      item.images &&
      item.images.length > 0 &&
      item.images.map((image, i) => {
        return {
          i,
          src: image.url,
          w: image.width,
          h: image.height,
          title: image.fileNumber ? `File Number: ${image.fileNumber}` : null,
        };
      });

    return (
      <CollectionApp
        pathname={asPath}
        isLoading={isLoading}
        title={item.title}
        metaImageUrl={images && images[0].src}
        metaDescription={item.description || item.physicalDescription}
      >
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="/styles/photoswipe.css"
          />
        </Head>

        {item && (
          <Fragment>
            <div className="collection-item-page">
              <div className=" container container--lg">
                {/* <button
              className="collection-item-page__back-button"
              onClick={() => window.history.back()}
            >
              <span className="slnsw-icon-ArrowheadLeft" /> Back to search
            </button> */}

                {item.id === 'SLNSW_ALMA21124805750002626' && (
                  <iframe
                    width="100%"
                    height="600"
                    src="https://www.youtube.com/embed/ARMz5c7yonk"
                    frameBorder="0"
                    title={`${item.title} video`}
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                    style={{ marginBottom: '2em' }}
                  />
                )}

                {item.id === 'ADLIB110335247' && (
                  <iframe
                    allowfullscreen
                    frameBorder="0"
                    width="100%"
                    height="600"
                    title={`${item.title} Google Cultural Institute embed`}
                    src="https://embed.culturalspot.org/embed/asset-viewer/uwETHdJSqlHCpw"
                  />
                )}

                {item.id !== 'ADLIB110335247' && images && images.length > 0 && (
                  <PhotoSwipeGallery
                    className="collection-item-page__gallery"
                    items={images}
                    options={{
                      // https://github.com/minhtranite/react-photoswipe/issues/35
                      history: false,
                    }}
                    thumbnailContent={(image) => {
                      return (
                        <span>
                          {images.length > NUMBER_OF_THUMBNAILS + 1 &&
                            image.i === NUMBER_OF_THUMBNAILS && (
                              <div>
                                + {images.length - NUMBER_OF_THUMBNAILS}
                              </div>
                            )}
                          <img
                            src={image.src}
                            className="collection-item-page__image"
                            alt="This should be something meaningful"
                          />
                        </span>
                      );
                    }}
                  />
                )}
              </div>

              <div className=" container container--md">
                <p className="collection-item-page__id">{item.type}</p>
                <h1 className="collection-item-page__title">{item.title}</h1>

                <div className="collection-item-page__data">
                  <Table
                    className="collection-item-page__table"
                    items={[
                      {
                        name: 'ID',
                        value: item.sourceRecordId,
                      },
                      {
                        name: 'Source',
                        value: item.sourceId,
                      },
                      {
                        name: 'Date',
                        value: item.creationDate,
                      },
                      item.creator && {
                        name: 'Creator',
                        value: item.creator,
                        url: `../search?facets=creator,${encodeURIComponent(
                          item.creator,
                        )}`,
                      },
                      item.dewey && {
                        name: 'Dewey',
                        value: item.dewey,
                      },
                      item.callNumber && {
                        name: 'Call Number',
                        value: item.callNumber,
                      },
                      item.isbn && {
                        name: 'ISBN',
                        value: item.isbn,
                      },
                      item.publisher && {
                        name: 'Publisher',
                        value: item.publisher,
                      },
                      item.referenceCode && {
                        name: 'Reference Code',
                        value: item.referenceCode,
                      },
                    ]}
                  />

                  {item.holdings.length > 0 && (
                    <div className="collection-item-page__holdings">
                      {item.holdings.map((holding, i) => {
                        return (
                          <div key={`holding-${i}`}>
                            {holding.mainLocation === 'slnsw' ? (
                              <strong>State Library of NSW</strong>
                            ) : (
                              'Other'
                            )}
                            <p className="collection-item-page__holdings__sub-location">
                              {holding.subLocation}
                            </p>
                            <p>1 copy, 1 available, 0 requests</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {(item.description || item.physicalDescription) && (
                  <div>
                    <h2 className="collection-item-page__heading">
                      Description
                    </h2>

                    {item.description && (
                      <p
                        className="collection-item-page__text collection-item-page__text--lg"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    )}

                    {item.physicalDescription && (
                      <p
                        className="collection-item-page__text collection-item-page__text--lg"
                        dangerouslySetInnerHTML={{
                          __html: item.physicalDescription,
                        }}
                      />
                    )}
                  </div>
                )}

                {item.history && (
                  <div>
                    <h2 className="collection-item-page__heading">History</h2>

                    <p
                      className="collection-item-page__text collection-item-page__text--lg"
                      dangerouslySetInnerHTML={{ __html: item.history }}
                    />
                  </div>
                )}

                {item.notes && (
                  <div>
                    <h2 className="collection-item-page__heading">Notes</h2>
                    <p
                      className="collection-item-page__text"
                      dangerouslySetInnerHTML={{ __html: item.notes }}
                    />
                  </div>
                )}

                {item.copyright && (
                  <div>
                    <h2 className="collection-item-page__heading">Copyright</h2>

                    <p className="collection-item-page__text">
                      {item.copyright}
                    </p>
                  </div>
                )}

                {item.accessConditions && (
                  <div>
                    <div>
                      <h2 className="collection-item-page__heading">
                        Access Conditions
                      </h2>

                      <p
                        className="collection-item-page__text"
                        dangerouslySetInnerHTML={{
                          __html: item.accessConditions,
                        }}
                      />
                    </div>
                  </div>
                )}

                {item.subjects && (
                  <Fragment>
                    <h2 className="collection-item-page__heading">Subjects</h2>
                    {item.subjects &&
                      item.subjects.map((subject) => (
                        <Link key={`tag-${subject}`}>
                          <a
                            className="tag"
                            href={`../search?facets=topic,${encodeURIComponent(
                              subject,
                            )}`}
                          >
                            {subject}
                          </a>
                        </Link>
                      ))}

                    <br />
                    <br />
                  </Fragment>
                )}

                {item.projects && (
                  <div className="collection-item-page__projects">
                    {item.projects.map((project) => {
                      return (
                        <article className="collection-item-page__project">
                          <Link to={project.url}>
                            <a>
                              <h2>{project.type}</h2>
                              <h1>{project.title}</h1>

                              <div className="collection-item-page__project__content">
                                {project.imageUrl && (
                                  <div className="collection-item-page__project__image-holder">
                                    <img
                                      src={project.imageUrl}
                                      alt={project.title}
                                    />
                                  </div>
                                )}
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: project.description,
                                  }}
                                />
                              </div>
                            </a>
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                )}

                {item.parts && item.parts.length > 0 && (
                  <Fragment>
                    <h2>Hierarchy</h2>
                    {isLoading ? (
                      <LoaderText />
                    ) : (
                      <CollectionParts id={+item.id.replace('ADLIB', '')} />
                    )}
                  </Fragment>
                )}

                <ShareBox pathname={pathname} title={item.title} />

                {item.relatedItems && (
                  <RelatedCollectionItems items={item.relatedItems} />
                )}
              </div>
            </div>
          </Fragment>
        )}
      </CollectionApp>
    );
  }
}

const query = gql`
  query Search($id: String) {
    primoRecord(id: $id) {
      id
      sourceId
      sourceRecordId
      referenceCode
      dewey
      callNumber
      isbn
      publisher
      creationDate
      holdings {
        mainLocation
        subLocation
        status
      }
      title
      type
      description
      physicalDescription
      creator
      subjects
      exhibitions
      source
      history
      notes
      copyright
      accessConditions
      images(size: FULL, limit: 100) {
        url
        width
        height
        fileNumber
      }
      subjects
      relatedItems(limit: 4) {
        id
        title
        type
        images(size: FULL, limit: 1) {
          url
        }
      }
      parts {
        id
        title
        level
        images {
          url
        }
        parts {
          id
          title
          level
          images {
            url
          }
        }
      }
      projects {
        title
        type
        url
        imageUrl
        description
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withApollo(
  graphql(query, {
    options: ({
      router: {
        query: { item },
      },
    }) => {
      return {
        variables: {
          id: item,
        },
      };
    },
    props: ({ data }) => {
      // console.log(data);
      return {
        ...data,
        item: data.primoRecord,
      };
    },
  })(CollectionItemPage),
);
