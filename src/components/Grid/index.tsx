import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BreakPoint } from './interface'

type Props = {
	cols?: number | Record<BreakPoint, number>
	collapsed?: boolean
	collapsedRows?: number
	gap?: [number, number] | number
	children?: React.ReactNode
}
export interface GridContextType {
	gap: number
	cols: number
	breakPoint: string
	shouldHiddenIndex: number
}
export const GridContext = React.createContext<GridContextType>({
	gap: 0,
	cols: 4,
	breakPoint: 'xl',
	shouldHiddenIndex: -1,
})
export default function Grid(props: Props) {
	const { cols = () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }), collapsed = false, collapsedRows = 1, gap = 0, children = null } = props

	let breakPoint = useRef<BreakPoint>('xl')
	const hiddenIndex = useRef<number>(-1) // 开始折叠的 index
	// console.log('hiddenIndex', hiddenIndex.current);
	// 监听屏幕变化
	const resize = (e: UIEvent) => {
		let width = (e.target as Window).innerWidth
		switch (!!width) {
			case width < 768:
				breakPoint.current = 'xs'
				break
			case width >= 768 && width < 992:
				breakPoint.current = 'sm'
				break
			case width >= 992 && width < 1200:
				breakPoint.current = 'md'
				break
			case width >= 1200 && width < 1920:
				breakPoint.current = 'lg'
				break
			case width >= 1920:
				breakPoint.current = 'xl'
				break
		}
	}
	useEffect(() => {
		resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent)
	})
	useEffect(() => {
		window.addEventListener('resize', resize)
		return () => {
			window.removeEventListener('resize', resize)
		}
	}, [])

	const findIndex = () => {
		let fields: any = []
		let suffix: React.ReactNode | null = null
		React.Children.toArray(props.children).forEach((child: React.ReactNode) => {
			// 判断 child 是不是一个有效的 React 元素
			if (React.isValidElement(child)) {
				// 判断 child 的类型
				if (typeof child.type === 'object' && child.type['name'] === 'GridItem') {
					suffix = child
				}
				if (child.props?.suffix !== undefined) {
					suffix = child
				}
				// 如果 child 有子元素，将它们添加到 fields 中
				if (child.props && Array.isArray(child.props.children)) {
					fields.push(...React.Children.toArray(child.props.children))
				}
			}
		})
		// 计算 suffix 所占用的列
		let suffixCols = 0
		if (suffix) {
			suffixCols =
				((suffix as React.ReactElement)!.props![breakPoint.current]?.span ?? (suffix as React.ReactElement)!.props?.span ?? 1) +
				((suffix as React.ReactElement)!.props![breakPoint.current]?.offset ?? (suffix as React.ReactElement)!.props?.offset ?? 0)
		}
		try {
			let find = false
			fields.reduce((prev = 0, current: React.ReactElement, index: number) => {
				prev +=
					((current as React.ReactElement)!.props![breakPoint.current]?.span ?? (current as React.ReactElement)!.props?.span ?? 1) +
					((current as React.ReactElement)!.props![breakPoint.current]?.offset ?? (current as React.ReactElement)!.props?.offset ?? 0)
				if (Number(prev) > collapsedRows * gridCols - suffixCols) {
					hiddenIndex.current = index
					find = true
					throw 'find it'
				}
				return prev
			}, 0)
			if (!find) hiddenIndex.current = -1
		} catch (e) {
			// console.warn(e);
		}
	}

	useEffect(() => {
		if (props.collapsed) {
			findIndex()
		}
	}, [breakPoint.current]) // 当breakPoint变化时，这个useEffect会运行

	useEffect(() => {
		if (props.collapsed) {
			findIndex()
		} else {
			hiddenIndex.current = -1
		}
	}, [props.collapsed]) // 当props.collapsed变化时，这个useEffect会运行

	const gridCols = useMemo(() => {
		if (typeof props.cols === 'object') return props.cols[breakPoint.current] ?? props.cols
		return props.cols
	}, [props.cols]) as number
	// 设置间距
	const gridGap = useMemo(() => {
		if (typeof props.gap === 'number') return `${props.gap}px`
		if (Array.isArray(props.gap)) return `${props.gap[1]}px ${props.gap[0]}px`
		return 'unset'
	}, [props.gap])
	// console.log('gridCols', gridCols);
	// console.log('GridContext', GridContext);
	// 设置 style
	const style = useMemo(() => {
		return {
			display: 'grid',
			gridGap: gridGap,
			gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
		}
	}, [gridGap, gridCols])

	const _gap = Array.isArray(props.gap) ? props.gap[0] : props.gap!
	const _breakPoint = breakPoint.current!
	const _shouldHiddenIndex = hiddenIndex.current!
	const _cols = gridCols!
	const contextValue = { gap: _gap, breakPoint: _breakPoint, shouldHiddenIndex: _shouldHiddenIndex, cols: _cols }
	return (
		<GridContext.Provider value={contextValue}>
			<div style={style}>{props?.children}</div>
		</GridContext.Provider>
	)
}
