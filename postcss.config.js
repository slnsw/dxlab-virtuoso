// Use this config after removing next-css
module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    // Grids
    'lost',
    'postcss-reporter',
  ],
};

// module.exports = {
//   plugins: [
//     [
//       'postcss-easy-import',
//       {
//         prefix: '_',
//       },
//     ],
//     [
//       'postcss-custom-properties',
//       {
//         importFrom: './styles/variables.css',
//       },
//     ],
//     'postcss-mixins',
//     [
//       'postcss-cssnext',
//       {
//         features: {
//           autoprefixer: false, // Next.js already runs autoprefixer
//         },
//       },
//     ],
//     'lost',
//     'postcss-reporter',
//   ],
// };
