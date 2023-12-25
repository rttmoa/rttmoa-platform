import React, { useEffect, useState } from "react";
import { UseTimeout } from "./UseTimeout";

// 同样的，对 useTimeout 进一步进行封装，可以实现 debounce 的操作，
// 主要目的是为了解决某个方法在指定时间内重复调用，用 hook 的方式可以很方便的解决这种问题
function useDebounce(callback: unknown, delay: number, dependencies = []) {
  const { reset, clear } = UseTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}
// 其中通过 dependencies 的变化可以控制 reset，控制执行的频率

export default function DebounceComp() {
  // console.log(123)

  // // 测试 UseTimeout Hooks
  // // 通过按钮点击或者函数调用来对定时器进行操作
  const [count, setCount] = useState(0);
  const { clear, reset } = UseTimeout(() => setCount(3), 1500);

  // count 在 1s 之内变化频繁的话，是不会触发 alert 的，
  // 当然也可以通过一个是否立即执行的参数进行一些相应的控制，这里就不提了，有兴趣的同学可以自主完善一下
  // const [count, setCount] = useState(10)
  // useDebounce(() => console.log(count), 1000, [count])

  return (
    <div>
      <br />
      <div>{count}</div>
      <button onClick={clear}>清除</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
