const songs = [
  {
    title: 'National Song: Our Sailor Prince',
    slug: 'national-song-our-sailor-prince',
    creator: 'Neild, J. C',
    year: '1867',
    contents: '1 score (3 p.) ; 37 cm.',
    description:
      "Respectfully dedicated to His Royal Highness Prince Alfred. Sung by the composer at Mr. C. E. Horsley's concerts",
    // url: 'https://collection.sl.nsw.gov.au/digital/file/06ddDNk67LV8G',
    url: 'https://collection.sl.nsw.gov.au/record/74VK72Jokyp3/PDwmkX2vLk6mO',
    imageUrl:
      'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3750/37501760.jpg',
    // imageUrl: '/virtuoso/images/national-song.png',
    metaImageUrl: '/virtuoso/images/national-song-social.jpg',
    metaImageWidth: 1200,
    metaImageHeight: 638,
    key: 'A',
    // NOTE: '%%score 1 {2 | 3}' groups 1 and 2 together, seems to be a bug in ABCJS
    header: 'X:1\nM:4/4\nL:1/4\n%%score 1 {2 | 3}\n',
    // instruments: ['clarinet', 'piano', 'piano'],
    instruments: [
      {
        name: 'Voice',
        volume: -6,
        type: 'clarinet',
        clef: 'treble',
      },
      {
        name: 'Piano treble clef',
        volume: -6,
        type: 'piano',
        clef: 'treble',
      },
      {
        name: 'Piano bass clef',
        volume: -6,
        type: 'piano',
        clef: 'bass',
      },
    ],
    lines: [
      // voice 1
      'V:1 name="VOICE"',
      'z4|z4|z4|',
      'z4|E A/ c/ B G/F/|E e c2|',
      'w:|1.~Our Sail~-or Prince thy|no~-ble ship|',
      'w:|2.~Our Sail~-or Prince we|wel~-come Thee|',
      'A G/ B/ E F|G2 z2|E A/ c/ B G/F/|',
      "w:Hath cleft~ the o~-cean's|foam,|And~ brought~ Thee~ safe~-ly|",
      'w:With fes~-tive~ shout and|cheer,|For thy sake and thy|',
      // page 2
      'E e c2|A F/ B/ E G|A2 z2|',
      'w:to the shores|Of our Aust~- tra~- lian|home,|',
      'w:Mo-thers’ sake|The Queen to us so|dear,|',
      'E c/ B/4A/4 e c|d A B3/2 c/|E F A B|',
      'w:Hail to the * might~- ty|Land of Gold, Of|wav~- ing corn and|',
      'w:In this fair * south~- ern|Land of ours, Though|o~- cean rolls be~-|',
      'G2 z2|E c/ B/4A/4 e c|d A B2|',
      'w:vine|Of count-less * mul~- ti~-|tudes of sheep|',
      'w:tween|Our shores~ and * dear old|Eng~- land’s shores|',
      'c e/ E/ !fermata!c3/2 B/|A2 z2|z4|z4||',
      'w:And~ count~ less~ herds of|kine.|||',
      'w:We still re~- vere the|Queen.|||',
      // voice 2
      'V:2 clef=treble name="PIANO-"',
      "\"@-5,55 Con Spirito alla Marcia.\" !f![Ee] [Aa] [cc'] [B/b][A/a]|[Bb] [ee'] [c2c'2]|[Aa] [F/f][d/d'] [cc'] [Bb]|",
      '[Aa] [CEA] z [CEA]|z [CEA] z [B,DG]|z [B,DE] z [CEc]',
      '[A,/E/A/] z/ [D/E/G/] z/ [C/E/A/] z/ [C/F/c/] z/|z [^DG^B] z [=DG=B]|z [CEA] z [B,DG]|',
      // page 2
      'z [B,EB] z [CEA]|[A,/E/A/] z/ [D/F/B/] z/ [C/E/A/] z/ [D/G/E/] z/|[C/E/A] z/ c/>e/ A/ z/ z|',
      'z [C/E/A/] z/ [B,/E/B/] z/ [C/E/A/] z/| z [A,^DA] [B,=DA] G/F/|E [A,DF] [A,DA] [DFB]|',
      '[B,EG] [EBd] [Ac] [EGB]|z [CEA] z [CEA]|z [A,DA] z [B,^DA]|',
      '[CEA] [A,EA] !fermata![B,^DA] [B,=DG]|[CA] ((3E/A/c/) e E|[EF] A/>d/ [Ec] ((3e/d/c/)|[EA] [CE] [CA] z ||',
      // voice 3
      'V:3 clef=bass name="FORTE."',
      'A,, [E,A,C] A,, [E,A,C]|G,, [E,G,D] A,, [E,A,C]|[C,,C,] [D,F,B,] [E,,E,] [E,G,D]|',
      '[A,,A,] z [A,,E,A,] z |[A,,A,] z [E,,E,] z|[G,,G,] z [A,,A,] z|',
      '[C,,/C,/] z/ [B,,,/B,,/] z/ [A,,,/A,,/] z/ [A,,/A,/] z/|[G,,G,] z [E,,E,] z|[A,,A,] z [E,,E,] z|',
      // page 2
      '[G,,G,] z [A,,A,] z|[C,,/C,/] z/ [D,,/D,/] z/ [E,,/E,/] z/ [E,,/E,/] z/|[A,,/A,/] z/ [A,-C-E-A] [A,/C/E/] z/ z|',
      '[A,,A,] z [G,,/G,/] z/ [A,,/A,/] z/ |[F,,2F,2] [E,,3/2E,3/2] [D,,/D,/]|[C,,C,] [D,,D,] [F,,F,] [D,,D,]|',
      '[E,,E,] E,2 E,|[A,,A,] z [=G,,=G,] z|[F,,F,] z [=F,,=F,] z|',
      '[E,,E,] [C,,C,] !invertedfermata![B,,,B,,] [E,,E,]|[A,,A,] [C,2A,2E2] [C,A,]|[D,A,] [F,A,D] [E,A,] [E,B,DEG]|[A,C] [A,,E,A,] [A,,E,A,] !fine! z||',

      'W:THIRD VERSE',
      'W:',
      'W:Though we have left the dear old land,',
      'W:We love it e’en the same,',
      'W:And glory we are Britons still',
      'W:In heart, if not in name.',
      'W:We’ll ne’er forget that to these shores',
      'W:Our Sailor Prince has been:',
      'W:But in our prayers we’ll link the names',
      'W:Of Alfred and our Queen.',
    ],
    tempo: 110,
    files: [
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VK72Jokyp3/PDwmkX2vLk6mO',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3750/37501760.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VK72Jokyp3/06ddDNk67LV8G',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3750/37501761.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VK72Jokyp3/Ee6om0mmoxAWN',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3750/37501762.jpg',
      },
    ],
  },
  {
    title: 'The Glebe Rowing Club Polka',
    slug: 'the-glebe-rowing-club-polka',
    creator: 'Bull, Josie L.',
    year: '1870-1880',
    contents: '1 score (3 p.) ; 36 cm.',
    description: 'Dedicated to the members of the Glebe Rowing Club',
    url: 'https://collection.sl.nsw.gov.au/record/74VvB8goborA/k3BVB5VEzxxlp',
    // imageUrl: '/virtuoso/images/the-glebe-rowing-club-polka.png',
    imageUrl:
      'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3731/37316360.jpg',
    metaImageUrl: '/virtuoso/images/the-glebe-rowing-club-polka-social.jpg',
    metaImageWidth: 1200,
    metaImageHeight: 638,
    key: 'F',
    header: 'X:1\nM:2/4\nL:1/8\n%%score {1 | 2}\n',
    instruments: [
      {
        name: 'Treble clef',
        volume: 0,
        type: 'piano',
        clef: 'treble',
      },
      {
        name: 'Bass clef',
        volume: 0,
        type: 'piano',
        clef: 'bass',
      },
    ],
    lines: [
      'V:1 clef=treble',
      '+segno+((3f/g/f/)|eb de|dc Ac|^cd e>d|dcA ((3f/g/f/)|',
      'eb de|dc Ac|Gc dg|ccc "8va" ((3f/g/f/)|eb de|dc Ac|',
      ' ^cd e>d|dc Ac|dB d>e|fc fg|ec ga|+>+f2 c"loco"f|',
      'e2 d>c|A2 G>F|E2 B2|A2 AA|dB GB|+>+A2 GF|',
      'E2 DC|A2 cf|e2 d>c|A2 G>F|E2 B2|A2 AA|',
      // page 2
      '+>+Gd/c/ +>+BA/G/|+>+FF/G/ +>+AG/F/|+>+ED/C/ DE|FFF+segno+:||:[K:Am] "3rd Strain" d/f/|a2 bd\'|',
      "e2 dc|BG e>d|ca g>g|+>+ad ab|c'gec|Bf e>d|",
      "(c/e/g/e/) c(d/f/)|a2 bd'|e2 dc|BG e>d|ca g>g|+>+ad ab|",
      "c'gec|Bf e>d|c[EGc][EGc] z||c'/g/e/c/ ab|bb c'2|[fa][fa] [fa][eg]|",
      "(d/a/) (d/a/ d2)|c'/g/e/c/ ab|bb c'2|[fa][fa] [fa][eg]|(d/a/) (a/g/ c)e/g/|c'/g/e/c/ ab|",
      "bb c'2|[fa][fa] [fa][ge]|(d/a/) (d/a/ d2)|c'/g/e/c/ ab|bb c'2|[fa][fa] [fa][ge]|",
      // page 3
      '(d/a/) (a/g/)"@-30,35 Repeat from 3rd part" c:||[K:F]"_Coda" (3(f/g/f/)|eb de|dc Ac|^cd e>d|dc A (3(f/g/f/)|',
      'eb de|dc Ac|Gc dg|ccc "8va" ((3f/g/f/)|eb de|dc Ac|',
      '^cd e>d|dc Ac|dB d>e|fc fg|ec ga|fd/c/ eg|',
      '[A2f2] [A2c2f2]|[Acf][Acf][Acf][Acf]|[A2c2f2] [G2c2e2]|[A4c4f4]-|!fermata![A4c4f4] ]|',
      // bass clef
      'V:2 clef=bass stem=down',
      'z|[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,EA] [F,,F,][A,CF]|[G,,G,][B,CE] [C,C][B,CE]|F,[A,CF] F,[A,CF]|',
      '[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,CF] F,[A,CF]|G,[CE] G,[=B,F]|[CE][CE][CE] z|[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,CF] [F,,F,][A,CF]|',
      '[G,,G,][B,CE] [C,C][B,CE]|F,[A,CF] F,[A,CF]|F,[B,DF] F,[B,DF]|F,[A,CF] F,[A,CF]|G,[B,CE] E,[B,CE]|F,[A,CF][A,CF] z|',
      'G,[B,CE][B,CE] z|F,[A,CF][A,C] z|G,[B,C] C,[B,CE]|F,[A,CF][A,CF] z|B,,[D,G,] B,,[D,G,]|C,[F,A,C] C,[F,A,C]|',
      'C,[G,B,] C,[G,B,]|F,[A,CF] F,[A,CF]|G,[B,CE][B,CE] z|F,[A,CF][A,C] z|G,[B,C] C,[B,CE]|F,[A,CF][A,CF] z|',
      // page 2
      'B,,[D,G,] B,,[D,G,]|C,[F,A,] C,[F,A,]|C,[G,B,] C,[G,B,]|[F,A,][A,C][A,C]:||:[K:Am] z|D,[F,G,B,] G,,[F,G,B,]|',
      'C,[G,C] E,[G,C]|D,[F,G,B,] G,,[F,G,B,]|C,[G,C] E,[G,C]|F,[A,D] F,[A,D]|G,[CE] G,[CE]|G,[B,D] G,[B,D]|',
      'E,[G,C] C, z|D,[F,G,B,] G,,[F,G,B,]|C,[G,C] E,[G,C]|D,[F,G,B,] G,,[F,G,B,]|C,[G,C] E,[G,C]|F,[A,D] F,[A,D]|',
      'G,[CE] G,[CE]|G,[B,F] G,[B,F]|[CE][C,C][C,C] z||E,[G,C] D,[G,B,]|D,[G,D] E,[G,C]|F,[A,C] G,[CE]|',
      'G,[B,F] G,[B,F]|E,[G,C] D,[G,B,]|D,[G,D] E,[G,C]|F,[A,C] G,[CE]|G,[B,F] [C2E2]|E,[G,C] D,[G,B,]|',
      'D,[G,D] E,[G,C]|F,[A,C] G,[CE]|G,[B,F] G,[B,D]|E,[G,C] D,[G,B,]|D,[G,D] E,[G,C]|F,[A,C] G,[CE]|',
      // page 3
      'G,[B,F] [CE]:||[K:F] z|[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,CF] [F,,F,][A,CF]|[G,,G,][B,CE] [C,C][B,CE]|F,[A,CF] F,[A,CF]|',
      '[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,CF] F,[A,CF]|G,[CE] G,[=B,F]|[CE][CE][CE] z|[G,,G,][B,CE] [C,,C,][B,CE]|[F,,F,][A,CF] [F,,F,][A,CF]|',
      '[G,,G,][B,CE] [C,C][B,CE]|F,[A,CF] F,[A,CF]|F,[B,DF] F,[B,DF]|F,[A,CF] F,[A,CF]|G,[B,CE] C,[B,CE]|F,[A,CF] C,[B,CE]|',
      '[FF,]C,A,,F,,|[F,,F,][F,,F,][F,,F,][F,,F,]|[F,,2F,2] [C,2C2]|"_tremolo"(!trem2![F,,4F,]|!fermata![F,,4F,4])]|',
    ],
    tempo: 90,
    files: [
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VvB8goborA/k3BVB5VEzxxlp',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3731/37316360.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VvB8goborA/LwEVobbNOLXp4',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3731/37316361.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VvB8goborA/vZJdBZrx44VvM',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3731/37316362.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VvB8goborA/ZErZ80m8KJrWm',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3731/37316363.jpg',
      },
    ],
  },
  {
    title: 'Overland mail galop',
    slug: 'overland-mail-galop',
    creator: "D'Albert, Charles",
    url: 'https://collection.sl.nsw.gov.au/record/74Vv5weGOZRZ/GAjqa2lmXD2VG',
    year: '1858-1864',
    contents: '1 score (4 p.) ; 31 cm.',
    description: null,
    // imageUrl: '/virtuoso/images/overland-mail-galop.png',
    imageUrl:
      'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3535/35357060.jpg',
    metaImageUrl: '/virtuoso/images/overland-mail-galop-social.jpg',
    metaImageWidth: 1200,
    metaImageHeight: 638,
    key: 'G',
    header: 'X:1\nM:2/4\nL:1/4\n%%score {1 2}\n',
    instruments: [
      {
        name: 'Piano',
        volume: 0,
        type: 'piano',
        clef: 'treble',
      },
      {
        name: 'Piano bass clef',
        volume: -5,
        type: 'piano',
        clef: 'bass',
      },
    ],
    lines: [
      'V:1 clef=treble name=VIVACE.',
      '!ff!d>e|A>B|c/A/E/F/|G/ z/ z/ d/||',
      "+segno+|:!p!B/d/g/a/|g>g|d/g/b/c'/|b>b|b/a/a/d/|",
      'a>a|a/g/g/B/|d>d|B/d/g/a/|g>g|',
      "d/g/b/c'/|b>b|b/a/a/g/|a/g/g/d/|g/f/e/f/|1g/ z/ g/ d/:|2g/ z/ g/ z/||",
      // page 2
      "|:!ff![d/fad'] !p!z/ d/e/|f/g/ a|!ff![d/gbd'] !p!z/ b/a/|g/a/ d|d A/B/|",
      "c/e/ d|d G/A/|B/e/ d|!ff![d/fad'] !p!z/ d/e/|f/g/ a|",
      "!ff![d/gbd'] !p!z/ b/a/|g/a/ d|d A/B/|c/e/d/g/|f/b/a/d/|g/ z/ g/ z/:|",
      "[K:Am][Gg]>[^F^f]|[Gg]>[^F^f]|[G/g][A/a][B/b][c/c']|[dd']>c'|b>a|g>a|",
      "g/a/d/f/|{ef}e/^d/e/ z/|[Gg]>[^F^f]|[Gg]>[^F^f]|[G/g][A/a][B/b][c/c']|",
      "[dd']>c'|b>a|g>a|g/a/B/d/|{cd}c/B/c/ z/||",
      // page 3
      "[Ee]>[^D^d]|[Ee]>[^D^d]|!f![E/e]=d'/c'/b/|{ab}a/^g/ a|[Gg]>[^F^f]|[Gg]>[^F^f]|",
      "!f![G/g]=f'/e'/d'/|{c'd'}c'/b/ c'|!p!d'/f'/e'/d'/|c'/g/{b/}a/g/|f/a/g/f/|e/f/ g|d'/f'/e'/d'/|",
      "c'/g/{b/}a/g/|a/g/a/b/|c'/ z/ c'/ z/|!p!d'/f'/e'/d'/|c'/g/{b/}a/g/|f/a/g/f/|e/f/ g|",
      "d'/f'/e'/d'/|c'/g/{b}a/g/|a/g/a/b/|!ff![e/gc'][e/gc'][e/gc'][e/gc']|[e/gc'][e/gc'][e/gc'][e/gc']|[e/gc'][e/gc'][e/gc'][e/gc']|[e/gc'][e/gc'][e/gc'][e/gc']|",
      "[e/ac'][e/ac'][e/ac'][e/ac']|[e/ac'][e/ac'][e/ac'][e/ac']|[e/ac'][e/ac'][e/ac'][e/ac']|[e/ac'][e/ac'][e/ac'][e/ac']|d'/f'/e'/d'/|c'/g/{b}a/g/|",
      "f/a/g/f/|e/f/ g|d'/f'/e'/d'/|c'/g/{b}a/g/|a/g/a/b/|c'/ z/ c'/ z/+segno+||",
      // annnd
      // bass clef data
      'V:2 clef=bass stem=down',
      '[K:G][D,D]>[E,E]|[A,,A,]>[B,,B,]|[C,/C][A,,/A,][E,,/E,][F,,/F,]|[G,,/G,][B,/D] G,/[B,/D]||',
      '|:G,/[B,/DG] G,/[B,/DG]|G,/[B,/DG] G,/[B,/DG]|G,/[B,/DG] G,/[B,/DG]|G,/[B,/DG] G,/[B,/DG]|F,/[C/D] F,/[C/D]|',
      'D,/[C/D] D,/[C/D]|G,/[B,/D] G,/[B,/D]|G,/[B,/D] G,/[B,/D]|G,/[B,/DG] G,/[B,/DG]|G,/[B,/DG] G,/[B,/DG]|',
      'G,/[B,/DG] G,/[B,/DG]|G,/[B,/DG] G,/[B,/DG]|C,/[E,/A,] C,/[E,/A,]|D,/[G,/B,] D,/[G,/B,]|D,/[A,/C] D,/[A,/C]|1[G,/B,] z/ [G,/B,] x/:|2[G,/B,] z/ [G,/B,] z/||',
      // page 2
      '|:F,/[C/D] F,/[C/D]|F,/[C/D] F,/[C/D]|G,/[B,/D] D,/[B,/D]|G,/[B,/D] D,/[B,/D]|F,/[C/D] D,/[C/D]|',
      'F,/[C/D] D,/[C/D]|G,/[B,/D] D,/[B,/D]|G,/[B,/D] D,/[B,/D]|F,/[C/D] D,/[C/D]|F,/[C/D] D,/[C/D]|',
      'G,/[B,/D] D,/[B,/D]|G,/[B,/D] D,/[B,/D]|F,/[C/D] D,/[C/D]|F,/[C/D] D,/[C/D]|F,/[C/D] D,/[C/D]|[G,/B,D] z/ [G,/B,/D] z/:|',
      '[K:Am]C,/"dolce"[E,/G,] G,,/[E,/G,]|C,/[E,/G,] G,,/[E,/G,]|C,/[E,/G,] G,,/[E,/G,]|B,,/[F,/G,] G,,/[F,/G,]|B,,/[F,/G,] G,,/[F,/G,]|B,,/[F,/G,] G,,/[F,/G,]|',
      'B,,/[F,/G,] G,,/[F,/G,]|C,/[E,/G,] G,,/[E,/G,]|C,/[E,/G,] G,,/[E,/G,]|C,/[E,/G,] G,,/[E,/G,]|C,/[E,/G,] G,,/[E,/G,]|',
      'B,,/[F,/G,] G,,/[F,/G,]|B,,/[F,/G,] G,,/[F,/G,]|B,,/[F,/G,] G,,/[F,/G,]|B,,/[F,/G,] G,,/[F,/G,]|[C,/E,G,][C,/E,G,][C,/E,G,] z/||',
      // page 3
      '^G,,/"Cres:"[B,,/D,E,] G,,/[B,,/D,E,]|A,,/[C,/E,] A,,/[C,/E,]|B,,/[D,/E,^G,] B,,/[D,/E,G,]|C,/[E,/A,] C,/[E,/A,]|B,,/"Cres:"[D,/F,G,] B,,/[D,/F,G,]|C,/[E,/G,] C,/[E,/G,]|',
      'D,/[F,/G,B,] D,/[F,/G,B,]|E,/[G,/C] E,/[G,/C]|F,/[A,/D] F,/[A,/D]|G,/[C/E] G,/[C/E]|G,,/[F,/G,B,][F,/G,B,][F,/G,B,]|C,/[E,/G,C][E,/G,C][E,/G,C]|F,/[A,/D] F,/[A,/D]|',
      'G,/[C/E] G,/[C/E]|G,/[D/F] G,/[D/F]|[C/E] z/ [C/E] z/|F,/[A,/D] F,/[A,/D]|G,/[C/E] G,/[C/E]|G,,/[F,/G,B,][F,/G,B,][F,/G,B,]|C,/[E,/G,C][E,/G,C][E,/G,C]|',
      'F,/[A,/D] F,/[A,/D]|G,/[C/E] G,/[C/E]|G,/[D/F] G,/[D/F]|[CE]>C,|!accent!E, !accent!G,|!accent!C !accent!G,|!accent!E, !accent!C,|',
      '!accent![A,,A,]>A,,|!accent!C, !accent!E,|!accent!A, !accent!E,|!accent!C, !accent!A,,|F,/[A,/D] F,/[A,/D]|G,/[C/E] G,/[C/E]|',
      'G,,/[F,/G,B,][F,/G,B,][F,/G,B,]|C,/[E,/G,C][E,/G,C][E,/G,C]|F,/[A,/D] F,/[A,/D]|G,/[C/E] G,/[C/E]|G,/[D/F] G,/[D/F]|[C/E] z/ [C/E]  !D.C.! z/||',
    ],
    tempo: 130,
    files: [
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74Vv5weGOZRZ/GAjqa2lmXD2VG',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3535/35357060.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74Vv5weGOZRZ/zJRMq4bqOy4Qv',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3535/35357061.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74Vv5weGOZRZ/qlqRmqX8dzdGQ',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3535/35357062.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74Vv5weGOZRZ/ZkD2zVDPyrezj',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3535/35357063.jpg',
      },
    ],
  },
  {
    title: 'The Sutherland Waltz',
    slug: 'the-sutherland-waltz',
    creator: 'Katie Linton',
    year: '1899',
    contents: '1 score ( [5] p.) ; 38 cm.',
    description: 'Dedicated to my mother. For Piano.',
    url: 'https://collection.sl.nsw.gov.au/record/74VK63pbRQBA/2wkqq0BWWx3by',
    imageUrl:
      'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3747/37479310.jpg',
    metaImageUrl: '/virtuoso/images/the-sutherland-waltz-social.jpg',
    metaImageWidth: 1200,
    metaImageHeight: 638,
    key: 'Eb',
    header: 'X:1\nM:3/4\nL:1/4\n%%score { 1 | 2 }\n',
    instruments: [
      {
        name: 'Piano',
        volume: 0,
        type: 'piano',
        clef: 'treble',
      },
      {
        name: 'Piano bass clef',
        volume: -5,
        type: 'piano',
        clef: 'bass',
      },
    ],
    lines: [
      'V:1 treble',
      'V:2 bass',
      'V:1',
      '"@-92,45INTRODUCTION"!ff!"@-89,-46Con Bravura"[Bb]2- [Bb]/ "8va"[Bb]/ | "----|"[Bdfb] z [^cB] | [Bd] z z | z3 | [Bb]2- [Bb]/ "8va"[Bb]/ | "----|"[Bdfb] z [Bd] | [Be] z z | z3 |',
      'B,2- B,/ [Bb]/ | [Bb] z [^c=e] | [df] z z | z4 [K:clef=treble]| B,3 |!arpeggio![DFAB]2 z |!arpeggio![dfab]2 z |"8va ----|"!arpeggio![Bdfa] "_rit"z z ||',
      "\"@-92,45WALTZ\"!f!!arpeggio![GBeg] z !arpeggio![Begb] | !arpeggio![egbe'] z !arpeggio![gbe'g'] | [fbd'f']3- | [fbd'f'] z !arpeggio![egbe'] | [dbd'] z [cac'] | [Bfb] z [Afa] | [gGB]3- | [GBg] [Ff] [Gg] |",
      "[Aca]3/2 [Afa]/ ([A-fa] | [Aa]) [Gg] [Aa] | [Bb]3/2 [Bb]/ [Bb]- | [Bb] [=A=a] [Bb] | [cc']3/2 [cc']/ [cc'] | !<(![cc'] [dbd'] [e=ae'] | [dbd']!<)! z z | z [cc'] [Bb] |",
      "[GBeg] z [Begb] | [egbe'] z [gbe'g'] | [fbd'f']3- | [fbd'f'] z [ee'] | [dbd'] z [cac'] | [Bfb] z [Afa] | [Gge]3- | [Geg] [Ff] [Gg] |",
      "[Aa]3/2 [Aa]/ [Aa]- | [Aa] [Gg] [Aa] | [Bb]3/2 [Bb]/ [Bb]- | [Bb] [=A=a] [Bb] | [cc']3/2 [cc']/ [cc'] | [cc'] [gg'] [ff'] |\"@65,32 8va ------|\"e/g/b/e'/g/b/ | e' z f ||:[K:Bb]",
      // page 2
      '!p!z {gf}e z | z {fe}c z | z {fd}B G | F z F | "_cres"^F z [FAcd] | [Ace] z [Ace^f] | [Bdg] z [Bdg] | !f![Acea] [Aceg] [Acd=f] |!p!z {gf}e z |',
      'z {fe}c z | z {fd}B g | !f![Acfa] z [Acfa] | [Adfa] z [Adfa] | [cefa] [cefg] [cefa] | [B3/2dfb] [B/dfb] [Bdfb] |[1 [Bdfb] z f :|[2 x z2 ||',
      "[K:Eb]!f! !arpeggio![GBeg] z !arpeggio![Begb] | !arpeggio![egbe'] z !arpeggio![gbe'g'] | [ff'bd']3- | [fbd'f'] z !arpeggio![egbe'] | [dbd'] z [cac'] | [Bfb] z [Afa] | [GBeg]3- |[GBeg] [Ff] [Gg] |",
      "[Aca]3/2 [Afa]/ ([A-fa] | [Aa]) [Gg] [Aa] | [Bb]3/2 [Bb]/ [Bb]- | [Bb] [=A=a] [Bb] | [cc']3/2 [cc']/ [cc'] | !<(![cc'] [dbd'] [e=ae'] | [dbd']!<)! z z |z [cc'] [Bb] |",
      "!arpeggio![GBeg] z !arpeggio![Begb] | !arpeggio![egbe'] z !arpeggio![gbe'g'] | !arpeggio![fbd'f']3- | [fbd'f'] z [ee'] | [dbd'] z [cac'] | [Bfb] z [Afa] | [Geg]3- |[Geg] [Ff] [Gg] |",
      '"@-50,-45cres"[Aa]3/2 [Aa]/ [Aa]- | [Aa] [Gg] [Aa] | [Bb]3/2 [Bb]/ [Bb]- | [Bb] [=A=a] [Bb] | [cc\']3/2 [cc\']/ [cc\'] | [cc\'] "@0,32 8ve ---|"[Gg] [Ff] | "@65,32 8ve ------|"e/g/b/e\'/g/b/ |e\' z z |',
      // page 3
      '[K:Ab]!p![EAc] z [E=B] | [EAc] z/ c/=B/c/ | [EGBd] z [Ec] | [EGBd] z/ d/c/d/ | !f![EGBd] z [EGc] | [EGBd] [Geg]3/2 f/ | (e/!<(!=d/f/!<)!e/c/A/) |',
      '(C/E/!<(!A/c/e/a/)!<)! |!mf![EGB] z [E=A] | [EGB] z/ B/=A/B/ | [EGc] z [E=B] | [EGc] z/ c/=B/c/ | [EGd] z [EGc] | ([E/Gd]c/B/=A/c/B/) |',
      "\"_cres\"(c/B/A/G/B/A/) |(G/B/d/e/g/b/) |[eac'] z [e=b] |!f![eac'] z/ c'/=b/c'/ | [egbd'] z [ec'] | [egbd'] z/ d'/c'/d'/ | [egbd'] z [egc'] |",
      "[ge'g']2 f' | (e'/=d'/f'/e'/c'/a/) |(e/c/e/a/c'/a/) | !mf![egb] z [e=a] | [egb] z/ b/=a/b/ | [dgb] z [dg=a] | [dgb] z [dgc'] |",
      "([e/gd']c'/b/=a/c'/b/) | (b/g/e/d/B/G/) | (A/c/e/a/c'/e'/) |a' z z ||:[K:Eb] ",
      "\"@-45,-65scherzando\"((3b/c'/b/) g e | d z c | ((3a/b/a/) f d | c z B | (d/f/a/c'/) b | (f/a/b/c'/) b | (e/g/b/c'/) b |",
      // page 4
      "(=e/g/b/c'/) b | ((3b/c'/b/) g e | d z c | ((3a/b/a/) f d | c z B | (d/f/a/c'/b/a/) |",
      '(g/f/e/d/c/B/) | c z d |[GBe]3 ||[K:Bb] !p!(B,/C/!<(!D/E/F/G/) | (A/B/c/d/e/f/)!<)! |',
      "e z c | A z z | {/g}f z c | A z z | !f![c/ec']b/=e/f/g/f/ | ^c/d/e/d/=c/B/ |",
      "!p!!<(!(B,/C/D/E/F/G/) | (A/B/c/d/e/f/)!<)! | e z c | A z z | \"_cres\"a/a/ [dd'] [dd'] |b/b/ [dd'] [dd'] | c'/c'/ [dd'] [dd'] |",
      "[1!ff! [eac'e']3/2 [eac'e']/ [eac'e'] :|[2 \"_rit\"[d/gbd']g/_a/=a/c'/b/ ||[K:Eb] !mp!((3b/c'/b/) g e | d z c | ((3a/b/a/) f d | c z B | (d/f/a/c'/) b |",
      "(f/a/b/c'/) b | (e/g/b/c'/) b | (=e/g/b/c'/) b | (b/c'/b/g/) e | d z c | ((3a/b/a/) f d | c z B | ",
      // page 5
      "(d/f/a/c'/b/a/) | (g/f/e/d/c/B/) | c z d | [GBe]3/2 [GBe]/ [GBe] ||!ff! !arpeggio![GBeg] z !arpeggio![Begb] | !arpeggio![egbe'] z !arpeggio![gbe'g'] | ([f-b-d'-f']3 |",
      "[fbd'f']) z !arpeggio![egbe'] | [dbd'] z [cac'] | [Bfb] z [Afa] | [GBeg]3- | [GBeg] [Ff] [Gg] | [Aca]3/2 [Afa]/ ([A-fa] | [Aa]) [Gg] [Aa] |",
      "[Bb]3/2 [Bb]/ [Bb]- | [Bb] [=A=a] [Bb] | [cc']3/2 [cc']/ [cc'] | [cc'] [dbd'] [e=ae'] | [dbd'] z z | z [cc'] [Bb] | !arpeggio![GBeg] z !arpeggio![Begb] |",
      "!arpeggio![egbe'] z !arpeggio![e'gbg'] | !arpeggio![fbd'f']3- | [fbd'f'] z [ee'] | [dbd'] z [cac'] | [Bfb] z [Afa] | [Gge]3- | [Geg] [Ff] [Gg] |",
      "[Aa]3/2 [Aa]/ [Aa]- | [Aa] [Gg] [Aa] | [Bb]3/2 [Bb]/ [Bb]- | [Bb] [=A=a] [Bb] | [cc']3/2 [cc']/ [cc'] | [cc'] [gg'] [ff'] | [ee']3/2 [dd']/ [ee'] |",
      "[ff'] [ee'] [cc'] | [Bb]3/2 [=A=a]/ [Bb] | [cc']3/2 [=B=b]/ [cc'] | [dd']3/2 [cc']/ [dd'] | [egbe'] z z | [gbe'g'] z z | {/E}[EB,G,] z z !fermata!||",

      // bass clef:
      'V:2',
      'B,2- B,/ B,/ | B,2 =E | F z z | z3 | B,2- B,/ B,/ | B,2[K:treble] F | [B,G] z z | z3 | %8',
      'B,,2- B,,/ B,,/ | B,, z[K:treble] G | [B,A] z z | z4 [K:bass]| [B,,,B,,]3 |!arpeggio![B,,F,A,]2 z |[K:treble]!arpeggio![B,FA]2 z |!arpeggio![Bfa][K:bass] [C,,C,] [D,,D,] ||',
      '[E,,E,] [G,B,E] [G,B,E] | [E,,E,] [G,B,E] [G,B,E] | [B,,B,] [F,A,B,D] [F,A,B,D] | [F,,F,] [F,B,D] [G,B,E] | [B,,,B,,] [A,B,D] [A,B,D] | [D,,D,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [E,,E,] [G,B,E] [=E,,=E,] |',
      '[F,,F,] [A,CF] [A,CF] | [B,,,B,,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [G,,G,] [=A,CE] [_G,,_G,] | [F,,F,] [F,A,E] [F,A,E] | [F,,F,] [D,,D,] [C,,C,] | [B,,,B,,] [F,B,D] [F,B,D] | [B,,,B,,] [F,A,B,D] [F,A,B,D] |',
      '[E,,E,] [G,B,E] [G,B,E] | [E,,E,] [G,B,E] [G,B,E] | [B,,B,] [A,F,B,D] [A,F,B,D] | [F,,F,] [F,B,D] [G,B,E] | [B,,,B,,] [F,A,B,D] [F,A,B,D] | [D,,D,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [B,,,B,,] [G,B,E] [=E,,=E,] |',
      '[F,,F,] [A,CF] [A,CF] | [B,,,B,,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [G,,G,] [F,=A,CE] [_G,,_G,] | [F,,F,] [F,A,E] [F,A,E] | F, [A,B,D] [A,B,D] | E, B,, G,, | E,, E,,, z ||:[K:Bb]',
      // page 2
      '[F,,F,] [A,CE] [A,CE] | A,, [F,A,CE] [CE] | [B,,B,] [B,D] [B,D] | B,, [B,D] [B,D] | D, [A,CD] [A,CD] | A, [CE] [CE] | D, [B,D] [B,D] | [=F,,=F,] [A,CE] [A,CE] |[F,,F,] [A,CE] [A,CE] |',
      'C, [F,A,E] [F,A,E] | B,, [F,B,D] [F,B,D] | F, [A,C] [A,C] | [D,,D,] [A,DF] [A,DF] | C, [A,CE] [F,,F,] | [B,,,B,,] [F,B,D] [F,B,D] |[1 [B,,,B,,] [F,B,D] z :|[2 [B,,,B,,] [C,,C,] [D,,D,] ||',
      '[K:Eb] [E,,E,] [G,B,E] [G,B,E] | [E,,E,] [G,B,E] [G,B,E] | [B,,B,] [A,B,D] [A,B,D] | [F,,F,] [F,B,D] [G,B,E] | [B,,,B,,] [DF,A,B,] [DF,A,B,] | [D,,D,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] |[E,,E,] [G,B,E] [=E,,=E,] |',
      '[F,,F,] [A,CF] [A,CF] | [B,,,B,,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [G,,G,] [=A,CE] [_G,,_G,] | [F,,F,] [F,A,E] [F,A,E] | [F,,F,] [D,,D,] [C,,C,] | [B,,,B,,] [F,B,D] [F,B,D] |[B,,,B,,] [F,A,B,D] [F,A,B,D] |',
      '[E,,E,] [G,B,E] [G,B,E] | [E,,E,] [G,B,E] [G,B,E] | [B,,B,] [F,A,B,D] [F,A,B,D] | [F,,F,] [F,B,D] [G,B,E] | [B,,,B,,] [F,A,B,D] [F,A,B,D] | [D,,D,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] |[B,,,B,,] [G,B,E] [=E,,=E,] |',
      '[F,,F,] [A,CF] [A,CF] | [B,,,B,,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [G,,G,] [=A,CE] [_G,,_G,] | [F,,F,] [F,A,E] [F,A,E] | F, [A,B,D] [A,B,D] | E, B,, G,, |E,, E,,, z |',
      // page 3
      '[K:Ab]A,, [E,A,C] [E,A,C] | A,, [E,A,C] [E,A,C] | E,, [E,G,B,] [E,G,B,] | B,, [E,G,B,] [E,G,B,] | E,, [E,G,B,] [E,G,B,] | E,, [G,B,D] [G,B,D] | A,, [A,C] [A,C] |',
      'A,, [A,C] [A,C] |E,, [G,B,D] [G,B,D] | E, [G,B,D] [G,B,D] | E, [G,C] [G,C] | E, [G,E] [G,E] | E, [G,B,D] [G,B,D] | B,, [G,B,D] [G,B,D] |',
      'A,, [E,C] [E,C] | E,, [E,G,D] [E,G,D] | A,, [E,A,C] [E,A,C] | A,, [E,A,C] [E,A,C] | E,, [E,G,B,] [E,G,B,] | B,, [E,G,B,] [E,G,B,] | E,, [E,G,B,] [E,G,B,] |',
      'E,, [G,B,D] [G,B,D] | A,, [A,C] [A,C] | A,, [A,C] [A,C] | E,, [G,B,D] [G,B,D] | E, [G,B,D] [G,B,D] | _F, [G,B,D] [G,B,D] | _F, [G,B,D] [G,B,D] |',
      'E, [G,B,D] [G,B,D] | E, [G,B,D] [G,B,D] | [A,,,A,,] E,, C,, | A,,, A,, z ||:[K:Eb]',
      'E,, [G,B,E] [G,B,E] |B,, [A,B,D] [A,B,D] | F,, [A,B,D] [A,B,D] | B,, [A,B,D] [A,B,D] | F,, [A,B,D] [A,B,D] | B,, [A,B,D] [A,B,D] | G,, [B,EG] [B,EG] |',
      // page 4
      'C, [G,B,C=E] [G,B,CE] | E,, [G,B,E] [G,B,E] | B,, [A,B,D] [A,B,D] | F,, [A,B,D] [A,B,D] | B,, [A,B,D] [A,B,D] | F,, [A,B,D] [A,B,D] |',
      'F,, [A,B,D] [A,B,D] | B,, [A,B,D] [A,B,F] | [E,,E,] [G,,,G,,] [=A,,,=A,,] ||[K:Bb] B,, [F,B,D] [F,B,D] | B,, [F,B,D] [F,B,D] |',
      'F,, [A,CE] [A,CE] | F,, [A,CE] [A,CE] | C, [F,A,C] [F,A,C] | F,, [A,CE] [A,CE] | B,, [F,B,D] [F,B,D] | B,, [F,B,D] [F,B,D] |',
      'B,, [F,B,D] [F,B,D] | B,, [F,B,D] [F,B,D] | F,, [A,CE] [A,CE] | F, [A,CE] [A,CE] | ^F, [A,D] [A,D] | G, [B,D] [B,D] | D, [^F,A,D] [F,A,D] |',
      '[1=F, [A,CE] [EA,C] :|[2 [G,,G,] z z ||[K:Eb] E,, [G,B,E] [G,B,E] | B,, [A,B,D] [A,B,D] | F,, [A,B,D] [A,B,D] | F,, [A,B,D] [A,B,D] | F,, [A,B,D] [A,B,D] |',
      'B,, [A,B,D] [A,B,D] |G,, [B,EG] [B,EG] | C, [G,B,C=E] [G,B,CE] | E,, [G,B,E] [G,B,E] | B,, [A,B,D] [A,B,D] | F,, [A,B,D] [A,B,D] | B,, [A,B,D] [A,B,D] |',
      // page 5
      'F,, [A,B,D] [A,B,D] | F,, [A,B,D] [A,B,D] | B,, [A,B,F] [A,B,F] | [E,,E,] [G,B,E] [G,B,E] || [E,,E,] [G,B,E] [G,B,E] | [E,,E,] [G,B,E] [G,B,E] | [B,,B,] [A,B,D] [A,B,D] |',
      '[F,,F,] [F,B,D] [G,B,E] | [B,,,B,,] [F,A,B,D] [F,A,B,D] | [D,,D,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [E,,E,] [G,B,E] [=E,,=E,] | [F,,F,] [A,CF] [A,CF] | [B,,,B,,] [F,B,D] [F,B,D] |',
      '[E,,E,] [G,B,E] [G,B,E] | [G,,G,] [=A,CE] [_G,,_G,] | [F,,F,] [F,A,E] [F,A,E] | [F,,F,] [D,,D,] [C,,C,] | [B,,,B,,] [F,B,D] [F,B,D] | [B,,,B,,] [F,A,B,D] [F,A,B,D] | [E,,E,] [G,B,E] [G,B,E] |',
      '[E,,E,] [G,B,E] [G,B,E] | [B,,B,] [F,A,B,D] [F,A,B,D] | [F,,F,] [F,B,D] [G,B,E] | [B,,,B,,] [F,A,B,D] [F,A,B,D] | [D,,D,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [B,,,B,,] [G,B,E] [=E,,=E,] |',
      '[F,,F,] [A,CF] [A,CF] | [B,,,B,,] [F,B,D] [F,B,D] | [E,,E,] [G,B,E] [G,B,E] | [G,,G,] [F,=A,CE] [_G,,_G,] | [F,,F,] [F,A,E] [F,A,E] | F, [A,B,D] [A,B,D] | E, [G,B,E] [G,B,E] |',
      'D, [A,CF] [A,CF] | [D,,D,] [F,B,D] [F,B,D] |F,, [F,_A,D] [F,A,D] | [B,,,B,,] [F,A,B,D] [F,A,B,D] | [E,,E,] z z | [E,,,E,,] z z | [E,,E,] z z ||',
    ],
    tempo: 160,
    files: [
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VK63pbRQBA/2wkqq0BWWx3by',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3747/37479310.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VK63pbRQBA/PakgNllKqQkgk',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3747/37479311.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VK63pbRQBA/G5NmNXAQZdjp3',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3747/37479312.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VK63pbRQBA/6M32rlw8ll4Eq',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3747/37479313.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VK63pbRQBA/d76W8AVKwbNO2',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3747/37479314.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VK63pbRQBA/LyNv0oxPEP5rr',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3747/37479315.jpg',
      },
    ],
  },
  {
    title: 'Sunny New South Wales',
    slug: 'sunny-new-south-wales',
    creator: 'E. Lewis Scott',
    year: '1880-1899',
    contents: '1 score (2 p.) ; 36 cm.',
    description: 'A popular and patriotic song.',
    url: 'https://collection.sl.nsw.gov.au/record/74VKdJy7P8gl/DL7DRlkR0XAE',
    imageUrl:
      'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3750/37507450.jpg',

    metaImageUrl: '/virtuoso/images/sunny-new-south-wales-social.jpg',
    metaImageWidth: 1200,
    metaImageHeight: 638,
    key: 'Bb',
    header: 'X:1\nM:4/4\nL:1/8\n%%score 1 {2 | 3}\n',
    instruments: [
      {
        name: 'Voice',
        volume: -6,
        type: 'violin',
        clef: 'treble',
      },
      {
        name: 'Piano treble clef',
        volume: -6,
        type: 'piano',
        clef: 'treble',
      },
      {
        name: 'Piano bass clef',
        volume: -6,
        type: 'piano',
        clef: 'bass',
      },
    ],
    lines: [
      'V:1 treble',
      'V:2 treble',
      'V:3 bass',

      'V:1',
      'z | Z | Z | Z | Z |',
      'Z | Z | Z | z2 z2 z2 z ||',
      'F| F D F B d (cB) A | G B A G F2 z F | F D F B dc B A |',
      'w:We|often * hear~ men~ boast~ about * the~ |land~ that~ gave~ them~ birth,~ And~|each~ one~ thinks~ his~ native~ land~ the~ |',
      ' Gc c =B c2 z F |(FD) (FB) (dcB) A | G B A G F2 z F |',
      'w:fair-est~ spot~ on~ earth;~ In~|beauty, _riches, _power * * no|land~ can~ his sur-pass, * To|',

      ' c c (=Bc) d c c c |(GB) D =E F2 z F |(Fe) ec c A A D |',
      "w:his~ all~ other _lands~ on~ earth~ can't|e-ven~ hold a glass! * If| o-ther~ peo-ple~ have~ their~ boast,~ say~|",
      ' F d d B F2 z F | F e e c c A A F | F d d B F2 z F |',
      "w:why~ then~ should~ not~ we?~ For |we~ can~ drink~ our~ jovial * toast~ and~ |sing~ with~ three~ times~ three, * There's|",
      'F D FB d c B _A | G E G B !fermata!e2 z e | d B c A B G !fermata!F F |',
      "w:not~ a~ country * in~ the~ world~ where |all that's~ good~ pre-vails, * As|here~ it does,~ in this,~ our land,~ our|",
      ' GB B A B2 z ||"@-80,40 Chorus" F |F D F B dc B A | G B A GF z2 F |',
      "w:_Sunny~ New~ South~ Wales.~ Then|toast~ with~ me~ our~ happy * land~ Where~ |all that's~ good~ prevails; * Our|",
      ' G G !fermata!c c B A !fermata!G F |(G!fermata!e) G A B3 ||',
      "w:colour's * blue,~ our~ hearts~ are~ true,~ In| _Sunny~ New~ South~ Wales.|",
      'z | z8 | z2 z2 z2 z ||',

      // Voice 2
      'V:2',
      "[Ff] | [Ff][Dd][Ff][Bb] [dd'][cc'][Bb][Aa] | [Gg][Bb][Aa][Gg][Ff] z2 [Ff] | [Ff][Dd][Ff][Bb] [dd'][cc'][Bb][Aa] | [Gg][cc'][cc'][=B=b] [cc']2 z [Ff] |",
      "!ff![Ff][Dd][Ff][Bb] [dd'][cc'][Bb][Aa] | [Gg][Aa][Bb][Gg] [Ff]2 \"_Cres:\"z d | d^c/d/ e/d/^F/d/ =c/B/A/B/ G/B/e/g/ | [Ff][ee'][Gg][Aa] b2 [FBD] ||",
      'z | z [F,B,D][F,B,D][F,B,D] z [F,B,D][F,B,D][F,B,D] | z [G,B,E][G,B,E][G,B,E] z [F,B,D][F,B,D][F,B,D] | z [F,B,D][F,B,D][F,B,D] z [F,B,D][F,B,D][F,B,D] |',
      'z [B,=E][B,E][EB,] ([A,C-F]2 [CF]) z |z [B,DF][B,DF][B,DF] z [B,DF][B,DF][B,DF] | z [G,B,E][G,B,E][G,B,E] z [F,B,D][F,B,D][F,B,D] |',

      ' z [F,CF][F,CF][F,CF] z [A,CF][A,CF][A,CF] | [B,DG] z [B,C=E] z [A,CF]2- [A,CF] z |[A,E]F,[A,E]F, [A,E]F,[A,E]F, |',
      ' [DF]F,[B,D]F, [B,D]F,[B,D]F, | [A,E]F,[A,E]F, [A,E]F,[A,E]F, | [B,D]F,[B,D]F, [B,D]F,[B,D]F, |',
      'z [F,B,D][F,B,D][F,B,D] z [B,DG,][B,DG,][G,B,D] | z [G,B,E][G,B,E][G,EB,] [B,G,E]2 z2 | [FCd] z [DAc] z [DFB] z [B,DF] z |',
      ' [B,EG]B [B,EB]A [DFB]3 ||F |FDFB dcBA | GBAG F2 z F |',
      ' [B,EG] z !fermata![=ECc] z [CFB]A [B,G][A,F] |[B,EG] z [CEG]A [B,DFB]3 ||',
      " d | dc/d/ e/d/^F/d/ c/B/A/B/ G/B/e/g/ | [Ff][ee'][Gg][Aa] [Bb]2 [DFB] ||",

      // Voice 3
      'V:3',
      '!f! z | B,,[D,F,B,][B,D,F,][D,F,B,] B,,[D,F,B,][D,F,B,][D,F,B,] | E,[G,B,][G,B,][G,B,] B,,[D,F,B,][D,F,B,][D,F,B,] | B,,[D,F,B,][D,F,B,][D,F,B,] B,,[D,F,B,][D,F,B,][D,F,B,] | [C,,C,]2 [C,E,B,]2 ([F,,F,][^F,,^F,][G,,G,][A,,A,]) |',
      'B,,[D,F,B,][D,F,B,][D,F,B,] B,,[D,F,B,][D,F,B,][B,,D,F,B,] | E,[F,B,][G,B,][G,B,] B,,[D,F,B,][D,F,B,] z | [D,,D,]2 [D,^F,A,C]2 [G,B,]2 [E,G,B,]2 | [F,,F,]2 [F,A,CE]2 [B,D]2 B,,, ||',
      '!p! z | [B,,,B,,]2 z2 [B,,,B,,]2 z2 |[E,,E,]2 z2 [B,,,B,,]2 z2 | [B,,,B,,]2 z2 [G,,,G,,]2 z2 |',
      ' ([C,,C,-]4 ([F,,F,])[^F,,^F,][G,,G,][A,,A,]) |[B,,B,]2 z2 [B,,,B,,]2 z2 | [E,,E,]2 z2 [B,,,B,,]2 z2 |',

      ' [A,,,A,,]2 z2 [F,,F,]2 z2 | [B,,,B,,] z [C,,C,] z (F,,C,F,) z |F,,2 z2 F,,2 z2 |',
      ' [B,,,B,,]2 z2 [B,,,B,,]2 z2 | F,,2 z2 F,,2 z2 | [B,,,B,,]2 z2 [B,,,B,,]2 z2 |',
      '[B,,,B,,]2 z2 [_A,,,_A,,]2 z2 | [G,,,G,,]2 z2 [E,,E,]2 z2 | [B,,B,] z [F,,F,] z [G,,G,] z !fermata![B,,B,,,] z |',
      ' [E,,E,]2 z2 [B,,B,]3 ||!f!z|B,,[D,F,B,][D,F,B,][D,F,B,] B,,[D,F,B,][D,F,B,][D,F,B,] | E,[G,B,][G,B,][G,B,] B,,[D,F,B,][D,F,B,][D,F,B,] |',
      ' [E,,E,] z !fermata![C,,C,] z [F,,F,]2 !fermata![F,,F,]2 |[E,,E,] !fermata!z [F,,F,]2 [B,,,B,,]3 ||',
      ' !f!z | [D,,D,]2 [D,^F,A,C]2 [G,B,]2 [E,G,B,]2 |[F,,F,]2 [F,A,CE]2 [B,,B,]2 [B,,,B,,] ||',
    ],
    tempo: 100,
    files: [
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VKdJy7P8gl/DL7DRlkR0XAE',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3750/37507450.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VKdJy7P8gl/vEwrZw7l2vQNQ',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3750/37507451.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VKdJy7P8gl/wQqNjKE7zvl7P',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3750/37507452.jpg',
      },
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VKdJy7P8gl/B5WP4a72MgMrm',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3750/37507453.jpg',
      },
    ],
  },

  {
    title: 'Australian quadrilles: Engehurst',
    slug: 'australian-quadrilles-engehurst',
    creator: 'Ellard, Wm. (William)',
    year: '1835',
    contents: '1 score (5) p. : ill. ; 34 cm.',
    description:
      'Selected from the newest and most celebrated operas composed and arranged for the pianoforte or harp,',
    url: 'https://collection.sl.nsw.gov.au/record/74VvqegAgybl/g738LRD6xrJx4',
    imageUrl:
      'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3692/36922674.jpg',
    // key: 'Ebmaj',
    metaImageUrl: '/virtuoso/images/australian-quadrilles-engehurst-social.jpg',
    metaImageWidth: 1200,
    metaImageHeight: 638,
    key: 'F',
    header: 'X:1\nM:6/8\nL:1/8\n%%score { 1 2 }\n',
    instruments: [
      {
        name: 'Piano',
        volume: 0,
        type: 'piano',
        clef: 'treble',
      },
      {
        name: 'Piano bass clef',
        volume: -3,
        type: 'piano',
        clef: 'bass',
      },
    ],
    lines: [
      'V:1 treble',
      'V:2 bass',
      'V:1',
      "\"@-98,0 No.5\"+segno+ [ff'] | [dd']2 [Bb] [Aa]2 [Gg] | [Ff]2 [Aa] [Dd]2 [Ee] | [Ff]2 [Gg] [Aa]2 [Bb] | [cc']3 [Aa]2 [ff'] |",
      "[dd']2 [Bb] [Aa]2 [Gg] | [Ff]2 [Aa] [Dd]2 [Ff] | [Ee]2 [Gg] [Cc]2 [Ee] | ([Ff]3 [Ff]2) :: c | A2 c d2 e |",
      'f2 c A2 F | A2 c d2 e | f3 e2 f | d2 B A2 G | [Ff]2 [Aa] [Dd]2 [Ff] |',
      "[Ee]2 [Gg] [Cc]2 [Ee] | ([Ff]3 [FAf]2) !fermata!|| c' | d'3 f'e'd' | c'3 c'ba | b3 d'c'b |",
      " a2 c' f'2 c' | d'3 f'e'd' | c'3 c'=ba | g/g'/f'/e'/d'/c'/ =b/a/g/f/e/d/ | c =B/c/e/g/ c'3 ||",

      'V:2',
      'z | B,,D,G, A,,^C,A, | D,F,A, B,,D,G, | A,,C,F, A,F,C, | A,,C,F, A,F,C, |',
      'B,,D,G, A,,^C,A, | D,F,A, B,,D,G, | C,G,B, C,G,B, | F,A,C F2 :: z | F,A,C F,B,D |',
      'F,A,C F,A,C | F,A,C F,B,^C | A,DF [A,^C]EG | B,DG A,,^C,A, | D,F,A, B,,D,G, |',
      ' C,G,B, C,G,B, | F,A,C F2 !fermata!!fine!|| z | F,B,D FDB, | F,A,C FCA, | F,B,C E3 |',
      'F,A,C DCA, | F,B,D A,CB, | F,A,C F z2 | [G,CE]3 [G,=B,F]3 | [CE] z2 "@-20,-70 al Segno"[CE]3 !D.C.!S||',
    ],
    tempo: 80,
    files: [
      {
        url:
          'https://collection.sl.nsw.gov.au/record/74VvqegAgybl/g738LRD6xrJx4',
        imageUrl:
          'https://files02.sl.nsw.gov.au/fotoweb/thumbnails/300_0/3692/36922674.jpg',
      },
    ],
  },
];

export default songs;
