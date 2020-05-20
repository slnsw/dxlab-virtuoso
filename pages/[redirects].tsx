import * as React from 'react';
import Router from 'next/router';

import Error from './_error';

import redirectRoutes from '../routes/redirect-routes';

const RedirectsPage = () => {
  return <Error />;
};

RedirectsPage.getInitialProps = async ({ res, query }) => {
  const { page } = query;

  // NOTE: rewrites that proxy to other experiments are located at now.json

  // Redirect old blog posts that had slug in root dir
  if (redirectRoutes.includes(`/${page}`)) {
    redirect(`/blog/${page}`, res);
  }

  // Redirect old permalinks
  if (page === 'open-data') {
    redirect('/code', res);
  } else if (page === 'fellowships') {
    redirect('/grants', res);
  }

  // Unstacked experiment
  if (page === 'unstacked') {
    redirect('https://unstacked.dxlab.sl.nsw.gov.au', res);
  }

  // Allow all other pages to fall through to Error page
  return {};
};

const redirect = (destination, res) => {
  if (res) {
    res.writeHead(302, {
      Location: destination,
    });
    res.end();
  } else {
    Router.push(destination);
  }
};

export default RedirectsPage;
