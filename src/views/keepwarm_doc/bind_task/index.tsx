import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { keepwarm_doc_bind_API } from '@/api/modules/keepwarm_doc';

const useProTable = () => {
	const api = {
		find: keepwarm_doc_bind_API.find,
		add: keepwarm_doc_bind_API.add,
		modify: keepwarm_doc_bind_API.mod,
		del: keepwarm_doc_bind_API.del,
		delMore: keepwarm_doc_bind_API.delMore,
		importEx: keepwarm_doc_bind_API.importEx,
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
