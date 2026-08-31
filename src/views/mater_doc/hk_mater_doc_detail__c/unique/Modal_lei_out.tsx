import { Form } from 'antd';
import { ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { hk_mater_doc_detail__c_API } from '@/api/modules/mater';
import { message } from '@/hooks/useMessage';

type ModalLeiOutProps = {
	open: boolean;
	selectedRow?: any;
	stockData?: any;
	onOpenChange: (open: boolean) => void;
	onSuccess?: () => void;
};

const ModalLeiOut = ({ open, selectedRow, stockData, onOpenChange, onSuccess }: ModalLeiOutProps) => {
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const stockPiece = Number(stockData?.now_quantity__c ?? 0);
	const stockWeight = Number(stockData?.weight__c ?? 0);

	useEffect(() => {
		if (!open) return;
		form.setFieldsValue({
			document_id__c: selectedRow?.document_id__c,
			document_type__c: selectedRow?.document_type__c,
			cmdtype__c: selectedRow?.cmdtype__c,
			quantity__c: selectedRow?.quantity__c,
			material_code__c: selectedRow?.material_code__c,
			batch__c: selectedRow?.batch__c,
			now_quantity__c: stockPiece,
			weight__c: stockWeight,
			piece: undefined,
			out_quantity: undefined,
		});
	}, [form, open, selectedRow, stockPiece, stockWeight]);

	const handleFinish = async (values: any) => {
		setSubmitting(true);
		try {
			const payload = {
				...selectedRow,
				stock_id: stockData?._id,
				now_quantity__c: stockPiece,
				weight__c: stockWeight,
				piece: values.piece,
				out_quantity: values.out_quantity,
			};
			const res: any = await hk_mater_doc_detail__c_API.materLeiOut(payload);
			const responseData = res?.data ?? {};
			if (responseData.success !== true) {
				message.error(responseData.message || res?.msg || '原料雷马出库失败', 5);
				return false;
			}
			message.success(responseData.message || res?.msg || '原料雷马出库成功');
			onSuccess?.();
			onOpenChange(false);
			form.resetFields();
			return true;
		} catch (error: any) {
			message.error(error?.message || error?.msg || '原料雷马出库失败', 5);
			return false;
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<ModalForm
			width={720}
			form={form}
			title='原料雷马出库'
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
			<ProFormText name='document_id__c' label='单号' readonly />
			<ProFormText name='document_type__c' label='单据类型' readonly />
			<ProFormText name='cmdtype__c' label='出入库类型' readonly />
			<ProFormDigit name='quantity__c' label='单据中数量' readonly fieldProps={{ precision: 3 }} />
			<ProFormText name='material_code__c' label='物料代码' readonly />
			<ProFormText name='batch__c' label='批次' readonly />
			<ProFormDigit name='now_quantity__c' label='库存件数' readonly fieldProps={{ precision: 0 }} />
			<ProFormDigit name='weight__c' label='库存重量' readonly fieldProps={{ precision: 3 }} />
			<ProFormDigit
				name='piece'
				label='要出库的件数'
				rules={[
					{ required: true, message: '请输入要出库的件数' },
					{ type: 'number', min: 1, max: stockPiece, message: `要出库的件数必须大于0且不能大于库存件数${stockPiece}` },
				]}
				fieldProps={{ min: 1, max: stockPiece, precision: 0 }}
			/>
			<ProFormDigit
				name='out_quantity'
				label='要出库的重量'
				rules={[
					{ required: true, message: '请输入要出库的重量' },
					{ type: 'number', min: 0.001, max: stockWeight, message: `要出库的重量必须大于0且不能大于库存重量${stockWeight}` },
				]}
				fieldProps={{ min: 0.001, max: stockWeight, precision: 3 }}
			/>
		</ModalForm>
	);
};

export default ModalLeiOut;
