import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory';
import queryString from 'query-string';

import withData from '../../lib/withData';
import App from '../../components/App';
import Link from '../../components/Link';
import Popover from '../../components/Popover';
import SectionTitle from '../../components/SectionTitle';
import { Router } from '../../routes';
import './search.css';
import './index.css';

const Loader = () => (
  <div className="collection-search-page__results__loader">
    <div className="collection-search-page__results__loader__text">
      Loading <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  </div>
);

class CollectionSearchPage extends Component {
  constructor() {
    super();

    this.state = {
      inputTextValue: '',
    };
  }

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

  render() {
    const { url, loading: isLoading, primoSearch, dataViz } = this.props;

    const dataVizDataSorted = [...dataViz.facets[6].values]
      .sort((a, b) => {
        return parseInt(a.slug) < parseInt(b.slug)
          ? -1
          : parseInt(a.slug) > parseInt(b.slug) ? 1 : 0;
      })
      .slice(1)
      .slice(-20);
    const dataVizData = dataVizDataSorted.map((value) => value.count);
    const dataVizCategories = dataVizDataSorted.map((value) => value.slug);

    console.log(dataVizData);

    return (
      <App
        pathname="/collection"
        title="Collection Home Page"
        metaDescription="{excerpt}"
      >
        <div className="collection-search-page container container--lg">
          {/* TODO: Put into CollectionSearchBox component! */}
          <Popover
            items={[
              {
                name: 'Search Collection',
                url: '/collection/search',
                isSelected: url.query.scope !== 'articles',
              },
              {
                name: 'Search Articles',
                url: '/collection/search?scope=articles',
                isSelected: url.query.scope === 'articles',
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
              defaultValue={url.query.q}
              onChange={this.handleInputTextChange}
              className="collection-search-page__form__input"
            />
            <input type="submit" className="button" />
          </form>
          {/* TODO: Put into CollectionSearchBox component! */}

          <h2>Latest items</h2>
          <div className="collection-home-page__latest">
            {primoSearch &&
              primoSearch.records &&
              primoSearch.records.map((record) => {
                return (
                  <Link to={`collection/item/${record.id}`}>
                    <a
                      className="grid-tile"
                      style={{
                        backgroundImage: `url(${record.images[0].url})`,
                        backgroundSize: 'cover',
                      }}
                    >
                      <div>{/* <img src={record.images[0].url} /> */}</div>
                    </a>
                  </Link>
                );
              })}
          </div>

          <h2>Data</h2>
          <div className="collection-home-page__data-viz">
            <VictoryChart
              // theme={VictoryTheme.material}
              domainPadding={0}
              height={200}
            >
              <VictoryBar
                style={{ data: { fill: '#e6007e' } }}
                data={dataVizData}
                categories={{ x: dataVizCategories }}
                height={200}
              />
            </VictoryChart>
          </div>
        </div>
      </App>
    );
  }
}

function sortByKey(array, key) {
  return array.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

const query = gql`
  query Search {
    primoSearch(
      facets: [
        { slug: "local6", value: "Archival digital" }
        { slug: "newrecords", value: "30%20days%20back" }
      ]
      limit: 9
    ) {
      records {
        id
        title
        images(size: FULL) {
          url
        }
      }
      info {
        total
      }
    }
    dataViz: primoSearch(dateRange: { startDate: 0 }) {
      info {
        total
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
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(
  graphql(query, {
    // options: ({ url: { query: { q, facets, scope } } }) => {
    //   return {
    //     variables: {
    //       q,
    //       facets: buildFacetQuery(facets),
    //       offset: 0,
    //       scope: scope && scope.toUpperCase(),
    //     },
    //   };
    // },
    props: ({ data }) => {
      // console.log(data);
      if (data.primoSearch) {
        return {
          ...data,
        };
      }

      return {
        ...data,
      };
    },
  })(CollectionSearchPage),
);
