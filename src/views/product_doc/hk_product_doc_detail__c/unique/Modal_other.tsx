import renderFormItem from '@/hooks/useTableSchema/useTabFormItem';
import { product_doc_detail_API } from '@/api/modules/product_task';
import { message } from '@/hooks/useMessage';
import { ModalForm, ProFormDatePicker, ProFormDependency, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

const CREATE_FIELDS = ['area__c', 'material_code__c', 'quantity__c', 'unit__c', 'export_way__c', 'type_move__c'];
const COST_CENTER_MOVE_TYPE = 'Z05 成本中心发料';
const RECEPT_AREA_MOVE_TYPE = '311 库存调拨';
const SPECIFIED_PRODUCTION_DATE_EXPORT_WAY = '指定生产日期';
const SPECIFIED_GROUP_EXPORT_WAY = '指定组';

const DOCUMENT_TYPE = '其他出库单';
type MaterialItem = {
	material_code__c?: string;
	material_name__c?: string;
	unit__c?: string;
};
type CostCenterItem = {
	department_code__c?: string;
	department__c?: string;
};
type WarehouseItem = {
	area__c?: string;
};
type FormOption = {
	label: string;
	value: string;
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

//

// 其他出库单
const ModalComponent = (Params: any) => {
	const { form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo, modalResult, formSchemaField } = Params;
	const [materialOptions, setMaterialOptions] = useState<FormOption[]>([]);
	const [materialLoading, setMaterialLoading] = useState(false);
	const [materialMap, setMaterialMap] = useState<Record<string, MaterialItem>>({});
	const [costCenterOptions, setCostCenterOptions] = useState<FormOption[]>([]);
	const [costCenterLoading, setCostCenterLoading] = useState(false);
	const [warehouseOptions, setWarehouseOptions] = useState<FormOption[]>([]);
	const [warehouseLoading, setWarehouseLoading] = useState(false);
	const formSchemaMap = useMemo(() => {
		return formSchemaField.reduce((acc: any, item: any) => {
			acc[item.name] = item;
			return acc;
		}, {});
	}, [formSchemaField]);
	const getResponseList = (res: any) => {
		if (Array.isArray(res?.data?.data?.data)) return res.data.data.data;
		if (Array.isArray(res?.data?.data)) return res.data.data;
		return [];
	};

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
			if (nextValues.production_date__c) {
				const productionDate = dayjs(nextValues.production_date__c);
				nextValues.production_date__c = productionDate.isValid() ? productionDate : nextValues.production_date__c;
			}
			form.setFieldsValue(nextValues);
		}
	}, [modalIsVisible, modalType, modalUserInfo]);

	useEffect(() => {
		const loadMaterialOptions = async () => {
			try {
				setMaterialLoading(true);
				const res: any = await product_doc_detail_API.globalMaterial();
				const list = getResponseList(res);
				console.log('list', list);
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

	const loadCostCenterOptions = async () => {
		if (costCenterLoading || costCenterOptions.length) return;
		try {
			setCostCenterLoading(true);
			const res: any = await product_doc_detail_API.globalCostCenter();
			const options = getResponseList(res).reduce((acc: FormOption[], item: CostCenterItem) => {
				const label = String(item?.department__c || '').trim();
				const value = String(item?.department_code__c || '').trim();
				if (label && value) {
					acc.push({ label, value });
				}
				return acc;
			}, []);
			setCostCenterOptions(options);
		} catch (error: any) {
			setCostCenterOptions([]);
			message.error(error?.message || '获取成本中心数据失败');
		} finally {
			setCostCenterLoading(false);
		}
	};

	const loadWarehouseOptions = async () => {
		if (warehouseLoading || warehouseOptions.length) return;
		try {
			setWarehouseLoading(true);
			const res: any = await product_doc_detail_API.globalWarehouseInfo();
			const options = getResponseList(res).reduce((acc: FormOption[], item: WarehouseItem) => {
				const area = String(item?.area__c || '').trim();
				if (area) {
					acc.push({ label: area, value: area });
				}
				return acc;
			}, []);
			setWarehouseOptions(options);
		} catch (error: any) {
			setWarehouseOptions([]);
			message.error(error?.message || '获取接收仓库数据失败');
		} finally {
			setWarehouseLoading(false);
		}
	};

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

		if (name === 'production_date__c') {
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

		if (name === 'cost_center__c') {
			return (
				<ProFormSelect
					key={name}
					{...commonProps}
					options={costCenterOptions}
					fieldProps={{
						...fieldProps,
						showSearch: true,
						allowClear: true,
						loading: costCenterLoading,
						optionFilterProp: 'label',
					}}
				/>
			);
		}

		if (name === 'recept_area__c') {
			return (
				<ProFormSelect
					key={name}
					{...commonProps}
					options={warehouseOptions}
					fieldProps={{
						...fieldProps,
						showSearch: true,
						allowClear: true,
						loading: warehouseLoading,
						optionFilterProp: 'label',
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
			{CREATE_FIELDS.map(name =>
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
							name === 'type_move__c'
								? {
										fieldProps: {
											onChange: (value: string) => {
												if (value !== COST_CENTER_MOVE_TYPE) {
													form.setFieldValue('cost_center__c', undefined);
												}
												if (value !== RECEPT_AREA_MOVE_TYPE) {
													form.setFieldValue('recept_area__c', undefined);
												}
												if (value === COST_CENTER_MOVE_TYPE) {
													loadCostCenterOptions();
												}
												if (value === RECEPT_AREA_MOVE_TYPE) {
													loadWarehouseOptions();
												}
											},
										},
									}
								: name === 'unit__c'
									? {
											fieldProps: {
												disabled: true,
												readOnly: true,
											},
										}
									: name === 'export_way__c'
										? {
												fieldProps: {
													onChange: (value: string) => {
														if (value !== SPECIFIED_PRODUCTION_DATE_EXPORT_WAY) {
															form.setFieldValue('production_date__c', undefined);
														}
														if (value !== SPECIFIED_GROUP_EXPORT_WAY) {
															form.setFieldValue('export_group__c', undefined);
														}
													},
												},
											}
										: {}
						)
			)}

			<ProFormDependency name={['type_move__c']}>
				{({ type_move__c }) =>
					type_move__c === COST_CENTER_MOVE_TYPE
						? renderCreateField('cost_center__c', {
								rules: [{ required: true, message: '请输入成本中心' }],
							})
						: null
				}
			</ProFormDependency>

			<ProFormDependency name={['type_move__c']}>
				{({ type_move__c }) =>
					type_move__c === RECEPT_AREA_MOVE_TYPE
						? renderCreateField('recept_area__c', {
								rules: [{ required: true, message: '请选择接收仓库' }],
							})
						: null
				}
			</ProFormDependency>

			<ProFormDependency name={['export_way__c']}>
				{({ export_way__c }) =>
					export_way__c === SPECIFIED_PRODUCTION_DATE_EXPORT_WAY
						? renderCreateField('production_date__c', {
								rules: [{ required: true, message: '请选择生产日期' }],
							})
						: null
				}
			</ProFormDependency>

			<ProFormDependency name={['export_way__c']}>
				{({ export_way__c }) =>
					export_way__c === SPECIFIED_GROUP_EXPORT_WAY
						? renderCreateField('export_group__c', {
								rules: [{ required: true, message: '请输入出库组号' }],
							})
						: null
				}
			</ProFormDependency>
		</>
	);
	const renderEditField = (item: any) => {
		if (item?.name === 'production_date__c') {
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
		const formList = form.getFieldsValue();
		if (modalType == 'create') {
			CREATE_FIELDS.concat(['cost_center__c', 'recept_area__c', 'production_date__c', 'export_group__c']).forEach(field => {
				if (!Object.prototype.hasOwnProperty.call(formList, field) && Object.prototype.hasOwnProperty.call(values, field)) {
					formList[field] = values[field];
				}
			});
			if (formList.type_move__c !== COST_CENTER_MOVE_TYPE) {
				delete formList.cost_center__c;
			}
			if (formList.type_move__c !== RECEPT_AREA_MOVE_TYPE) {
				delete formList.recept_area__c;
			}
			if (formList.export_way__c !== SPECIFIED_PRODUCTION_DATE_EXPORT_WAY) {
				delete formList.production_date__c;
			}
			if (formList.export_way__c !== SPECIFIED_GROUP_EXPORT_WAY) {
				delete formList.export_group__c;
			}
		}
		if (formList.material_code__c) {
			formList.material_code__c = String(formList.material_code__c).trim();
		}
		if (formList.production_date__c) {
			formList.production_date__c = dayjs(formList.production_date__c).format('YYYY-MM-DD');
		}
		if (formList.export_group__c) {
			formList.export_group__c = String(formList.export_group__c).trim();
		}
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
