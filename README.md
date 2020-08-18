# DX Lab Virtuoso

Listen to rare 19th century Australian sheet music from the Library with this interactive experiment.

- Website: https://dxlab.sl.nsw.gov.au/virtuoso

## Getting Started

```bash
$ git clone git@github.com:slnsw/dxlab-virtuoso
$ npm install
# Create up .env
$ npm start
```

## Sounds

All the sounds (except for the synth) used in Virtuoso are from the [VS Chamber Orchestra](https://github.com/sgossner/VSCO-2-CE) open source library.

### ENV Variables

```
# .env
PORT=5050
DXLAB_WEBSITE_BASE_URL=http://localhost:5050
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
