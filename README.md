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

## Approach

Music notation is extremely complex, almost like another programming language in some ways. Luckily we discovered a JavaScript library called [ABC JS](https://github.com/paulrosen/abcjs) that renders sheet music as SVG elements in the browser.

As the name suggests, **ABC JS** uses [ABC notation](https://en.wikipedia.org/wiki/ABC_notation) as the main input. Although text-based, this type of notation was powerful enough for us to transcribe a wide selection of the Library's sheet music collection.

The notation and song metadata can be found in `lib/songs.ts`.

## Audio

To play the music, we use **ABC JS's** playback engine to trigger the sequence of notes. These notes are then passed to our audio engine - [Reactronica](https://reactronica.com), a React component library that can play sequenced music.

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
