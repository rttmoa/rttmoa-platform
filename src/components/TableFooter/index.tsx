import { DeleteOutlined } from '@ant-design/icons';
import { FooterToolbar } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';

type FooterComponentProps = {
	selectedRows: any;
	modalResult: (type: any, data: any) => void;
};

const FooterComponent: React.FC<FooterComponentProps> = props => {
	const { selectedRows, modalResult } = props;
	return (
		<FooterToolbar
			className='px-[50px]'
			extra={
				<div className='font-mono'>
					已选择 <a style={{ fontWeight: 600 }}>{selectedRows.length}</a> 项 &nbsp;&nbsp;&nbsp;&nbsp;
				</div>
			}
		>
			<Popconfirm
				title='删除多个任务！'
				description={`是否要删除这 ${selectedRows.length} 个任务`}
				onConfirm={() => {
					// 	await handle.handleRemove(selectedRows);
					// 	setSelectedRows([]);
					// 	actionRef.current?.reloadAndRest?.();
					modalResult('moreDelete', null);
				}}
				okText='确认'
				cancelText='取消'
			>
				<Button key='deleteAll' size='middle' icon={<DeleteOutlined />} danger>
					批量删除
				</Button>
			</Popconfirm>
			{/* <Button type='primary'>批量批准</Button> */}
		</FooterToolbar>
	);
};
export default FooterComponent;
