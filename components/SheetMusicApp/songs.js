const songs = [
  {
    title: 'The Glebe Rowing Club Polka',
    slug: 'the-glebe-rowing-club-polka',
    creator: 'Bull, Josie L.',
    url: 'https://collection.sl.nsw.gov.au/digital/file/k3BVB5VEzxxlp',
    imageUrl:
      'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3731/37316360.jpg',
    key: 'F',
    header: 'X:1\nM:2/4\nL:1/8\n%%score 1 | 2\n',
    // instruments: ['piano', 'piano'],
    instruments: [
      {
        volume: 0,
        sampleType: 'piano',
      },
      {
        volume: 0,
        sampleType: 'piano',
      },
    ],
    lines: [
      'V:1 clef=treble',
      '|((3f/g/f/)|eb de|dc Ac|^cd e>d|dcA ((3f/g/f/)|',
      '|eb de|dc Ac|Gc dg|ccc "8va" ((3f/g/f/)|eb de|dc Ac|',
      '|^cd e>d|dc Ac|dB d>e|fc fg|ec ga|+>+f2 c"loco"f|',
      '|e2 d>c|A2 G>F|E2 B2|A2 AA|dB GB|+>+A2 GF|',
      '|E2 DC|A2 cf|e2 d>c|A2 G>F|E2 B2|A2 AA|',
      // page 2
      '|+>+Gd/c/ +>+BA/G/|+>+FF/G/ +>+AG/F/|+>+ED/C/ DE|FFF+segno+||[K:Amin] "3rd Strain" x d/f/|a2 bd\'|',
      "|e2 +coda+dc|BG e>d|ca g>g|+>+ad ab|c'gec|Bf e>d|",
      "|(c/e/g/e/) c(d/f/)|a2 bd'|e2 dc|BG e>d|ca g>g|+>+ad ab|",
      "|c'gec|Bf e>d|c[EGc][EGc] z||c'/g/e/c/ ab|bb c'2|[fa][fa] [fa][eg]|",
      "|(d/a/) (d/a/ d2)|c'/g/e/c/ ab|bb c'2|[fa][fa] [fa][eg]|(d/a/) (d/g/ c)e/g/|c'/g/e/c/ ab|",
      "|bb c'2|[fa][fa] [fa][ge]|(d/a/) (d/a/ d2)|c'/g/e/c/ ab|bb c'2|[fa][fa] [fa][ge]|",
      // bass clef
      'V:2 clef=bass',
      '[K:F]|z|[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,EA] [F,,F,][A,CF]|[G,,G,][B,CE] [C,C][B,CE]|F,[A,CF] F,[A,CF]|',
      '|[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,CF] F,[A,CF]|G,[CE] G,[=B,F]|[CE][CE][CE] z|[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,CF] [F,,F,][A,CF]|',
      '|[G,,G,][B,CE] [C,C][B,CE]|F,[A,CF] F,[A,CF]|F,[B,DF] F,[B,DF]|F,[A,CF] F,[A,CF]|G,[B,CE] E,[B,CE]|F,[A,CF][A,CF] z|',
      '|G,[B,CE][B,CE] z|F,[A,CF][A,C] z|G,[B,C] C,[B,CE]|F,[A,CE][A,CE] z|B,,[D,G,] B,,[D,G,]|C,[F,A,C] C,[F,A,C]|',
      '|C,[G,B,] C,[G,B,]|F,[A,CF] F,[A,CF]|G,[B,CE][B,CE] z|F,[A,CF][A,C] z|G,[B,C] C,[B,CE]|F,[A,CE][A,CE] z|',
      // page 2
      '|B,,[D,G,] B,,[D,G,]|C,[F,A,] C,[F,A,]|C,[G,B,] C,[G,B,]|[F,A,][A,C][A,C]||[K:Amin] x z|D,[F,G,B,] G,,[F,G,B,]|',
      '|C,[G,C] E,[G,B,]|D,[F,G,B,] G,,[F,G,B,]|C,[G,C] E,[G,C]|F,[A,D] F,[A,D]|G,[CE] G,[CE]|G,[B,D] G,[B,D]|',
      '|E,[G,C] C, z|D,[F,G,B,] G,,[F,G,B,]|C,[G,C] E,[G,C]|D,[F,G,B,] G,,[F,G,B,]|C,[G,C] E,[G,C]|F,[A,D] F,[A,D]|',
      '|G,[CE] G,[CE]|G,[B,F] G,[B,F]|[CE][C,C][C,C] z||E,[G,C] D,[G,B,]|D,[G,D] E,[G,C]|E,[G,C] G,[CE]|',
      '|G,[B,F] G,[B,F]|E,[G,C] D,[G,B,]|D,[G,D] E,[G,C]|F,[A,C] G,[CE]|G,[B,F] [C2E2]|E,[G,C] D,[G,B,]|',
      '|D,[G,D] E,[G,C]|F,[A,C] G,[CE]|G,[B,F] G,[B,D]|E,[G,C] D,[G,B,]|D,[G,D] E,[G,C]|F,[A,C] G,[CE]|',
    ],
    bpm: 90,
  },
  {
    title: 'National Song: Our Sailor Prince',
    slug: 'national-song-our-sailor-prince',
    creator: 'Neild, J. C',
    url: 'https://collection.sl.nsw.gov.au/digital/file/06ddDNk67LV8G',
    imageUrl:
      'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3750/37501760.jpg',
    key: 'A',
    // NOTE: '%%score 1 {2 | 3}' groups 1 and 2 together, seems to be a bug in ABCJS
    header: 'X:1\nM:4/4\nL:1/4\n%%score 1 2 | 3\n',
    // instruments: ['clarinet', 'piano', 'piano'],
    instruments: [
      {
        volume: -6,
        sampleType: 'clarinet',
      },
      {
        volume: 0,
        sampleType: 'piano',
      },
      {
        volume: 0,
        sampleType: 'piano',
      },
    ],
    lines: [
      'V:1 name="VOICE"',
      '|"_Con Spirito alla Marcia." z4|z4|z4|',
      '|z4|E A/ c/ B G/F/|E e c2|',
      'w:||1.~Our Sail~-or Prince thy|no~-ble ship|',
      'w:||2.~Our Sail~-or Prince we|wel~-come Thee|',
      '|A G/ B/ E F|G2 z2|E A/ c/ B G/F/|',
      "w:|Hath cleft the o~-cean's|foam,|And brought Thee safe~-ly|",
      'w:|With fes~-tive shout and|cheer,|For thy sake and thy|',
      '|E e c2|A F/ B/ E G|A2 z2|',
      'w:|to the shores|Of our Aust~- tra~- lian|home,|',
      'w:|Mo~- thers’ sake|The Queen to us so|dear,|',
      '|E c/ B/4A/4 e c|d A B3/2 c/|E F A B|',
      'w:|Hail to the * might~- ty|Land of Gold, Of|wav~- ing corn and|',
      'w:|In this fair * south~- ern|Land of ours, Through|o~- cean rolls be~-|',
      '|G2 z2|E c/ B/4A/4 e c|d A B2|',
      'w:|vine|Of count-less * mul~- ti~-|tudes of sheep|',
      'w:|tween|Our shores and * dear old|Eng~- land’s shores|',
      '|c e/ E/ !fermata!c3/2 B/|A2 z2|z4|z4|',
      'w:|And count less herds of|kine.|||',
      'w:|We still re~- vere the|Queen.|||',

      'V:2 clef=treble name="PIANO-"',
      "|[Ee] [Aa] [cc'] [B/b][A/a]|[Bb] [ee'] [c2c'2]|[Aa] [F/f][B/b] [cc'] [Bb]|",
      '|[Aa] [CEA] z [CEA]|z [CEA] z [B,DG]|z [B,DE] z [CEc]',
      '|[A,/E/A/] z/ [D/E/G/] z/ [C/E/A/] z/ [C/F/c/] z/|z [^DG^B] z [=DG=B]|z [CEA] z [B,DG]|',
      '|z [B,EB] z [CEA]|[A,/E/A/] z/ [D/F/B/] z/ [C/E/A/] z/ [D/G/E/] z/|[C/E/A] z/ [EAc] [EA/] z|',
      '|z [C/E/A/] z/ [B,/E/B/] z/ [C/E/A/] z/| z [A,^DA] [B,=DA] G/F/|E [A,DF] [A,DA] [DFB]|',
      '|[B,EG] [EBd] [Ac] [EGB]|z [CEA] z [CEA]|z [A,DA] z [B,^DA]|',
      '|[CEA] [A,EA] !fermata![B,^DA] [B,=DG]|[CA] ((3E/A/c/) e E|[EF] A/>d/ [Ec] ((3e/d/c/)|[EA] [CE] [CA] z|',

      'V:3 clef=bass name="FORTE"',
      '|A,, [E,A,C] A,, [E,A,C]|G,, [E,G,D] A,, [E,A,C]|[C,,C,] [D,F,B,] [E,,E,] [E,G,D]|',
      '|[A,,A,] z [A,,E,A,] z |[A,,A,] z [E,,E,] z|[G,,G,] z [A,,A,] z|',
      '|[C,,/C,/] z/ [B,,,/B,,/] z/ [A,,,/A,,/] z/ [A,,/A,/] z/|[G,,G,] z [E,,E,] z|[A,,A,] z [E,,E,] z|',
      '|[G,,G,] z [A,,A,] z|[C,,/C,/] z/ [D,,/D,/] z/ [E,,/E,/] z/ [E,,/E,/] z/|[A,,/A,/] z/ ([A,C] [A,/C/]) z/ z|',
      '|[A,,A,] z [G,,/G,/] z/ [A,,/A,/] z/ |[F,,2F,2] [E,,3/2E,3/2] [D,,/D,/]|[C,,C,] [D,,D,] [F,,F,] [D,,D,]|',
      '|[E,,E,] E,2 E,|[A,,A,] z [=G,,=G,] z|[F,,F,] z [=F,,=F,] z|',
      '|[E,,E,] [C,,C,] !invertedfermata![B,,,B,,] [E,,E,]|[A,,A,] [C,2A,2E2] [C,A,]|[D,A,] [F,A,D] [E,A,] [E,B,DEG]|[A,,C,] [A,,E,A,] [A,,E,A,] z|',

      'W:THIRD VERSE',
      'W:',
      'W:Though we have left the dear old land, | We’ll ne’er forget that to these shores',
      'W:We love it e’en the same, | Our Sailer Prince has been:',
      'W:And glory we the Britons still | But in our prayers we’ll link the names',
      'W:In heart, if not in name. | Of Alfred and our Queen.',
      'W:',
      'W:We’ll ne’er forget that to these shores',
      'W:Our Sailer Prince has been:',
      'W:But in our prayers we’ll link the names',
      'W:Of Alfred and our Queen.',
    ],
    bpm: 80,
  },
];

export default songs;
