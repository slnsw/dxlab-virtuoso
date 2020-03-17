const header = 'X:1\nM:4/4\nK:A\nL:1/4\n%%staves {1 2}\n';
const lines = [
  'V:1',
  '|z4|E A/ c/ B G/F/|E e c2|',
  'w:||Our Sail-or Prince thy|no-ble ship|',
  '|A G/ B/ E F|G2 z2|E A/ c/ B G/F/|',
  "w:|Hath cleft the o-cean's|foam|And brought Thee safe-ly|",
  '|E e c2|A F/ B/ E G|A2 z2|',
  'w:|to the shores|Of our Aust-tra-lian|home|',
  '|E c/ B/4A/4 e c|d A B3/2 c/|E F A B|',
  'w:|Hail to the * might-ty|Land of Gold, Of|wav-ing corn and|',
  '|G2 z2|E c/ B/4A/4 e c|d A B2|',
  'w:|vine|Of count-less * mul ti|tudes of sheep|',
  'V:2',
  // Our Sailor
  '|[Aa] [CEA] z [CEA]|z [CEA] z [B,DG]|z [B,DE] z [CEc]',
  // Hath cleft
  '|[A,/E/] z/ [D/E/G/] z/ [C/E/A/] z/ [C/F/c/] z/|z [^DG^B] z [=DG=B]|z [CEA] z [B,DG]|',
  // to the shores
  '|z [B,EB] z [CEA]|[A,/E/A/] z/ [D/F/B/] z/ [C/E/A/] z/ [D/G/E/] z/|[C/E/A] z/ [EAc] [EA/] z|',
  // Hail to the
  '|z [C/E/A/] z/ [B,/E/B/] z/ [C/E/A/] z/| z [A,^DA] [B,=DA] G/E/|E [A,DF] [A,DA] [DFB]|',
  // vine of countless
  '|[B,EG] [EBd] [Ac] [EGB]|z [CEA] z [CEA]|z [A,DA] z [A,^DA]|',
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
