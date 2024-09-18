import React from 'react'
import { Layout } from 'antd'
import { RootState, useSelector } from '@/redux'
import './index.less'

const { Footer } = Layout
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE

const LayoutFooter: React.FC = () => {
	const footer = useSelector((state: RootState) => state.global.footer)
	return (
		<>
			{footer && (
				<Footer className="ant-footer">
					<a href="#" target="_blank" rel="noreferrer">
						{new Date().getFullYear()} © {APP_TITLE} By React Hooks Technology.
					</a>
				</Footer>
			)}
		</>
	)
}
export default LayoutFooter
