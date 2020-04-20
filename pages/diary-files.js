import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import DiaryFilesApp from '../components/DiaryFilesApp';
import DiaryFilesHome from '../components/DiaryFilesHome';
import DiaryFilesForm from '../components/DiaryFilesForm';
import DiaryFilesAbout from '../components/DiaryFilesAbout';
import DiaryFilesStory from '../components/DiaryFilesStory';

import { initApolloClient } from '../lib/apollo';

const client = initApolloClient();

const DiaryFilesPage = ({ router }) => {
  const { pathname, query } = router;

  // console.log(pathname);

  return (
    <ApolloProvider client={client}>
      <DiaryFilesApp>
        {pathname === '/diary-files' && <DiaryFilesHome />}
        {pathname === '/diary-files/write' && <DiaryFilesForm />}
        {pathname === '/diary-files/about' && <DiaryFilesAbout />}
        {pathname === '/diary-files/[id]' && <DiaryFilesStory id={query.id} />}
      </DiaryFilesApp>
    </ApolloProvider>
  );
};

export default DiaryFilesPage;
