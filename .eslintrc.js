module.exports = {
  env: { browser: true, es2021: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 'latest', sourceType: 'module' },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'jsx-a11y'],
  settings: { react: { version: 'detect' } },
  rules: {},
};
