require('dotenv').config();

const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');
const uaCompatible = require('ua-compatible');
const helmet = require('helmet');

const dev = process.env.NODE_ENV !== 'production' && !process.env.NOW;
const app = next({ dev });
const routes = require('./routes');
const proxyRoutes = require('./routes/proxyRoutes');
const redirectRoutes = require('./routes/redirectRoutes');

const handler = routes.getRequestHandler(app);

console.log('----------------------------------');
console.log('Environment Variables:');
console.log('----------------------------------');
console.log(`PORT=${process.env.PORT}`);
console.log(`GRAPHQL_URL=${process.env.GRAPHQL_URL}`);
console.log(`TEST=${process.env.TEST}`);
console.log(`DXLAB_WP_URL=${process.env.DXLAB_WP_URL}`);
console.log(`BASE_URL=${process.env.BASE_URL}`);
console.log('----------------------------------');

const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    // Add Security headers
    server.use(helmet());

    // Adds X-UA-Compatible: IE=edge, chrome=1 header for our IE friends.
    server.use(uaCompatible);

    // Add no-index headers for staging and dev sites
    // Skip if actual dxlab.sl.nsw.gov.au website
    if (process.env.BASE_URL !== 'https://dxlab.sl.nsw.gov.au') {
      server.use((req, res, next) => {
        res.set({
          'X-Robots-Tag': 'noindex',
        });
        next();
      });
    }

    // Don't automatically add forward slash
    server.enable('strict routing');

    // Proxy GraphQL API
    // TODO: use /api/graphql
    server.use(
      proxy('/graphql', {
        target: 'https://dxlab-graphql-proxy.now.sh',
        changeOrigin: true,
      }),
    );

    // Proxy external apps
    Object.keys(proxyRoutes).forEach((route) => {
      // Proxy route to DX Lab WP Server
      server.use(proxy(route, proxyRoutes[route]));

      // But also redirect it to route with trailing slash.
      // Plays nice with proxying to Nginx WP server
      server.get(route.slice(0, -1), (req, res) => {
        res.redirect(`${route.slice(0, -1)}/`);
      });
    });

    // Redirect old blog posts that had slug in root dir
    redirectRoutes.forEach((route) => {
      server.get(route, (req, res) => {
        res.redirect(`/blog${route}`);
      });
    });

    // Redirect old WP search queries
    server.get('/', (req, res) => {
      if (req.query.s) {
        res.redirect(`/search?q=${req.query.s}`);
      } else {
        handler(req, res);
      }
    });

    // NEWSELFWALES EXPERIMENT

    // Proxy app
    server.use(
      proxy('/newselfwales', {
        target: 'https://dxlab-selfie.now.sh',
        changeOrigin: true,
      }),
    );

    // Proxy static assets
    server.use(
      proxy('/static/newselfwales', {
        target: 'https://dxlab-selfie.now.sh',
        changeOrigin: true,
      }),
    );

    // Redirects
    server.get('/open-data', (req, res) => {
      res.redirect('/code');
    });

    server.get('/open-data/', (req, res) => {
      res.redirect('/code');
    });

    server.get('/fellowships', (req, res) => {
      res.redirect('/grants');
    });

    server.get('/fellowships/', (req, res) => {
      res.redirect('/grants');
    });

    server.get('/unstacked', (req, res) => {
      res.redirect('http://unstacked.dxlab.sl.nsw.gov.au');
    });

    server.get('/unstacked/', (req, res) => {
      res.redirect('http://unstacked.dxlab.sl.nsw.gov.au');
    });

    server.all('*', (req, res) => handler(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
