import React, { useState, useEffect, useCallback } from "react";
// 1.界面需要根据窗口重新布局；
// 2.在页面滚动时，需要根据滚动位置来决定是否显示一个”返回顶部“的按钮。
// 这都需要用到浏览器的api来监听这些状态的变化。那么我们就可以滚动条位置的场景为例，来看看因该如何用Hooks优雅的监听浏览器状态。

// 获取横向，纵向滚动条位置
const getPosition = () => {
  return {
    x: document.body.scrollLeft,
    y: document.body.scrollTop
  };
};
const UseScroll = () => {
  const [postion, setPosition] = useState(getPosition());
  useEffect(() => {
    const handler = () => {
      setPosition(getPosition());
    };
    // 监听 scroll 事件，更新滚动条位置
    document.addEventListener("scroll", handler);
    return () => {
      // 组件销毁时，取消事件监听
      document.removeEventListener("scroll", handler);
    };
  }, []);
  return postion;
};
// TODO: 通过这个例子，我们看到了如何将浏览器状态变成可被 React 组件绑定的数据源，从而在使用上更加便捷和直观。
// 当然，除了窗口大小、滚动条位置这些状态，还有其它一些数据也可以这样操作，
// 比如 cookies，localStorage, URL，等等。你都可以通过这样的方法来实现
function Index() {
  const { y } = UseScroll();
  console.log(y);

  const goTop = useCallback(() => {
    document.body.scrollTop = 0;
  }, []);

  if (y > 300) {
    return (
      <button
        onClick={goTop}
        style={{
          position: "fixed",
          right: "10px",
          bottom: "10px"
        }}
      >
        Back to Top
      </button>
    );
  } else {
    return null;
  }
}
export default Index;
