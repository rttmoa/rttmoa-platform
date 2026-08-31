import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import ToolBarRender from './component/ToolBarRender';
import useProTableDynamic from './component/useProTableDynamic';
import { product_chilled_stock_detail_API } from '@/api/modules/product_task';

const footerSummaryItems = [
	{ label: '汇总件数', field: 'now_quantity__c' },
	{ label: '汇总总重量', field: 'weight__c' },
];

const useProTable = () => {
	const api = {
		find: product_chilled_stock_detail_API.find,
		add: product_chilled_stock_detail_API.add,
		modify: product_chilled_stock_detail_API.mod,
		del: product_chilled_stock_detail_API.del,
		delMore: product_chilled_stock_detail_API.delMore,
		importEx: product_chilled_stock_detail_API.importEx,
		roundup: product_chilled_stock_detail_API.roundup,
	};

	const { proTableProps, toolBarParams, showFooter, footerProps, modalProps, drawerProps } = useProTableDynamic({ api, Virtual: true });

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
