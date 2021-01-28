module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  rules: {
    'no-unused-vars': 'warn',
    'linebreak-style': 0,
    'global-require': 0,
    'eslint linebreak-style': [0, 'error', 'windows'],
  },
  env: {
    node: true,
    browser: true,
  },
};
