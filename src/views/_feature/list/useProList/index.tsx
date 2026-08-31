import React from 'react';
import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import UseProList from './component/useProList';
import UseProListCard from './component/useProListCard';

const onChange = (key: string) => {
	console.log(key);
};

const items: TabsProps['items'] = [
	{
		key: '1',
		label: '编辑列表',
		children: <UseProList />,
	},
	{
		key: '2',
		label: '卡片列表',
		children: <UseProListCard />,
	},
];

const App: React.FC = () => {
	return (
		<>
			<Card>
				<div className='font-mono from-neutral-900 text-base font-semibold mb-4 '>
					ProComponents库中 ProList.组件配置API{' —— '}
					<a className='text-sky-500' href='https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8' target='_blank' rel='noopener noreferrer'>
						🚀 链接：带工具栏、编辑列表、支持选中列表、查询列表 🚀
					</a>
				</div>
				<Tabs defaultActiveKey='1' items={items} onChange={onChange} />
			</Card>
		</>
	);
};

export default App;
