// ! 获取组件宽高
// 效果：通过调用 useComponentSize 拿到某个组件 ref 实例的宽高，并且在宽高变化时，rerender 并拿到最新的宽高。

// component-size: https://github.com/rehooks/component-size/blob/master/index.js

import React, { MutableRefObject, useCallback, useLayoutEffect, useRef, useState } from 'react'
function getSize(el) {
	if (!el) {
		return {
			width: 0,
			height: 0,
		}
	}

	return {
		width: el.offsetWidth,
		height: el.offsetHeight,
	}
}

function useComponentSize(ref: MutableRefObject<any>) {
	const [ComponentSize, setComponentSize] = useState(getSize(ref ? ref.current : {}))

	var handleResize = useCallback(
		function handleResize() {
			if (ref.current) {
				setComponentSize(getSize(ref.current))
			}
		},
		[ref]
	)

	useLayoutEffect(
		function () {
			if (!ref.current) {
				return
			}

			handleResize()

			if (typeof ResizeObserver === 'function') {
				var resizeObserver = new ResizeObserver(function () {
					handleResize()
				})
				resizeObserver.observe(ref.current)

				return function () {
					resizeObserver.disconnect(ref.current)
					// resizeObserver = null
				}
			} else {
				window.addEventListener('resize', handleResize)

				return function () {
					window.removeEventListener('resize', handleResize)
				}
			}
		},
		[ref.current]
	)

	return ComponentSize
}

export default useComponentSize
