import { useEffect, useRef } from "react";

/***--- 查看某个页面渲染了多少次 ---**/
function useRenderCount() {
  const count = useRef<any>(1);
  useEffect(() => {
    count.current++;
  });
  return count.current;
}

export default function UseRenderComp() {
  const renderCount = useRenderCount();

  return <div>useRenderCount: 查看某个页面渲染了多少次</div>;
}
