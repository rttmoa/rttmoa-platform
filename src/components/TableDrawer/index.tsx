import { UserList } from '@/api/interface';
import { ProColumns, ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Drawer, Empty, Typography } from 'antd';

type DrawerComponentProps = {
	drawerIsVisible: boolean;
	drawerCurrentRow: any;
	drawerClose: any;
	columnsConfig: (Operate: any, Result: any, columns: any, tableOps: any) => ProColumns<any>[];

	modalOperate?: any;
	modalResult?: any;
	columnsSchemaField?: any;
	tableOps?: any;
};
const DrawerComponent: React.FC<DrawerComponentProps> = Params => {
	const { drawerIsVisible, drawerCurrentRow, drawerClose, columnsConfig, modalOperate, modalResult, columnsSchemaField, tableOps } = Params;

	const col = columnsConfig(modalOperate, modalResult, columnsSchemaField, tableOps) as ProDescriptionsItemProps<UserList>[];
	const colConfig = col.map((value: any) => {
		if (value.valueType == 'digit') value.valueType = 'text';
		if (value.valueType == 'date') value.valueType = 'date';
		return { ...value };
	});

	return (
		<Drawer width={550} open={drawerIsVisible} onClose={drawerClose} closable={true}>
			{drawerCurrentRow?._id ? (
				<ProDescriptions<UserList>
					// extra='extra'
					bordered
					size='small'
					layout='horizontal'
					column={1}
					title={drawerCurrentRow?.time__c}
					request={async () => ({ data: drawerCurrentRow || {} })}
					params={{ id: drawerCurrentRow?._id }}
					columns={colConfig}
				/>
			) : (
				<Empty className='mt-[20px]' description={<Typography.Text>详情信息数据错误！</Typography.Text>} />
			)}
		</Drawer>
	);
};
export default DrawerComponent;
