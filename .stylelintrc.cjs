// @see: https://stylelint.io

module.exports = {
  root: true,
  extends: [
    "stylelint-config-standard", 			// 配置stylelint拓展插件
		// "stylelint-config-recess-order", 	// 配置stylelint css属性书写顺序插件,
		// "stylelint-config-prettier", 			// 配置stylelint和prettier兼容 
		// 'stylelint-config-recommended-scss',
  ],
  overrides: [
    // Scan .html/less files for styles
    {
      files: ["**/*.html"],
      customSyntax: "postcss-html"
    },
    {
      files: ["**/*.less"],
      customSyntax: "postcss-less"
    }
  ],
	/**
	 * null  => 关闭该规则
	 */
  rules: { 
		"function-url-quotes": "always", 					// 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
		"color-hex-length": "long", 							// 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
		"rule-empty-line-before": "never", 				// 要求或禁止在规则之前的空行 "always"|"never"|"always-multi-line"|"never-multi-line"
		"font-family-no-missing-generic-family-keyword": null, // 禁止在字体族名称列表中缺少通用字体族关键字
		"no-empty-source": null, 									// 禁止空源码
		"selector-class-pattern": null, 					// 强制选择器类名的格式
		// "scss/at-import-partial-extension": "always", // 解决不能引入scss文件
		"value-no-vendor-prefix": null, 					// 关闭 vendor-prefix(为了解决多行省略 -webkit-box) 
    "no-descending-specificity": null, 				// 禁止较低特异性的选择器出现在较高特异性的选择器之后
    "custom-property-pattern": null, 	 				// 允许自定义 CSS 变量名称
    "media-feature-range-notation": null,	
    "selector-pseudo-class-no-unknown": [ true, { ignorePseudoClasses: ["global"] }],
		
		// "string-quotes": "double", 						// 指定字符串使用单引号或双引号
		// "unit-case": null, 										// 指定单位的大小写 "lower(全小写)"|"upper(全大写)"
		// "color-hex-case": "lower", 						// 指定 16 进制颜色的大小写 "lower(全小写)"|"upper(全大写)" 
		// "block-opening-brace-space-before": "always", // 要求在块的开大括号之前必须有一个空格或不能有空白符 "always(大括号前必须始终有一个空格)"|"never(左大括号之前绝不能有空格)"|"always-single-line(在单行块中的左大括号之前必须始终有一个空格)"|"never-single-line(在单行块中的左大括号之前绝不能有空格)"|"always-multi-line(在多行块中，左大括号之前必须始终有一个空格)"|"never-multi-line(多行块中的左大括号之前绝不能有空格)"
		// "property-no-unknown": null, 					// 禁止未知的属性(true 为不允许) 
		// "declaration-block-trailing-semicolon": null, // 要求或不允许在声明块中使用尾随分号 string："always(必须始终有一个尾随分号)"|"never(不得有尾随分号)"
  },
  ignoreFiles: ["**/.js", "/*.jsx", "/.tsx", "**/.ts"]
};
