import { ProColumns } from '@ant-design/pro-components';
import { UserList } from '@/api/interface';
import { Icon } from '@/components/Icon';
import { TableRenderAction, TableRowEdit } from '@/components/TableAction';
import { Button, Tag } from 'antd';

const TableColumnsConfig = (handleOperator: any, handleModalSubmit: any): ProColumns<UserList>[] => {
	return [
		{
			title: '菜单标题',
			dataIndex: ['meta', 'title'],
			// align: 'center',
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
			editable: () => true,
			render: (dom, entity: any) => {
				const enable = entity?.meta?.enable;
				const title = entity?.meta?.title;
				return (
					<a
						href='javascript:void(0)'
						onClick={() => {
							handleOperator('detail', entity);
						}}
					>
						{enable == '关闭' ? <span className='text-gray-400'>{title}</span> : title}
					</a>
				);
			},
		},
		{
			title: '排序',
			width: 80,
			dataIndex: ['meta', 'sort'],
			align: 'center',
			filters: true,
			onFilter: true,
			editable: () => true,
		},
		{
			title: '菜单图标',
			dataIndex: ['meta', 'icon'],
			width: 80,
			align: 'center',
			filters: true,
			onFilter: true,
			editable: () => false,
			render: (text, record: any) => <Icon name={record?.meta?.icon} />,
		},
		{
			title: '菜单类型',
			dataIndex: ['meta', 'type'],
			width: 80,
			align: 'center',
			filters: true,
			onFilter: true,
			editable: () => true,
		},
		{
			title: '菜单标识',
			dataIndex: ['meta', 'key'],
			ellipsis: true,
			width: 150,
			align: 'center',
			filters: true,
			onFilter: true,
			editable: () => true,
		},
		{
			title: '开启菜单',
			dataIndex: ['meta', 'enable'],
			ellipsis: true,
			width: 100,
			align: 'center',
			filters: true,
			onFilter: true,
			render: (_, record: any) => {
				return <Tag color={record.meta.enable == '开启' ? 'blue' : 'red'}>{record.meta.enable}</Tag>;
			},
		},
		{
			title: '路由路径',
			dataIndex: 'path',
			ellipsis: true,
			width: 220,
			// align: 'center',
			filters: true,
			onFilter: true,
		},
		{
			title: '组件路径',
			dataIndex: 'element',
			ellipsis: true,
			width: 260,
			// align: 'center',
			filters: true,
			onFilter: true,
		},
		{
			title: '重定向路径',
			dataIndex: 'redirect',
			ellipsis: true,
			width: 180,
			// align: 'center',
			filters: true,
			onFilter: true,
		},
		{
			title: '外链url',
			dataIndex: ['meta', 'isLink'],
			width: 180,
			align: 'center',
			filters: true,
			onFilter: true,
			render: (_, record: any) => record.meta.isLink || '-',
		},
		{
			title: '隐藏菜单项',
			dataIndex: ['meta', 'isHide'],
			ellipsis: true,
			width: 90,
			align: 'center',
			filters: true,
			onFilter: true,
			render: (_, record: any) => (record.meta.isHide ? '是' : '否'),
		},
		{
			title: '全屏显示',
			dataIndex: ['meta', 'isFull'],
			width: 80,
			align: 'center',
			filters: true,
			onFilter: true,
			render: (_, record: any) => (record.meta.isFull ? '是' : '否'),
		},
		{
			title: '固定标签页',
			dataIndex: ['meta', 'isAffix'],
			ellipsis: true,
			width: 90,
			align: 'center',
			filters: true,
			onFilter: true,
			render: (_, record: any) => (record.meta.isAffix ? '是' : '否'),
		},

		{
			title: '行内编辑',
			valueType: 'option',
			align: 'center',
			fixed: 'right',
			width: 150,
			render: (text, record, index, action) => TableRowEdit(record, index, action),
		},
		{
			title: '操作',
			valueType: 'option',
			align: 'center',
			fixed: 'right',
			width: 150,
			render: (text, record, index, action) => {
				return (
					<Button
						onClick={() => {
							handleOperator('createSubMenu', record);
						}}
					>
						新建子菜单
					</Button>
				);
			},
		},
		{
			title: '操作',
			key: 'option',
			align: 'center',
			fixed: 'right',
			hideInSearch: true,
			editable: () => false,
			// render: (data, entity) => action(entity, handleOperator),
			width: 135,
			render: (_, record) => TableRenderAction(record, handleOperator, handleModalSubmit),
		},
	];
};
export default TableColumnsConfig;
