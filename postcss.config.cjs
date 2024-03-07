module.exports = {
	// 浏览器前缀：https://tailwind.nodejs.cn/docs/using-with-preprocessors#-3
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
		// 优化：压缩 CSS
		// https://github.com/cssnano/cssnano?tab=readme-ov-file
		...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
};
