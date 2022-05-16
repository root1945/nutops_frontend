module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  plugins: ['react', 'prettier'],
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['src', './src']],
      },
    },
  },
  rules: {
    'react/jsx-no-useless-fragment': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'import/prefer-default-export': 'off',
    'no-bitwise': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'linebreak-style': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
