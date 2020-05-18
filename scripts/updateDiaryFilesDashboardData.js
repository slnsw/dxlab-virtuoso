/* eslint-disable */
// https://github.com/zeit/next.js/blob/v9.0.7/examples/with-apollo/lib/apollo.js

const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { HttpLink } = require('apollo-link-http');
const { fetch } = require('isomorphic-unfetch');
const gql = require('graphql-tag');
const fs = require('fs');

// require('dotenv').config();

const postcodes = require('./australianPostcodes');
/*
  From here: https://www.matthewproctor.com/australian_postcodes
  Is an array of objects like this:
  {
    id: 2902,
    postcode: '2204',
    locality: 'MARRICKVILLE',
    state: 'NSW',
    long: 151.155539,
    lat: -33.912288,
    dc: 'MARRICKVILLE SOUTH LPO',
    type: 'Delivery Area',
    status: 'Updated 6-Feb-2020',
    sa3: '12003',
    sa3name: 'Strathfield - Burwood - Ashfield',
    sa4: '120',
    sa4name: 'Sydney - Inner West',
    region: 'R1',
  },
*/

const Entities = require('html-entities').XmlEntities;

const entities = new Entities();

const tm = require('text-miner');

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

const suburbToPostcode = (suburb) => {
  if (!suburb) return null;
  let out = null;
  const result = postcodes.filter((entry) => {
    return (
      entry.type === 'Delivery Area' && entry.locality === suburb.toUpperCase()
    );
  });
  if (result.length > 0) {
    out = Number.parseInt(result[0].postcode, 10);
  }
  return out;
};

const postcodeToSuburb = (postcode) => {
  if (!postcode) return null;
  let out = null;
  const result = postcodes.filter((entry) => {
    return entry.type === 'Delivery Area' && entry.postcode === postcode;
  });
  if (result.length > 0) {
    out = result[0].locality.toLowerCase();
  }
  return out;
};

const arrayToCounts = (a) => {
  if (!a) return null;
  const counts = Object.create(null);
  a.forEach((e) => {
    counts[e] = counts[e] ? counts[e] + 1 : 1;
  });
  const out = [];
  Object.keys(counts).forEach((count) => {
    out.push({ item: count, count: counts[count] });
  });
  return out;
};

const processData = (posts) => {
  const blob = posts.map((p) => p.content).join(' ');
  const cleaner = entities.decode(blob);
  const corpus = new tm.Corpus(cleaner.replace(/<(.|\n)*?>/g, ''));
  const terms = new tm.DocumentTermMatrix(
    corpus
      .trim()
      .toLower()
      .removeDigits()
      .stem('Lancaster')
      .removeWords(['’', '’ve', 'don’'])
      .removeWords(tm.STOPWORDS.EN)
      .removeWords(['ive', 'dont', 'im'])
      .removeInvalidCharacters()
      .removeInterpunctuation()
      .removeNewlines()
      .clean(),
  );
  const wordsAndCounts = terms
    .findFreqTerms(20)
    .sort((a, b) => b.count - a.count)
    .filter((e) => {
      // filter out hypens, brackets, etc
      return e.word.length > 1;
    });

  const uniqueWordsCount = terms.nTerms;
  const entriesCount = posts.length;

  const ages = arrayToCounts(posts.map((p) => p.age));

  const cities = arrayToCounts(posts.map((p) => p.city.toLowerCase()));
  const states = arrayToCounts(posts.map((p) => p.state));
  // use postcode if supplied, otherwise use function to convert city to postcode:
  const postcodesOnly = arrayToCounts(
    posts.map((p) => p.postcode || suburbToPostcode(p.city) || 0),
  );
  const postcodes = postcodesOnly.map((p) => {
    return { item: p.item, count: p.count, name: postcodeToSuburb(p.item) };
  });

  const overseasEntriesCount = posts
    .map((p) => p.outsideAustralia)
    .filter((v) => v).length;

  const output = {
    entriesCount,
    uniqueWordsCount,
    wordsAndCounts,
    ages,
    cities,
    states,
    postcodes,
    overseasEntriesCount,
  };

  fs.writeFile(
    'public/data/diaryFilesDashboardData.json',
    JSON.stringify(output),
    (saveErr) => {
      if (saveErr) {
        return console.log(saveErr);
      }
      console.log(
        'All processed data saved to public/data/diaryFilesDashboardData.json',
      );
    },
  );
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
  console.log('Beginning processing data for use by Dashboard...');
  processData(posts);

  // fs.writeFile(__dirname + '/data.json', JSON.stringify(posts), function(err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log(`The file was saved with ${posts.length} items`);
  // });
};

createDataCache();
