import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  YAxis,
  PieChart,
  Pie,
  Legend,
  Cell,
} from 'recharts';
import queryString from 'query-string';

import withData from '../lib/withData';
import App from '../components/App';
import Link from '../components/Link';
import Popover from '../components/Popover';
import { Router } from '../routes';
import './collection.css';
import './collection/search.css';

const COLORS = [
  '#e6007e',
  '#f53057',
  '#f35b32',
  '#e38001',
  '#c9a000',
  '#a6bb16',
  '#77d251',
  '#00e68d',
];

class CollectionSearchPage extends Component {
  constructor() {
    super();

    this.state = {
      inputTextValue: '',
      dataViz: [],
      creationDateData: [],
      formatData: [],
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

  componentDidMount() {
    const { dataViz } = this.props;

    if (dataViz) {
      const { creationDateData, formatData } = buildDataVizData(dataViz);

      this.setState({
        creationDateData,
        formatData,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { dataViz } = this.props;

    if (dataViz !== prevProps.dataViz) {
      const { creationDateData, formatData } = buildDataVizData(dataViz);

      this.setState({
        creationDateData,
        formatData,
      });
    }
  }

  render() {
    const { url, loading: isLoading, primoSearch } = this.props;
    const { creationDateData, formatData } = this.state;

    return (
      <App
        pathname="/collection"
        title="Collection Home Page"
        metaDescription="{excerpt}"
      >
        <div className="collection-home-page container container--lg">
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
          <h3>Date Created Per Year of Items</h3>
          <div className="collection-home-page__data-viz">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={creationDateData}>
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#e6007e"
                  yAxisId={0}
                />
                <XAxis dataKey="name" />
                <CartesianGrid stroke="#222" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>

            <br />
            <br />

            <h3>Published Items</h3>
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={formatData}
                  nameKey="name"
                  dataKey="count"
                  legendType="square"
                  fill="#e6007e"
                  line="#ccc"
                  label
                >
                  {formatData.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend height={100} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </App>
    );
  }
}

// function sortByKey(array, key) {
//   return array.sort((a, b) => {
//     const x = a[key];
//     const y = b[key];
//     return x < y ? -1 : x > y ? 1 : 0;
//   });
// }

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

function buildDataVizData(data) {
  const creationDateData = [...data.facets[6].values]
    /* eslint-disable */
    .sort((a, b) => {
      return parseInt(a.slug) < parseInt(b.slug)
        ? -1
        : parseInt(a.slug) > parseInt(b.slug) ? 1 : 0;
    })
    /* eslint-enable */
    .slice(1)
    .slice(-60);

  const formatData = data.facets[2].values;

  // this.setState({
  // 	dataViz,
  // 	creationDateData,
  // 	formatData,
  // });

  return {
    creationDateData,
    formatData,
  };
}
