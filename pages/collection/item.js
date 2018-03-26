import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { PhotoSwipeGallery } from 'react-photoswipe';
import Head from 'next/head';
// import sizeOf from 'image-size';

import withData from '../../lib/withData';
import App from '../../components/App';
import Table from '../../components/Table';
import Link from '../../components/Link';
import styles from './item.css';

class CollectionItemPage extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
    };
  }

  render() {
    const { loading: isLoading, item } = this.props;

    const images =
      item &&
      item.images &&
      item.images.length > 0 &&
      item.images.map((image) => {
        return {
          src: image.url,
          w: image.width,
          h: image.height,
        };
      });

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
              &#9664; Back to search
            </button>
            <div className="collection-item-page__gallery">
              {images &&
                images.length > 0 && (
                  <PhotoSwipeGallery
                    items={images}
                    thumbnailContent={(image) => {
                      return (
                        <img
                          src={image.src}
                          className="collection-item-page__image"
                          alt="This should be something meaningful"
                        />
                      );
                    }}
                  />
                )}
            </div>

            <p className="collection-item-page__id">{item.type}</p>
            <h1 className="collection-item-page__title">{item.title}</h1>

            <Table
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

            {(item.description || item.physicalDescription) && (
              <div>
                <h2 className="collection-item-page__heading">Description</h2>

                {item.description && (
                  <p
                    className="collection-item-page__description"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}

                {item.physicalDescription && (
                  <p
                    className="collection-item-page__description"
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
                  className="collection-item-page__description"
                  dangerouslySetInnerHTML={{ __html: item.history }}
                />
              </div>
            )}

            {item.notes && (
              <div>
                <h2 className="collection-item-page__heading">Notes</h2>
                <p
                  className="collection-item-page__description"
                  dangerouslySetInnerHTML={{ __html: item.notes }}
                />
              </div>
            )}

            {item.copyright && (
              <div>
                <h2 className="collection-item-page__heading">Copyright</h2>

                <p className="collection-item-page__description">
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

                  <p className="collection-item-page__description">
                    {item.accessConditions}
                  </p>
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
          </div>
        )}

        <style jsx>{styles}</style>
        <style jsx global>
          {`
            .pswp-thumbnails {
              display: flex;
              flex-wrap: wrap;
            }

            .pswp-thumbnail {
              display: none;
              width: 20%;
              padding-right: 3px;
            }

            .pswp-thumbnail:first-child {
              width: 100%;
              padding-right: 0;
            }

            .pswp-thumbnail:nth-child(5n + 1) {
              padding-right: 0;
            }

            .pswp-thumbnail:first-child img {
              width: 100%;
              height: auto;
            }

            .pswp-thumbnail:nth-child(1),
            .pswp-thumbnail:nth-child(2),
            .pswp-thumbnail:nth-child(3),
            .pswp-thumbnail:nth-child(4),
            .pswp-thumbnail:nth-child(5),
            .pswp-thumbnail:nth-child(6) {
              display: block;
            }

            .pswp-thumbnail:nth-child(6) {
              position: relative;
              display: flex;
              text-transform: uppercase;
            }

            .pswp-thumbnail:nth-child(6):before {
              position: absolute;
              content: '+ more';
            }

            .pswp-thumbnail:nth-child(6) img {
              opacity: 0.2;
            }

            .pswp-thumbnail img {
              object-fit: cover;
              margin-bottom: -5px;
              width: 100%;
              height: 70px;
            }
          `}
        </style>
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
      subjects
      exhibitions
      source
      history
      notes
      copyright
      accessConditions
      images(size: FULL, limit: 31) {
        url
        width
        height
      }
      subjects
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
      // console.log(data.primoRecord);

      return {
        ...data,
        item: data.primoRecord,
      };
    },
  })(CollectionItemPage),
);
