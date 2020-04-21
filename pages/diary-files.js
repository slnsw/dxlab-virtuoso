import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import DiaryFilesApp from '../components/DiaryFilesApp';
import DiaryFilesHome from '../components/DiaryFilesHome';
import DiaryFilesForm from '../components/DiaryFilesForm';
import DiaryFilesAbout from '../components/DiaryFilesAbout';
import DiaryFilesStory from '../components/DiaryFilesStory';
import DiaryFilesRelatedStories from '../components/DiaryFilesRelatedStories';

import { initApolloClient } from '../lib/apollo';

const client = initApolloClient();

const DiaryFilesPage = ({ router }) => {
  const { pathname, query } = router;

  // console.log(pathname);
  const integerId = query && query.id && parseInt(query.id, 10);
  return (
    <ApolloProvider client={client}>
      <DiaryFilesApp>
        {pathname === '/diary-files' && <DiaryFilesHome />}
        {pathname === '/diary-files/write' && <DiaryFilesForm />}
        {pathname === '/diary-files/about' && <DiaryFilesAbout />}
        {pathname === '/diary-files/[id]' && <DiaryFilesStory id={integerId} />}
        {pathname === '/diary-files/related/[id]' && (
          <DiaryFilesRelatedStories id={integerId} />
        )}
      </DiaryFilesApp>
    </ApolloProvider>
  );
};

export default DiaryFilesPage;
