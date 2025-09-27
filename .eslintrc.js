module.exports = {
  root: true,
  extends: ['@react-native'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'import/no-commonjs': 0,
    '@typescript-eslint/consistent-type-imports': 2,
    'jsx-quotes': ['error', 'prefer-double'],
    quotes: ['error', 'single'], // 使用单引号
    semi: ['error', 'always'], // 结束添加分号
  },
};
