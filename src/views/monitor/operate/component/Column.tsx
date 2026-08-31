import { ProColumns, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Popconfirm, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { IconFont } from '@/components/Icon';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export const TableColumnsConfig = (modalOperate: any, modalResult: any): ProColumns<any>[] => {
	const detail = (entity: any) => {
		modalOperate('detail', entity);
	};

	return [
		{
			dataIndex: 'index',
			valueType: 'indexBorder',
			width: 40,
			fixed: 'left',
			align: 'center',
		},
		{
			title: '用户名',
			dataIndex: 'name',
			copyable: true, // 表格数据可复制？
			width: 150,
			fixed: 'left',
			align: 'center',
			tooltip: '用户名',
			onFilter: false, // 筛选
			fieldProps: {
				placeholder: '请输入用户名',
			},
			// hideInSearch: true, // 在 Search 筛选栏中不展示
			// hideInTable: true, // 在 Table 中不展示此列
			// hideInForm: true, // 在 Form 中不展示此列
			// hideInSetting: true, // 在 Setting 中不展示
			// hideInDescriptions: true, // 在 Drawer 查看详情中不展示
			ellipsis: true, // 省略
			// tooltip: 'The title will shrink automatically if it is too long', // 省略提示
			sorter: true, // 排序
			// readonly: true,
			render: (dom, entity) => {
				return (
					<Link to={''} onClick={() => detail(entity)}>
						{dom}
					</Link>
				);
			},
			// 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
			// filterDropdown: () => (
			// 	<div style={{ padding: 4 }}>
			// 		<Input style={{ width: 150, marginBlockEnd: 8, display: 'block', fontSize: '14px' }} placeholder='请输入岗位名称' onChange={onChange} />
			// 	</div>
			// ),
			// filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		},
		{
			title: 'IP',
			dataIndex: 'ip',
			align: 'center',
			width: 120,
			filters: true,
			onFilter: true,
			sorter: true,
			fieldProps: {
				placeholder: '请输入ip',
			},
		},
		{
			title: 'IP来源',
			dataIndex: 'ip_source',
			align: 'center',
			width: 120,
			filters: true,
			onFilter: true,
			sorter: true,
			fieldProps: {
				placeholder: '请输入ip',
			},
		},
		{
			title: '描述',
			dataIndex: 'req_url',
			align: 'center',
			width: 120,
			filters: true,
			onFilter: true,
			sorter: true,
			fieldProps: {
				placeholder: '请输入ip',
			},
		},
		{
			title: '浏览器',
			dataIndex: 'browser',
			align: 'center',
			width: 150,
			filters: true,
			onFilter: true,
			sorter: true,
			fieldProps: {
				placeholder: '请输入ip',
			},
		},
		{
			title: '请求方法',
			dataIndex: 'req_method',
			align: 'center',
			width: 120,
			filters: true,
			onFilter: true,
			sorter: true,
			fieldProps: {
				placeholder: '请输入ip',
			},
			render: (dom: any, entity) => {
				// console.log('dom', dom);
				let color: any = {
					GET: 'orange',
					POST: 'cyan',
					DELETE: 'red',
					PUT: 'magenta',
				};
				return <Tag color={color[dom]}>{dom}</Tag>;
			},
		},
		{
			title: '状态码',
			dataIndex: 'req_status',
			align: 'center',
			width: 120,
			filters: true,
			onFilter: true,
			sorter: true,
			fieldProps: {
				placeholder: '请输入ip',
			},
		},
		{
			title: '请求耗时',
			dataIndex: 'req_time',
			align: 'center',
			width: 120,
			filters: true,
			onFilter: true,
			sorter: true,
			fieldProps: {
				placeholder: '请输入ip',
			},
		},
		{
			title: '创建日期',
			dataIndex: 'created',
			valueType: 'dateRange',
			align: 'center',
			width: 160,
			fieldProps: {
				placeholder: '选择日期',
			},
			render: (_, record) => {
				return <span>{dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>;
			},
		},
		{
			title: '操作',
			key: 'option',
			align: 'center',
			fixed: 'right',
			width: 50,
			hideInSearch: true,
			render: (data, entity) => action(entity, modalOperate, modalResult),
		},
	];
};
const action2: any = () => {
	return [
		<TableDropdown
			key='actionGroup'
			onSelect={() => {}}
			menus={[
				{ key: 'copy', name: '查看' },
				{ key: 'copy', name: '编辑' },
				{ key: 'delete', name: '删除' },
			]}
			children={
				<div className='more-button-item'>
					<IconFont style={{ fontSize: 22 }} type='icon-xiala' />
				</div>
			}
		/>,
	];
};
const action = (entity: any, modalOperate: any, modalResult: any) => {
	const OnView = () => {
		modalOperate('detail', entity);
	};
	const OnEdit = () => {
		modalOperate('edit', entity);
	};
	const OnDelete = () => {
		modalResult('delete', entity);
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
				<Popconfirm title='删除任务！' description={`你确定要删除： ${entity.postName}`} onConfirm={OnDelete} okText='确认' cancelText='取消' placement='top' trigger='hover'>
					<Button key='delete' type='link' size='small' danger icon={<DeleteOutlined />}>
						删除
					</Button>
				</Popconfirm>
			),
		},
	];
	return [
		<div className='more-button' key={1}>
			<Dropdown
				menu={{
					items: menuList,
				}}
				placement='bottom' // bottom
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
