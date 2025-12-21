import { ProColumns } from '@ant-design/pro-components';
import { Avatar, Progress, Tag } from 'antd';
import dayjs from 'dayjs';
import { TableRowEdit, TableRenderAction } from '@/components/TableAction';
import Link from 'antd/lib/typography/Link';
import { UserOutlined } from '@ant-design/icons';
import index from '@/views/rule/check';

export const ColumnsConfig = (modalOperate: any, modalResult: any): ProColumns<any>[] => {
	// * 这里 dataIndex 唯一索引不可以重复
	// * 列字段类型：文本、数值、日期、日期时间、选择框、复选框
	// option、select
	return [
		{
			dataIndex: 'index',
			valueType: 'index',
			width: 40,
			fixed: 'left',
			align: 'center',
			render: (text, entity, index) => <Link onClick={() => modalOperate('detail', entity)}>{index + 1}</Link>,
			responsive: ['sm'],
		},
		{
			title: '岗位名称',
			dataIndex: 'postName',
			valueType: 'text',
			ellipsis: true,
			editable: () => true,
			// copyable: true,
			width: 150,
			fixed: 'left',
			align: 'center',
			tooltip: '岗位名称：postName',
			onFilter: false, // 筛选
			fieldProps: { placeholder: '请输入岗位名称' },
			// hideInSearch: true, // 在 Search 筛选栏中不展示
			// hideInTable: true, // 在 Table 中不展示此列
			// hideInForm: true, // 在 Form 中不展示此列
			// hideInSetting: true, // 在 Setting 中不展示
			// hideInDescriptions: true, // 在 Drawer 查看详情中不展示
			// tooltip: 'The title', // 省略提示
			sorter: true, // 排序
			// readonly: true,
			// render: (dom, entity: any) => {
			// 	return <Link onClick={e => modalOperate('detail', entity)}>{entity?.postName}</Link>;
			// },
			responsive: ['sm'],
		},
		{
			title: '岗位排序',
			dataIndex: 'postSort',
			valueType: 'digit', // * digit 输入为数字类型  |  color
			editable: () => true,
			align: 'center',
			width: 120,
			sorter: true,
			ellipsis: true,
			tooltip: '岗位排序：postSort',
			fieldProps: { placeholder: '请输入岗位排序' },
			responsive: ['sm'],
		},
		{
			title: '运行状态',
			dataIndex: 'status',
			valueType: 'select',
			align: 'center',
			ellipsis: true, // 省略
			sorter: true,
			tooltip: '运行状态：status',
			fieldProps: { placeholder: '请输入运行状态' },
			valueEnum: {
				全部: { text: '全部', status: 'Default' },
				关闭: { text: '关闭', status: 'Default' },
				运行中: { text: '运行中', status: 'Processing' },
				启用: { text: '启用', status: 'Success' },
				异常: { text: '异常', status: 'Error' },
			},
			// 表格内筛选
			filters: [
				{ text: '全部', value: '全部' },
				{ text: '关闭', value: '关闭' },
				{ text: '运行中', value: '运行中' },
				{ text: '启用', value: '启用' },
				{ text: '异常', value: '异常' },
			],
			// render: (_, record) => {
			// 	let tagContent: any = '';
			// 	if (_) tagContent = <Tag color='blue'>启用</Tag>;
			// 	else tagContent = <Tag color='red'>停用</Tag>;
			// 	return <span>{tagContent}</span>;
			// },
			responsive: ['md'],
		},
		{
			title: '进度条',
			dataIndex: 'progress',
			valueType: 'progress',
			editable: () => false,
			hideInSearch: true,
			responsive: ['lg'],
			render: (_, record) => {
				return <Progress percent={78} size='small' status='active' />;
			},
		},
		{
			title: '头像',
			dataIndex: 'Avatar',
			editable: () => false,
			hideInSearch: true,
			align: 'center',
			responsive: ['lg'],
			render: (_, record) => {
				return <Avatar size={24} icon={<UserOutlined />} />;
			},
		},
		{
			title: '创建日期',
			dataIndex: 'createTime',
			// date | dateWeek | dateMonth | dateTime | dateRange | dateTimeRange
			// valueType: 'dateRange',
			valueType: 'dateTimeRange',
			editable: () => false,
			align: 'center',
			ellipsis: true,
			tooltip: '创建日期：createTime',
			fieldProps: { placeholder: '选择日期' },
			render: (_, record) => <span>{dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>,
			responsive: ['lg'],
		},
		{
			title: '行内编辑',
			valueType: 'option',
			align: 'center',
			width: 150,
			render: (text, record, index, action) => TableRowEdit(record, index, action),
		},
		{
			key: 'option',
			title: '操作',
			align: 'center',
			fixed: 'right',
			width: 135,
			editable: () => false,
			tooltip: '操作按钮分别是：详情、编辑、删除',
			hideInSearch: true,
			// render: renderAction,
			render: (_, record) => TableRenderAction(record, modalOperate, modalResult),
		},
	];
};
export default ColumnsConfig;
