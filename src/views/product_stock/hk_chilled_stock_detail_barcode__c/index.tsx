import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import ToolBarRender from '@/components/TableToolBar';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { product_chilled_stock_detail_barcode_API } from '@/api/modules/product_task';

const footerSummaryItems = [{ label: '汇总总重量', field: 'weight__c' }];

const useProTable = () => {
	const api = {
		find: product_chilled_stock_detail_barcode_API.find,
		add: product_chilled_stock_detail_barcode_API.add,
		modify: product_chilled_stock_detail_barcode_API.mod,
		del: product_chilled_stock_detail_barcode_API.del,
		delMore: product_chilled_stock_detail_barcode_API.delMore,
		importEx: product_chilled_stock_detail_barcode_API.importEx,
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
