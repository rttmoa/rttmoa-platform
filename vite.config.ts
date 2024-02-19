import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createVitePlugins } from "./build/plugins";
import { createProxy } from "./build/proxy";
import { wrapperEnv } from "./build/getEnv";
import { resolve } from "path";
import pkg from "./package.json";
import dayjs from "dayjs";

// 获取 package 信息
const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const root = process.cwd();
	const env = loadEnv(mode, root); // 读取目录，读取模式。  加载 .env.development 文件
	const viteEnv = wrapperEnv(env); // 处理 env 文件

	return {
		base: viteEnv.VITE_PUBLIC_PATH,
		root,
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
		define: {
			__APP_INFO__: JSON.stringify(__APP_INFO__) // JSON.stringify(__APP_INFO__)
			// process // 解决未定义问题，推荐 import.meta.env
		},
		server: {
			host: "0.0.0.0",
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			proxy: createProxy(viteEnv.VITE_PROXY)
		},
		// ? 插件配置
		plugins: [createVitePlugins(viteEnv) /* reactVirtualized() */],

		esbuild: {
			// 去除console、debugger
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
		build: {
			outDir: "dist",
			// esbuild 打包速度较快，但不能去掉 console.log
			minify: "esbuild",
			// eslint-disable-next-line no-irregular-whitespace
			// terser打包速度较慢，但​可以去掉console.log
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			// 构建后是否生成 source map 文件
			sourcemap: true,
			// 禁用 gzip 压缩大小报告，这会稍微减少打包时间
			reportCompressedSize: false,
			// 确定触发警告的块大小
			chunkSizeWarningLimit: 2000,
			// 自定义底层的 Rollup 打包配置。
			rollupOptions: {
				output: {
					// 静态资源分类与打包
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		},
		// https://cn.vitejs.dev/config/preview-options.html#preview-port
		// 指定开发服务器端口。注意，如果设置的端口已被使用，Vite 将自动尝试下一个可用端口，所以这可能不是最终监听的服务器端口。
		preview: {
			port: 9999
		}
	};
});
