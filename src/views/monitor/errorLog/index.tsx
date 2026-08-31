import { ModalForm, ProFormDigit, ProFormSelect, ProFormText, ProTable } from '@ant-design/pro-components';
import { useProTableLogic } from './config/useProTableLogic';
import { createProTableConfig } from './config/ProTableConfig';
import ModalComponent from './component/Modal';
import DrawerComponent from './component/Drawer';
import FooterComponent from './component/Footer';
import './index.less';
import { Col, Form, Row } from 'antd';

// * 列配置：用户名、IP、IP来源、描述、浏览器、创建日期
const JobManage = () => {
	const tableName = '异常日志';

	const {
		// Refs
		actionRef,
		formRef,
		form,
		// States
		loading,
		openSearch,
		setOpenSearch,
		pagination,
		setPagination,
		selectedRows,
		setSelectedRows,
		// Modal
		modalIsVisible,
		setModalIsVisible,
		modalTitle,
		modalType,
		modalUserInfo,
		// Drawer
		drawerCurrentRow,
		setDrawerCurrentRow,
		drawerIsVisible,
		setDrawerIsVisible,
		// Handlers
		handleModalOperate,
		handleModalResult,
		handleImportData,
		handleProTableRequest,
	} = useProTableLogic();

	// 传递给工具栏的 props
	const toolBarParams = {
		quickSearch: () => {},
		openSearch,
		setOpenSearch,
		modalOperate: handleModalOperate,
		tableName,
		tableData: [], // 你的原始代码中没有用到这个，所以设为空数组
		ImportData: handleImportData,
	};

	// 获取 ProTable 的配置
	const proTableConfig: any = createProTableConfig({
		...toolBarParams, // 将工具栏参数也传递给配置生成器
		loading,
		pagination,
		setPagination,
		selectedRows,
		setSelectedRows,
		actionRef,
		formRef,
		tableName,
		handleModalOperate,
		handleModalResult,
	});
	const userSchema = [
		{
			title: '姓名',
			dataIndex: 'name',
			valueType: 'text',
			required: true,
		},
		{
			title: '年龄',
			dataIndex: 'age',
			valueType: 'digit',
			required: true,
		},
	];
	return (
		<>
			<ProTable<any> {...proTableConfig} request={handleProTableRequest} />

			{selectedRows?.length > 0 && <FooterComponent actionRef={actionRef} selectedRows={selectedRows} setSelectedRows={setSelectedRows} modalResult={handleModalResult} />}

			{/* <ModalForm title='asdasd' visible={true} width={800}>
				<Form layout='vertical' className='formList'>
					<Row gutter={[32, 0]}>
						{userSchema.map((field: any) => (
							<Col span={12}>
								{field.valueType == 'text' && <ProFormText key={field.dataIndex} name={field.dataIndex} label={field.title} />}
								{field.valueType == 'digit' && <ProFormDigit key={field.dataIndex} name={field.dataIndex} label={field.title} />}
								{field.valueType == 'select' && <ProFormSelect name='select' label='Select' valueEnum={field?.valueEnum} placeholder='Please select a country' />}
							</Col>
						))}
					</Row>
				</Form>
			</ModalForm> */}

			<ModalComponent form={form} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible} modalTitle={modalTitle} modalType={modalType} modalUserInfo={modalUserInfo} modalResult={handleModalResult} />

			<DrawerComponent
				drawerIsVisible={drawerIsVisible}
				drawerCurrentRow={drawerCurrentRow}
				setDrawerCurrentRow={setDrawerCurrentRow}
				setDrawerIsVisible={setDrawerIsVisible}
				modalOperate={handleModalOperate}
				modalResult={handleModalResult}
			/>
		</>
	);
};

export default JobManage;
