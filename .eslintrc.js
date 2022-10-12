module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'eslint-plugin-node'],
  parserOptions: {
    ecmaVersion: 'latest',
    node: true,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'max-len': ['error', { code: 100 }],
  },
};
