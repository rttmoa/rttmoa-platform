import renderFormItem from '@/hooks/useTableSchema/useTabFormItem';
import { ModalForm } from '@ant-design/pro-components';
import { Fragment, useEffect } from 'react';

const ModalComponent = (Params: any) => {
	const { form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo, modalResult, formSchemaField } = Params;

	// 回车键提交数据
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				form.submit();
			}
		};
		if (modalIsVisible) {
			window.addEventListener('keydown', handleKeyDown);
		} else {
			window.removeEventListener('keydown', handleKeyDown);
		}
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [modalIsVisible]);

	useEffect(() => {
		if (modalType == 'create') {
			form.resetFields();
		}
		if (modalType == 'edit' || modalIsVisible) {
			form.setFieldsValue(modalUserInfo || {});
		}
	}, [modalIsVisible, modalType, modalUserInfo]);

	const onFinish: any = (values: any) => {
		const formList = form.getFieldsValue();
		if (modalType == 'edit') {
			formList._id = modalUserInfo._id;
		}
		modalResult && modalResult(modalType, formList);
		// return true;
	};
	const onOpenChange = (v: boolean) => {
		setModalIsVisible(v);
		if (!v) {
			form.resetFields();
		}
	};
	return (
		<ModalForm
			width={1000}
			className='px-[20px] py-[30px]'
			key={modalUserInfo?._id}
			form={form}
			title={
				<div>
					<span>{modalTitle}</span>
					{'   '}
					<span className='text-[14px]'>{modalUserInfo?.name || ''}</span>
				</div>
			}
			open={modalIsVisible}
			layout='horizontal'
			labelCol={{ span: 6 }} // label 宽度
			wrapperCol={{ span: 14 }} // 输入框宽度
			grid // ★ 启用表单网格
			rowProps={{ gutter: [16, 0] }}
			// initialValues={modalUserInfo || {}} // initialValues只会初始化一次
			modalProps={{ destroyOnClose: true }}
			onOpenChange={onOpenChange}
			onFinish={onFinish}
		>
			{formSchemaField.map((item: any, index: number) => (
				<Fragment key={item?.name || item?.label || index}>{renderFormItem(item)}</Fragment>
			))}
		</ModalForm>
	);
};
export default ModalComponent;
