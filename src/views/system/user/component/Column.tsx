import { ProColumns } from '@ant-design/pro-components';
import { UserList } from '@/api/interface';
import { Button, Dropdown, Input, Popconfirm, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { IconFont } from '@/components/Icon';
import { TableRenderAction } from '@/components/TableAction';
import Link from 'antd/lib/typography/Link';

const valueEnum: { [key: number]: string } = {
	0: 'close',
	1: 'running',
	2: 'online',
	3: 'error',
};
const ProcessMap = {
	close: 'normal',
	running: 'active',
	online: 'success',
	error: 'exception',
} as const;

const TableColumnsConfig = (handleOperator: any, handleModalSubmit: any): ProColumns<UserList>[] => {
	return [
		{
			title: '用户名',
			dataIndex: 'username',
			copyable: true,
			width: 120,
			fixed: 'left',
			tooltip: '用户的名字',
			// initialValue: 'zhangsan',
			onFilter: false,
			// hideInSearch: true,
			// hideInTable: true,
			// hideInForm: true,
			// hideInDescriptions: true,
			sorter: true,
			align: 'center',
			ellipsis: true,
			render: (dom, entity) => {
				return (
					<Link
						onClick={() => {
							handleOperator('detail', entity);
						}}
					>
						{entity.username}
					</Link>
				);
			},
		},
		{
			title: '用户权限字符',
			dataIndex: 'user_auth',
			width: 160,
			fixed: 'left',
			tooltip: '用户的名字',
			sorter: true,
			align: 'center',
			ellipsis: true,
		},
		// {
		// 	title: '性别',
		// 	dataIndex: 'sex',
		// 	width: 80,
		// 	initialValue: '全部', // * initialValue 查询表单项初始值
		// 	filters: true,
		// 	onFilter: true,
		// 	valueEnum: {
		// 		2: { text: '全部' },
		// 		1: { text: '男' },
		// 		0: { text: '女' },
		// 	},
		// 	align: 'center',
		// },
		// {
		// 	title: '年龄',
		// 	dataIndex: 'age',
		// 	align: 'center',
		// 	width: 80,
		// 	sorter: true,
		// 	tooltip: '指代用户的年纪大小', // * tooltip 提示一些信息
		// },
		{
			title: '状态',
			dataIndex: 'status',
			align: 'center',
			width: 100,
			hideInForm: true, // * hideInForm 在Form中不展示此列, 不可搜索
			filters: true,
			onFilter: true,
			hideInSearch: true,
			valueEnum: {
				0: {
					text: '正常',
					status: 'Default',
				},
				1: {
					text: '在线',
					status: 'Processing',
				},
				2: {
					text: '离线',
					status: 'Success',
				},
				3: {
					text: '异常',
					status: 'Error',
				},
			},
		},
		{
			title: '角色名称',
			dataIndex: 'role',
			align: 'center',
			width: 220,
			sorter: true,
			ellipsis: true,
			render: (_: any, record: any) => {
				const str = record?.role?.toString();
				if (str) return <Tag>{str}</Tag>;
				else return <span>-</span>;
			},
		},
		// {
		// 	title: '执行进度',
		// 	dataIndex: 'progress',
		// 	align: 'center',
		// 	width: 300,
		// 	hideInSearch: true,
		// 	valueType: item => ({
		// 		type: 'progress',
		// 		status: ProcessMap[valueEnum[item.progress_status] as 'close'] as any,
		// 	}),
		// },
		// {
		// 	title: '邮箱',
		// 	dataIndex: 'email',
		// 	align: 'center',
		// 	width: 150,
		// 	hideInSearch: true,
		// 	ellipsis: true, // * ellipsis 是否自动缩略
		// },
		{
			title: '手机号',
			dataIndex: 'phone',
			align: 'center',
			width: 180,
			ellipsis: true,
			copyable: true,
		},
		// {
		// 	title: '地址',
		// 	dataIndex: 'city',
		// 	align: 'center',
		// 	width: 200,
		// 	// hideInSearch: true,
		// 	ellipsis: true,
		// 	copyable: true,
		// },
		{
			title: '最终上线时间',
			key: 'time',
			dataIndex: 'time',
			align: 'center',
			width: 150,
			valueType: 'time',
			sorter: true,
			// hideInSearch: true,
			ellipsis: true,
		},
		// {
		// 	title: '日期',
		// 	key: 'date',
		// 	align: 'center',
		// 	width: 120,
		// 	dataIndex: 'date',
		// 	valueType: 'date',
		// 	sorter: true,
		// 	// hideInSearch: true,
		// 	ellipsis: true,
		// },
		{
			title: '创建时间',
			dataIndex: 'createTime',
			valueType: 'dateRange',
			hideInTable: false, // 隐藏在表格
			search: { transform: value => ({ startTime: value[0], endTime: value[1] }) },
			ellipsis: true,
		},
		{
			title: '操作',
			key: 'option',
			align: 'center',
			fixed: 'right',
			hideInSearch: true,
			width: 135,
			render: (_, record) => TableRenderAction(record, handleOperator, handleModalSubmit),
		},
	];
};
export default TableColumnsConfig;
