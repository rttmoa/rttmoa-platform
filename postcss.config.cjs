module.exports = {
	// 浏览器前缀：https://tailwind.nodejs.cn/docs/using-with-preprocessors#-3
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
		// 缩小 CSS
		// ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
};
