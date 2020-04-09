import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import CovidForm from '../components/CovidForm';

import { initApolloClient } from '../lib/apollo';

const client = initApolloClient();

const CovidPage = () => {
  return (
    <ApolloProvider client={client}>
      <p>test</p>
      <CovidForm />
    </ApolloProvider>
  );
};

export default CovidPage;
