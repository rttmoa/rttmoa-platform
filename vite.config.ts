import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createVitePlugins } from "./build/plugins";
import { createProxy } from "./build/proxy";
import { wrapperEnv } from "./build/getEnv";
import { resolve } from "path";
import pkg from "./package.json";
import dayjs from "dayjs";
// import path from "path";
// import fs from "fs";
// const path = require("path");
// const fs = require("fs");

// FIXME: react-virtualized
// const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;
// export function reactVirtualized() {
//   return {
//     name: "my:react-virtualized",
//     configResolved() {
//       const file = path
//         .resolve("react-virtualized")
//         .replace(path.join("dist", "commonjs", "index.js"), path.join("dist", "es", "WindowScroller", "utils", "onScroll.js"));
//       const code = fs.readFileSync(file, "utf-8");
//       const modified = code.replace(WRONG_CODE, "");
//       fs.writeFileSync(file, modified);
//     }
//   };
// }
const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
      global: {
        // getSelection: () => {}
      }
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // ? 代理  从 .env.development 加载代理配置
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    plugins: [createVitePlugins(viteEnv) /* reactVirtualized() */],
    // 去除console、debugger
    esbuild: {
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
      sourcemap: false,
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
    }
  };
});
