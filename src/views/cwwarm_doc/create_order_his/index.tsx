import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { cwwarm_doc_create_his_API } from '@/api/modules/cwwarm_doc';

const useProTable = () => {
	const api = {
		find: cwwarm_doc_create_his_API.find,
		add: cwwarm_doc_create_his_API.add,
		modify: cwwarm_doc_create_his_API.mod,
		del: cwwarm_doc_create_his_API.del,
		delMore: cwwarm_doc_create_his_API.delMore,
		importEx: cwwarm_doc_create_his_API.importEx,
	};

	const { proTableProps, showFooter, footerProps, modalProps, drawerProps } = useProTableDynamic({ api });

	return (
		<>
			<ProTable<any> {...proTableProps} />

			{showFooter && <FooterComponent {...footerProps} />}

			<ModalComponent {...modalProps} />

			<DrawerComponent {...drawerProps} />
		</>
	);
};

export default useProTable;
