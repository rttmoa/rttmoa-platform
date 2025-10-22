import { ProColumns } from '@ant-design/pro-components';
import { UserList } from '@/api/interface';
import { Icon } from '@/components/Icon';
import { TableRenderAction } from '@/components/TableAction';
import { Tag } from 'antd';

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
			// filterDropdown: () => (
			// 	<div style={{ padding: 2 }}>
			// 		<Input style={{ width: 150, marginBlockEnd: 8, display: 'block', fontSize: '14px' }} placeholder='请输入' />
			// 	</div>
			// ),
			// filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
			// fieldProps: (form, config) => {}, // 查询表单的 props，会透传给表单项，
		},
		{
			title: '排序',
			width: 80,
			dataIndex: ['meta', 'sort'],
			align: 'center',
			filters: true,
			onFilter: true,
		},
		{
			title: '菜单图标',
			dataIndex: ['meta', 'icon'],
			width: 80,
			align: 'center',
			filters: true,
			onFilter: true,
			render: (text, record: any) => <Icon name={record?.meta?.icon} />,
		},
		{
			title: '菜单类型',
			dataIndex: ['meta', 'type'],
			width: 80,
			align: 'center',
			filters: true,
			onFilter: true,
		},
		{
			title: '菜单标识',
			dataIndex: ['meta', 'key'],
			ellipsis: true,
			width: 100,
			align: 'center',
			filters: true,
			onFilter: true,
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
			title: '操作',
			key: 'option',
			align: 'center',
			fixed: 'right',
			hideInSearch: true,
			// render: (data, entity) => action(entity, handleOperator),
			width: 135,
			render: (_, record) => TableRenderAction(record, handleOperator, handleModalSubmit),
		},
	];
};
export default TableColumnsConfig;
