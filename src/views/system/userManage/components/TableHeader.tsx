import { message } from '@/hooks/useMessage'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space, Upload } from 'antd'

const TableHeader = (TableHeaderConfig: any) => {
	let { selectRowItem, header, userList, handleOperator, handleExportAll } = TableHeaderConfig
	return (
		<>
			<Space size="large">
				<Button
					size="middle"
					onClick={() => {
						handleOperator('create', null)
					}}>
					新建
				</Button>
				<Popconfirm
					title="批量删除"
					description="你确定要删除吗？"
					okText="确定"
					cancelText="取消"
					onConfirm={() => {
						handleOperator('moreDelete', null)
					}}>
					<Button size="middle" disabled={selectRowItem.selectedRowKeys.length <= 1} icon={<DeleteOutlined />}>
						批量删除
					</Button>
				</Popconfirm>
				<Button
					size="middle"
					onClick={() => {
						handleExportAll(header, userList, '用户列表')
					}}>
					导出Excel
				</Button>
				<Upload
					beforeUpload={file => {
						const isExcel = /\.(xlsx|xls)$/.test(file.name.toLowerCase())
						if (!isExcel) {
							message.error('请上传Excel文件（.xlsx 或 .xls）')
							return false
						}
						return false
					}}>
					<Button>上传Excel</Button>
				</Upload>
			</Space>
		</>
	)
}
export default TableHeader
