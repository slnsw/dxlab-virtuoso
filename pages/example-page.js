import { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { withApollo } from '../lib/apollo';
import ExampleApp from '../components/examples/ExampleApp';
import Header from '../components/Header';
import ExampleComponent from '../components/ExampleComponent';
// import { exampleAction } from '../actions/exampleActions';

class ExamplePage extends Component {
  static propTypes = {
    id: PropTypes.string,
  };

  constructor() {
    super();

    this.state = {};
  }

  static getInitialProps({ query: { id = null } }) {
    // store.dispatch(exampleAction('payload'));

    return {
      id,
    };
  }

  render() {
    const { id, router, posts } = this.props;
    const { pathname } = router;

    // console.log(objects);

    const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xlg', 'xxlg'];
    const colours = ['primary', 'secondary', 'tertiary', 'highlight'];

    return (
      <ExampleApp>
        <div className="example-page">
          <Header pathname={pathname} />

          <h1 className="title">
            Page <span>{id}</span>
          </h1>

          <h2>Style Guide</h2>
          <h3>Type Scale</h3>
          {sizes.map((size) => (
            <p
              className={`font-size-${size}`}
              key={`font-size-${size}`}
            >{`font-size-${size}`}</p>
          ))}

          <h3>Colours</h3>
          {colours.map((colour) => (
            <div className="boxes" key={`boxes-${colour}`}>
              <h4>{colour}</h4>

              <div>
                {[...Array(7)].map((shade, i) => {
                  return (
                    <div
                      className={`box box--colour-${colour}`}
                      key={`box--colour-${colour}-${i}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          <h2>Example Component</h2>
          <ExampleComponent title="Title" />

          <h2>dotenv Test</h2>
          <p>{process.env.DXLAB_WEBSITE_TEST}</p>

          <h2>GraphQL Test</h2>
          <p>{process.env.DXLAB_WEBSITE_GRAPHQL_URL}</p>
          <ul>
            {posts &&
              posts.map(({ title }, i) => {
                return <li key={i}>{title}</li>;
              })}
          </ul>
        </div>
      </ExampleApp>
    );
  }
}

const postsQuery = gql`
  query {
    posts(limit: 10) {
      title
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withApollo(
  graphql(postsQuery, {
    props: ({ data }) => {
      return {
        ...data,
      };
    },
  })(ExamplePage),
);
