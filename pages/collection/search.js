import { Component, Fragment } from 'react';
import Head from 'next/head';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';

import { withApollo } from '../../lib/apollo';
import CollectionApp from '../../components/CollectionApp';
import Link from '../../components/Link';
import Popover from '../../components/Popover';
import CollectionItem from '../../components/CollectionItem';
import LoaderText from '../../components/LoaderText';
import { Router } from '../../routes';
import './search.css';

const Loader = () => (
  <div className="collection-search-page__results__loader">
    <LoaderText />
  </div>
);

class CollectionSearchPage extends Component {
  constructor() {
    super();

    this.state = {
      inputTextValue: '',
      showMobileFacetList: false,
      showDesktopFacetList: true,
      facetsShowAll: [],
      initialFacetValueCount: 5,
      itemsLayoutType: 'list',
    };
  }

  handleDesktopFacetListToggle = () => {
    this.setState({
      showDesktopFacetList: !this.state.showDesktopFacetList,
    });
  };

  handleMobileFacetListToggle = () => {
    this.setState({
      showMobileFacetList: !this.state.showMobileFacetList,
    });
  };

  handleFacetToggle = (facetName) => {
    this.setState({
      facetsShowAll: addOrRemove(this.state.facetsShowAll, facetName),
    });
  };

  handleFormSubmit = (event) => {
    const query = queryString.stringify(
      {
        ...this.props.url.query,
        q: this.state.inputTextValue,
      },
      {
        encode: false,
      },
    );

    Router.pushRoute(`/collection/search?${query}`);
    event.preventDefault();
  };

  handleInputTextChange = (event) => {
    this.setState({ inputTextValue: event.target.value });
  };

  handleItemsLayoutTypeChange = (layoutType) => {
    console.log(layoutType);

    this.setState({ itemsLayoutType: layoutType });
  };

  render() {
    const {
      router,
      items,
      facets,
      loading: isLoading,
      totalItems,
      loadMore,
    } = this.props;
    const { query, pathname } = router;

    const selectedFacets = wrapArray(query.facets).map((f) =>
      convertStringToFacet(f),
    );

    const {
      facetsShowAll,
      initialFacetValueCount,
      showMobileFacetList,
      showDesktopFacetList,
      itemsLayoutType,
    } = this.state;

    return (
      <CollectionApp
        pathname="/collection/search"
        // isLoading={isLoading}
        title="Search"
        metaDescription="{excerpt}"
      >
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <div className="collection-search-page container container--lg">
          <Popover
            items={[
              {
                name: 'Search Collection',
                url: '/collection/search',
                isSelected: query.scope !== 'articles',
              },
              {
                name: 'Search Articles',
                url: '/collection/search?scope=articles',
                isSelected: query.scope === 'articles',
              },
            ]}
          />

          <form
            className="collection-search-page__form"
            onSubmit={this.handleFormSubmit}
          >
            <input
              type="text"
              name="q"
              placeholder="Start searching"
              defaultValue={query.q}
              onChange={this.handleInputTextChange}
              className="collection-search-page__form__input"
            />
            <input type="submit" className="button" />
          </form>

          {
            <div className="collection-search-page__info">
              {facets && facets.length > 0 && (
                <Fragment>
                  <button
                    className="collection-search-page__toggle-facet-list-button collection-search-page__toggle-facet-list-button--mobile"
                    onClick={this.handleMobileFacetListToggle}
                  >
                    {showMobileFacetList ? '< Hide' : '> Show'} Facets
                  </button>

                  <button
                    className="collection-search-page__toggle-facet-list-button collection-search-page__toggle-facet-list-button--desktop"
                    onClick={this.handleDesktopFacetListToggle}
                  >
                    {showDesktopFacetList ? '< Hide' : '> Show'} Facets
                  </button>
                </Fragment>
              )}

              <div className="collection-search-page__total-items">
                {numberWithCommas(totalItems)} results
              </div>

              <div className="collection-search-page__item-type-chooser">
                {['list', 'grid'].map((layoutType) => (
                  <button
                    className={
                      layoutType === itemsLayoutType
                        ? 'collection-search-page__item-type-chooser--is-active'
                        : ''
                    }
                    onClick={() => this.handleItemsLayoutTypeChange(layoutType)}
                    key={`collection-search-page__item-type-chooser-${layoutType}`}
                  >
                    {layoutType}
                  </button>
                ))}
              </div>
            </div>
          }

          <div className="collection-search-page__results">
            <div
              className={`collection-search-page__facet-list ${
                showDesktopFacetList
                  ? 'collection-search-page__facet-list--is-desktop-active'
                  : ''
              } ${
                showMobileFacetList
                  ? 'collection-search-page__facet-list--is-mobile-active'
                  : ''
              }`}
            >
              <button
                className="collection-search-page__facet-list__mobile-button"
                onClick={this.handleMobileFacetListToggle}
              >
                {showMobileFacetList ? '< Hide' : '> Show'} Facets
              </button>

              {/* Facets */}
              {facets &&
                facets.map((facet) => {
                  // Check if facet.name is in facetsShowAll, if so, show all facet values.
                  const showAll = facetsShowAll.indexOf(facet.name) > -1;
                  const facetValues = showAll
                    ? facet.values
                    : facet.values.slice(0, initialFacetValueCount);

                  return (
                    <div
                      className="collection-search-page__facet"
                      key={`collection-search-page__facet-${facet.name}`}
                    >
                      <h3 className="collection-search-page__facet__title">
                        {facet.name}
                      </h3>

                      <div className="collection-search-page__facet__values">
                        {facetValues.map((value) => {
                          // Change to array if string
                          const facetParams =
                            typeof query.facets === 'string'
                              ? [query.facets]
                              : query.facets;

                          const urlObject = {
                            ...query,
                            facets: [
                              ...(facetParams || []),
                              `${facet.slug},${encodeURIComponent(value.slug)}`,
                            ],
                          };

                          const urlString = queryString.stringify(urlObject, {
                            encode: false,
                          });

                          // console.log(urlString);

                          return (
                            <div
                              className="collection-search-page__facet__value-name"
                              key={`collection-search-page__facet__value-name-${value.name}`}
                              onClick={() => {
                                this.setState({
                                  showMobileFacetList: false,
                                });
                              }}
                            >
                              <Link as={`${pathname}?${urlString}`}>
                                <a>
                                  {value.name}{' '}
                                  <span className="collection-search-page__facet__value-count">
                                    <span>
                                      ({numberWithCommas(value.count)})
                                    </span>
                                  </span>
                                </a>
                              </Link>
                            </div>
                          );
                        })}
                      </div>

                      {facet.values.length >= initialFacetValueCount && (
                        <button
                          className="collection-search-page__facet__toggle"
                          onClick={() => this.handleFacetToggle(facet.name)}
                        >
                          {showAll ? 'less' : 'more'}
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className="collection-search-page__items">
              {/* Selected Facets */}
              {selectedFacets.length > 0 && (
                <div className="collection-search-page__selected-facets">
                  {selectedFacets.map((selectedFacet) => {
                    const urlObject = {
                      ...query,

                      // Filter out current facet
                      facets: wrapArray(query.facets).filter((facetString) => {
                        return (
                          facetString !==
                          `${selectedFacet.slug},${selectedFacet.value}`
                        );
                      }),
                    };

                    const urlString = queryString.stringify(urlObject, {
                      encode: false,
                    });

                    return (
                      <Link
                        to={`${pathname}?${urlString}`}
                        key={`collection-search-page__facet-button-${selectedFacet.value}`}
                      >
                        <a className="collection-search-page__facet-button tag">
                          {selectedFacet.slug}: {selectedFacet.value} (x)
                        </a>
                      </Link>
                    );
                  })}
                </div>
              )}

              {isLoading && <Loader />}

              {/* <div
                className={`collection-search-page__results__items ${
                  isLoading
                    ? 'collection-search-page__results__items--is-loading'
                    : ''
                }`}
              > */}
              {items && items.length > 0 && (
                <InfiniteScroll
                  className={`collection-search-page__results__items ${
                    isLoading
                      ? 'collection-search-page__results__items--is-loading'
                      : ''
                  } ${
                    itemsLayoutType === 'grid'
                      ? 'collection-search-page__results__items--grid'
                      : ''
                  }`}
                  pageStart={0}
                  loadMore={loadMore}
                  hasMore={
                    // Max items to show is 100, but if totalItems is less, use totalItems
                    items.length < (totalItems < 100 ? totalItems : 100)
                  }
                  loader={<Loader />}
                >
                  {items.map(({ id, title, images, type, description }) => {
                    const imageUrl = images && images[0] && images[0].url;
                    const totalImages = images && images.length;

                    return (
                      <CollectionItem
                        id={id}
                        layoutType={itemsLayoutType}
                        title={title}
                        description={description}
                        imageUrl={imageUrl}
                        totalImages={totalImages}
                        type={type}
                        key={`collection-search-page__results__item-${id}`}
                      />
                    );
                  })}
                </InfiniteScroll>
              )}
            </div>
            {/* </div> */}
          </div>
        </div>
      </CollectionApp>
    );
  }
}

const query = gql`
  query Search(
    $q: String
    $facets: [PrimoFacetType]
    $offset: Int
    $scope: PrimoScopeType
  ) {
    primoSearch(search: $q, facets: $facets, offset: $offset, scope: $scope) {
      records {
        id
        sourceId
        sourceRecordId
        title
        type
        description
        images(size: FULL, limit: 11) {
          url
        }
      }
      facets {
        name
        slug
        values {
          name
          slug
          count
        }
      }
      info {
        total
      }
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component
export default withApollo(
  graphql(query, {
    options: ({
      router: {
        query: { q, facets, scope },
      },
    }) => {
      return {
        variables: {
          q,
          facets: buildFacetQuery(facets),
          offset: 0,
          scope: scope && scope.toUpperCase(),
        },
      };
    },
    props: ({ data }) => {
      if (data.primoSearch) {
        // const facets = modifyFacets(data.primoSearch.facets);

        return {
          ...data,
          items: data.primoSearch.records,
          // facets: data.primoSearch.facets,
          facets:
            data.primoSearch.facets &&
            modifyFacets(data.primoSearch.facets).filter((facet) => {
              // Filter out 'Archival Start Date' (WTF??), 'Prefilter', 'domain'
              return ['local8', 'pfilter', 'domain'].indexOf(facet.slug) === -1;
            }),
          totalItems: data.primoSearch.info.total,
          loadMore() {
            return data.fetchMore({
              variables: {
                offset: data.primoSearch.records.length,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return previousResult;
                }

                return {
                  ...previousResult,
                  primoSearch: {
                    records: [
                      ...previousResult.primoSearch.records,
                      ...fetchMoreResult.primoSearch.records,
                    ],
                  },
                };
              },
            });
          },
        };
      }

      return {
        ...data,
      };
    },
  })(CollectionSearchPage),
);

// Change the order and rename facets
const modifyFacets = (facets) => {
  // Add priority key and then sort by priority
  return facets
    .map((facet) => {
      let priority = 100;
      let name;

      if (facet.slug === 'rtype') {
        priority = 0;
      } else if (facet.slug === 'local5') {
        priority = 1;
      } else if (facet.slug === 'local6') {
        priority = 2;
        name = 'Digitised';
      } else if (facet.slug === 'tlevel') {
        priority = 3;
      } else if (facet.slug === 'newrecords') {
        priority = 4;
      } else if (facet.slug === 'creator') {
        priority = 5;
      } else if (facet.slug === 'local30') {
        priority = 110;
      }

      return {
        ...facet,
        // Replace value name with name field if defined
        values: facet.values.map((f) => (name ? { ...f, name } : f)),
        priority,
      };
    })
    .sort(compare);

  function compare(a, b) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
  }
};

const buildFacetQuery = (facetUrlArgs) => {
  const args = wrapArray(facetUrlArgs);

  if (args && args.length > 0) {
    return args.map((arg) => convertStringToFacet(arg));
  }

  return null;
};

const wrapArray = (stringOrArray = []) => {
  return typeof stringOrArray === 'string'
    ? // Url params with the same name are returned as a string with / in between.
      // Need to convert to array
      stringOrArray.split('/')
    : stringOrArray;
};

const convertStringToFacet = (string) => {
  const facet = string.match(/([^,]*),(.*)/);

  return {
    slug: facet[1],
    value: facet[2],
  };

  // Sorry for the regex madness:
  // https://stackoverflow.com/questions/6131195/splitting-string-from-the-first-occurrence-of-a-character/6131257
};

const addOrRemove = (array, value) => {
  const index = array.indexOf(value);

  if (index === -1) {
    array.push(value);
  } else {
    array.splice(index, 1);
  }

  return array;
};

const numberWithCommas = (x) => {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
