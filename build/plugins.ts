import { resolve } from 'path';
import { PluginOption } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import viteCompression from 'vite-plugin-compression';
import requireTransform from 'vite-plugin-require-transform';

const path = require('path');
const fs = require('fs');

/**
 * Create vite plugin
 * @param viteEnv
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
	const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_PWA } = viteEnv;
	// console.log('VITE_GLOB_APP_TITLE', VITE_GLOB_APP_TITLE); // rttmoa
	return [
		// react(),
		react({
			// 在所有 *.js 和 *.tsx 文件中使用 React 插件
			include: '**/*.{js,ts,tsx}',
		}),
		// ESLint 错误消息显示在浏览器界面上
		checker({ typescript: true }),
		// 创建打包压缩配置
		createCompression(viteEnv),
		// 将变量注入到 html 文件中
		createHtmlPlugin({
			inject: {
				data: { title: VITE_GLOB_APP_TITLE },
			},
		}),
		// 创建.svg图标: https://github.com/vbenjs/vite-plugin-svg-icons
		createSvgIconsPlugin({
			iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
			symbolId: 'icon-[dir]-[name]',
		}),
		// vitePWA
		VITE_PWA && createVitePwa(viteEnv),
		// 图形化文件大小，分析依赖包大小进行优化
		VITE_REPORT && (visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true }) as unknown as PluginOption),
		requireTransform({
			// .ts文件中使用 commonjs require()
			fileRegex: /.ts$/,
		}),
		// 低版本浏览器兼容
		// legacyPlugin({
		// 	targets: ['chrome 52', 'Android &gt; 39', 'iOS &gt;= 10.3', 'iOS &gt;= 10.3'], // 需要兼容的目标列表，可以设置多个
		// 	additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
		// })
	];
};

/**
 * 根据压缩配置生成不同的压缩规则
 * @param viteEnv
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
	const { VITE_BUILD_COMPRESS = 'none', VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
	const compressList = VITE_BUILD_COMPRESS.split(',');
	const plugins: PluginOption[] = [];
	if (compressList.includes('gzip')) {
		plugins.push(
			viteCompression({
				ext: '.gz',
				algorithm: 'gzip',
				deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
			})
		);
	}
	if (compressList.includes('brotli')) {
		plugins.push(
			viteCompression({
				ext: '.br',
				algorithm: 'brotliCompress',
				deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
			})
		);
	}
	return plugins;
};

/**
 * @description VitePwa
 * @param viteEnv
 */
const createVitePwa = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
	const { VITE_GLOB_APP_TITLE } = viteEnv;
	return VitePWA({
		registerType: 'autoUpdate',
		manifest: {
			name: VITE_GLOB_APP_TITLE,
			short_name: VITE_GLOB_APP_TITLE,
			theme_color: '#ffffff',
			icons: [
				{
					src: '/logo.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: '/logo.png',
					sizes: '512x512',
					type: 'image/png',
				},
				{
					src: '/logo.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any maskable',
				},
			],
		},
	});
};
