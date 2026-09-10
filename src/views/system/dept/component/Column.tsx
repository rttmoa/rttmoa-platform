import { ProColumns } from '@ant-design/pro-components';
import { UserList } from '@/api/interface';
import { Tag } from 'antd';
import { TableRenderAction } from '@/components/TableAction';
import Link from 'antd/lib/typography/Link';

const TableColumnsConfig = (handleOperator: any, handleModalSubmit: any): ProColumns<UserList>[] => {
	return [
		{
			title: '部门名称',
			dataIndex: 'name',
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
			render: (dom, entity: any) => {
				return (
					<Link
						onClick={() => {
							handleOperator('detail', entity);
						}}
					>
						{entity.name}
					</Link>
				);
			},
			// 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
			// filterDropdown: () => (
			// 	<div style={{ padding: 2 }}>
			// 		<Input style={{ width: 150, marginBlockEnd: 8, display: 'block', fontSize: '14px' }} placeholder='请输入' />
			// 	</div>
			// ),
			// filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
			// fieldProps: (form, config) => {}, // 查询表单的 props，会透传给表单项，
		},
		{
			title: '部门排序',
			dataIndex: 'sort',
			width: 80,
			filters: true,
			onFilter: true,
		},

		{
			title: '部门状态',
			width: 80,
			dataIndex: 'status',
			filters: true,
			onFilter: true,
			render: (dom, entity) => {
				if (dom == '启用') return <Tag color='blue'>启用</Tag>;
				if (dom == '停用') return <Tag color='red'>停用</Tag>;
			},
		},
		{
			title: '部门负责人',
			dataIndex: 'leader',
			ellipsis: true,
			width: 100,
			filters: true,
			onFilter: true,
		},
		{
			title: '负责人手机号',
			dataIndex: 'phone',
			ellipsis: true,
			width: 180,
			filters: true,
			onFilter: true,
		},
		{
			title: '负责人邮箱',
			dataIndex: 'email',

			ellipsis: true,
			width: 180,
			filters: true,
			onFilter: true,
		},
		{
			title: '部门描述',
			dataIndex: 'desc',
			ellipsis: true,
			filters: true,
			onFilter: true,
		},
		{
			title: '操作',
			key: 'option',
			align: 'center',
			fixed: 'right',
			search: false,
			width: 135,
			render: (_, record) => TableRenderAction(record, handleOperator, handleModalSubmit),
		},
	];
};
export default TableColumnsConfig;
