/* eslint-disable prefer-rest-params */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useRef, useState } from 'react'

const DEFAULT_EVENTS = ['scroll', 'wheel', 'mousewheel', 'animationend', 'transitionend', 'touchmove']

interface LazyloadProps {
	scrollContainer?: HTMLElement // 🆗
	offset?: number | [number, number] // 🆗 [top, left]
	resize?: boolean // 🆗
	debounce?: number // 🆗
	throttle?: number // 🆗
	loading: React.ReactNode // 🆗
	children: React.ReactNode
}

/**
 * 使用：
 * <React.Fragment>
			{new Array(10).fill(1).map((_, index) => (
				<Lazyload
						resize
						scrollContainer={document.getElementById('root') as HTMLDivElement}
						debounce={300}
						offset={50}
						loading={<img className="test" alt="" src={loadingGIF} />}
						key={index}>
						<img alt="" src="https://img01.yzcdn.cn/vant/apple-1.jpg" width="100%" height="300"/>    
				</Lazyload>
			))}
	</React.Fragment> 
 */
const UseLazyloadImg: React.FC<LazyloadProps> = props => {
	const { children, scrollContainer = document.body, offset = 0, debounce = 0, throttle = 0, resize = false, loading } = props

	const [isVisible, setVisible] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let checkVisible = () => {
			if (!containerRef.current) return

			const { top, left, width, height } = containerRef.current?.getBoundingClientRect()
			const { top: parentTop, left: parentLeft, width: parentWidth, height: parentHeight } = scrollContainer.getBoundingClientRect()

			const windowInnerHeight = window.innerHeight || document.documentElement.clientHeight
			const windowInnerWidth = window.innerWidth || document.documentElement.clientWidth

			const intersectionTop = Math.min(parentTop, 0)
			const intersectionLeft = Math.min(parentLeft, 0)

			const intersectionHeight = Math.min(windowInnerHeight, parentTop + parentHeight) - intersectionTop
			const intersectionWidth = Math.min(windowInnerWidth, parentLeft + parentWidth) - intersectionLeft

			const offsetTop = top - intersectionTop
			const offsetLeft = left - intersectionLeft

			const offsets = Array.isArray(offset) ? offset : [offset, offset]

			const isVisible =
				offsetTop - offsets[0] <= intersectionHeight &&
				offsetTop + height + offsets[0] >= 0 &&
				offsetLeft - offsets[1] <= intersectionWidth &&
				offsetLeft + width + offsets[1] >= 0

			setVisible(isVisible)

			if (isVisible) {
				DEFAULT_EVENTS.forEach(event => {
					scrollContainer?.removeEventListener(event, checkVisible)
				})
				window.removeEventListener('resize', checkVisible)
			}
		}

		if (debounce) {
			checkVisible = debounceFunc(checkVisible, debounce)
		} else if (throttle) {
			checkVisible = throttleFunc(checkVisible, throttle)
		}

		DEFAULT_EVENTS.forEach(event => {
			scrollContainer?.addEventListener(event, checkVisible)
		})

		if (resize) {
			window.addEventListener('resize', checkVisible)
		}

		checkVisible()

		return () => {
			DEFAULT_EVENTS.forEach(event => {
				scrollContainer?.removeEventListener(event, checkVisible)
			})
			window.removeEventListener('resize', checkVisible)
		}
	}, [scrollContainer, containerRef.current])

	return <div ref={containerRef}>{isVisible ? children : loading}</div>
}

function debounceFunc(fn: any, wait: number) {
	let timer: any = null
	return function () {
		let args = arguments

		timer && clearTimeout(timer)

		timer = setTimeout(() => {
			//@ts-ignore
			fn.apply(this, args)
		}, wait)
	}
}

function throttleFunc(fn: any, wait: number) {
	let time = 0,
		timer: any = null
	return function () {
		let now = Date.now()
		let args = arguments
		if (now - time > wait) {
			//@ts-ignore
			fn.apply(this, args)
			time = now
		} else {
			timer && clearTimeout(timer)
			timer = setTimeout(() => {
				//@ts-ignore
				fn.apply(this, args)
				time = now
			}, wait)
		}
	}
}

export default UseLazyloadImg
