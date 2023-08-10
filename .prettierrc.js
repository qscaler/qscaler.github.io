module.exports = {
  // 缩进大小
  tabWidth: 4,
  proseWrap: 'preserve',
  semi: false,
  singleQuote: false,
  jsxSingleQuote: false,
  printWidth: 160,
  useTabs: false,
  quoteProps: 'preserve',
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  overrides: [{ files: '.prettierrc', options: { parser: 'json' } }],
  plugins: ['prettier-config-vuepress'],
}
