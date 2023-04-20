module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest',
    'sort-keys-fix',
    'sort-imports-es6-autofix'
  ],
  extends: ['standard-with-typescript', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.js',
    'Dockerfile',
    'docker-compose.yml',
    'package.json',
    'tsconfig.json',
    'README.md',
    'insomnia_request.json'
  ],
  rules: {
    semi: 'off',
    'no-console': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'sort-keys-fix/sort-keys-fix': 'error',
    '@typescript-eslint/return-await': 'off',
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ]
  },
  env: {
    'jest/globals': true
  }
};
