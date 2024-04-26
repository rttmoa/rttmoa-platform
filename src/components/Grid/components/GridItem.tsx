import React, { Children, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { BreakPoint, Responsive } from '../interface'
import { GridContext, GridContextType } from '..'

type Props = {
	offset?: number
	span?: number
	suffix?: boolean
	xs?: Responsive
	sm?: Responsive
	md?: Responsive
	lg?: Responsive
	xl?: Responsive
	children?: React.ReactNode
	index: string
	className?: string
}

export default function GridItem(props: Props) {
	const { offset = 0, span = 1, suffix = false, xs = undefined, sm = undefined, md = undefined, lg = undefined, xl = undefined, children = null } = props

	const [isShow, setIsShow] = useState(true)
	const _gridCont = useContext<GridContextType>(GridContext)

	useEffect(() => {
		if (props.index) {
			setIsShow(!(_gridCont.shouldHiddenIndex !== -1 && parseInt(props.index) >= _gridCont.shouldHiddenIndex))
		}
	}, [_gridCont.shouldHiddenIndex, _gridCont.breakPoint, props.index])

	const _props: any = props
	const gap = _gridCont.gap
	const cols = _gridCont.cols
	let style = useMemo(() => {
		let span: any = _props[_gridCont.breakPoint]?.span ?? props.span
		let offset: any = _props[_gridCont.breakPoint]?.offset ?? props.offset
		console.log('sss', span, offset)
		span = 1
		offset = 0
		if (props.suffix) {
			return {
				gridColumnStart: cols - span - offset + 1,
				gridColumnEnd: `span ${span + offset}`,
				marginLeft: offset !== 0 ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})` : 'unset',
			}
		} else {
			return {
				gridColumn: `span ${span + offset > cols ? cols : span + offset}/span ${span + offset > cols ? cols : span + offset}`,
				marginLeft: offset !== 0 ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})` : 'unset',
			}
		}
	}, [props.span, props.offset])

	// 	style = {
	//     "gridColumn": "span 1/span 2",
	//     "marginLeft": "unset"
	// }
	// console.log('style', style)
	return (
		isShow && (
			<div className={props?.className} style={style}>
				{props.children}
			</div>
		)
	)
}
