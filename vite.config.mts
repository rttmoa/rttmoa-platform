import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite';
import { createVitePlugins } from './build/plugins.ts';
import { createProxy } from './build/proxy.ts';
import { wrapperEnv } from './build/getEnv.ts';
import { resolve } from 'path';
import pkg from './package.json' with { type: 'json' };
import dayjs from 'dayjs';

// 获取 package 信息
const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// @see: https://vitejs.dev/config/
// @see: cdn优化 https://blog.csdn.net/m0_68324632/article/details/126828350
// @see: vite优化 https://blog.csdn.net/newbalsh/article/details/134673964
// @see: vite插件 https://zhuanlan.zhihu.com/p/660064289
// @see: vite优化 https://juejin.cn/post/7263341982408212536
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const root = process.cwd();
	const env = loadEnv(mode, root); // 读取目录，读取模式。  加载 .env.development 文件
	const viteEnv = wrapperEnv(env); // 处理 env 文件

	return {
		base: viteEnv.VITE_PUBLIC_PATH,
		root,
		resolve: {
			// 路径别名
			alias: {
				'@': resolve(import.meta.dirname, './src'),
			},
			// 文件尾缀
			extensions: ['.js', '.ts', '.tsx', '.json'],
		},
		define: {
			__APP_INFO__: JSON.stringify(__APP_INFO__), // JSON.stringify(__APP_INFO__)
			// process // 解决未定义问题，推荐 import.meta.env
		},
		server: {
			host: '0.0.0.0',
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			proxy: createProxy(viteEnv.VITE_PROXY),
		},
		// ? 插件配置
		plugins: [createVitePlugins(viteEnv)],

		// 开启构建缓存： 用 esbuild 做依赖预构建 + 缓存，加快二次打包
		optimizeDeps: {
			rolldownOptions: {
				transform: { target: 'esnext' },
			},
		},
		build: {
			outDir: 'dist',
			// esbuild 打包速度较快，但不能去掉 console.log、 默认是 'terser'
			minify: 'oxc',

			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },

			// * 构建后是否生成source map文件 -- 用于开发环境查看源文件而不是 index-1a966e9c.js.map 文件, 文件很大、生产环境需要关闭
			sourcemap: false,
			// 关闭文件计算
			reportCompressedSize: false,
			// 确定触发警告的块大小,  默认2000，改成3M
			chunkSizeWarningLimit: 3000,
			// 自定义底层的 Rollup 打包配置。
			rolldownOptions: {
				output: {
					manualChunks(id) {
						const moduleId = id.replaceAll('\\', '/');
						if (!moduleId.includes('/node_modules/')) return;
						if (/\/node_modules\/(echarts|zrender)\//.test(moduleId)) return 'charts';
						if (/\/node_modules\/(xlsx|file-saver)\//.test(moduleId)) return 'spreadsheet';
						if (moduleId.includes('/node_modules/@ant-design/pro-components/')) return 'pro-components';
						if (/\/node_modules\/(antd|@ant-design|@rc-component|rc-[^/]+)\//.test(moduleId)) return 'antd';
						if (/\/node_modules\/(react|react-dom|scheduler)\//.test(moduleId)) return 'react';
					},
					minify: { compress: { dropConsole: viteEnv.VITE_DROP_CONSOLE, dropDebugger: viteEnv.VITE_DROP_CONSOLE } },
					// 静态资源分类与打包
					chunkFileNames: 'assets/js/[name]-[hash].js', // 引入文件名的名称
					entryFileNames: 'assets/js/[name]-[hash].js', // 包的入口文件名称
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // 资源文件像：字体、图片、mp4、css等
				},

				onwarn(warning, warn) {
					if (warning.code === 'CIRCULAR_DEPENDENCY') return;
					warn(warning);
				},
			},
		},
		// https://cn.vitejs.dev/config/preview-options.html#preview-port
		// 指定开发服务器端口。注意，如果设置的端口已被使用，Vite 将自动尝试下一个可用端口，所以这可能不是最终监听的服务器端口。
		preview: {
			port: 9999,
		},
	};
});
