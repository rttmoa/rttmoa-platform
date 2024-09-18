import React from 'react'

// ? 节流: 每次触发定时器后，直到这个定时器结束之前无法再次触发。
//* refer: 防抖和节流： https://juejin.cn/post/6844904019165446158#heading-40
export default function useThrottle(func: Function, delay = 1000) {
	let prev = 0
	return (...args: any) => {
		const now = new Date().getTime()
		if (now - prev > delay) {
			prev = now
			return func(...args)
		}
	}
}
