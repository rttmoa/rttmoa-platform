import { ProColumns } from '@ant-design/pro-components';
import { UserList } from '@/api/interface';
import { Tag } from 'antd';
import Link from 'antd/lib/typography/Link';
import { TableRenderAction } from '@/components/TableAction';

const TableColumnsConfig = (handleOperator: any, handleModalSubmit: any): ProColumns<UserList>[] => {
	return [
		{
			title: '角色名称',
			dataIndex: 'role_name',
			// copyable: true,
			// width: 150,
			fixed: 'left',
			tooltip: '角色名称：role_name',
			// initialValue: 'zhangsan',
			onFilter: false,
			// hideInSearch: true,
			// hideInTable: true,
			// hideInForm: true,
			// hideInDescriptions: true,

			// render: (dom, entity: any) => {
			// 	return <Link onClick={() => handleOperator('detail', entity)}>{entity?.role_name}</Link>;
			// },
			sorter: true,
			editable: () => true,
			render: (dom, entity: any) => {
				const status = entity?.status;
				const nama = entity?.role_name;
				return (
					<a
						href='javascript:void(0)'
						onClick={() => {
							handleOperator('detail', entity);
						}}
					>
						{status == '停用' ? <span className='text-gray-400'>{nama}</span> : nama}
					</a>
				);
			},
		},
		{
			title: '权限字符',
			dataIndex: 'permission_str',
			tooltip: '权限字符： permission_str',
			filters: true,
			onFilter: true,
		},
		{
			title: '菜单分配',
			dataIndex: 'distribution',
			tooltip: '新建或编辑时体现菜单分配',
			filters: true,
			onFilter: true,
		},
		{
			title: '角色级别',
			dataIndex: 'level',
			tooltip: '角色级别： level',
			// width: 150,
			filters: true,
			onFilter: true,
		},
		{
			title: '角色排序',
			dataIndex: 'sort',
			tooltip: '角色名称： sort',
			// width: 150,
			filters: true,
			onFilter: true,
		},
		{
			title: '角色状态',
			dataIndex: 'status',
			tooltip: '角色状态： status',
			// width: 150,
			sorter: true,
			render: (dom, entity) => {
				if (dom == '启用') return <Tag color='blue'>启用</Tag>;
				if (dom == '停用') return <Tag color='red'>停用</Tag>;
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
			hideInSearch: true,
			width: 135,
			render: (_, record) => TableRenderAction(record, handleOperator, handleModalSubmit),
		},
	];
};
export default TableColumnsConfig;
