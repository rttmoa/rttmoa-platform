import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import ToolBarRender from '@/components/TableToolBar';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { product_chilled_assign_API } from '@/api/modules/product_task';

const useProTable = () => {
	const api = {
		find: product_chilled_assign_API.find,
		add: product_chilled_assign_API.add,
		modify: product_chilled_assign_API.mod,
		del: product_chilled_assign_API.del,
		delMore: product_chilled_assign_API.delMore,
		importEx: product_chilled_assign_API.importEx,
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
