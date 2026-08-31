import renderFormItem from '@/hooks/useTableSchema/useTabFormItem';
import { product_doc_detail_API } from '@/api/modules/product_task';
import { message } from '@/hooks/useMessage';
import { ModalForm, ProFormDatePicker, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

const CREATE_FIELDS = ['material_code__c', 'material_name__c', 'unit__c', 'quantity__c', 'production_date__c', 'sap_date__c'];
const CREATE_FORM_FIELDS = CREATE_FIELDS.filter(field => field !== 'material_name__c');
const DATE_FIELDS = ['production_date__c', 'sap_date__c'];
const DOCUMENT_TYPE = '生产入库单';
type MaterialItem = {
	material_code__c?: string;
	material_name__c?: string;
	unit__c?: string;
};
const MATERIAL_CODE_RULES = [
	{ required: true, message: '请输入物料代码' },
	{
		validator: async (_: any, value: string) => {
			if (!value || value.trim().length !== 5) {
				throw new Error('物料代码需为5位字符串');
			}
		},
	},
];

// 生产入库单
const ModalComponent = (Params: any) => {
	const { form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo, modalResult, formSchemaField } = Params;
	const [materialOptions, setMaterialOptions] = useState<{ label: string; value: string }[]>([]);
	const [materialLoading, setMaterialLoading] = useState(false);
	const [materialMap, setMaterialMap] = useState<Record<string, MaterialItem>>({});
	const formSchemaMap = useMemo(() => {
		return formSchemaField.reduce((acc: any, item: any) => {
			acc[item.name] = item;
			return acc;
		}, {});
	}, [formSchemaField]);

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
			const nextValues = { ...(modalUserInfo || {}) };
			DATE_FIELDS.forEach(field => {
				if (nextValues[field]) {
					const dateValue = dayjs(nextValues[field]);
					nextValues[field] = dateValue.isValid() ? dateValue : nextValues[field];
				}
			});
			form.setFieldsValue(nextValues);
		}
	}, [modalIsVisible, modalType, modalUserInfo]);

	useEffect(() => {
		const loadMaterialOptions = async () => {
			try {
				setMaterialLoading(true);
				const res: any = await product_doc_detail_API.globalMaterial();
				const list = Array.isArray(res?.data?.data?.data) ? res.data.data.data : Array.isArray(res?.data?.data) ? res.data.data : [];
				const nextMap = list.reduce((acc: Record<string, MaterialItem>, item: MaterialItem) => {
					const code = String(item?.material_code__c || '').trim();
					if (code) {
						acc[code] = item;
					}
					return acc;
				}, {});
				const options = Object.entries(nextMap).map(([code, item]: any) => ({
					label: `${code}${item?.material_name__c ? ` - ${item.material_name__c}` : ''}`,
					value: code,
				}));
				setMaterialMap(nextMap);
				setMaterialOptions(options);
			} catch (error: any) {
				setMaterialMap({});
				setMaterialOptions([]);
				message.error(error?.message || '获取物料数据失败');
			} finally {
				setMaterialLoading(false);
			}
		};

		if (modalIsVisible && modalType === 'create') {
			loadMaterialOptions();
		}
	}, [modalIsVisible, modalType]);

	const handleMaterialChange = (value: string) => {
		const materialCode = String(value || '').trim();
		const currentMaterial = materialMap[materialCode];
		form.setFieldValue('material_code__c', materialCode || undefined);
		form.setFieldValue('material_name__c', currentMaterial?.material_name__c || undefined);
		form.setFieldValue('unit__c', currentMaterial?.unit__c || undefined);
	};

	const renderCreateField = (name: string, extraProps: any = {}) => {
		const item = formSchemaMap[name];
		if (!item) return null;

		const fieldProps = { ...(item.fieldProps || {}), ...(extraProps.fieldProps || {}) };
		const commonProps = {
			name: item.name,
			label: item.label,
			colProps: { span: 12 },
			fieldProps,
			rules: extraProps.rules || [{ required: true, message: `请选择${item.label}` }],
		};

		if (name === 'material_code__c') {
			return (
				<ProFormSelect
					key={name}
					{...commonProps}
					options={materialOptions}
					rules={extraProps.rules || MATERIAL_CODE_RULES}
					fieldProps={{
						...fieldProps,
						showSearch: true,
						allowClear: true,
						loading: materialLoading,
						optionFilterProp: 'label',
						onChange: handleMaterialChange,
					}}
				/>
			);
		}

		if (DATE_FIELDS.includes(name)) {
			return (
				<ProFormDatePicker
					key={name}
					name={item.name}
					label={item.label}
					colProps={{ span: 12 }}
					rules={extraProps.rules || [{ required: true, message: `请选择${item.label}` }]}
					fieldProps={{
						...(fieldProps || {}),
						format: 'YYYY-MM-DD',
					}}
				/>
			);
		}

		switch (item.type) {
			case 'number':
				return <ProFormDigit key={name} {...commonProps} rules={extraProps.rules || [{ required: true, message: `请输入${item.label}` }]} />;
			case 'select':
				return <ProFormSelect key={name} {...commonProps} />;
			case 'string':
			default:
				return <ProFormText key={name} {...commonProps} rules={extraProps.rules || [{ required: true, message: `请输入${item.label}` }]} />;
		}
	};

	const createContent = (
		<>
			{CREATE_FORM_FIELDS.map(name =>
				name === 'material_code__c'
					? [
							renderCreateField(name, {
								fieldProps: {
									maxLength: 5,
								},
								rules: MATERIAL_CODE_RULES,
							}),
							renderCreateField('material_name__c', {
								fieldProps: {
									disabled: true,
									readOnly: true,
								},
								rules: [],
							}),
						]
					: renderCreateField(
							name,
							name === 'unit__c'
								? {
										fieldProps: {
											disabled: true,
											readOnly: true,
										},
									}
								: {}
						)
			)}
		</>
	);
	const renderEditField = (item: any) => {
		if (DATE_FIELDS.includes(item?.name)) {
			return (
				<ProFormDatePicker
					key={item.name}
					name={item.name}
					label={item.label}
					colProps={{ span: 12 }}
					fieldProps={{
						...(item.fieldProps || {}),
						format: 'YYYY-MM-DD',
					}}
				/>
			);
		}
		return renderFormItem(item);
	};

	const onFinish: any = (values: any) => {
		const formList = form.getFieldsValue(true);
		if (modalType == 'create') {
			CREATE_FIELDS.forEach(field => {
				if (!Object.prototype.hasOwnProperty.call(formList, field) && Object.prototype.hasOwnProperty.call(values, field)) {
					formList[field] = values[field];
				}
			});
			if (formList.material_code__c) {
				const currentMaterial = materialMap[String(formList.material_code__c).trim()];
				formList.material_name__c = formList.material_name__c || currentMaterial?.material_name__c;
				formList.unit__c = formList.unit__c || currentMaterial?.unit__c;
			}
			Object.keys(formList).forEach(key => {
				if (!CREATE_FIELDS.includes(key)) {
					delete formList[key];
				}
			});
		}
		if (formList.material_code__c) {
			formList.material_code__c = String(formList.material_code__c).trim();
		}
		DATE_FIELDS.forEach(field => {
			if (formList[field]) {
				formList[field] = dayjs(formList[field]).format('YYYY-MM-DD');
			}
		});
		if (modalType == 'edit') {
			formList._id = modalUserInfo._id;
		}
		formList.document_type__c = modalType === 'create' ? DOCUMENT_TYPE : modalUserInfo?.document_type__c || formList.document_type__c;

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
			{modalType === 'create' ? createContent : formSchemaField.map((item: any) => renderEditField(item))}
		</ModalForm>
	);
};
export default ModalComponent;
