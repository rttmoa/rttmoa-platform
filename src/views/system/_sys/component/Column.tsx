import { ProColumns } from '@ant-design/pro-components';
import { Steps, Tag } from 'antd';
import dayjs from 'dayjs';
import { TableRenderAction } from '@/components/TableAction';
import Link from 'antd/lib/typography/Link';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';

export const ColumnsConfig = (modalOperate: any, modalResult: any): ProColumns<any>[] => {
	// * 这里 dataIndex 唯一索引不可以重复
	// * 列字段类型：文本、数值、日期、日期时间、选择框、复选框
	// option、select
	return [
		{
			dataIndex: 'index',
			valueType: 'indexBorder',
			width: 40,
			fixed: 'left',
			align: 'center',
		},
		{
			title: '岗位名称',
			dataIndex: 'postName',
			valueType: 'text',
			ellipsis: true, // 省略
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
			render: (dom, entity: any) => {
				return <Link onClick={e => modalOperate('detail', entity)}>{entity?.postName}</Link>;
			},
		},
		{
			title: '岗位排序',
			dataIndex: 'postSort',
			valueType: 'digit', // * digit 输入为数字类型  |  color
			align: 'center',
			width: 120,
			// filters: true, // 表格内过滤
			// onFilter: true,
			sorter: true,
			ellipsis: true, // 省略提示
			tooltip: '岗位排序：postSort',
			fieldProps: { placeholder: '请输入岗位排序' },
		},
		{
			title: '岗位状态',
			dataIndex: 'flag',
			valueType: 'select',
			align: 'center',
			ellipsis: true, // 省略
			sorter: true,
			// 筛选栏中是筛选
			valueEnum: {
				all: { text: '全部', status: 'Default' },
				true: { text: '启用', status: 'Default' },
				false: { text: '停用', status: 'Default' },
			},
			// 表格内筛选
			filters: [
				{ text: '启用', value: '启用' },
				{ text: '停用', value: '停用' },
			],
			tooltip: '岗位状态：flag',
			fieldProps: { placeholder: '请输入岗位状态' },
			render: (_, record) => {
				let tagContent: any = '';
				if (_) tagContent = <Tag color='blue'>启用</Tag>;
				else tagContent = <Tag color='red'>停用</Tag>;
				return <span>{tagContent}</span>;
			},
		},
		{
			title: '运行状态',
			dataIndex: 'status',
			valueType: 'select',
			ellipsis: true, // 省略
			align: 'center',
			tooltip: '运行状态：status',
			fieldProps: { placeholder: '请输入岗位状态' },
			valueEnum: {
				all: { text: '全部', status: 'Default' },
				close: { text: '关闭', status: 'Default' },
				1: { text: '运行中', status: 'Processing' },
				启用: { text: '已上线', status: 'Success' },
				停用: { text: '异常', status: 'Error' },
			},
			responsive: ['lg'],
		},
		{
			title: '运行状态',
			dataIndex: 'process',
			ellipsis: true, // 省略
			align: 'center',
			render: (_, record) => (
				<Steps
					size='small'
					// className='mb30'
					items={[
						{ title: '任务已创建', status: 'finish', icon: <UserOutlined /> },
						{ title: '未执行', status: 'finish', icon: <SolutionOutlined /> },
						{ title: '正在执行', status: 'process', icon: <LoadingOutlined /> },
						{ title: '已完成', status: 'wait', icon: <SmileOutlined /> },
					]}
				/>
			),
			responsive: ['lg'],
		},
		{
			title: '创建日期',
			dataIndex: 'createTime',
			valueType: 'dateRange', // date | dateWeek | dateMonth | dateTime | dateRange | dateTimeRange
			align: 'center',
			tooltip: '创建日期：createTime',
			fieldProps: { placeholder: '选择日期' },
			ellipsis: true, // 省略
			render: (_, record) => <span>{dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>,
			responsive: ['lg'],
		},
		{
			key: 'option',
			title: '操作',
			align: 'center',
			fixed: 'right',
			width: 135,
			tooltip: '操作按钮分别是：详情、编辑、删除',
			hideInSearch: true,
			// render: renderAction,
			render: (_, record) => TableRenderAction(record, modalOperate, modalResult),
		},
	];
};
export default ColumnsConfig;
