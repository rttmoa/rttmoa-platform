import React, { useEffect, useRef } from "react";

export default function useInterval(callback: unknown, delay: unknown) {
  const savedCallback = useRef<any>();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick(): void {
      savedCallback.current();
    }
    if (delay !== null && typeof delay === "number") {
      const id: any = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// ! 同时开启多个 timer
// const timer = useInterval(() => {
// console.log("第一个 Timer")
// }, 2000)
// const timer = useInterval(() => {
// console.log("第二个 Timer")
// }, 2000)
// const timer = useInterval(() => {
// console.log("第三个 Timer")
// }, 2000)

// setInterval
// import { setInterval } from "timers/promises";
// const interval = 100;
// for await (const startTime of setInterval(interval, Date.now())) {
//   const now = Date.now();
//   console.log(now);
//   if (now - startTime > 1000) break;
// }
// console.log(Date.now());
