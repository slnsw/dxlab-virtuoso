import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import CovidApp from '../components/CovidApp';
import CovidHome from '../components/CovidHome';
import CovidForm from '../components/CovidForm';
import CovidAbout from '../components/CovidAbout';
import CovidStory from '../components/CovidStory';

import { initApolloClient } from '../lib/apollo';

const client = initApolloClient();

const CovidPage = ({ router }) => {
  const { pathname, query } = router;

  // console.log(pathname);

  return (
    <ApolloProvider client={client}>
      <CovidApp>
        {pathname === '/covid' && <CovidHome />}
        {pathname === '/covid/write' && <CovidForm />}
        {pathname === '/covid/about' && <CovidAbout />}
        {pathname === '/covid/[id]' && <CovidStory id={query.id} />}
      </CovidApp>
    </ApolloProvider>
  );
};

export default CovidPage;
