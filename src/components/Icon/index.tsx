import React from 'react'
import * as Icons from '@ant-design/icons'
import { createFromIconfontCN } from '@ant-design/icons'

interface IconProps {
	name: string
	className?: string
}

export const Icon: React.FC<IconProps> = React.memo(({ name, className }) => {
	const customIcons: { [key: string]: any } = Icons
	if (name) return React.createElement(customIcons[name], { className })
	else return null
	// bundle.js:2 Error handled by React Router default ErrorBoundary: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
})
// 使用；<Icon name="AppstoreOutlined" />

export const IconFont = createFromIconfontCN({
	scriptUrl: ['//at.alicdn.com/t/c/font_3878708_l04g6iwc6y.js' as string],
})
// 使用；<IconFont style={{ fontSize: 22 }} type="icon-xiala" />
