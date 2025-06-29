import { DeleteOutlined } from '@ant-design/icons';
import { FooterToolbar } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';

type FooterComponentProps = {
	actionRef: any;
	selectedRowsState: any;
	setSelectedRows: any;
	handleOperator: any;
};
const FooterComponent: React.FC<FooterComponentProps> = props => {
	const { actionRef, selectedRowsState, setSelectedRows, handleOperator } = props;
	return (
		<FooterToolbar
			extra={
				<div className='font-mono'>
					已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项 &nbsp;&nbsp;&nbsp;&nbsp;
					{/* <span>
						总数为 <span className='text-red-600'>{selectedRowsState.reduce((pre: any, item: { age: any }) => pre + item.age!, 0)}</span> 岁
					</span> */}
				</div>
			}
		>
			<Popconfirm
				className=''
				title='删除多个任务！'
				description={`是否要删除这 ${selectedRowsState.length} 个任务`}
				onConfirm={() => {
					// 	await handle.handleRemove(selectedRowsState);
					// 	setSelectedRows([]);
					// 	actionRef.current?.reloadAndRest?.();
					handleOperator('moreDelete', null);
				}}
				// onCancel={cancel}
				okText='确认'
				cancelText='取消'
			>
				<Button key='deleteAll' size='middle' icon={<DeleteOutlined />} danger>
					批量删除
				</Button>
			</Popconfirm>
			<Button type='primary'>批量批准</Button>
		</FooterToolbar>
	);
};
export default FooterComponent;
