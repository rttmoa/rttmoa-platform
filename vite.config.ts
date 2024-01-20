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
      // Load proxy configuration from .env.development
      // ? 代理
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    plugins: [createVitePlugins(viteEnv) /* reactVirtualized() */],
    // 去除console、debugger
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      // esbuild is faster to package, but cannot remove console.log, terser is slower to package, but can remove console.log
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      sourcemap: false,
      // Disable gzip compressed size reporting, which slightly reduces pack time
      reportCompressedSize: false,
      // Determine the chunk size that triggers the warning
      chunkSizeWarningLimit: 2000,
      // 自定义底层的 Rollup 打包配置。
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
