import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import ToolBarRender from '@/components/TableToolBar';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { product_freezing_lay_distribution_API } from '@/api/modules/product_task';

const useProTable = () => {
	const api = {
		find: product_freezing_lay_distribution_API.find,
		add: product_freezing_lay_distribution_API.add,
		modify: product_freezing_lay_distribution_API.mod,
		del: product_freezing_lay_distribution_API.del,
		delMore: product_freezing_lay_distribution_API.delMore,
		importEx: product_freezing_lay_distribution_API.importEx,
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
