import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import ModalComponent from '@/components/TableModal';
import useProTableDynamic from './component/useProTableDynamic';
import ToolBarRender from './component/ToolBarRender';
import { product_freezing_stock_detail_API } from '@/api/modules/product_task';
import FooterComponent from '@/components/TableFooter';

const footerSummaryItems = [
	{ label: '汇总件数', field: 'now_quantity__c' },
	{ label: '汇总总重量', field: 'weight__c' },
];

const useProTable = () => {
	const api = {
		find: product_freezing_stock_detail_API.find,
		add: product_freezing_stock_detail_API.add,
		modify: product_freezing_stock_detail_API.mod,
		del: product_freezing_stock_detail_API.del,
		delMore: product_freezing_stock_detail_API.delMore,
		importEx: product_freezing_stock_detail_API.importEx,
		roundup: product_freezing_stock_detail_API.roundup,
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
