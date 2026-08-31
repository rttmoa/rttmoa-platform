import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import ToolBarRender from '@/components/TableToolBar';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { hk_mater_two_stock_d_barcode_API } from '@/api/modules/mater_general';

const useProTable = () => {
	const api = {
		find: hk_mater_two_stock_d_barcode_API.find,
		add: hk_mater_two_stock_d_barcode_API.add,
		modify: hk_mater_two_stock_d_barcode_API.mod,
		del: hk_mater_two_stock_d_barcode_API.del,
		delMore: hk_mater_two_stock_d_barcode_API.delMore,
		importEx: hk_mater_two_stock_d_barcode_API.importEx,
	};

	const { proTableProps, toolBarParams, showFooter, footerProps, modalProps, drawerProps } = useProTableDynamic({ api });

	const toolBar = { toolBarRender: () => ToolBarRender(toolBarParams) };

	return (
		<>
			<ProTable<any> {...proTableProps} {...toolBar} className={`${proTableProps.className || ''} `} />

			{/* Footer 部分 */}
			{showFooter && <FooterComponent {...footerProps} />}

			{/* Modal 弹窗：新建、编辑 */}
			<ModalComponent {...modalProps} />

			{/* 数据查看详情 */}
			<DrawerComponent {...drawerProps} />
		</>
	);
};

export default useProTable;
