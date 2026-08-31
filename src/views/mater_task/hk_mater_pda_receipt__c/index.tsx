import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import ToolBarRender from '@/components/TableToolBar';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { hk_mater_pda_receipt__c_API } from '@/api/modules/mater';

const footerSummaryItems = [
	// { label: '汇总件数', field: 'handle_piece__c' },
	{ label: '汇总总重量', field: 'weight__c' },
];

const useProTable = () => {
	const api = {
		find: hk_mater_pda_receipt__c_API.find,
		add: hk_mater_pda_receipt__c_API.add,
		modify: hk_mater_pda_receipt__c_API.mod,
		del: hk_mater_pda_receipt__c_API.del,
		delMore: hk_mater_pda_receipt__c_API.delMore,
		importEx: hk_mater_pda_receipt__c_API.importEx,
	};

	const { proTableProps, toolBarParams, showFooter, footerProps, modalProps, drawerProps } = useProTableDynamic({ api });

	const toolBar = { toolBarRender: () => ToolBarRender(toolBarParams) };

	return (
		<>
			<ProTable<any> {...proTableProps} {...toolBar} className={`${proTableProps.className || ''} `} />

			{showFooter && <FooterComponent {...footerProps} summaryItems={footerSummaryItems} />}

			<ModalComponent {...modalProps} />

			<DrawerComponent {...drawerProps} />
		</>
	);
};

export default useProTable;
