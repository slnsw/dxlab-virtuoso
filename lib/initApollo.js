import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create() {
  return new ApolloClient({
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri:
        process.env.GRAPHQL_URL ||
        'https://12ke3766e4.execute-api.ap-southeast-2.amazonaws.com/staging/graphql',
      // uri: 'https://lskuixdqla.execute-api.ap-southeast-2.amazonaws.com/dev/graphql',
      // uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
      opts: {
        // Additional fetch() options like `credentials` or `headers`
        credentials: 'same-origin',
      },
    }),
  });
}

export default function initApollo() {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create();
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create();
  }

  return apolloClient;
}
