import { InfoCircleOutlined } from '@ant-design/icons';
import { Input } from 'antd';

export let newFormList = [
	{
		type: 'INPUT',
		// Form.Item属性
		label: '用户名',
		uname: 'username',
		rules: null,
		wrapperCol: { offset: 6, span: 16 },
		require: true,
		tooltip: { title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> },
		// Input属性
		field: 'user_name',
		placeholder: '请输入用户名',
		initialValue: '',
		// width: 120,
	},

	{
		type: 'INPUT',
		label: 'component',
		uname: 'age',
		field: 'age',
		placeholder: '请输入年纪',
		initialValue: '',
		component: <Input.TextArea rows={1} placeholder='请输入描述信息' />,
	},
	{
		type: 'INPUT',
		label: '年纪',
		uname: 'age',
		field: 'age',
		placeholder: '请输入年纪',
		initialValue: '',
		// width: 120,
	},
	{
		type: 'INPUT',
		label: '爱好',
		uname: 'hobby',
		field: 'hobby',
		placeholder: '请输入爱好',
		initialValue: '',
	},
	{
		type: 'INPUT',
		label: '托盘号',
		uname: 'pallet',
		field: 'pallet',
		placeholder: '请输入托盘号',
		initialValue: '',
		// width: 120,
	},
	{
		type: 'TIME_START',
		label: '开始时间',
		uname: 'pallet',
		field: 'pallet',
		placeholder: '请输入托盘号',
		initialValue: '',
	},
	{
		type: 'TIME_END',
		label: '结束时间',
		uname: 'pallet',
		field: 'pallet',
		placeholder: '请输入托盘号',
		initialValue: '',
	},
	{
		type: 'INPUT',
		label: '其他',
		uname: 'hobby',
		field: 'hobby',
		placeholder: '测试高度',
		initialValue: '',
	},
];

//* 表单查询 Form
export const formList: any[] = [
	{
		type: 'INPUT',
		label: '用户名',
		field: 'user_name', // FIXME: 必传 唯一索引
		placeholder: '请输入用户名',
		initialValue: '',
		width: 120,
	},
	{
		type: 'SELECT',
		label: '性别',
		field: 'sex',
		placeholder: '全部',
		initialValue: 3,
		width: 120,
		list: [
			{ id: 3, name: '全部' },
			{ id: 0, name: '女' },
			{ id: 1, name: '男' },
		],
	},
	{
		type: 'INPUT',
		label: '手机号',
		field: 'phone',
		placeholder: '请输入手机号',
		initialValue: '',
		width: 120,
	},
];

// 输入框查询 Form 展开
export const extendFormList = [
	{
		type: 'INPUT',
		label: '联系地址',
		field: 'address',
		placeholder: '请输入联系地址',
		initialValue: '',
		width: 120,
	},
	{
		type: 'SELECT',
		label: '婚姻状态',
		field: 'isMarried',
		placeholder: '全部',
		initialValue: '0',
		width: 120,
		list: [
			{ id: '0', name: '全部' },
			{ id: '1', name: '未婚' },
			{ id: '2', name: '已婚' },
		],
	},
	{
		type: 'TIME', // TIME类型：包含开始时间和结束时间
		width: 120,
	},
	{
		type: 'INPUT',
		placeholder: '请输入电影名',
		width: 120,
		label: '电影',
		field: 'movies',
	},
	{
		type: 'SELECT',
		placeholder: '请选择电影',
		width: 120,
		label: '选择种类',
		field: 'kinds1',
		name: 'key',
		list: [
			{
				id: 1,
				key: '泰坦尼克号',
			},
			{
				id: 2,
				key: '阿凡达',
			},
			{
				id: 3,
				key: '蜘蛛侠',
			},
		],
	},
];

// 选择框查询 SelectFilter 配置
export const SelectFilterData = [
	{
		title: '物流状态(单)',
		key: 'state',
		options: [
			{
				label: '全部',
				value: '',
			},
			{
				label: '已下单',
				value: '1',
				icon: 'ShoppingCartOutlined',
			},
			{
				label: '已发货',
				value: '2',
				icon: 'CarOutlined',
			},
			{
				label: '已签收',
				value: '3',
				icon: 'FormOutlined',
			},
			{
				label: '已退回',
				value: '4',
				icon: 'CloseCircleOutlined',
			},
			{
				label: '已完成',
				value: '5',
				icon: 'CheckSquareOutlined',
			},
		],
	},
	{
		title: '商品类型(多)',
		key: 'type',
		multiple: true,
		options: [
			{
				label: '全部',
				value: '',
			},
			{
				label: '食品类',
				value: '1',
			},
			{
				label: '服装类',
				value: '2',
			},
			{
				label: '家具类',
				value: '3',
			},
			{
				label: '日用品类',
				value: '4',
			},
		],
	},
];
