import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import ToolBarRender from '@/components/TableToolBar';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { product_chuyu_API } from '@/api/modules/product_task';

const footerSummaryItems = [
	// { label: '汇总件数', field: 'handle_piece__c' },
	{ label: '汇总总重量', field: 'weight__c' },
];

const useProTable = () => {
	const api = {
		find: product_chuyu_API.find,
		add: product_chuyu_API.add,
		modify: product_chuyu_API.mod,
		del: product_chuyu_API.del,
		delMore: product_chuyu_API.delMore,
		importEx: product_chuyu_API.importEx,
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
