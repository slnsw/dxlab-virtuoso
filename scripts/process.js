const fs = require('fs');

const Entities = require('html-entities').XmlEntities;

const entities = new Entities();

const tm = require('text-miner');

function arrayToCounts(a) {
  if (!a) return null;
  const counts = Object.create(null);
  a.forEach((e) => {
    counts[e] = counts[e] ? counts[e] + 1 : 1;
  });
  const out = [];
  Object.keys(counts).forEach((count) => {
    out.push({ item: count, count: counts[count] });
  });
  //  console.log(out);
  return out;
}

fs.readFile(`${__dirname}/data.json`, 'utf-8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const posts = JSON.parse(data);
  console.log(`Loading data... ${posts.length} posts found.`);
  const blob = posts.map((p) => p.content).join(' ');

  const cleaner = entities.decode(blob);
  const corpus = new tm.Corpus(cleaner.replace(/<(.|\n)*?>/g, ''));
  const terms = new tm.DocumentTermMatrix(
    corpus
      .trim()
      .toLower()
      .removeDigits()
      .stem('Lancaster')
      .removeWords(['’', '’ve', 'don’'])
      .removeWords(tm.STOPWORDS.EN)
      .removeWords(['ive', 'dont', 'im'])
      .removeInvalidCharacters()
      .removeInterpunctuation()
      .removeNewlines()
      .clean(),
  );
  const wordsAndCounts = terms
    .findFreqTerms(20)
    .sort((a, b) => b.count - a.count);
  const uniqueWordsCount = terms.nTerms;
  const entriesCount = posts.length;

  const ages = arrayToCounts(posts.map((p) => p.age));
  // p.age === '' ? 0 : Number.parseInt(p.age, 10),
  //   );
  const cities = arrayToCounts(posts.map((p) => p.city));
  const states = arrayToCounts(posts.map((p) => p.state));
  const postcodes = arrayToCounts(posts.map((p) => p.postcode || 0));
  const overseasEntriesCount = posts
    .map((p) => p.outsideAustralia)
    .filter((v) => v).length;

  const output = {
    entriesCount,
    uniqueWordsCount,
    wordsAndCounts,
    ages,
    cities,
    states,
    postcodes,
    overseasEntriesCount,
  };

  fs.writeFile('public/data/data.json', JSON.stringify(output), (saveErr) => {
    if (saveErr) {
      return console.log(saveErr);
    }
    console.log('All processed data saved to data.json');
  });

  // fs.writeFile('public/data/ages.json', JSON.stringify(ages), (saveErr2) => {
  //   if (saveErr2) {
  //     return console.log(saveErr2);
  //   }
  //   console.log(`All ages saved to ages.json - ${ages.length} entries`);
  // });

  // fs.writeFile(
  //   'public/data/cities.json',
  //   JSON.stringify(cities),
  //   (saveErr3) => {
  //     if (saveErr3) {
  //       return console.log(saveErr3);
  //     }
  //     console.log(`All cities saved to cities.json - ${cities.length} entries`);
  //   },
  // );

  // fs.writeFile(
  //   'public/data/states.json',
  //   JSON.stringify(states),
  //   (saveErr4) => {
  //     if (saveErr4) {
  //       return console.log(saveErr4);
  //     }
  //     console.log(`All states saved to states.json - ${states.length} entries`);
  //   },
  // );

  // fs.writeFile(
  //   'public/data/postcodes.json',
  //   JSON.stringify(postcodes),
  //   (saveErr5) => {
  //     if (saveErr5) {
  //       return console.log(saveErr5);
  //     }
  //     console.log(
  //       `All postcodes saved to postcodes.json - ${postcodes.length} entries`,
  //     );
  //   },
  // );

  // fs.writeFile('public/data/numOs.json', JSON.stringify(numOs), (saveErr6) => {
  //   if (saveErr6) {
  //     return console.log(saveErr6);
  //   }
  //   console.log(
  //     `Number of entries from Overseas saved to numOs.json - value: ${numOs}`,
  //   );
  // });
});
