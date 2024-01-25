import axios from "axios";
import React, { useEffect, useState } from "react";

// https://axios-http.com/
// https://axios-http.com/docs/cancellation
// https://www.npmjs.com/package/axios-retry
const useFetcher: React.FC<{ url: string }> = ({ url }): any => {
  const [state, setState] = useState({ data: null, error: null, status: "idle" });

  // #region vscode1.17的收缩代码块功能  业务代码 axios useEffect钩子
  useEffect(() => {
    // AbortController 中断请求：https://www.jianshu.com/p/2f23c33e1922
    let controller = new AbortController();
    let shouldSetData = true;
    setState({ data: null, error: null, status: "loading" });
    (async () => {
      try {
        const response: any = await axios.get(url, { signal: controller.signal });
        if (shouldSetData) {
          setState({ data: response, error: null, status: "resolved" });
        }
      } catch (error: any) {
        if (shouldSetData) {
          setState({ data: null, error, status: "errored" });
        }
      }
    })();
    console.log("axiosjs 执行");
    return () => {
      console.log("axiosjs 组件销毁");
      shouldSetData = false;
      controller.abort();
    };
  }, [url]);
  // #endregion

  return state;
};
export default useFetcher;

// useEffect和useLayoutEffect区别:
// 1、简单来说就是调用时机不同，useLayoutEffect和原来的componentDidMount & componentDidUpdate一致，
// 2、在react完成DOM更新后马上同步调用的代码，会阻塞页面渲染，而useEffect是会在整个页面渲染完才会调用的代码。 官方建议先使用useEffect
// 3、在实际使用时如果想避免页面抖动，可以把Dom操作的代码放到useLayoutEffect中。这里的修改会一次性渲染，避免重绘代价。
