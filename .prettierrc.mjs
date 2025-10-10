export default {
  arrowParens: 'avoid',
  bracketSpacing: true,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  endOfLine: 'lf',
  overrides: [{ files: '.prettierrc', options: { parser: 'json' } }],
  plugins: [
    'prettier-plugin-packagejson',
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss', // MUST come last
  ],
};
