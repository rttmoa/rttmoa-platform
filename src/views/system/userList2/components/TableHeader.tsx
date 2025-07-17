import { message } from '@/hooks/useMessage';
import { DeleteOutlined, LoginOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Upload } from 'antd';

// * 表格右上方操作栏
const TableHeader = (TableHeaderConfig: any) => {
	let { selectRowItem, header, userList, handleOperator, handleExportAll } = TableHeaderConfig;
	return (
		<Space size='small'>
			<Button
				size='small'
				onClick={() => {
					handleOperator('create', null);
				}}
				icon={<PlusOutlined />}
			>
				新建
			</Button>
			<Popconfirm
				title='批量删除'
				description='你确定要删除吗？'
				okText='确定'
				cancelText='取消'
				onConfirm={() => {
					handleOperator('moreDelete', null);
				}}
			>
				<Button size='small' disabled={selectRowItem.selectedRowKeys.length <= 1} icon={<DeleteOutlined />}>
					批量删除
				</Button>
			</Popconfirm>
			<Upload
				beforeUpload={file => {
					const isExcel = /\.(xlsx|xls)$/.test(file.name.toLowerCase());
					if (!isExcel) {
						message.error('请上传Excel文件（.xlsx 或 .xls）');
						return false;
					}
					return false;
				}}
			>
				<Button size='small' icon={<LoginOutlined />}>
					导入Excel
				</Button>
			</Upload>
			<Button
				size='small'
				onClick={() => {
					handleExportAll(header, userList, '用户列表');
				}}
				icon={<LogoutOutlined />}
			>
				导出Excel
			</Button>
			全屏、设置
		</Space>
	);
};
export default TableHeader;
