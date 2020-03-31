module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-css-modules',
    'stylelint-prettier/recommended',
    'stylelint-config-lost',
    'stylelint-scss',
  ],
  ignoreFiles: ['**/*.js', '**/*.ts', '**/*.tsx'],
  rules: {
    'at-rule-no-unknown': null,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'no-descending-specificity': null,
    // 'comment-whitespace-inside': null,
    // 'custom-property-empty-line-before': null,
    // 'declaration-empty-line-before': null,
    // 'selector-list-comma-newline-after': null,
    // indentation: null,
    'comment-empty-line-before': null,
    // 'declaration-colon-newline-after': null,
  },
};
