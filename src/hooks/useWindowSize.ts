import { useEffect, useState } from "react";

// * 在组件调用 useWindowSize 时，可以拿到页面大小，并且在浏览器缩放时自动触发组件更新。
// 实现：
// 从 window.innerHeight 等 API 直接拿到页面宽高即可，
// 注意此时可以用 window.addEventListener('resize') 监听页面大小变化，
// 此时调用 setValue 将会触发调用自身的 UI 组件 rerender，就是这么简单！
// 最后注意在销毁时，removeEventListener 注销监听。
export function useWindowSize() {
	let [windowSize, setWindowSize] = useState(getSize());

	const handleResize = () => {
		setWindowSize(getSize());
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return windowSize;
}

function getSize() {
	return {
		innerHeight: window.innerHeight,
		innerWidth: window.innerWidth,
		outerHeight: window.outerHeight,
		outerWidth: window.outerWidth
	};
}
