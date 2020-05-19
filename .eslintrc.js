module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  extends: [
    'react-app',
    '@slnsw/dxlab',
    'prettier/react',
    'plugin:css-modules/recommended',
    'plugin:import/typescript',
  ],
  globals: {
    document: true,
    window: true,
    process: true,
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'css-modules'],
  rules: {
    // Next JS has a Link component that wraps around <a></a>, inserting the href during compilation. Disable for now.
    'jsx-a11y/anchor-is-valid': 0,
    'react/react-in-jsx-scope': 0,
    'padded-blocks': 0,
    'react-hooks/rules-of-hooks': 'error',
    // Enable Typescript imports to be recognised
    // https://github.com/benmosher/eslint-plugin-import/issues/1615#issuecomment-621968935
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
