import React from 'react';
import { Card, Tabs } from 'antd';
import Title from 'antd/lib/typography/Title';
import { TabItems } from './components/TabsItem';

const App: React.FC = () => {
	return (
		<div className='w-full h-full overflow-hidden pb-[120px]'>
			<Card className='mb-[15px]'>
				<Title level={4} className='mb-[15px]'>
					基础表单 Ant.design
				</Title>
				<a className='font-mono text-sky-500 font-bold' href='https://ant.design/components/tabs-cn#tabs-demo-slide' target='_blank' rel='noopener noreferrer'>
					🚀 Antd - Tabs 链接：滑动 - 可以左右、上下滑动，容纳更多标签。🚀
				</a>
			</Card>
			<Card className='max-h-full overflow-y-scroll'>
				<Tabs
					defaultActiveKey='1'
					tabPosition='left'
					style={{ height: '100%' }}
					// style={{ height: '100vh' }}
					items={TabItems}
				/>
			</Card>
		</div>
	);
};

export default App;
