import React, { useCallback, useEffect, useRef, useState } from "react";

// 这个 hook 本质就是延迟多长时间执行 callback 函数，对外暴露了两个方法，
// 分别是重置 reset 和 clear 清除定时器，可以更方便进行定时器操作，使用 ref 保存定时器和回调函数
function UseTimeout(callback: unknown, delay: number) {
  const callbackRef = useRef<any>(callback);
  const timeoutRef = useRef<any>();
  //   console.log("timeoutRef", timeoutRef.current) // 初始 undefined

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    // console.log("set", delay)
    // console.log("set", callbackRef.current) // () => setCount(3)
    timeoutRef.current = setTimeout(() => {
      return callbackRef.current();
    }, delay);
  }, [delay]);

  const clear = useCallback(() => {
    // console.log("clear", timeoutRef.current) // 8
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}

function UseTimeoutCopm() {
  // // 通过按钮点击或者函数调用来对定时器进行操作
  // const [count, setCount] = useState(0)
  // const { clear, reset } = useTimeout(() => setCount(0), 1000);

  return <div>123</div>;
}

export { UseTimeout, UseTimeoutCopm };
