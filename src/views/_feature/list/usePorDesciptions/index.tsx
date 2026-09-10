import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { ProColumns, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { Badge, Button, Card, Descriptions, Divider, Steps, Tabs, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import CatDetail from './components/cat.tsx';

export default () => {
	return (
		<>
			<Card className='mb-[15px]'>
				<Title level={4} className='mb-[15px]'>
					ProComponents库中 ProDescriptions.组件配置API
				</Title>
				<a className='text-sky-500' href='https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8' target='_blank' rel='noopener noreferrer'>
					🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀
				</a>
			</Card>

			<Card>
				<Tabs
					defaultActiveKey='1'
					items={[
						{
							key: '1',
							label: '高级定义列表',
							children: ProDescriptionsCom(),
						},
						{
							key: '2',
							label: '数据详情页',
							children: BasicDetails(),
						},
						{
							key: '3',
							label: '小猫下拉刷新',
							children: CatDetail(),
						},
					]}
					onChange={() => {}}
				/>
			</Card>
		</>
	);
};

const ProDescriptionsCom = () => {
	const now = dayjs().valueOf();
	return (
		<ProDescriptions
			column={2}
			title='高级定义列表'
			tooltip='包含了从服务器请求，columns等功能'
			dataSource={{
				text: '这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长',
				money: 100,
				percent: 100,
				status: 'open',
				remoteStatus: 'closed',
				progress: 40,
				dateTime: now,
				date: now,
				range: [dayjs().subtract(1, 'day').valueOf(), now],
				time: now,
				code: 'yarn run v1.22.0\n$ eslint ./packages\nDone in 9.70s.',
				json: JSON.stringify({ compilerOptions: { target: 'esnext', moduleResolution: 'bundler', jsx: 'react-jsx', strict: true }, include: ['src'] }, null, 2),
			}}
			columns={[
				{ valueType: 'option', render: () => <Button type='primary'>提交</Button> },
				{ title: '文本', dataIndex: 'text', span: 2, valueType: 'text', ellipsis: true, renderText: text => text + text },
				{ title: '金额', dataIndex: 'money', tooltip: '仅供参考，以实际为准', valueType: 'money' },
				{ title: '百分比', dataIndex: 'percent', valueType: 'percent' },
				{
					title: '选择框',
					dataIndex: 'status',
					valueEnum: {
						all: { text: '全部', status: 'Default' },
						open: { text: '未解决', status: 'Error' },
						closed: { text: '已解决', status: 'Success' },
						processing: { text: '解决中', status: 'Processing' },
					},
				},
				{
					title: '远程选择框',
					dataIndex: 'remoteStatus',
					valueType: 'select',
					request: async () => [
						{ label: '全部', value: 'all' },
						{ label: '未解决', value: 'open' },
						{ label: '已解决', value: 'closed' },
						{ label: '解决中', value: 'processing' },
					],
				},
				{ title: '进度条', dataIndex: 'progress', valueType: 'progress' },
				{ title: '日期时间', dataIndex: 'dateTime', valueType: 'dateTime' },
				{ title: '日期', dataIndex: 'date', valueType: 'date' },
				{ title: '日期区间', dataIndex: 'range', valueType: 'dateTimeRange' },
				{ title: '时间', dataIndex: 'time', valueType: 'time' },
				{ title: '代码块', dataIndex: 'code', valueType: 'code' },
				{ title: 'JSON 代码块', dataIndex: 'json', valueType: 'jsonCode' },
			]}
		/>
	);
};

const { Title, Text } = Typography;

export type BasicProgress = {
	key: string;
	time: string;
	rate: string;
	status: string;
	operator: string;
	cost: string;
};

const progressColumns: ProColumns<BasicProgress>[] = [
	{ title: '时间', dataIndex: 'time', key: 'time' },
	{ title: '当前进度', dataIndex: 'rate', key: 'rate' },
	{
		title: '状态',
		dataIndex: 'status',
		key: 'status',
		render: (text: React.ReactNode) => {
			if (text === 'success') return <Badge status='success' text='成功' />;
			return <Badge status='processing' text='进行中' />;
		},
	},
	{ title: '操作员ID', dataIndex: 'operator', key: 'operator' },
	{ title: '耗时', dataIndex: 'cost', key: 'cost' },
];

const basicProgress: BasicProgress[] = [
	{ key: '1', time: '2019-11-10 14:10', rate: '联系客户', status: 'success', operator: '取货员 ID1234', cost: '5mins' },
	{ key: '2', time: '2019-11-09 10:10', rate: '取货员出发', status: 'processing', operator: '取货员 ID1234', cost: '1h' },
	{ key: '3', time: '2019-11-08 08:10', rate: '取货员接单', status: 'processing', operator: '取货员 ID1234', cost: '5mins' },
	{ key: '4', time: '2019-11-07 08:10', rate: '申请审批通过', status: 'success', operator: '系统', cost: '1h' },
	{ key: '5', time: '2019-11-07 07:10', rate: '发起退货申请', status: 'processing', operator: '用户', cost: '5mins' },
];

// <Descriptions /> https://ant.design/components/descriptions-cn
// <Step /> https://ant.design/components/steps-cn
// <Badge /> https://ant.design/components/badge-cn
const BasicDetails = () => {
	return (
		<>
			<Descriptions title='退款申请'>
				<Descriptions.Item label='取货单号'>1000000000</Descriptions.Item>
				<Descriptions.Item label='状态'>已取货</Descriptions.Item>
				<Descriptions.Item label='销售单号'>1234123421</Descriptions.Item>
				<Descriptions.Item label='子订单'>3214321432</Descriptions.Item>
			</Descriptions>
			<Divider />
			<Descriptions title='用户信息'>
				<Descriptions.Item label='用户姓名'>付小小</Descriptions.Item>
				<Descriptions.Item label='联系电话'>18100000000</Descriptions.Item>
				<Descriptions.Item label='常用快递'>菜鸟仓储</Descriptions.Item>
				<Descriptions.Item label='取货地址'>浙江省杭州市西湖区万塘路18号</Descriptions.Item>
				<Descriptions.Item label='备注'>无</Descriptions.Item>
			</Descriptions>
			<Divider />
			<Title level={5} className='mb20'>
				审批流程表
			</Title>
			<Steps
				className='mb30'
				items={[
					{ title: '申请', status: 'finish', icon: <UserOutlined /> },
					{ title: '用户信息', status: 'finish', icon: <SolutionOutlined /> },
					{ title: '审核中', status: 'process', icon: <LoadingOutlined /> },
					{ title: '结束', status: 'wait', icon: <SmileOutlined /> },
				]}
			/>
			<Divider />
			<Title level={5} className='mb20'>
				任务执行状态
			</Title>
			<Steps
				className='mb30'
				items={[
					{ title: '任务已创建', status: 'finish', icon: <UserOutlined /> },
					{ title: '未执行', status: 'finish', icon: <SolutionOutlined /> },
					{ title: '正在执行', status: 'process', icon: <LoadingOutlined /> },
					{ title: '已完成', status: 'wait', icon: <SmileOutlined /> },
				]}
			/>
			<Divider />
			<Title level={5} className='mb20'>
				退货商品
			</Title>
			<ProTable bordered pagination={false} search={false} options={false} toolBarRender={false} dataSource={basicProgress} columns={progressColumns} />
		</>
	);
};
