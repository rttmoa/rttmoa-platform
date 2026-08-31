import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import ModalComponent from '@/components/TableModal';
import ToolBarRender from '@/components/TableToolBar';
import useProTableDynamic from './components/useProTableDynamic';
import { product_pda_outgoing_API } from '@/api/modules/product_task';
import FooterComponent from '@/components/TableFooter';

const footerSummaryItems = [
	{ label: '汇总件数', field: 'handle_piece__c' },
	{ label: '汇总总重量', field: 'final_pick_quantity__c' },
];

const useProTable = () => {
	const api = {
		find: product_pda_outgoing_API.find,
		add: product_pda_outgoing_API.add,
		modify: product_pda_outgoing_API.mod,
		del: product_pda_outgoing_API.del,
		delMore: product_pda_outgoing_API.delMore,
		importEx: product_pda_outgoing_API.importEx,
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
