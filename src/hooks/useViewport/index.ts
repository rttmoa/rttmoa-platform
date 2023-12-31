import React, { useEffect, useState } from "react";

// ? useViewport
// 监听页面大小变化，网络是否断开
// 效果：在组件调用 useWindowSize 时，可以拿到页面大小，并且在浏览器缩放时自动触发组件更新。
export default function useViewport() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height };
}
