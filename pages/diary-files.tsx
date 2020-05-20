import React from 'react';
import dynamic from 'next/dynamic';
// import { ApolloProvider } from '@apollo/react-hooks';

import DiaryFilesApp from '../components/DiaryFilesApp';
import DiaryFilesHome from '../components/DiaryFilesHome';
import DiaryFilesForm from '../components/DiaryFilesForm';
import DiaryFilesAbout from '../components/DiaryFilesAbout';
import DiaryFilesStory from '../components/DiaryFilesStory';
import DiaryFilesRelatedStories from '../components/DiaryFilesRelatedStories';
import DiaryFilesSearch from '../components/DiaryFilesSearch';

import {
  // initApolloClient,
  withApollo,
} from '../lib/apollo';
// const client = initApolloClient();

const DiaryFilesDashboard = dynamic(() =>
  import('../components/DiaryFilesDashboard'),
);

const DiaryFilesPage = ({ router }) => {
  const { pathname, query } = router;

  const config = {
    '/diary-files': {
      title: 'Home',
    },
    '/diary-files/write': {
      title: 'Write',
    },
    '/diary-files/about': {
      title: 'About',
    },
    '/diary-files/entry/[id]': {
      title: 'Entry',
    },
    '/diary-files/related/[id]': {
      title: 'Related',
    },
    '/diary-files/search': {
      title: 'Search',
    },
    '/diary-files/dashboard': {
      title: 'Dashboard',
    },
  };

  const title = `${config[pathname].title} - The Diary Files`;
  const integerId = query && query.id && parseInt(query.id, 10);
  const search = query && query.q; // need to sanitise it??
  const limit = query && query.limit && parseInt(query.limit, 10);

  return (
    <DiaryFilesApp title={title}>
      {pathname === '/diary-files' && <DiaryFilesHome limit={limit} />}
      {pathname === '/diary-files/write' && <DiaryFilesForm />}
      {pathname === '/diary-files/about' && <DiaryFilesAbout />}
      {pathname === '/diary-files/entry/[id]' && (
        <DiaryFilesStory id={integerId} />
      )}
      {pathname === '/diary-files/related/[id]' && (
        <DiaryFilesRelatedStories id={integerId} />
      )}
      {pathname === '/diary-files/search' && (
        <DiaryFilesSearch search={search} />
      )}
      {pathname === '/diary-files/dashboard' && <DiaryFilesDashboard />}
    </DiaryFilesApp>
  );
};

export default withApollo(DiaryFilesPage);
