import { Badge, Button, Space, Tag, Tooltip } from 'antd'

interface stateConfig {
	[propName: number]: React.ReactNode
}
interface InterestConfig {
	[propName: number]: string
}
export const columnConfig: any = (apiData: any, roleObj: any, handleOperator: any) => {
	return [
		{
			title: 'id',
			dataIndex: 'id',
			width: 80,
			fixed: 'left',
		},
		{
			title: '用户名',
			dataIndex: 'username',
			width: 80,
			fixed: 'left',
		},
		{
			title: '性别',
			dataIndex: 'sex',
			render: (sex: number) => (sex === 1 ? '男' : '女'),
			// width: "6%",
		},
		{
			title: '状态',
			dataIndex: 'state',
			render: (state: number) => {
				let config: stateConfig = {
					1: <Tag color="green">痛苦</Tag>,
					2: <Tag color="blue">委屈</Tag>,
					3: <Tag color="orange">迷茫</Tag>,
					4: <Tag color="red">平淡</Tag>,
					5: <Tag color="purple">开心</Tag>,
				}
				return config[state]
			},
			// width: "6%",
		},
		{
			title: '爱好',
			dataIndex: 'interest',
			render: (interest: number) => {
				let config: InterestConfig = {
					1: '游泳',
					2: '打篮球',
					3: '踢足球',
					4: '跑步',
					5: '爬山',
					6: '骑行',
					7: '桌球',
					8: '麦霸',
				}
				return config[interest]
			},
			// width: "6%",
		},
		{
			title: '婚姻状态',
			dataIndex: 'isMarried',
			render(isMarried: number) {
				return isMarried ? <Badge status="success" text="已婚" /> : <Badge status="error" text="未婚" />
			},
			// width: 80
		},
		{
			title: '所属角色',
			dataIndex: 'role_id',
			render: (roleiD: number) => roleObj[roleiD],
			// width: 80
		},
		{
			title: '手机号',
			ellipsis: { showTitle: false },
			render: () => {
				// console.log('element', element)
				let tele = 15303663375
				let strTele = tele + '' // 数字类型转字符串
				let phone = strTele.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
				return (
					<Tooltip placement="topLeft" title={'fake'}>
						{phone}
					</Tooltip>
				)
			},
		},
		{
			title: '身份证号',
			// width: 150,
			ellipsis: { showTitle: false },
			render: () => {
				// console.log('element', element)
				let identity = 231085199811011415n
				let strIdentity = identity + '' // 数字类型转字符串
				let res = strIdentity.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
				return (
					<Tooltip placement="topLeft" title={'fake'}>
						{res}
					</Tooltip>
				)
			},
		},
		{
			title: '联系地址',
			dataIndex: 'address',
			// width: 250
			ellipsis: { showTitle: false },
			render: (address: any) => (
				<Tooltip placement="topLeft" title={address}>
					{address}
				</Tooltip>
			),
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			// width: 250,
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement="topLeft" title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			// width: 250,
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement="topLeft" title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			// width: 250,
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement="topLeft" title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			// width: 250,
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement="topLeft" title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			// width: 250,
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement="topLeft" title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '生日',
			dataIndex: 'birthday',
			// width: "6%",
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement="topLeft" title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '早起时间',
			dataIndex: 'time',
			// width: "6%",
			ellipsis: { showTitle: false },
			render: (element: any) => (
				<Tooltip placement="topLeft" title={element}>
					{element}
				</Tooltip>
			),
		},
		{
			title: '操作',
			fixed: 'right',
			width: 200,
			render(record: any) {
				return (
					<Space>
						<Button
							size="small"
							onClick={() => {
								handleOperator('detail', record)
							}}>
							详情
						</Button>
						<Button
							size="small"
							onClick={() => {
								handleOperator('edit', record)
							}}>
							编辑
						</Button>
						<Button
							size="small"
							onClick={() => {
								handleOperator('delete', record)
							}}>
							删除
						</Button>
					</Space>
				)
			},
		},
	]
}
