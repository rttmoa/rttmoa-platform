import React from 'react';
import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ProFormFields from './components/ProFormFields';
import LightFilter from './components/LightFilter';
import StepsForm from './components/StepsForm';
import LoginForm from './components/LoginForm';

const onChange = (key: string) => {
	console.log(key);
};

const items: TabsProps['items'] = [
	{
		key: '1',
		label: '表单项',
		children: <ProFormFields />,
	},
	{
		key: '2',
		label: '表头筛选表单',
		children: <LightFilter />,
	},
	{
		key: '3',
		label: '分步表单',
		children: <StepsForm />,
	},

	{
		key: '4',
		label: '登陆表单',
		children: <LoginForm />,
	},
];

const App: React.FC = () => {
	return (
		<>
			<Card>
				<div className='font-mono from-neutral-900 text-base font-semibold mb-4 '>
					ProComponents库中 ProForm.组件配置API{' —— '}
					<a className='text-sky-500' href='https://pro-components.antdigital.dev/components/form#proform-%E9%AB%98%E7%BA%A7%E8%A1%A8%E5%8D%95' target='_blank' rel='noopener noreferrer'>
						🚀 链接：表单项、数据结构化、JSON表单、分步表单、浮层表单、登陆表单 🚀
					</a>
				</div>
				<Tabs defaultActiveKey='1' items={items} onChange={onChange} />
			</Card>
		</>
	);
};

export default App;
