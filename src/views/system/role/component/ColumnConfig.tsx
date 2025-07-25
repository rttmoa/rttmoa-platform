import { ProColumns } from '@ant-design/pro-components';
import { UserList } from '@/api/interface';
import { Button, Dropdown, Input, Popconfirm, Switch, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { IconFont } from '@/components/Icon';

const TableColumnsConfig = (handleOperator: any): ProColumns<UserList>[] => {
	return [
		{
			title: '角色名称',
			dataIndex: 'role_name',
			copyable: true,
			// width: 150,
			fixed: 'left',
			tooltip: '用户的名字',
			// initialValue: 'zhangsan',
			onFilter: false,
			// hideInSearch: true,
			// hideInTable: true,
			// hideInForm: true,
			// hideInDescriptions: true,
			sorter: true,
			render: (dom, entity) => {
				return (
					<a
						href='javascript:void(0)'
						onClick={() => {
							handleOperator('detail', entity);
						}}
					>
						{dom}
					</a>
				);
			},
			// 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
			filterDropdown: () => (
				<div style={{ padding: 2 }}>
					<Input style={{ width: 150, marginBlockEnd: 8, display: 'block', fontSize: '14px' }} placeholder='请输入' />
				</div>
			),
			filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
			fieldProps: (form, config) => {}, // 查询表单的 props，会透传给表单项，
		},
		{
			title: '权限字符',
			dataIndex: 'permission_str',
			// width: 150,
			filters: true,
			onFilter: true,
		},
		{
			title: '角色级别',
			dataIndex: 'level',
			// width: 150,
			filters: true,
			onFilter: true,
		},
		{
			title: '角色排序',
			dataIndex: 'sort',
			// width: 150,
			filters: true,
			onFilter: true,
		},
		{
			title: '角色状态',
			dataIndex: 'status',
			// width: 150,
			sorter: true,
			tooltip: '指代用户的年纪大小', // * tooltip 提示一些信息
			// render: (data, entity) => {
			// 	return <Switch value={data == '0' ? false : true} />;
			// },
			render: (dom, entity) => {
				if (dom == '1') return <Tag color='blue'>启用</Tag>;
				if (dom == '0') return <Tag color='red'>停用</Tag>;
			},
		},
		{
			title: '创建日期',
			dataIndex: 'createTime',
			hideInForm: true, // * hideInForm 在Form中不展示此列, 不可搜索
			filters: true,
			onFilter: true,
			hideInSearch: true,
		},
		{
			title: '操作',
			key: 'option',
			fixed: 'right',
			width: 50,
			hideInSearch: true,
			render: (data, entity) => action(entity, handleOperator),
		},
	];
};

const action = (entity: UserList, handleOperator: any) => {
	const OnView = () => {
		handleOperator('detail', entity);
	};
	const OnEdit = () => {
		handleOperator('edit', entity);
	};
	const OnDelete = () => {
		handleOperator('delete', entity);
	};
	const menuList = [
		{
			key: '1',
			label: (
				<Button key='view' type='link' size='small' icon={<EyeOutlined />} onClick={OnView}>
					查看
				</Button>
			),
		},
		{
			key: '2',
			label: (
				<Button key='edit' type='link' size='small' icon={<EditOutlined />} onClick={OnEdit}>
					编辑
				</Button>
			),
		},
		{
			key: '3',
			label: (
				<Popconfirm title='删除任务！' description='你确定要删除这条任务?' onConfirm={OnDelete} okText='确认' cancelText='取消' placement='bottom' trigger='hover'>
					<Button key='delete' type='link' size='small' danger icon={<DeleteOutlined />}>
						删除
					</Button>
				</Popconfirm>
			),
		},
	];
	return [
		<div className='more-button'>
			<Dropdown
				menu={{
					items: menuList,
				}}
				placement='bottom'
				arrow={{ pointAtCenter: true }}
				trigger={['click']}
			>
				<div className='more-button-item'>
					<IconFont style={{ fontSize: 22 }} type='icon-xiala' />
				</div>
			</Dropdown>
		</div>,
	];
};
export default TableColumnsConfig;
