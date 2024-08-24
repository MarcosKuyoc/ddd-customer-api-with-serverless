module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 5, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // recommended rules from the @typescript-eslint/eslint-plugin
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'indent': [
      'error', 2
    ],
    'quotes': ['error', 'single']
  },
};
