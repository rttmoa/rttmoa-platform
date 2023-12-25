// @see: https://www.prettier.cn

module.exports = {
  // 指定最大换行长度
  printWidth: 130,
  // 制表符宽度（以制表符或空格表示）
  tabWidth: 2,
  // 使用制表符进行缩进 (true: tabs, false: spaces)
  useTabs: false,
  // 在语句末尾使用分号 (true: yes, false: no)
  semi: true,
  // 对字符串使用单引号 (true: single quotes, false: double quotes)
  singleQuote: false,
  // 确定是否在对象文字中的属性名称周围使用引号 ("<as-needed|consistent|preserve>")
  quoteProps: "as-needed",
  // 在 JSX 中使用单引号代替双引号 (true: single quotes, false: double quotes)
  jsxSingleQuote: false,
  // 打印多行对象和数组中的尾随逗号  ("<none|es5|all>")
  trailingComma: "none",
  // 在对象文字和数组中的大括号之间添加空格 "{ foo: bar }" (true: yes, false: no)
  bracketSpacing: true,
  // todo 将 > 的 JSX 元素放在最后一行的末尾而不是新行上 (true: 最后一行的末尾, false: 在新行上)
  bracketSameLine: false,
  // 在唯一的箭头函数参数周围包含括号 (avoid: omit parentheses, always: include parentheses)
  arrowParens: "avoid",
  // 指定要使用的解析器，无需在文件开头包含 @prettier
  requirePragma: false,
  // 在文件顶部插入特殊的 @format 标记，表明该文件已使用 Prettier 进行格式化
  insertPragma: false,
  // 控制文本的换行方式 (preserve: no wrapping)
  proseWrap: "preserve",
  // todo 定义 HTML 中的空格是否被视为敏感 ("css": 遵循 CSS 显示属性默认值, "strict": 空格被认为是敏感的, "ignore": 空格被认为是不敏感的)
  htmlWhitespaceSensitivity: "css",
  // 定义用于格式化的行结尾 ("<auto|lf|crlf|cr>")
  endOfLine: "auto",
  // 这两个选项可用于格式化以给定字符偏移量开始和结束的代码 (rangeStart: start, rangeEnd: end)
  rangeStart: 0,
  rangeEnd: Infinity
};