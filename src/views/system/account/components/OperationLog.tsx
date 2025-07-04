import { Form, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

export default function OperationLog() {
	const [ip, setIp] = useState('');
	console.log(navigator.appVersion);
	// console.log(useLocation());

	useEffect(() => {
		fetch('https://api.ipify.org?format=json')
			.then(response => response.json())
			.then(data => setIp(data.ip))
			.catch(error => console.error('Error fetching IP: ', error));
	});

	// 表头：
	// 行为 action、IP ip、IP来源 ipSource、浏览器 browser、请求耗时 reqTime、创建时间 createTime
	const data = [
		{
			action: '用户登陆', // || '修改用户'
			ip: ip, // ip
			ipSource: '中国上海上海市', // IP来源  使用react实现通过经纬度获取地址（地理/逆地理编码）: https://developer.aliyun.com/article/1420986
			browser: 'Chrome/122.0.0.0', // 浏览器版本
			reqTime: '42ms', // 请求耗时
			createTime: '2021-01-01 00:00:00', // 创建时间
		},
	];

	const columns = [
		{
			title: '行为',
			dataIndex: 'action',
			key: 'action',
		},
		{
			title: 'IP地址',
			dataIndex: 'ip',
			key: 'ip',
		},
		{
			title: 'IP来源',
			dataIndex: 'ipSource',
			key: 'ipSource',
		},
		{
			title: '浏览器名称',
			dataIndex: 'browser',
			key: 'browser',
		},
		{
			title: '请求耗时',
			dataIndex: 'reqTime',
			key: 'reqTime',
			render: (text: string, record: any) => {
				return <Tag>{record.reqTime}</Tag>;
			},
		},
		{
			title: '创建时间',
			dataIndex: 'createTime',
			key: 'createTime',
		},
	];

	return (
		<>
			<h2 className='text-lg'>操作日志</h2>
			<Table dataSource={data} columns={columns} />
		</>
	);
}
