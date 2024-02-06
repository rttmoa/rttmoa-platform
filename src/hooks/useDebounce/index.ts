/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useRef } from "react";

// ? 防抖：每次触发定时器后，取消上一个定时器，然后重新触发定时器。
export default function useDebounce(fn: Function, delay: number) {
  const timerRef = useRef<null | any>(null);
  const fnRef = useRef(fn);

  fnRef.current = fn;

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    []
  );

  const fnDebounced = useCallback(
    (...args: any) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        // const that = this;
        // fnRef.current.apply(that, args);
      }, delay);
    },
    [delay]
  );

  return fnDebounced;
}
