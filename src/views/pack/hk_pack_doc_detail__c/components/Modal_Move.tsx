import { Form } from 'antd';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { hk_pack_doc_detail__c_API } from '@/api/modules/pack';
import { message } from '@/hooks/useMessage';

type ModalMoveProps = {
	open: boolean;
	selectedRow?: any;
	onOpenChange: (open: boolean) => void;
	onSuccess?: () => void;
};

const ModalMove = ({ open, selectedRow, onOpenChange, onSuccess }: ModalMoveProps) => {
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (!open) return;
		form.setFieldsValue({
			document_id__c: selectedRow?.document_id__c,
			document_type__c: selectedRow?.document_type__c,
			material_code__c: selectedRow?.material_code__c,
			material_name__c: selectedRow?.material_name__c,
			area__c: selectedRow?.area__c,
			recept_area__c: selectedRow?.recept_area__c,
			quantity__c: selectedRow?.quantity__c,
			piece: undefined,
			enter_quantity: selectedRow?.quantity__c,
		});
	}, [form, open, selectedRow]);

	const handleFinish = async (values: any) => {
		setSubmitting(true);
		try {
			const payload = {
				...selectedRow,
				piece: values.piece,
				enter_quantity: values.enter_quantity,
			};
			const res: any = await hk_pack_doc_detail__c_API.packMove(payload);
			const responseData = res?.data ?? {};
			if (responseData.success === false) {
				message.error(responseData.message || res?.msg || '包材移库失败', 5);
				return false;
			}

			message.success(responseData.message || res?.msg || '移库完成');
			onSuccess?.();
			onOpenChange(false);
			form.resetFields();
			return true;
		} catch (error: any) {
			message.error(error?.message || error?.msg || '包材移库失败', 5);
			return false;
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<ModalForm
			width={720}
			form={form}
			title='包材移库'
			open={open}
			layout='horizontal'
			labelCol={{ span: 7 }}
			wrapperCol={{ span: 14 }}
			modalProps={{ destroyOnClose: true, maskClosable: false }}
			submitter={{ submitButtonProps: { loading: submitting } }}
			onOpenChange={nextOpen => {
				onOpenChange(nextOpen);
				if (!nextOpen) form.resetFields();
			}}
			onFinish={handleFinish}
		>
			<ProFormText name='document_id__c' label='单据编号' readonly />
			<ProFormText name='document_type__c' label='单据类型' readonly />
			<ProFormText name='material_code__c' label='物料代码' readonly />
			<ProFormText name='material_name__c' label='物料名称' readonly />
			<ProFormText name='area__c' label='当前仓库' readonly />
			<ProFormText name='recept_area__c' label='接收仓库' readonly />
			<ProFormDigit name='quantity__c' label='入库数量' readonly fieldProps={{ precision: 3 }} />
			<ProFormDigit name='piece' label='件数' rules={[{ required: true, message: '请输入件数' }]} fieldProps={{ min: 0, precision: 0 }} />
			<ProFormDigit name='enter_quantity' label='入库数量' rules={[{ required: true, message: '请输入入库数量' }]} fieldProps={{ min: 0, precision: 3 }} />
		</ModalForm>
	);
};

export default ModalMove;
