import { UserList } from '@/api/interface';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import TableColumnsConfig from './ColumnConfig';

type DrawerComponentProps = {
	showDetail: boolean;
	currentRow: any;
	setCurrentRow: any;
	setShowDetail: any;
	columnParams: any;
};
// & 优化此组件的设置、优化代码
const DrawerComponent: React.FC<DrawerComponentProps> = Params => {
	const {
		showDetail: isDrawerOpen,
		currentRow,
		setCurrentRow, // 当前行信息
		setShowDetail: setisDrawerOpen,
		columnParams,
	} = Params;
	console.log('部门管理：', Params);
	console.log('部门管理 currentRow ', Params.currentRow);

	return (
		<Drawer
			width={550}
			open={isDrawerOpen}
			onClose={() => {
				setCurrentRow(undefined);
				setisDrawerOpen(false);
			}}
			closable={true}
		>
			{currentRow?.name && (
				<ProDescriptions<UserList>
					// extra='extra'
					bordered
					size='small'
					layout='horizontal'
					column={1}
					title={currentRow?.name}
					request={async () => ({
						data: currentRow || {},
					})}
					params={{
						id: currentRow?.name,
					}}
					columns={TableColumnsConfig(columnParams) as ProDescriptionsItemProps<UserList>[]}
				/>
			)}
		</Drawer>
	);
};
export default DrawerComponent;
