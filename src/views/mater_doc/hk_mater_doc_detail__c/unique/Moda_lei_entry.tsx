import { Form } from 'antd';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { hk_mater_doc_detail__c_API } from '@/api/modules/mater';
import { message } from '@/hooks/useMessage';

type ModaLeiEntryProps = {
	open: boolean;
	selectedRow?: any;
	onOpenChange: (open: boolean) => void;
	onSuccess?: () => void;
};

const ModaLeiEntry = ({ open, selectedRow, onOpenChange, onSuccess }: ModaLeiEntryProps) => {
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (!open) return;
		form.setFieldsValue({
			document_id__c: selectedRow?.document_id__c,
			material_code__c: selectedRow?.material_code__c,
			material_name__c: selectedRow?.material_name__c,
			quantity__c: selectedRow?.quantity__c,
			piece: undefined,
			enter_quantity: selectedRow?.quantity__c,
		});
	}, [form, open, selectedRow]);

	const handleFinish = async (values: any) => {
		setSubmitting(true);
		try {
			const payload = {
				_id: selectedRow?._id,
				document_id__c: selectedRow?.document_id__c,
				material_code__c: selectedRow?.material_code__c,
				material_name__c: selectedRow?.material_name__c,
				quantity__c: selectedRow?.quantity__c,
				piece: values.piece,
				enter_quantity: values.enter_quantity,
			};
			const res: any = await hk_mater_doc_detail__c_API.materLeiEntry(payload);
			const responseData = res?.data ?? {};
			if (responseData.success === false) {
				message.error(responseData.message || res?.msg || '原料雷马入库失败', 5);
				return false;
			}
			message.success(responseData.message || res?.msg || '原料雷马入库成功');
			onSuccess?.();
			onOpenChange(false);
			form.resetFields();
			return true;
		} catch (error: any) {
			message.error(error?.message || error?.msg || '原料雷马入库失败', 5);
			return false;
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<ModalForm
			width={720}
			form={form}
			title='原料雷马入库'
			open={open}
			layout='horizontal'
			labelCol={{ span: 7 }}
			wrapperCol={{ span: 14 }}
			modalProps={{ destroyOnClose: true, maskClosable: false }}
			submitter={{ submitButtonProps: { loading: submitting } }}
			onOpenChange={nextOpen => {
				onOpenChange(nextOpen);
				if (!nextOpen) {
					form.resetFields();
				}
			}}
			onFinish={handleFinish}
		>
			<ProFormText name='document_id__c' label='单据编号' readonly />
			<ProFormText name='material_code__c' label='物料代码' readonly />
			<ProFormText name='material_name__c' label='物料名称' readonly />
			<ProFormDigit name='quantity__c' label='入库数量' readonly fieldProps={{ precision: 3 }} />
			<ProFormDigit name='piece' label='件数' rules={[{ required: true, message: '请输入件数' }]} fieldProps={{ min: 0, precision: 0 }} />
			<ProFormDigit name='enter_quantity' label='入库数量' rules={[{ required: true, message: '请输入入库数量' }]} fieldProps={{ min: 0, precision: 3 }} />
		</ModalForm>
	);
};

export default ModaLeiEntry;
