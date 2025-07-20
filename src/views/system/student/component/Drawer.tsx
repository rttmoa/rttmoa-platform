import { UserList } from '@/api/interface';
import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import TableColumnsConfig from './ColumnConfig';

type DrawerComponentProps = {
	drawerIsVisible: boolean;
	drawerCurrentRow: any;
	setDrawerCurrentRow: React.Dispatch<React.SetStateAction<any | null>>;
	setDrawerIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	handleOperator: (type: string, item: any) => void;
};
const DrawerComponent: React.FC<DrawerComponentProps> = Params => {
	const { drawerIsVisible, drawerCurrentRow, setDrawerCurrentRow, setDrawerIsVisible, handleOperator } = Params;

	return (
		<Drawer
			width={550}
			open={drawerIsVisible}
			onClose={() => {
				setDrawerCurrentRow(undefined);
				setDrawerIsVisible(false);
			}}
			closable={true}
		>
			{drawerCurrentRow?.username && (
				<ProDescriptions<UserList>
					// extra='extra'
					bordered
					size='small'
					layout='horizontal'
					column={1}
					title={drawerCurrentRow?.username}
					request={async () => ({
						data: drawerCurrentRow || {},
					})}
					params={{
						id: drawerCurrentRow?.username,
					}}
					columns={TableColumnsConfig(handleOperator) as ProDescriptionsItemProps<UserList>[]}
				/>
			)}
		</Drawer>
	);
};
export default DrawerComponent;
