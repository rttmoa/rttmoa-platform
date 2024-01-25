// @see: http://eslint.cn

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  /* 指定如何解析语法 */
  parser: "@typescript-eslint/parser",
  /* 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  /* 继承某些已有的规则 */
  extends: [
    "eslint:recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    "no-var": "off", // 要求使用 let 或 const 而不是 var
    "no-multiple-empty-lines": ["error", { max: 5, maxEOF: 5 }], // 不允许多个空行
    "no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们
    "prefer-const": "off", // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
    "no-irregular-whitespace": "off", // 禁止不规则的空白

    // typeScript (https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "off", // 禁止定义未使用的变量
    "@typescript-eslint/prefer-ts-expect-error": "off", // Disallow the use of @ts-ignore
    "@typescript-eslint/ban-ts-comment": "off", // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
    "@typescript-eslint/no-inferrable-types": "off", // 可以轻松推断的显式类型可能会增加不必要的冗长
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "@typescript-eslint/ban-types": "off", // 禁止使用特定类型
    "@typescript-eslint/no-var-requires": "off", // 不允许在 import 语句中使用 require 语句
    "@typescript-eslint/no-empty-function": "off",// 禁止空函数
    "@typescript-eslint/no-non-null-assertion": "off", // 不允许使用后缀运算符的非空断言(!)

    // react (https://github.com/jsx-eslint/eslint-plugin-react)
    "react-hooks/rules-of-hooks": "error", // 确保在组件或自定义hook在顶层调用hook
    "react-hooks/exhaustive-deps": "off", // useEffect和useCallback钩子的依赖关系不需要是全面的
		"prettier/prettier": "off" // 关闭 prettier检测
  },
};
