import SearchForm from '@/components/SearchForm'
import { Card } from 'antd'
import React from 'react'

export default function TestForm() {
	let props = {
		searchCol: {
			xs: 1,
			sm: 2,
			md: 2,
			lg: 3,
			xl: 4,
		},
		columns: [
			{
				prop: 'username',
				label: '用户姓名',
				search: {
					el: 'input',
					order: 2,
				},
				isShow: true,
				isFilterEnum: true,
			},
			{
				prop: 'gender',
				label: '性别',
				search: {
					el: 'select',
					props: {
						filterable: true,
					},
					order: 3,
				},
				fieldNames: {
					label: 'genderLabel',
					value: 'genderValue',
				},
				isShow: true,
				isFilterEnum: true,
			},
			{
				prop: 'user.detail.age',
				label: '年龄',
				search: {
					order: 4,
				},
				isShow: true,
				isFilterEnum: true,
			},
			{
				prop: 'idCard',
				label: '身份证号',
				search: {
					el: 'input',
					order: 5,
				},
				isShow: true,
				isFilterEnum: true,
			},
			{
				prop: 'status',
				label: '用户状态',
				search: {
					el: 'tree-select',
					props: {
						filterable: true,
					},
					order: 6,
				},
				fieldNames: {
					label: 'userLabel',
					value: 'userStatus',
				},
				isShow: true,
				isFilterEnum: true,
			},
			{
				prop: 'createTime',
				label: '创建时间',
				width: 180,
				search: {
					el: 'date-picker',
					span: 2,
					props: {
						type: 'datetimerange',
						valueFormat: 'YYYY-MM-DD HH:mm:ss',
					},
					defaultValue: ['2022-11-12 11:35:00', '2022-12-12 11:35:00'],
					order: 7,
				},
				isShow: true,
				isFilterEnum: true,
			},
		],
		searchParam: {
			createTime: ['2022-11-12 11:35:00', '2022-12-12 11:35:00'],
		},
		search: () => {},
		reset: () => {},
	}
	let props2 = [] as any
	return (
		<Card className="mb-9">
			<SearchForm {...props} />
		</Card>
	)
}
