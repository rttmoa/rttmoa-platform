import { Form } from 'antd';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { hk_pack_doc_detail__c_API } from '@/api/modules/pack';
import { message } from '@/hooks/useMessage';

type ModalOutProps = {
	open: boolean;
	selectedRow?: any;
	stockData?: any;
	onOpenChange: (open: boolean) => void;
	onSuccess?: () => void;
};

const ModalOut = ({ open, selectedRow, stockData, onOpenChange, onSuccess }: ModalOutProps) => {
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const stockPiece = Number(stockData?.now_quantity__c ?? 0);
	const stockQuantity = Number(stockData?.weight__c ?? 0);

	useEffect(() => {
		if (!open) return;
		form.setFieldsValue({
			document_id__c: selectedRow?.document_id__c,
			material_code__c: selectedRow?.material_code__c,
			material_name__c: selectedRow?.material_name__c,
			quantity__c: selectedRow?.quantity__c,
			now_quantity__c: stockPiece,
			weight__c: stockQuantity,
			piece: undefined,
			out_quantity: undefined,
		});
	}, [form, open, selectedRow, stockPiece, stockQuantity]);

	const handleFinish = async (values: any) => {
		setSubmitting(true);
		try {
			const payload = {
				...selectedRow,
				stock_id: stockData?._id,
				now_quantity__c: stockPiece,
				weight__c: stockQuantity,
				piece: values.piece,
				out_quantity: values.out_quantity,
			};
			const res: any = await hk_pack_doc_detail__c_API.packOut(payload);
			const responseData = res?.data ?? {};
			if (responseData.success !== true) {
				message.error(responseData.message || res?.msg || '包材库出库失败', 5);
				return false;
			}

			message.success('出库完成');
			onSuccess?.();
			onOpenChange(false);
			form.resetFields();
			return true;
		} catch (error: any) {
			message.error(error?.message || error?.msg || '包材库出库失败', 5);
			return false;
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<ModalForm
			width={720}
			form={form}
			title='包材库出库'
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
			<ProFormText name='material_code__c' label='物料代码' readonly />
			<ProFormText name='material_name__c' label='物料名称' readonly />
			<ProFormDigit name='quantity__c' label='出库数量' readonly fieldProps={{ precision: 3 }} />
			<ProFormDigit name='now_quantity__c' label='库存件数' readonly fieldProps={{ precision: 0 }} />
			<ProFormDigit name='weight__c' label='库存数量' readonly fieldProps={{ precision: 3 }} />
			<ProFormDigit
				name='piece'
				label='出库件数'
				rules={[
					{ required: true, message: '请输入出库件数' },
					{ type: 'number', min: 1, max: stockPiece, message: `出库件数必须大于0且不能超过库存件数${stockPiece}` },
				]}
				fieldProps={{ min: 1, max: stockPiece, precision: 0 }}
			/>
			<ProFormDigit
				name='out_quantity'
				label='出库数量'
				rules={[
					{ required: true, message: '请输入出库数量' },
					{ type: 'number', min: 0.001, max: stockQuantity, message: `出库数量必须大于0且不能超过库存数量${stockQuantity}` },
				]}
				fieldProps={{ min: 0.001, max: stockQuantity, precision: 3 }}
			/>
		</ModalForm>
	);
};

export default ModalOut;
