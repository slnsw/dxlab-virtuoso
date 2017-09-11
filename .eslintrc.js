module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "react-app",
    "dxlab"
  ],
  "globals": {
    "document": true,
    "window": true,
    "process": true,
  },
  "rules": {
    "comma-dangle": ["warn", "always-multiline"],
    "react/react-in-jsx-scope": 0,
    "react/jsx-max-props-per-line": [1, { "maximum": 3 }],
  }
}
