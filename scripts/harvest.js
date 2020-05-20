/* eslint-disable */
// https://github.com/zeit/next.js/blob/v9.0.7/examples/with-apollo/lib/apollo.js

const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { HttpLink } = require('apollo-link-http');
const { fetch } = require('isomorphic-unfetch');
const gql = require('graphql-tag');
const fs = require('fs');

// require('dotenv').config();

let apolloClient = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      // uri: 'https://dxlab-graphql.now.sh/graphql',
      uri: 'https://api.dxlab.sl.nsw.gov.au/graphql',
      // uri: process.env.DXLAB_WEBSITE_GRAPHQL_URL,
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}

const client = initApolloClient();

const NUM = /* GraphQL */ gql`
  query diaryFiles {
    diaryFiles {
      postTotal
    }
  }
`;

const POSTS = /* GraphQL */ gql`
  query diaryFiles($limit: Int!, $offset: Int!) {
    diaryFiles {
      posts(limit: $limit, offset: $offset) {
        id
        title
        content
        city
        state
        dateText
        authorName
        state
        postcode
        outsideAustralia
        age
        relatedPosts {
          id
          title
        }
      }
    }
  }
`;

const getTotal = async () => {
  try {
    const result = await client.query({
      query: NUM,
    });
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getData = async (limit, offset) => {
  try {
    const result = await client.query({
      query: POSTS,
      variables: {
        limit: limit,
        offset: offset,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const createDataCache = async () => {
  const totalData = await getTotal();
  const total =
    totalData &&
    totalData.data &&
    totalData.data.diaryFiles &&
    totalData.data.diaryFiles.postTotal;
  console.log(`Going to harvest ${total} entries...`);

  let posts = [];
  let count = 0;
  let offset = 0;
  const numPerQuery = 100;

  while (count < total) {
    console.log(`Count: ${count}. Asking for next ${numPerQuery}`);
    const data = await getData(numPerQuery, offset);
    const thesePosts =
      data && data.data && data.data.diaryFiles && data.data.diaryFiles.posts;
    posts = [...posts, ...thesePosts];
    count = posts.length;
    offset += numPerQuery;
  }

  fs.writeFile(__dirname + '/data.json', JSON.stringify(posts), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(`The file was saved with ${posts.length} items`);
  });
};

createDataCache();
