import { Component } from 'react';
import { gql, graphql } from 'react-apollo';

import withData from '../lib/withData';
import App from '../components/App';
import Masthead from '../components/Masthead';
// import Link from '../components/Link';
import styles from './post.css';

class Page extends Component {

  render() {
    const {
      url: {
        query: {
          slug,
        },
      },
      content,
    } = this.props;

    return (
      <App pathname={`/${slug}`}>
        <Masthead
          backgroundImageUrl="/static/images/masthead-loom-bg.jpg"
        >
          <div className="masthead__content">
            <h1>{slug}</h1>
          </div>
        </Masthead>

        <article className="post-content antialiased container container--sm" dangerouslySetInnerHTML={{ __html: content }}></article>

        <style jsx global>{styles}</style>
      </App>
    );
  }

}

const query = gql`
  query Post($slug: String!) {
    pages(slug: $slug) {
      title
      content
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ExamplePage)
export default withData(graphql(query, {
  options: ({ url: { query: { slug } } }) => {
    // console.log(slug);
    return {
      variables: {
        slug,
      },
    };
  },
  props: ({ data }) => {

    const page = data.pages && data.pages[0];

    return {
      ...data,
      ...page,
    };
  },
})(Page));