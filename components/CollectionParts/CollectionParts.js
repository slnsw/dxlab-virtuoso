import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

import './CollectionParts.css';
import withData from '../../lib/withData';
import CollectionPart from '../CollectionPart';

const LIMIT = 10;

class CollectionParts extends Component {
  static propTypes = {
    id: PropTypes.number,
    parts: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        level: PropTypes.string,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
          }),
        ),
      }),
    ),
  };

  constructor() {
    super();

    this.state = {
      loadMoreClickedTotal: 0,
      initialPropsLoaded: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.state.initialPropsLoaded) {
      this.setState({
        initialPropsLoaded: true,
      });
    }
  }

  handleMoreButton = () => {
    this.props.loadMore();
    this.setState({
      loadMoreClickedTotal: this.state.loadMoreClickedTotal + 1,
    });
  };

  render() {
    const { parts, loading } = this.props;
    const { loadMoreClickedTotal, initialPropsLoaded } = this.state;

    if (loading && !initialPropsLoaded) return <p>Loading...</p>;
    if (!parts) return null;

    // NOTE: A better way is to check against total parts, but we need data for that.
    const totalCheck = (loadMoreClickedTotal + 1) * LIMIT;
    const showMoreButton = parts.length === totalCheck;

    return (
      <div className="collection-parts">
        <ul>
          {[...new Set(parts)].map((part) => {
            return (
              <CollectionPart part={part} key={`collection-part-${part.id}`} />
            );
          })}
        </ul>

        {loading ? (
          <p>Loading...</p>
        ) : (
          showMoreButton && (
            <button
              className="collection-parts__load-more-button"
              onClick={this.handleMoreButton}
            >
              Load more
            </button>
          )
        )}
      </div>
    );
  }
}

const QUERY = gql`
  query GetParts($id: Int!, $offset: Int, $limit: Int) {
    parts: adlibRecords(parentId: $id, offset: $offset, limit: $limit) {
      id
      level
      title
      images {
        url
      }
      parts {
        id
        level
        title
        images {
          url
        }
      }
    }
  }
`;

export default withData(
  graphql(QUERY, {
    options: ({ id, offset = 0 }) => {
      return {
        variables: {
          id,
          offset,
          limit: LIMIT,
        },
        notifyOnNetworkStatusChange: true,
      };
    },
    props: ({ data }) => {
      return {
        ...data,
        loadMore() {
          return data.fetchMore({
            variables: {
              offset: data.parts.length,
            },
            updateQuery: (previousResult, result) => {
              const { fetchMoreResult } = result;

              if (!fetchMoreResult) {
                return previousResult;
              }

              return {
                ...previousResult,
                parts: [...previousResult.parts, ...fetchMoreResult.parts],
              };
            },
          });
        },
      };
    },
  })(CollectionParts),
);
