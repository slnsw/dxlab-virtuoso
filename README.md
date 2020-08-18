# DX Lab Virtuoso

Welcome to VirtuOSO, the DX Lab’s experiment that plays transcribed sheet music from the Library’s collection.

- Website: https://dxlab.sl.nsw.gov.au/virtuoso

## Getting Started

```bash
$ git clone git@github.com:slnsw/dxlab-virtuoso
$ npm install
# Create up .env
$ npm start
```

### ENV Variables

```
# .env
PORT=5050
DXLAB_WEBSITE_BASE_URL=http://localhost:5050

DXLAB_WEBSITE_TEST=it works!

DXLAB_WEBSITE_GRAPHQL_URL=http://localhost:5000/graphql
DXLAB_WEBSITE_DXLAB_WP_URL=https://wp.dxlab.sl.nsw.gov.au

DXLAB_WEBSITE_GTM_ID=GTM-XXXXXXX
DXLAB_WEBSITE_FB_APP_ID=XXXXXXXXXXXXX
```

## Hygen generator

To generate a new React component:

```
# Make sure hygen is installed
$ npm i -g hygen
$ hygen component new --name NewComponent
```
