/** @type { import("eslint").Linter.Config } */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,
    'import/extensions': 0,
    'newline-before-return': 'error',
    'react/require-default-props': 0,
    'react/destructuring-assignment': 0,
    'no-return-assign': 0,
    'react/no-unescaped-entities': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-useless-catch': 0,
    'dot-notation': 0,
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        semi: true,
      },
      { '   ': false },
    ],
  },
};
