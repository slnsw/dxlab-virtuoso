# DX Lab VirtuOSO

Listen to rare 19th century Australian sheet music from The State Library of NSW with this interactive experiment.

- Website: https://dxlab.sl.nsw.gov.au/virtuoso

> OSO stands for Online Sheet Orchestra

## Getting Started

```bash
$ git clone git@github.com:slnsw/dxlab-virtuoso
$ npm install
# Create up .env
$ npm start
```

## Background

The Library has digitised [hundreds of rare Australian sheet music](https://collection.sl.nsw.gov.au/search?search=digitised%20for%20the%20MusicAustralia%20project) from the 19th century. While you can see every detail in the collection image viewer, without a music background, most people won't know what the sheet music sounds like.

VirtuOSO lets you listen and interactive with some of these songs in the browser. The transcription process is laborious and complex, so we only have 6 songs for now. Hopefully we'll add more songs in the future.

## Approach

Traditional sheet music notation is the most popular way to represent music. However, there are other ways to describe music such as tablature, dot notation and xxxx.

To get the sheet music to display on the screen, we first transcribed the songs into [ABC notation](https://en.wikipedia.org/wiki/ABC_notation). Although text-based, this type of notation was powerful enough for us to transcribe a wide selection of the Library's sheet music collection.

> Example ABC notation

The notation and song metadata can be found in `lib/songs.ts`.

We then used [ABC JS](https://github.com/paulrosen/abcjs) to render the sheet music as SVG elements in the browser. This is an incredible open source project that has been developed for many years. It would not have been possible to create VirtuOSO with it.

## Audio

To play the music, we use **ABC JS's** playback engine to trigger the note sequence. These notes are then passed to our audio engine - [Reactronica](https://reactronica.com). This React library then plays the song with various instruments such as piano, clarinet, violin and flute.

### Samples

All the samples (except for the synth) used in Virtuoso are from the [VS Chamber Orchestra](https://github.com/sgossner/VSCO-2-CE) open source library.

Reactronica loads these samples for playback - it can take a while as each instrument may have many files to load.

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
