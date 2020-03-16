const header = 'X:1\nM:4/4\nK:A\nL:1/4\n';
const lines = [
  '|z4|E A/ c/ B G/F/|E e c2|',
  'w:||Our Sail-or Prince thy|no-ble ship|',
  '|A G/ B/ E F|G2 z2|E A/ c/ B G/F/|',
  '|E e c2|A F/ B/ E G|A2 z2|',
  '|E c/ B/4A/4 e c|d A B4/3 c/|E F A B|',
  '|G2 z2|E c/ B/4A/4 e c|d A B2|',
  'w:|vine|Of count-less * mul ti|tudes of sheep|',
];

const songs = [
  {
    title: 'Our Sailor Prince by J.C. Neild Jr, 1867',
    url: 'https://collection.sl.nsw.gov.au/digital/file/06ddDNk67LV8G',
    notation: header + lines.join('\n'),
    bpm: 70,
  },
];

export default songs;
