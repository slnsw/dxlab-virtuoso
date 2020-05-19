# DX Lab Website

Node JS React application with server-side rendering for DX Lab's website.

## Getting Started

```bash
$ git clone git@github.com:slnsw/dxlab-website
$ npm install
# Create up .env
$ npm start
```

### ENV Variables

```
# .env
PORT=5010
DXLAB_WEBSITE_BASE_URL=http://localhost:5000

DXLAB_WEBSITE_TEST=it works!

DXLAB_WEBSITE_GRAPHQL_URL=http://localhost:5000/graphql
DXLAB_WEBSITE_DXLAB_WP_URL=https://wp.dxlab.sl.nsw.gov.au

DXLAB_WEBSITE_GTM_ID=GTM-XXXXXXX
DXLAB_WEBSITE_FB_APP_ID=XXXXXXXXXXXXX
```

## Deployment

Using `now`:

```bash
# Deploys to dxlab-website-xxxxx.now.sh
$ git checkout develop
$ now

# Deploy to staging-dxlab.sl.nsw.gov.au
$ git checkout staging
$ git merge develop
$ now
```

## Hygen generator

To generate a new React component:

```
# Make sure hygen is installed
$ npm i -g hygen
$ hygen component new --name NewComponent
```

## Proxies

Zeit's `now.json` file has a config that proxies the following sites:

- dxlab.sl.nsw.gov.au/80hz/
- dxlab.sl.nsw.gov.au/index/
- dxlab.sl.nsw.gov.au/kids-audio-guide/
- dxlab.sl.nsw.gov.au/loom/
- dxlab.sl.nsw.gov.au/mainstreet/
- dxlab.sl.nsw.gov.au/meridian/
- dxlab.sl.nsw.gov.au/muruview/
- dxlab.sl.nsw.gov.au/newselfwales/
- dxlab.sl.nsw.gov.au/off-the-shelf/
- dxlab.sl.nsw.gov.au/pano-scope/
- dxlab.sl.nsw.gov.au/portico/
- dxlab.sl.nsw.gov.au/postcards-1001/
- dxlab.sl.nsw.gov.au/search-terms/
- dxlab.sl.nsw.gov.au/weemala/
- dxlab.sl.nsw.gov.au/youngsydney/
