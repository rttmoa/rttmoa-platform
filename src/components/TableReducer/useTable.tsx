import { Button, Popconfirm } from 'antd'
import React from 'react'
import ArgTable from '.'

export default function useTable() {
	const getColumn: any = (updateMethod: any) => {
		return [
			{
				title: '项目名称',
				dataIndex: 'project_name',
				key: 'project_name',
			},
			{
				title: '操作',
				key: 'setting',
				width: 200,
				render: (text: any, record: any, index: number) => {
					return (
						<div>
							<Button type="primary" style={{ marginRight: '5px' }}>
								查看
							</Button>
							<Popconfirm
								title="此操作将永久删除该项目, 是否继续?"
								okText="确定"
								cancelText="取消"
								onConfirm={() => {
									updateMethod()
								}}>
								<Button type="primary">删除</Button>
							</Popconfirm>
						</div>
					)
				},
			},
		]
	}
	const getData = () => new Promise((reslove: any) => reslove())
	return (
		<ArgTable
			// params={searchData}
			params={{}}
			owncolumns={(updatefunc: any) => getColumn(updatefunc)}
			// queryAction={API.http_getProjectList}
			queryAction={getData}
			baseProps={{ rowKey: record => record.project_id }}
		/>
	)
}
