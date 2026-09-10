// typings.d.ts 文件作用：

// 1、定义全局变量的类型
declare const __APP_VERSION__: string; // 这样在项目中随时可以用 __APP_VERSION__，不会报 TS 错误。

// 2、扩展第三方库的类型： 给 vue-router 的 RouteMeta 增加自定义字段。
// import 'vue-router';
// declare module 'vue-router' {
//   interface RouteMeta {
//     requiresAuth?: boolean;
//     title?: string;
//   }
// }

// 3、声明全局模块（没有类型定义的库/模块）
// declare module 'three';
declare module 'react-highlight-words';
declare module 'file-saver'; // 文件导出
