const songs = [
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
        name: 'Voice',
        volume: 0,
        type: 'clarinet',
      },
      {
        name: 'Piano treble clef',
        volume: -6,
        type: 'piano',
      },
      {
        name: 'Piano bass clef',
        volume: -6,
        type: 'piano',
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
  {
    title: 'The Glebe Rowing Club Polka',
    slug: 'the-glebe-rowing-club-polka',
    creator: 'Bull, Josie L.',
    url: 'https://collection.sl.nsw.gov.au/digital/file/k3BVB5VEzxxlp',
    imageUrl:
      'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3731/37316360.jpg',
    key: 'F',
    header: 'X:1\nM:2/4\nL:1/8\n%%score {1 | 2}\n',
    // instruments: ['piano', 'piano'],
    instruments: [
      {
        name: 'Treble clef',
        volume: 0,
        type: 'piano',
      },
      {
        name: 'Bass clef',
        volume: 0,
        type: 'piano',
      },
    ],
    lines: [
      'V:1 clef=treble',
      '+segno+|:((3f/g/f/)|eb de|dc Ac|^cd e>d|dcA ((3f/g/f/)|',
      '|eb de|dc Ac|Gc dg|ccc [K:Amin sound=Aa]"8va" ((3f/g/f/)|eb de|dc Ac|',
      '|^cd e>d|dc Ac|dB d>e|fc fg|ec ga|+>+f2 c"loco"f|',
      '|e2 d>c|A2 G>F|E2 B2|A2 AA|dB GB|+>+A2 GF|',
      '|E2 DC|A2 cf|e2 d>c|A2 G>F|E2 B2|A2 AA|',
      // page 2
      '|+>+Gd/c/ +>+BA/G/|+>+FF/G/ +>+AG/F/|+>+ED/C/ DE|FFF+segno+:||:[K:Amin] "3rd Strain" x d/f/|a2 bd\'|',
      "|e2 dc|BG e>d|ca g>g|+>+ad ab|c'gec|Bf e>d|",
      "|(c/e/g/e/) c(d/f/)|a2 bd'|e2 dc|BG e>d|ca g>g|+>+ad ab|",
      "|c'gec|Bf e>d|c[EGc][EGc] z||c'/g/e/c/ ab|bb c'2|[fa][fa] [fa][eg]|",
      "|(d/a/) (d/a/ d2)|c'/g/e/c/ ab|bb c'2|[fa][fa] [fa][eg]|(d/a/) (a/g/ c)e/g/|c'/g/e/c/ ab|",
      "|bb c'2|[fa][fa] [fa][ge]|(d/a/) (d/a/ d2)|c'/g/e/c/ ab|bb c'2|[fa][fa] [fa][ge]|",
      // page 3
      '|(d/a/) (a/g/) c:||[K:F] (3(f/g/f/)|eb de|dc Ac|^cd e>d|dc A (3(f/g/f/)|',
      'w:||Coda',
      '|eb de|dc Ac|Gc dg|ccc "8va" ((3f/g/f/)|eb de|dc Ac|',
      '|^cd e>d|dc Ac|dB d>e|fc fg|ec ga|fd/c/ eg|',
      '|[A2f2] [A2c2f2]|[Acf][Acf][Acf][Acf]|[A2c2f2] [G2c2e2]|([A4c4f4]|!fermata![A4c4f4])]|x4|',
      // bass clef
      'V:2 clef=bass',
      '|:[K:F]z|[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,EA] [F,,F,][A,CF]|[G,,G,][B,CE] [C,C][B,CE]|F,[A,CF] F,[A,CF]|',
      '|[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,CF] F,[A,CF]|G,[CE] G,[=B,F]|[CE][CE][CE] z|[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,CF] [F,,F,][A,CF]|',
      '|[G,,G,][B,CE] [C,C][B,CE]|F,[A,CF] F,[A,CF]|F,[B,DF] F,[B,DF]|F,[A,CF] F,[A,CF]|G,[B,CE] E,[B,CE]|F,[A,CF][A,CF] z|',
      '|G,[B,CE][B,CE] z|F,[A,CF][A,C] z|G,[B,C] C,[B,CE]|F,[A,CF][A,CF] z|B,,[D,G,] B,,[D,G,]|C,[F,A,C] C,[F,A,C]|',
      '|C,[G,B,] C,[G,B,]|F,[A,CF] F,[A,CF]|G,[B,CE][B,CE] z|F,[A,CF][A,C] z|G,[B,C] C,[B,CE]|F,[A,CF][A,CF] z|',
      // page 2
      '|B,,[D,G,] B,,[D,G,]|C,[F,A,] C,[F,A,]|C,[G,B,] C,[G,B,]|[F,A,][A,C][A,C]:||:[K:Amin] x z|D,[F,G,B,] G,,[F,G,B,]|',
      '|C,[G,C] E,[G,C]|D,[F,G,B,] G,,[F,G,B,]|C,[G,C] E,[G,C]|F,[A,D] F,[A,D]|G,[CE] G,[CE]|G,[B,D] G,[B,D]|',
      '|E,[G,C] C, z|D,[F,G,B,] G,,[F,G,B,]|C,[G,C] E,[G,C]|D,[F,G,B,] G,,[F,G,B,]|C,[G,C] E,[G,C]|F,[A,D] F,[A,D]|',
      '|G,[CE] G,[CE]|G,[B,F] G,[B,F]|[CE][C,C][C,C] z||E,[G,C] D,[G,B,]|D,[G,D] E,[G,C]|E,[A,C] G,[CE]|',
      '|G,[B,F] G,[B,F]|E,[G,C] D,[G,B,]|D,[G,D] E,[G,C]|F,[A,C] G,[CE]|G,[B,F] [C2E2]|E,[G,C] D,[G,B,]|',
      '|D,[G,D] E,[G,C]|F,[A,C] G,[CE]|G,[B,F] G,[B,D]|E,[G,C] D,[G,B,]|D,[G,D] E,[G,C]|F,[A,C] G,[CE]|',
      // page 3
      'w:||Repeat',
      '|G,[B,F] [CE]:||[K:F] z|[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,CF] [F,,F,][A,CF]|[G,,G,][B,CE] [C,C][B,CE]|F,[A,CF] F,[A,CF]|',
      '|[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,CF] F,[A,CF]|G,[CE] G,[=B,F]|[CE][CE][CE] z|[G,,G,][B,CE] [C,,C,][A,CF]|[F,,F,][A,CF] [F,,F,][A,CF]|',
      '|[G,,G,][B,CE] [C,C][B,CE]|F,[A,CF] F,[A,CF]|F,[B,DF] F,[B,DF]|F,[A,CF] F,[A,CF]|G,[B,CE] C,[B,CE]|F,[A,CF] C,[B,CE]|',
      '|[FF,]C,A,,F,,|[F,,F,][F,,F,][F,,F,][F,,F,]|[F,,2F,2] [C,2C2]|+tremolo+"_tremolo"([F,,4F,]|!fermata![F,,4F,4])]|x4|',
    ],
    bpm: 90,
  },
  {
    title: 'Overland mail galop',
    slug: 'overland-mail-galop',
    creator: "D'Albert, Charles",
    url: 'https://collection.sl.nsw.gov.au/record/74Vv5weGOZRZ',
    imageUrl:
      'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/150_150/3535/35357061.jpg',
    key: 'Gmaj',
    header: 'X:1\nM:2/4\nL:1/4\n%%score {1 2}\n',
    instruments: [
      {
        name: 'Piano',
        volume: 0,
        type: 'piano',
      },
      {
        name: 'Piano bass clef',
        volume: -5,
        type: 'piano',
      },
    ],
    lines: [
      'V:1 clef=treble name=VIVACE.',
      'd>e|A>B|c/A/E/F/|G/ z/ z/ d/:|',
      "+segno+:|B/d/g/a/|g>g|d/g/b/c'/|b>b|b/a/a/d/|",
      'a>a|a/g/g/B/|d>d|B/d/g/a/|g>g|',
      "d/g/b/c'/|b>b|b/a/a/g/|a/g/g/d/|g/f/e/f/|1g/ z/ g/ d/:|2g/ z/ g/ z/||",
      // page 2
      "|:[d/fad'] z/ d/e/|f/g/ a|[d/gbd'] z/ b/a/|g/a/ d|d A/B/|",
      "c/e/ d|d G/A/|B/e/ d|[d/fad'] z/ d/e/|f/g/ a|",
      "[d/gbd'] z/ b/a/|g/a/ d|d A/B/|c/e/d/g/|f/b/a/d/|g/ z/ g/ z/:|",
      "[K:Amin][Gg]>[^F^f]|[Gg]>[^F^f]|[G/g][A/a][B/b][c/c']|[dd']>c'|b>a|g>a|",
      "|g/a/d/f/|{ef}e/^d/e/ z/|[Gg]>[^F^f]|[Gg]>[^F^f]|[G/g][A/a][B/b][c/c']|",
      "|[dd']>c'|b>a|g>a|g/a/B/d/|{cd}c/B/c/ z/||",
      // page 3
      "[Ee]>[^D^d]|[Ee]>[^D^d]|[E/e]=d'/c'/b/|{ab}a/^g/ a|[Gg]>[^F^f]|[Gg]>[^F^f]|",
      "[G/g]=f'/e'/d'/|{c'd'}c'/b/ c'|d'/f'/e'/d'/|c'/g/{b}a/g/|f/a/g/a/|e/f/ g|d'/f'/e'/d'/|",
      "c'/g/{b}a/g/|a/g/a/b/|c'/ z/ c'/ z/|d'/f'/e'/d'/|c'/g/{b}a/g/|f/a/g/f/|e/f/ g|",
      "d'/f'/e'/d'/|c'/g/{b}a/g/|a/g/a/b/|[e/gc'][e/gc'][e/gc'][e/gc']|[e/gc'][e/gc'][e/gc'][e/gc']|[e/gc'][e/gc'][e/gc'][e/gc']|[e/gc'][e/gc'][e/gc'][e/gc']|",
      "[e/gc'][e/gc'][e/gc'][e/gc']|[e/gc'][e/gc'][e/gc'][e/gc']|[e/gc'][e/gc'][e/gc'][e/gc']|[e/gc'][e/gc'][e/gc'][e/gc']|d'/f'/e'/d'/|c'/g/{b}a/g/|",
      "f/a/g/f/|e/f/ g|d'/f'/e'/d'/|c'/g/{b}a/g/|a/g/a/b/|c'/ z/ c'/ z/+segno+||",
      // annnd
      // bass clef data
      'V:2 clef=bass',
      '[K:Gmaj][D,D]>[E,E]|[A,,A,]>[B,,B,]|[C,/C][A,,/A,][E,,/E,][F,,/F,]|[A,,/A,][B,/D] G,/[B,/D]:|',
      ':|"p" G,/[B,/DG] G,/[B,/DG]|G,/[B,/DG] G,/[B,/DG]|G,/[B,/DG] G,/[B,/DG]|G,/[B,/DG] G,/[B,/DG]|F/,[C/D] F/,[C/D]|',
      'D,/[C/D] D,/[C/D]|G,/[B,/D] G,/[B,/D]|G,/[B,/D] G,/[B,/D]|G,/[B,/DG] G,/[B,/DG]|G,/[B,/DG] G,/[B,/DG]|',
      'G,/[B,/DG] G,/[B,/DG]|G,/[B,/DG] G,/[B,/DG]|C,/[E,/A,] C,/[E,/A,]|D,/[G,/B,] D,/[G,/B,]|D,/[A,/C] D,/[A,/C]|1[G,/B,] z/ [G,/B,] x/:|2[G,/B,] z/ [G,/B,] z/||',
      // page 2
      '|:"ff"F,/"p"[C/D] F,/[C/D]|F,/[C/D] F,/[C/D]|"ff"G,/"p"[B,/D] D,/[B,/D]|G,/[B,/D] D,/[B,/D]|F,/[C/D] D,/[C/D]|',
      'F,/[C/D] D,/[C/D]|G,/[B,/D] D,/[B,/D]|G,/[B,/D] D,/[B,/D]|"ff"F,/"p"[C/D] D,/[C/D]|F,/[C/D] D,/[C/D]|',
      '"ff"G,/"p"[B,/D] D,/[B,/D]|G,/[B,/D] D,/[B,/D]|F,/[C/D] D,/[C/D]|F,/[C/D] D,/[C/D]|F,/[C/D] D,/[C/D]|[G,/B,D] z/ [G,/B,/D] z/:|',
      '[K:Amin]C,/"dolce"[E,/G,] G,,/[E,/G,]|C,/[E,/G,] G,,/[E,/G,]|C,/[E,/G,] G,,/[E,/G,]|B,,/[F,/G,] G,,/[F,/G,]|B,,/[F,/G,] G,,/[F,/G,]|B,,/[F,/G,] G,,/[F,/G,]|',
      '|B,,/[F,/G,] G,,/[F,/G,]|C,/[E,/G,] G,,/[E,/G,]|C,/[E,/G,] G,,/[E,/G,]|C,/[E,/G,] G,,/[E,/G,]|C,/[E,/G,] G,,/[E,/G,]|',
      '|B,,/[F,/G,] G,,/[F,/G,]|B,,/[F,/G,] G,,/[F,/G,]|B,,/[F,/G,] G,,/[F,/G,]|B,,/[F,/G,] G,,/[F,/G,]|[C,/E,G,][C,/E,G,][C,/E,G,] z/||',
      // page 3
      '^G,,/"Cres:"[B,,/D,E,] G,,/[B,,/D,E,]|A,,/[C,/E,] A,,/[C,/E,]|"f"B,,/[D,/E,^G,] B,,/[D,/E,G,]|C,/[E,/A,] C,/[E,/A,]|B,,/"Cres:"[D,/F,G,] B,,/[D,/F,G,]|C,/[E,/G,] C,/[E,/G,]|',
      '"f"D,/[F,/G,B,] D,/[F,/G,B,]|E,/[G,/C] E,/[G,/C]|"p"F,/[A,/D] F,/[A,/D]|G,/[C/E] G,/[C/E]|G,,/[F,/G,B,][F,/G,B,][F,/G,B,]|C,/[E,/G,C][E,/G,C][E,/G,C]|F,/[A,/D] F,/[A,/D]|',
      'G,/[C/E] G,/[C/E]|G,/[D/F] G,/[D/F]|[C/E] z/ [C/E] z/|"p"F,/[A,/D] F,/[A,/D]|G,/[C/E] G,/[C/E]|G,,/[F,/G,B,][F,/G,B,][F,/G,B,]|C,/[E,/G,C][E,/G,C][E,/G,C]|',
      'F,/[A,/D] F,/[A,/D]|G,/[C/E] G,/[C/E]|G,/[D/F] G,/[D/F]|"ff"[CE]>C,|"^>"E, "^>"G,|"^>"C "^>"G,|"^>"E, "_>"C,|',
      '[A,,A,]>A,,|"_>"C, "^>"E,|"^>"A, "^>"E,|"_>"C, "_>"A,,|F,/[A,/D] F,/[A,/D]|G,/[C/E] G,/[C/E]|',
      'G,,/[F,/G,B,][F,/G,B,][F,/G,B,]|C,/[E,/G,C][E,/G,C][E,/G,C]|F,/[A,/D] F,/[A,/D]|G,/[C/E] G,/[C/E]|G,/[D/F] G,/[D/F]|[C/E] z/ [C/E] "^D.C."z/||',
    ],
    bpm: 130,
  },
  // {
  //   title: 'The Sutherland Waltz',
  //   slug: 'the-sutherland-waltz',
  //   creator: 'Katie Linton',
  //   url: 'https://collection.sl.nsw.gov.au/record/74VK63pbRQBA',
  //   imageUrl:
  //     'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/150_150/3747/37479310.jpg',
  //   key: 'Ebmaj',
  //   header: 'X:1\nM:3/4\nL:1/4\n%%score {1 2}\n',
  //   instruments: [
  //     {
  //       name: 'Piano',
  //       volume: 0,
  //       type: 'piano',
  //     },
  //     {
  //       name: 'Piano bass clef',
  //       volume: -5,
  //       type: 'piano',
  //     },
  //   ],
  //   lines: [
  //     'V:1 clef=treble name=INTRO-',
  //     '"_Con Bravara"([B2b] [B/b]) [B/b]|"8va"[Bdfb] z [B^c]|[Bd] z z|z3|([B2b] [B/b]) [B/b]|"8va"[Bdfb] z [Bd]|[Be] z z|z3|',
  //     '(B,2 B,/) [B/b]|[Bb] z [^c=e]|[df] z z|Z|B,3|!arpeggio![D2FAB] z|"8va"!arpeggio![Bdfa] z z||',
  //     "!arpeggio![GBeg] z !arpeggio![Begb]|!arpeggio![egbe'] z !arpeggio![gbe'g']|([f3bd'f']|[fbd'f']) z !arpeggio![egbe']|[dbd'] z [cac']|[Bfb] z [Afa]|([G3Bg]|[GBg]) [Ff] [Gg]|",
  //     "[A3/2ca] [A/fa] ([Afa]|[Aa]) [Gg] [Aa]|[B3/2b] [B/b] ([Bb]|[Bb]) [=A=a] [Bb]|[c3/2c'] [c/c'] [cc']|!<(![cc'] [dbd'] [e=ae']|[dbd']!<)! z z|z [cc'] [Bb]|",
  //     "!arpeggio![GBeg] z !arpeggio![Begb]|!arpeggio![egbe'] z !arpeggio![gbe'g']|(!arpeggio![f3bd'f']|[fbd'f']) z [ee']|[dbd'] z [cac']|[Bfb] z [Afa]|([G3eg]|[Geg]) [Ff] [Gg]|",
  //     "[A3/2a] [A/a] ([Aa]|[Aa]) [Gg] [Aa]|[B3/2b] [B/b] ([Bb]|[Bb]) [=A=a] [Bb]|[c3/2c'] [c/c'] [cc']|[cc'] [gg'] [ff']|e/g/b/e'/g/b/|e' z f||",
  //     // bass in your face
  //     'V:2 clef=bass name=DUCTION',
  //     '"ff"(B,2 B,/) B,/|B,2 =E|F z z|z3|(B,2 B,/) B,/|B,2 [K: clef=treble]F|[B,G] z z|z3|', // A,,|[D,,B,,] z z|z3|',
  //     '(B,,2 B,,/) B,,/|B,, z [K: clef=treble] G|[B,A] z z|Z[K: clef=bass]|[B,,,3B,,]|!arpeggio![B,,2F,B,] z|!arpeggio![D,A,C] "rit"[C,,C,] [D,,D,]||',
  //     '[E,,E,] [G,B,E] [G,B,E]|[E,,E,] [G,B,E] [G,B,E]|[B,,B,] [F,A,B,D] [F,A,B,D]|[F,,F,] [F,B,D] [G,B,E]|[B,,,B,,] [A,B,D] [A,B,D]|[D,,D,] [F,B,D] [F,B,D]|[E,,E,] [G,B,E] [G,B,E]|[E,,E,] [G,B,E] [=E,,=E,]|',
  //     '[F,,F,] [A,CF] [A,CF]|[B,,,B,,] [F,B,D] [F,B,D]|[E,,E,] [G,B,E] [G,B,E]|[G,,G,] [=A,CE] [_G,,_G,]|[F,,F,] [F,A,E] [F,A,E]|[G,,G,] [D,,D,] [C,,C,]|[B,,,B,,] [F,B,D] [F,B,D]|[B,,,B,,] [F,A,B,D] [F,A,B,D]|',
  //     '[E,,E,] [G,B,E] [G,B,E]|[E,,E,] [G,B,E] [G,B,E]|[B,,B,] [F,A,B,D] [F,A,B,D]|[F,,F,] [F,B,D] [G,B,E]|[B,,,B,,] [F,A,B,D] [F,A,B,D]|[D,,D,] [F,B,D] [F,B,D]|[E,,E,] [G,B,E] [G,B,E]|[B,,,B,,] [G,B,E] [=E,,=E,]|',
  //     '[F,,F,] [A,CF] [A,CF]|[B,,,B,,] [F,B,D] [F,B,D]|[E,,E,] [G,B,E] [G,B,E]|[G,,G,] [F,=A,CE] [_G,,_G,]|[F,,F,] [F,A,E] [F,A,E]|F, [A,B,D] [A,B,D]|E, B,, G,,|E,, F,,, z||',
  //   ],
  //   bpm: 160,
  // },
  {
    title: 'The Sutherland Waltz',
    slug: 'the-sutherland-waltz',
    creator: 'Katie Linton',
    url: 'https://collection.sl.nsw.gov.au/record/74VK63pbRQBA',
    imageUrl:
      'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/150_150/3747/37479310.jpg',
    key: 'Ebmaj',
    header: 'X:1\nM:3/4\nL:1/4\n%%score { 1 2 }\n',
    instruments: [
      {
        name: 'Piano',
        volume: 0,
        type: 'piano',
      },
      {
        name: 'Piano bass clef',
        volume: -5,
        type: 'piano',
      },
    ],
    lines: [
      'V:1 treble',
      'V:2 bass',
      'V:1',
      '"@-70,-42Con Bravara"[Bb]2- [Bb]/ "8va"[Bb]/ | "----|"[Bdfb] z [^cB] | [Bd] z z | z3 | [Bb]2- [Bb]/ "8va"[Bb]/ | "----|"[Bdfb] z [Bd] | [Be] z z | z3 |',
      'B,2- B,/ [Bb]/ | [Bb] z [^c=e] | [df] z z | Z | B,3 |!arpeggio![DFAB]2 z |!arpeggio![dfab]2 z |!arpeggio![Bdfa] z z ||',
      "!arpeggio![GBeg] z !arpeggio![Begb] | !arpeggio![egbe'] z !arpeggio![gbe'g'] | [fbd'f']3- | [fbd'f'] z !arpeggio![egbe'] | [dbd'] z [cac'] | [Bfb] z [Afa] | [gGB]3- | [GBg] [Ff] [Gg] |",
      "[Aca]3/2 [Afa]/ ([A-fa] | [Aa]) [Gg] [Aa] | [Bb]3/2 [Bb]/ [Bb]- | [Bb] [=A=a] [Bb] | [cc']3/2 [cc']/ [cc'] | !<(![cc'] [dbd'] [e=ae'] | [dbd']!<)! z z | z [cc'] [Bb] |",
      "[GBeg] z [Begb] | [egbe'] z [gbe'g'] | [fbd'f']3- | [fbd'f'] z [ee'] | [dbd'] z [cac'] | [Bfb] z [Afa] | [Gge]3- | [Geg] [Ff] [Gg] |",
      "[Aa]3/2 [Aa]/ [Aa]- | [Aa] [Gg] [Aa] | [Bb]3/2 [Bb]/ [Bb]- | [Bb] [=A=a] [Bb] | [cc']3/2 [cc']/ [cc'] | [cb] [gg'] [ff'] |\"@65,32 8va ------|\"e/g/b/e'/f/b/ | e' z f ||:[K:Bbmaj]",
      // page 2
      '"@-45,-45 p"z {gf}e z | z {fe}c z | z {fd}B G | F z F | "_cres"^F z [FAcd] | [Ace] z [Ace^f] | [Bdg] z [Bdg] | "_f"[Acea] [Aceg] [Acd^f] |"_p"z {gf}e z |',
      'z {fe}c z | z {fd}B g | "_f"[Acfa] z [Acfa] | [Adfa] z [Adfa] | [cefa] [cefg] [cefa] | [Bdfb] [Bdfb] [Bdfb] |[1 [Bdfb] z f :|[2 x z2 ||',
      "[K:Eb] !arpeggio![GBeg] z !arpeggio![Begb] | !arpeggio![egbe'] z !arpeggio![gbe'g'] | [ff'bd']3- | [fbd'f'] z !arpeggio![egbe'] | [dbd'] z [cac'] | [Bfb] z [Afa] | [GBeg]3- |[GBeg] [Ff] [Gg] |",
      "[Aca]3/2 [Afa]/ ([A-fa] | [Aa]) [Gg] [Aa] | [Bb]3/2 [Bb]/ [Bb]- | [Bb] [=A=a] [Bb] | [cc']3/2 [cc']/ [cc'] | !<(![cc'] [dbd'] [e=ae'] | [fbd']!<)! z z |z [cc'] [Bb] |",
      "!arpeggio![GBeg] z !arpeggio![Begb] | !arpeggio![egbe'] z !arpeggio![gbe'g'] | !arpeggio![fbd'f']3- | [fbd'f'] z [ee'] | [dbd'] z [cac'] | [Bfb] z [Afa] | [Geg]3- |[Geg] [Ff] [Gg] |",
      '"@-50,-45cres"[Aa]3/2 [Aa]/ [Aa]- | [Aa] [Gg] [Aa] | [Bb]3/2 [Bb]/ [Bb]- | [Bb] [=A=a] [Bb] | [cc\']3/2 [dc\']/ [dc\'] | [cc\'] "@0,32 8ve ---|"[Gg] [Ff] | "@65,32 8ve ------|"e/g/b/e\'/g/b/ |e\' z z |',
      'V:2',
      '"@-10,-3ff"B,2- B,/ B,/ | B,2 =E | F z z | z3 | B,2- B,/ B,/ | B,2[K:treble] F | [B,G] z z | z3 | %8',
      'B,,2- B,,/ B,,/ | B,, z[K:treble] G | [B,A] z z | Z[K:bass]| [B,,,B,,]3 |!arpeggio![B,,F,A,]2 z |[K:treble]!arpeggio![B,FA]2 z |!arpeggio![Bfa][K:bass] [C,,C,] [D,,D,] ||',
      '[E,,E,] [G,B,E] [G,B,E] | [E,,E,] [G,B,E] [G,B,E] | [B,,B,] [F,A,B,D] [F,A,B,D] | [F,,F,] [F,B,D] [G,B,E] | [B,,,B,,] [A,B,D] [A,B,D] | [D,,D,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [E,,E,] [G,B,E] [=E,,=E,] |',
      '[F,,F,] [A,CF] [A,CF] | [B,,,B,,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [G,,G,] [=A,CE] [_G,,_G,] | [F,,F,] [F,A,E] [F,A,E] | [F,,F,] [D,,D,] [C,,C,] | [B,,,B,,] [F,B,D] [F,B,D] | [B,,,B,,] [F,A,B,D] [F,A,B,D] |',
      '[E,,E,] [G,B,E] [G,B,E] | [E,,E,] [G,B,E] [G,B,E] | [B,,B,] [A,F,B,D] [A,F,B,D] | [F,,F,] [F,B,D] [G,B,E] | [B,,,B,,] [F,A,B,D] [F,A,B,D] | [D,,D,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [B,,,B,,] [G,B,E] [=E,,=E,] |',
      '[F,,F,] [A,CF] [A,CF] | [B,,,B,,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [G,,G,] [F,=A,CE] [_G,,_G,] | [F,,F,] [F,A,E] [F,A,E] | F, [A,B,D] [A,B,D] | E, B,, G,, | E,, E,,, z ||:[K:Bbmaj]',
      // page 2
      '[F,,F,] [A,CE] [A,CE] | A,, [F,A,CE] [CE] | [B,,B,] [B,D] [B,D] | B,, [B,D] [B,D] | D, [A,CD] [A,CD] | A, [CE] [CE] | D, [B,D] [B,D] | [=F,,=F,] [A,CE] [A,CE] |[F,,F,] [A,CE] [A,CE] |',
      'C, [F,A,E] [F,A,E] | B,, [F,B,D] [F,B,D] | F, [A,C] [A,C] | [D,,D,] [A,DF] [A,DF] | C, [A,CE] [F,,F,] | [B,,,B,,] [F,B,D] [F,B,D] |[1 [B,,,B,,] [F,B,D] z :|[2 [B,,,B,,] [C,,C,] [D,,D,] ||',
      '[K:Eb] [E,,E,] [G,B,E] [G,B,E] | [E,,E,] [G,B,E] [G,B,E] | [B,,B,] [A,B,D] [A,B,D] | [F,,F,] [F,B,D] [G,B,E] | [B,,,B,,] [DF,A,B,] [DF,A,B,] | [D,,D,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] |[E,,E,] [G,B,E] [=E,,=E,] |',
      '[F,,F,] [A,CF] [A,CF] | [B,,,B,,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [G,,G,] [=A,CE] [_G,,_G,] | [F,,F,] [F,A,E] [F,A,E] | [F,,F,] [D,,D,] [C,,C,] | [B,,,B,,] [F,B,D] [F,B,D] |[B,,,B,,] [F,A,B,D] [F,A,B,D] |',
      '[E,,E,] [G,B,E] [G,B,E] | [E,,E,] [G,B,E] [G,B,E] | [B,,B,] [F,A,B,D] [F,A,B,D] | [F,,F,] [F,B,D] [G,B,E] | [B,,,B,,] [F,A,B,D] [F,A,B,D] | [D,,D,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] |[B,,,B,,] [G,B,E] [=E,,=E,] |',
      '[F,,F,] [A,CF] [A,CF] | [B,,,B,,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [G,,G,] [=A,CE] [_G,,_G,] | [F,,F,] [F,A,E] [F,A,E] | F, [A,B,D] [A,B,D] | E, B,, G,, |E,, E,,, z |',
    ],
    bpm: 160,
  },
];

export default songs;
