import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import ModalComponent from '@/components/TableModal';
import useProTableDynamic from './component/useProTableDynamic';
import ToolBarRender from './component/ToolBarRender';
import { hk_mater_stock_detail__c_API } from '@/api/modules/mater';
import FooterComponent from '@/components/TableFooter';

const footerSummaryItems = [
	{ label: '汇总件数', field: 'now_quantity__c' },
	{ label: '汇总总重量', field: 'weight__c' },
];
const api = {
	find: hk_mater_stock_detail__c_API.find,
	add: hk_mater_stock_detail__c_API.add,
	modify: hk_mater_stock_detail__c_API.mod,
	del: hk_mater_stock_detail__c_API.del,
	delMore: hk_mater_stock_detail__c_API.delMore,
	importEx: hk_mater_stock_detail__c_API.importEx,
	roundup: hk_mater_stock_detail__c_API.roundup,
};

const useProTable = () => {
	const { proTableProps, toolBarParams, showFooter, footerProps, modalProps, drawerProps } = useProTableDynamic({ api, Virtual: true });

	const toolBar = { toolBarRender: () => ToolBarRender(toolBarParams) };

	return (
		<>
			{/* 添加虚拟化 CSS 属性 */}
			<ProTable<any> {...proTableProps} {...toolBar} className={`${proTableProps.className || ''} `} />

			{showFooter && <FooterComponent {...footerProps} summaryItems={footerSummaryItems} />}

			<ModalComponent {...modalProps} />

			<DrawerComponent {...drawerProps} />
		</>
	);
};

export default useProTable;
