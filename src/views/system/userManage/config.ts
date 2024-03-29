// 输入框查询 Form
export const formList: any[] = [
	{
		type: "INPUT",
		label: "用户名",
		field: "user_name", // FIXME: 必传 唯一索引
		placeholder: "请输入用户名",
		initialValue: "",
		width: 200
	},
	{
		type: "INPUT",
		label: "联系地址",
		field: "address",
		placeholder: "请输入联系地址",
		initialValue: "",
		width: 200
	},
	// {
	// 	type: "TIME",
	//   label: "联系地址",
	//   field: "timeshe",
	//   placeholder: "请输入联系地址",
	//   initialValue: "",
	//   width: 80
	// },
	{
		type: "SELECT",
		label: "婚姻状态",
		field: "isMarried",
		placeholder: "全部",
		initialValue: "0",
		width: 200,
		list: [
			{ id: "0", name: "全部" },
			{ id: "1", name: "未婚" },
			{ id: "2", name: "已婚" }
		]
	},
	{
		type: "SELECT",
		label: "性别",
		field: "sex",
		placeholder: "全部",
		initialValue: 3,
		width: 200,
		list: [
			{ id: 3, name: "全部" },
			{ id: 0, name: "女" },
			{ id: 1, name: "男" }
		]
	}
];

// 输入框查询 Form 展开
export const extendFormList = [
	{
		type: "TIME",
		width: 200
	},
	{
		type: "INPUT",
		placeholder: "请输入电影名",
		width: 200,
		label: "电影",
		field: "movies"
	},
	{
		type: "SELECT",
		placeholder: "请选择电影",
		width: 200,
		label: "选择种类",
		field: "kinds1",
		name: "key",
		list: [
			{
				id: 1,
				key: "泰坦尼克号"
			},
			{
				id: 2,
				key: "阿凡达"
			},
			{
				id: 3,
				key: "蜘蛛侠"
			}
		]
	}
];

// 选择框查询 SelectFilter 配置
export const SelectFilterData = [
	{
		title: "物流状态(单)",
		key: "state",
		options: [
			{
				label: "全部",
				value: ""
			},
			{
				label: "已下单",
				value: "1",
				icon: "ShoppingCartOutlined"
			},
			{
				label: "已发货",
				value: "2",
				icon: "CarOutlined"
			},
			{
				label: "已签收",
				value: "3",
				icon: "FormOutlined"
			},
			{
				label: "已退回",
				value: "4",
				icon: "CloseCircleOutlined"
			},
			{
				label: "已完成",
				value: "5",
				icon: "CheckSquareOutlined"
			}
		]
	},
	{
		title: "商品类型(多)",
		key: "type",
		multiple: true,
		options: [
			{
				label: "全部",
				value: ""
			},
			{
				label: "食品类",
				value: "1"
			},
			{
				label: "服装类",
				value: "2"
			},
			{
				label: "家具类",
				value: "3"
			},
			{
				label: "日用品类",
				value: "4"
			}
		]
	}
];
