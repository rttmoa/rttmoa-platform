import { IconFont } from '@/components/Icon';
import { message } from '@/hooks/useMessage';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Image, Space, Tag, Tooltip } from 'antd';
import { ColumnProps } from 'antd/es/table';

interface stateConfig {
	[propName: string]: React.ReactNode;
}
interface InterestConfig {
	[propName: number]: string;
}
// * 表格：列配置项
export const columnConfig: any = (apiData: any, roleObj: any, handleOperator: any) => {
	// * 表头搜索框：自定义筛选菜单：https://ant.design/components/table-cn#table-demo-custom-filter-panel
	// * 表头过滤和加载 — 获取远程数据：https://ant.design/components/table-cn#table-demo-ajax
	// 固定表头
	// * 设置：隐藏列设置：对应表的设置存储到数据库中、还有列排序也需要存储
	// 拖拽排序需用到标签栏的组件
	return [
		{
			title: 'id',
			dataIndex: 'id',
			fixed: 'left',
			width: 60,
			align: 'center',
			sorter: (a: any, b: any) => {
				return a.id - b.id;
			},
			sortDirections: ['descend', 'ascend'],
			ellipsis: { showTitle: false },
			render: (value: any) => (
				<Tooltip placement='top' title={value}>
					{value || '-'}
				</Tooltip>
			),
		},
		{
			title: '用户名',
			dataIndex: 'username',
			fixed: 'left',
			width: 60,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (value: any) => (
				<Tooltip placement='top' title={value}>
					<a href=''>{value || '-'}</a>
				</Tooltip>
			),
		},
		{
			title: '头像',
			dataIndex: 'head',
			width: 80,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (avatar: any) => {
				return (
					<div>
						<Image height={20} src={avatar} />
					</div>
				);
			},
		},
		{
			title: '性别',
			dataIndex: 'sex',
			width: 80,
			align: 'center',
			filters: [
				{ text: '男', value: 1 },
				{ text: '女', value: 0 },
			],
			onFilter: (value: any, record: any) => {
				return record?.sex == value;
			},
			ellipsis: { showTitle: false },
			render: (sex: any) => (
				<Tooltip placement='top' title={sex === 1 ? '男' : '女'}>
					{sex === 1 ? '男' : '女'}
				</Tooltip>
			),
		},
		{
			title: '年龄',
			dataIndex: 'age',
			width: 60,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (element: string) => {
				return (
					<Tooltip placement='top' title={element}>
						{element}
					</Tooltip>
				);
			},
		},
		{
			title: '在线状态',
			dataIndex: 'status',
			width: 80,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (state: string) => {
				let config: stateConfig = {
					隐身: <Tag color='blue'>隐身</Tag>,
					在线: <Tag color='green'>在线</Tag>,
					离线: <Tag color='red'>离线</Tag>,
					异常: <Tag color='orange'>异常</Tag>,
				};
				return (
					<Tooltip placement='top' title={state}>
						{config[state]}
					</Tooltip>
				);
			},
		},
		{
			title: '婚姻状态',
			dataIndex: 'marriage',
			width: 80,
			align: 'center',
			ellipsis: { showTitle: false },
			render(marriage: string) {
				function marriaged() {
					switch (marriage) {
						case '未婚':
							return <Badge status='default' text='未婚' />;
						case '已婚':
							return <Badge status='success' text='已婚' />;
						case '离异':
							return <Badge status='error' text='离异' />;
						default:
							return '';
					}
				}
				return (
					<Tooltip placement='top' title={marriage}>
						{marriaged()}
					</Tooltip>
				);
			},
		},
		// {
		// 	title: '所属角色',
		// 	dataIndex: 'role_id',
		// 	width: 100,
		// 	align: 'center',
		// 	sorter: (a: any, b: any) => {
		// 		return a.role_id - b.role_id
		// 	},
		// 	ellipsis: { showTitle: false },
		// 	render: (roleiD: number) => {
		// 		return (
		// 			<Tooltip placement="top" title={roleObj && roleObj[roleiD]}>
		// 				{roleObj && roleObj[roleiD]}
		// 			</Tooltip>
		// 		)
		// 	},
		// },
		{
			title: '手机号',
			dataIndex: 'phone',
			width: 100,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (phone: number) => {
				let aPhone = String(phone).replace(/(\d{3})\d*(\d{4})/g, '$1***$2');
				return (
					<Tooltip placement='top' title={aPhone}>
						{aPhone}
					</Tooltip>
				);
			},
		},
		{
			title: '联系地址',
			dataIndex: 'city',
			width: 150,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (city: any) => (
				<Tooltip placement='top' title={city}>
					{city}
				</Tooltip>
			),
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			width: 150,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement='top' title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			width: 150,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement='top' title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			width: 150,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement='top' title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			width: 150,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement='top' title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '过去日期',
			dataIndex: 'date',
			width: 120,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement='top' title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '醒来时间',
			dataIndex: 'time',
			width: 120,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement='top' title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '生日',
			dataIndex: 'dateTime',
			width: 150,
			align: 'center',
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement='top' title={element}>
					{element}
				</Tooltip>
			),
		},
		// {
		// 	title: '操作2',
		// 	fixed: 'right',
		// 	width: 180,
		// 	align: 'center',
		// 	render(record: any) {
		// 		return (
		// 			<Space>
		// 				<Button
		// 					size="small"
		// 					onClick={() => {
		// 						handleOperator('detail', record)
		// 					}}>
		// 					详情
		// 				</Button>
		// 				<Button
		// 					size="small"
		// 					onClick={() => {
		// 						handleOperator('edit', record)
		// 					}}>
		// 					编辑
		// 				</Button>
		// 				<Button
		// 					size="small"
		// 					onClick={() => {
		// 						handleOperator('delete', record)
		// 					}}>
		// 					删除
		// 				</Button>
		// 			</Space>
		// 		)
		// 	},
		// },
		{
			title: '操作1',
			fixed: 'right',
			width: 60,
			align: 'center',
			ellipsis: { showTitle: false },
			render(record: any) {
				return (
					<div className='more-button'>
						<Dropdown
							menu={{
								items: [
									{
										key: '1',
										label: (
											<Button
												key='view'
												type='link'
												size='small'
												icon={<EyeOutlined />}
												onClick={() => {
													// console.log(entity)
													// Params.setCurrentRow(entity)
													// Params.setShowDetail(true)
													handleOperator('detail', record);
												}}
											>
												查看
											</Button>
										),
									},
									{
										key: '2',
										label: (
											<Button
												key='edit'
												type='link'
												size='small'
												icon={<EditOutlined />}
												onClick={() => {
													handleOperator('edit', record);
												}}
											>
												编辑
											</Button>
										),
									},
									{
										key: '3',
										label: (
											<Button
												key='delete'
												type='link'
												size='small'
												danger
												icon={<DeleteOutlined />}
												onClick={() => {
													// message.success(`删除了iD为: ${entity.username}`, 2)
													handleOperator('delete', record);
												}}
											>
												删除
											</Button>
										),
									},
								],
							}}
							placement='bottomRight'
							arrow={{ pointAtCenter: true }}
							trigger={['click']}
						>
							<div className='more-button-item'>
								<IconFont style={{ fontSize: 22 }} type='icon-xiala' />
							</div>
						</Dropdown>
					</div>
				);
			},
		},
	];
};
