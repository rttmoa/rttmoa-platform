// @see: https://www.prettier.cn

// 执行：
// 		lint:prettier
// 		lint:prettier:check
// 		lint:prettier:fix
module.exports = {
  // 一行最多 180 个字符
  printWidth: 240, // 160 ? 180
  // 制表符宽度（使用 4 个空格缩进）
	tabWidth: 4,
  // 使用 tab 进行缩进 (true: tabs, false: spaces)
  useTabs: true,
  // 在语句末尾使用分号 (true: yes, false: no)
  semi: false,
  // 对字符串使用单引号 (true: single quotes, false: double quotes)
  singleQuote: true, 
  // 确定是否在对象文字中的属性名称周围使用引号 ("<as-needed|consistent|preserve>")
  quoteProps: "as-needed",
  // 在 JSX 中使用单引号代替双引号 (true: single quotes, false: double quotes)
  jsxSingleQuote: false, 
  // 对象和数组中的尾随逗号  ("<none|es5|all>")
  trailingComma: "es5",
  // 在对象文字和数组中的大括号之间添加空格 "{ foo: bar }" (true: yes, false: no)
  bracketSpacing: true,
  // 将 > 的 JSX 元素放在最后一行的末尾而不是新行上 (true: 最后一行的末尾, false: 在新行上)
  bracketSameLine: true,
	jsxBracketSameLine: true, // jsx尖括号不换行   
  // 在唯一的箭头函数参数周围包含括号 (avoid: omit parentheses, always: include parentheses)
  arrowParens: "avoid",
  // 指定要使用的解析器，无需在文件开头包含 @prettier
  requirePragma: false,
  // 在文件顶部插入特殊的 @format 标记，表明该文件已使用 Prettier 进行格式化
  insertPragma: false,
  // 使用默认的拆行标准 (preserve: no wrapping， always)
  proseWrap: "preserve",
  // 根据显示样式决定html要不要拆行： ("css": 遵循 CSS 显示属性默认值, "strict": 空格被认为是敏感的, "ignore": 空格被认为是不敏感的)
  htmlWhitespaceSensitivity: "css",
  // 这两个选项可用于格式化以给定字符偏移量开始和结束的代码 (rangeStart: start, rangeEnd: end)
  rangeStart: 0,
  rangeEnd: Infinity,  
  // 换行符使用 ("<auto|lf|crlf|cr>")
  endOfLine: "lf",
};
