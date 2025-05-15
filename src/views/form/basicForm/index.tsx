import React, { useState } from 'react'
import type { RadioChangeEvent } from 'antd'
import { Card, Radio, Tabs } from 'antd'
import Title from 'antd/lib/typography/Title'
import { TabItems } from './components/TabsItem'

const App: React.FC = () => {
	return (
		<>
			<Card className="mb10">
				<Title level={4} className="mb15">
					基础表单 Ant.design
				</Title>
				<a className="font-mono text-sky-500 font-bold" href="https://ant.design/components/tabs-cn#tabs-demo-slide" target="_blank" rel="noopener noreferrer">
					🚀 Antd - Tabs 链接：滑动 - 可以左右、上下滑动，容纳更多标签。🚀
				</a>
			</Card>
			<Card>
				<Tabs
					defaultActiveKey="1"
					tabPosition="left"
					style={{ height: '100%' }}
					// style={{ height: '100vh' }}
					items={TabItems}
				/>
			</Card>
		</>
	)
}

export default App
