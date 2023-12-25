import Intro from "./Intro";
import UseToggle from "./UseToggle";
import UseStorage from "./UseStorage";
import { useAsync, AsyncComponent } from "./UseAsync";
import UseFetch from "./UseFetch";
import UseEffectOnce from "./UseEffectOnce";
import UseRenderCount from "./UseRenderCount";
import { UseTimeout, UseTimeoutCopm } from "./UseTimeout";
import UseDebounce from "./UseDebounce";

// 总体来看，封装 hook 还是挺简单的，
//     你可以理解为就是把一些常用的原生的 hook 或者一些函数的再次封装，
//     结合 state 或者 effect 将一些通用的逻辑提取，
//     让页面变化更简单，更专注于页面本身自己的逻辑
// 同时也需要注意 hook 的一些使用规则，本质它就是一个 js 函数

// 只能在函数最外层调用 hook，不要在循环、条件判断或者子函数中调用
// 只能在 React 的函数组件中调用 hook 不要在其他 JavaScript 函数中调用，
// 当然你也可以在自定义函数中调用自定义 hook，比如我们实现的 useFetch 就是基于 useAsync

/** #### TODO: https://www.cnblogs.com/qiaozhiming123/p/15919537.html  */
const Item = [
  { label: "Demo", key: "1", children: <Intro /> },
  { label: "UseToggle", key: "2", children: <UseToggle /> },
  { label: "UseStorage", key: "3", children: <UseStorage /> },
  { label: "AsyncComponent", key: "4", children: <AsyncComponent /> },
  { label: "UseFetch", key: "5", children: <UseFetch /> },
  { label: "UseEffectOnce", key: "6", children: <UseEffectOnce /> },
  { label: "UseRenderCount", key: "7", children: <UseRenderCount /> },
  { label: "useTimeoutCopm", key: "8", children: <UseTimeoutCopm /> },
  { label: "UseDebounce", key: "9", children: <UseDebounce /> }
];
export default Item;
