import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { PhotoSwipeGallery } from 'react-photoswipe';
import Head from 'next/head';

import withData from '../../lib/withData';
import App from '../../components/App';
import Table from '../../components/Table';
import Link from '../../components/Link';
import ShareBox from '../../components/ShareBox';
import RelatedCollectionItems from '../../components/RelatedCollectionItems';
import './item.css';

class CollectionItemPage extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
    };
  }

  render() {
    const { loading: isLoading, item, url } = this.props;

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

    const numberOfThumbnails = 5;

    return (
      <App pathname="/search" isLoading={isLoading} title="Collection Item">
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/styles/photoswipe.css"
          />
        </Head>

        {item && (
          <div className="collection-item-page container container--md">
            <button
              className="collection-item-page__back-button"
              onClick={() => window.history.back()}
            >
              <span
                className="slnsw-icon-ArrowheadLeft"
                // style={{ fontSize: '2em', lineHeight: 1 }}
              />{' '}
              Back to search
            </button>

            {item.id === 'SLNSW_ALMA21124805750002626' && (
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/ARMz5c7yonk"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                style={{ marginBottom: '2em' }}
              />
            )}

            {item.id === 'ADLIB110335247' && (
              <iframe
                allowfullscreen
                frameborder="0"
                width="100%"
                height="600"
                src="https://embed.culturalspot.org/embed/asset-viewer/uwETHdJSqlHCpw"
              />
            )}

            {item.id !== 'ADLIB110335247' &&
              images &&
              images.length > 0 && (
                <PhotoSwipeGallery
                  className="collection-item-page__gallery"
                  items={images}
                  thumbnailContent={(image) => {
                    return (
                      <span>
                        {images.length > numberOfThumbnails + 1 &&
                          image.i === numberOfThumbnails && (
                            <div>+ {images.length - numberOfThumbnails}</div>
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
                <h2 className="collection-item-page__heading">Description</h2>

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

                <p className="collection-item-page__text">{item.copyright}</p>
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
                    dangerouslySetInnerHTML={{ __html: item.accessConditions }}
                  />
                </div>
              </div>
            )}

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

            <ShareBox pathname={url.pathname} title={item.title} />

            {item.relatedItems && (
              <RelatedCollectionItems items={item.relatedItems} />
            )}
          </div>
        )}
      </App>
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
export default withData(
  graphql(query, {
    options: ({ url: { query: { item } } }) => {
      return {
        variables: {
          id: item,
        },
      };
    },
    props: ({ data }) => {
      return {
        ...data,
        item: data.primoRecord,
      };
    },
  })(CollectionItemPage),
);
