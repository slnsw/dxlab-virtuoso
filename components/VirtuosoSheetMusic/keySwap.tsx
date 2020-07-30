// import React from 'react';

const keySwap = (key) => {
  if (key === 'treble' || key === 'bass') {
    return key;
  }
  return key.indexOf('m') > -1 ? key.replace('m', '') : `${key}m`;
};

export const songKeySwap = (songLines) => {
  const re = /\[(K:.+?)\]/;
  const newLines = songLines.map((line) => {
    const matches = line.match(re);

    return matches
      ? `${line.substr(0, matches.index)}[${keySwap(matches[1])}${line.slice(
          matches.index + matches[1].length + 1,
        )}`
      : line;
  });
  // console.log(newLines);
  return newLines;
};

export default songKeySwap;
