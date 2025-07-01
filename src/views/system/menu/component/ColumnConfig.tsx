import { ProColumns } from '@ant-design/pro-components';
import { UserList } from '@/api/interface';
import { Button, Dropdown, Input, Popconfirm, Switch } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { message } from '@/hooks/useMessage';
import { Icon, IconFont } from '@/components/Icon';

export interface TableColumnsParams {
	setCurrentRow: (arg: any) => void;
	setShowDetail: (arg: any) => void;
	handleOperator: (type: string, record: any) => void;
}

const TableColumnsConfig = (Params: TableColumnsParams): ProColumns<UserList>[] => {
	let { setCurrentRow, setShowDetail, handleOperator } = Params;
	return [
		{
			title: '菜单标题',
			dataIndex: ['meta', 'title'],
			copyable: true,
			ellipsis: true,
			width: 200,
			fixed: 'left',
			// tooltip: '用户的名字',
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
						// className="divide-x-2"
						onClick={() => {
							setCurrentRow(entity);
							setShowDetail(true);
							// message.info(`点击了 ${entity.username}`);
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
			title: '菜单图标',
			dataIndex: ['meta', 'icon'],
			width: 80,
			filters: true,
			onFilter: true,
			render: (text, record: any) => <Icon name={record?.meta?.icon} />,
		},
		{
			title: '菜单类型',
			dataIndex: ['meta', 'type'],
			width: 80,
			filters: true,
			onFilter: true,
		},

		{
			title: '排序',
			width: 80,
			dataIndex: ['meta', 'sort'],
			filters: true,
			onFilter: true,
		},
		{
			title: '菜单标识',
			dataIndex: ['meta', 'key'],
			ellipsis: true,
			width: 100,
			filters: true,
			onFilter: true,
		},
		{
			title: '路由路径',
			dataIndex: 'path',
			ellipsis: true,
			width: 180,
			filters: true,
			onFilter: true,
		},
		{
			title: '组件路径',
			dataIndex: 'element',
			ellipsis: true,
			width: 180,
			filters: true,
			onFilter: true,
		},
		{
			title: '重定向路径',
			dataIndex: 'redirect',
			ellipsis: true,
			width: 180,
			filters: true,
			onFilter: true,
		},
		{
			title: '外链url',
			dataIndex: ['meta', 'isLink'],
			width: 180,
			filters: true,
			onFilter: true,
			render: (_, record: any) => record.meta.isLink || '-',
		},
		{
			title: '隐藏菜单项',
			dataIndex: ['meta', 'isHide'],
			ellipsis: true,
			width: 90,
			filters: true,
			onFilter: true,
			render: (_, record: any) => (record.meta.isHide ? '是' : '否'),
		},
		{
			title: '全屏显示',
			dataIndex: ['meta', 'isFull'],
			width: 80,
			filters: true,
			onFilter: true,
			render: (_, record: any) => (record.meta.isFull ? '是' : '否'),
		},
		{
			title: '固定标签页',
			dataIndex: ['meta', 'isAffix'],
			ellipsis: true,
			width: 90,
			filters: true,
			onFilter: true,
			render: (_, record: any) => (record.meta.isAffix ? '是' : '否'),
		},

		{
			title: '操作',
			key: 'option',
			fixed: 'right',
			width: 50,
			hideInSearch: true,
			render: (data, entity) => action(entity, Params),
		},
	];
};

// 操作按钮：查看、新增、删除
const action = (entity: UserList, Params: TableColumnsParams) => {
	// 查看
	const OnView = () => {
		Params.setCurrentRow(entity);
		Params.setShowDetail(true);
	};
	// 编辑
	const OnEdit = () => {
		Params.handleOperator('edit', entity);
	};
	// 删除
	const OnDelete = () => {
		Params.handleOperator('delete', entity);
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
