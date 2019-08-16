module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    // '@vue/prettier',
  ],
  // add your custom rules here
  rules: {
    'import/no-unresolved': 'off',
    // don't require .vue extension when importing
    'import/extensions': 'off',
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    // allow debugger during development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', { props: false }],
    // disabled for vue functions that need this syntax
    'func-names': 'off',
    'object-shorthand': 'off',
    'no-confusing-arrow': 'off',
    'arrow-parens': [1, 'as-needed'],
    'no-return-assign': 'off',
  },
};
