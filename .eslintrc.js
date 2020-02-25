module.exports = {
  parser: 'babel-eslint',
  extends: ['react-app', '@slnsw/dxlab', 'prettier/react'],
  globals: {
    document: true,
    window: true,
    process: true,
  },
  plugins: [
    // ...
    'react-hooks',
  ],
  rules: {
    // Next JS has a Link component that wraps around <a></a>, inserting the href during compilation. Disable for now.
    'jsx-a11y/anchor-is-valid': 0,
    // 'comma-dangle': ['warn', 'always-multiline'],
    'react/react-in-jsx-scope': 0,
    // 'react/jsx-max-props-per-line': [1, { maximum: 3 }],
    // 'no-tabs': 0,
    'padded-blocks': 0,
    'react-hooks/rules-of-hooks': 'error',
  },
};
