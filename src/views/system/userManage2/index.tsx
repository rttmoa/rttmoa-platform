import React, { useRef, useState, useEffect } from 'react';
import { Table, Button, Form, Input, Card, Space, Pagination } from 'antd';

const mockData = Array.from({ length: 45 }).map((_, i) => ({
	key: i,
	name: `用户${i + 1}`,
	age: 20 + (i % 10),
}));

export default function UserManage() {
	const [expanded, setExpanded] = useState(false);
	const [form] = Form.useForm();
	const formRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [scrollY, setScrollY] = useState(300);
	const [data, setData] = useState(mockData);
	const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });

	console.log('scrollY', scrollY);

	// 表格高度自适应
	useEffect(() => {
		const updateHeight = () => {
			const containerHeight = containerRef.current?.clientHeight || 0;
			console.log('main 盒子高度', containerHeight);
			const formHeight = formRef.current?.clientHeight || 0;
			console.log('表单高度：', formHeight);
			const paginationHeight = 56;
			const headerH = 55 + 38;
			const footerH = 30;

			const tableHeight = containerHeight - formHeight - paginationHeight - headerH - footerH - 120; // 100 | 120 | 140
			let tableh = tableHeight > 100 ? tableHeight : 100;
			// console.log('tableh', tableh);
			setScrollY(tableh);
		};
		updateHeight();
		window.addEventListener('resize', updateHeight);
		return () => window.removeEventListener('resize', updateHeight);
	}, [expanded]);

	const handleSearch = () => {
		const values = form.getFieldsValue();
		const filtered = mockData.filter(item => {
			return !values.name || item.name.includes(values.name);
		});
		setData(filtered);
	};

	const columns = [
		{ title: '姓名', dataIndex: 'name' },
		{ title: '年龄', dataIndex: 'age' },
	];

	// 分页切片数据
	const start = (pagination.current - 1) * pagination.pageSize;
	const end = start + pagination.pageSize;
	const currentPageData = data.slice(start, end);

	// * 影响表格高度：表格数据个数10、20
	return (
		<div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
			{/* Content */}
			<main ref={containerRef} style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
				<Card
					size='small'
					title='用户列表'
					extra={<Button onClick={() => setExpanded(!expanded)}>{expanded ? '收起' : '展开'}</Button>}
					style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
				>
					{/* 表单 */}
					<div ref={formRef}>
						<Form form={form} layout='inline' onFinish={handleSearch}>
							<Form.Item name='name' label='姓名'>
								<Input placeholder='请输入姓名' />
							</Form.Item>
							{expanded && (
								<>
									{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(value => {
										return (
											<Form.Item name='age' label='年龄'>
												<Input />
											</Form.Item>
										);
									})}
								</>
							)}
							<Form.Item>
								<Space>
									<Button type='primary' htmlType='submit'>
										搜索
									</Button>
									<Button onClick={() => form.resetFields()}>重置</Button>
								</Space>
							</Form.Item>
						</Form>
					</div>

					{/* 表格区域 */}
					<div style={{ flex: 1, overflow: 'hidden', marginTop: 12 }}>
						<Table
							columns={columns}
							dataSource={data} // currentPageData | data
							rowKey='key'
							pagination={false} // 去掉原生分页器
							scroll={{ y: scrollY }}
							size='small'
						/>
					</div>
				</Card>

				{/* 分页器 - 固定底部 */}
				<div style={{ marginTop: 12, background: '#fff', padding: '12px 16px', boxShadow: '0 -1px 3px rgba(0,0,0,0.05)' }}>
					<Pagination
						current={pagination.current}
						pageSize={pagination.pageSize}
						total={data.length}
						onChange={(page, pageSize) => setPagination({ current: page, pageSize })}
						showSizeChanger
					/>
				</div>
			</main>
		</div>
	);
}
