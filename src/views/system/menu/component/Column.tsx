import { ProColumns } from '@ant-design/pro-components';
import { UserList } from '@/api/interface';
import { Icon } from '@/components/Icon';
import { TableRenderAction, TableRowEdit } from '@/components/TableAction';
import { Button, Tag } from 'antd';

const TableColumnsConfig = (handleOperator: any, handleModalSubmit: any): ProColumns<UserList>[] => {
	return [
		{
			title: <div className='text-[10px]'>菜单标题</div>,
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
			title: <div className='text-[10px]'>排序</div>,
			width: 80,
			dataIndex: ['meta', 'sort'],
			align: 'center',
			filters: true,
			onFilter: true,
			editable: () => true,
		},
		{
			title: <div className='text-[10px]'>菜单图标</div>,
			dataIndex: ['meta', 'icon'],
			width: 60,
			align: 'center',
			filters: true,
			onFilter: true,
			editable: () => false,
			render: (text, record: any) => <Icon name={record?.meta?.icon} />,
		},
		{
			title: <div className='text-[10px]'>菜单类型</div>,
			dataIndex: ['meta', 'type'],
			width: 80,
			align: 'center',
			filters: true,
			onFilter: true,
			editable: () => true,
		},
		{
			title: <div className='text-[10px]'>上级 Key</div>,
			dataIndex: 'parent_id',
			ellipsis: true,
			width: 100,
			align: 'center',
			filters: true,
			onFilter: true,
			editable: () => true,
			render: (_, record: any) => {
				return <div>{record.parent_id == '0' ? '无' : record.parent_id}</div>;
			},
		},
		{
			title: <div className='text-[10px]'>菜单标识</div>,
			dataIndex: ['meta', 'key'],
			ellipsis: true,
			width: 120,
			align: 'center',
			filters: true,
			onFilter: true,
			editable: () => true,
		},
		{
			title: <div className='text-[10px]'>开启菜单</div>,
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
			title: <div className='text-[10px]'>路由路径</div>,
			dataIndex: 'path',
			ellipsis: true,
			width: 220,
			// align: 'center',
			filters: true,
			onFilter: true,
		},
		{
			title: <div className='text-[10px]'>组件路径</div>,
			dataIndex: 'element',
			ellipsis: true,
			width: 260,
			// align: 'center',
			filters: true,
			onFilter: true,
		},
		{
			title: <div className='text-[10px]'>重定向路径</div>,
			dataIndex: 'redirect',
			ellipsis: true,
			width: 180,
			// align: 'center',
			filters: true,
			onFilter: true,
		},
		{
			title: <div className='text-[10px]'>外链url</div>,
			dataIndex: ['meta', 'isLink'],
			width: 180,
			align: 'center',
			filters: true,
			onFilter: true,
			render: (_, record: any) => record.meta.isLink || '-',
		},
		{
			title: <div className='text-[10px]'>隐藏菜单项</div>,
			dataIndex: ['meta', 'isHide'],
			ellipsis: true,
			width: 90,
			align: 'center',
			filters: true,
			onFilter: true,
			render: (_, record: any) => (record.meta.isHide ? '是' : '否'),
		},
		{
			title: <div className='text-[10px]'>全屏显示</div>,
			dataIndex: ['meta', 'isFull'],
			width: 80,
			align: 'center',
			filters: true,
			onFilter: true,
			render: (_, record: any) => (record.meta.isFull ? '是' : '否'),
		},
		{
			title: <div className='text-[10px]'>固定标签页</div>,
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
			width: 100,
			render: (text, record, index, action) => {
				return (
					<Button
						className='menu-action-button'
						size='small'
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
