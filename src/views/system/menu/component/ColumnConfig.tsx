import { ProColumns } from '@ant-design/pro-components';
import { UserList } from '@/api/interface';
import { Button, Dropdown, Input, Switch } from 'antd';
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
	// Params.setCurrentRow()

	return [
		{
			title: '菜单标题',
			dataIndex: 'title',
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
			dataIndex: 'icon',
			filters: true,
			onFilter: true,
			render: (text, record: any) => <Icon name={record?.icon} />,
		},
		{
			title: '菜单类型',
			dataIndex: 'type',
			filters: true,
			onFilter: true,
		},
		{
			title: '菜单标识',
			dataIndex: 'key',
			filters: true,
			onFilter: true,
		},
		{
			title: '路由路径',
			dataIndex: 'path',
			filters: true,
			onFilter: true,
		},
		{
			title: '组件路径',
			dataIndex: 'element',
			filters: true,
			onFilter: true,
		},
		{
			title: '重定向路径',
			dataIndex: 'redirect',
			filters: true,
			onFilter: true,
		},
		{
			title: '外链url',
			dataIndex: 'isLink',
			filters: true,
			onFilter: true,
			render: (_, record: any) => record.isLink || '',
		},
		{
			title: '隐藏菜单项',
			dataIndex: 'isHide',
			filters: true,
			onFilter: true,
			render: (_, record: any) => (record.is_hide ? '是' : '否'),
		},
		{
			title: '全屏显示',
			dataIndex: 'isFull',
			filters: true,
			onFilter: true,

			render: (_, record: any) => (record.isFull ? '是' : '否'),
		},
		{
			title: '固定标签页',
			dataIndex: 'isAffix',
			filters: true,
			onFilter: true,

			render: (_, record: any) => (record.isAffix ? '是' : '否'),
		},
		{
			title: '排序',
			dataIndex: 'sort',
			filters: true,
			onFilter: true,
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
	const OnView = () => {
		Params.setCurrentRow(entity);
		Params.setShowDetail(true);
	};
	const OnEdit = () => {
		Params.handleOperator('edit', entity);
	};
	const OnDelete = () => {
		Params.handleOperator('delete', entity);
	};
	return [
		<div className='more-button'>
			<Dropdown
				menu={{
					items: [
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
								<Button key='delete' type='link' size='small' danger icon={<DeleteOutlined />} onClick={OnDelete}>
									删除
								</Button>
							),
						},
					],
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
