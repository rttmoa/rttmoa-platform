import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import ToolBarRender from '@/components/TableToolBar';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { hk_phone_account__c_API } from '@/api/modules/global_wms';

const useProTable = () => {
	const api = {
		find: hk_phone_account__c_API.find,
		add: hk_phone_account__c_API.add,
		modify: hk_phone_account__c_API.mod,
		del: hk_phone_account__c_API.del,
		delMore: hk_phone_account__c_API.delMore,
		importEx: hk_phone_account__c_API.importEx,
	};

	const { proTableProps, toolBarParams, showFooter, footerProps, modalProps, drawerProps } = useProTableDynamic({ api });

	const toolBar = { toolBarRender: () => ToolBarRender(toolBarParams) };

	return (
		<>
			<ProTable<any> {...proTableProps} {...toolBar} className={`${proTableProps.className || ''} `} />

			{showFooter && <FooterComponent {...footerProps} />}

			<ModalComponent {...modalProps} />

			<DrawerComponent {...drawerProps} />
		</>
	);
};

export default useProTable;
