const fs = require('fs');
// import fs from 'fs';

fs.readFile(`${__dirname}/data.json`, 'utf-8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const posts = JSON.parse(data);
  console.log(`Loading data... ${posts.length} posts found.`);
  const blob = posts.map((p) => p.content).join(' ');
  const ages = posts.map((p) => p.age);
  // p.age === '' ? 0 : Number.parseInt(p.age, 10),
  //   );
  const cities = posts.map((p) => p.city);
  const states = posts.map((p) => p.state);
  const postcodes = posts.map((p) => p.postcode || 0);
  const numOs = posts.map((p) => p.outsideAustralia).filter((v) => v).length;

  fs.writeFile(
    'public/data/allEntries.json',
    JSON.stringify(blob),
    (saveErr1) => {
      if (saveErr1) {
        return console.log(saveErr1);
      }
      console.log(
        `All story text saved to allEntries.json - ${blob.length} characters`,
      );
    },
  );

  fs.writeFile('public/data/ages.json', JSON.stringify(ages), (saveErr2) => {
    if (saveErr2) {
      return console.log(saveErr2);
    }
    console.log(`All ages saved to ages.json - ${ages.length} entries`);
  });

  fs.writeFile(
    'public/data/cities.json',
    JSON.stringify(cities),
    (saveErr3) => {
      if (saveErr3) {
        return console.log(saveErr3);
      }
      console.log(`All cities saved to cities.json - ${cities.length} entries`);
    },
  );

  fs.writeFile(
    'public/data/states.json',
    JSON.stringify(states),
    (saveErr4) => {
      if (saveErr4) {
        return console.log(saveErr4);
      }
      console.log(`All states saved to states.json - ${states.length} entries`);
    },
  );

  fs.writeFile(
    'public/data/postcodes.json',
    JSON.stringify(postcodes),
    (saveErr5) => {
      if (saveErr5) {
        return console.log(saveErr5);
      }
      console.log(
        `All postcodes saved to postcodes.json - ${postcodes.length} entries`,
      );
    },
  );

  fs.writeFile('public/data/numOs.json', JSON.stringify(numOs), (saveErr6) => {
    if (saveErr6) {
      return console.log(saveErr6);
    }
    console.log(
      `Number of entries from Overseas saved to numOs.json - value: ${numOs}`,
    );
  });
});
