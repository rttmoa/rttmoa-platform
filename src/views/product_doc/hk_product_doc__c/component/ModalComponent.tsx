import renderFormItem from '@/hooks/useTableSchema/useTabFormItem';
import { message } from '@/hooks/useMessage';
import { WmsDocumentsEnum } from '@/enums/wmsEnum';
import { ModalForm, ProFormDatePicker } from '@ant-design/pro-components';
import { Button, DatePicker, Empty, Form, Input, Select, Space, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';

type SearchResultItem = {
	Ebeln?: string;
	IsBonded?: string;
	BioflaNo?: string;
	Ebelp?: string;
	SealNo?: string;
	Bsart?: string;
	FactoryId?: string;
	BedatC?: string;
	Country?: string;
	AedatC?: string;
	Lifnr?: string;
	ZsrmEbeln?: string;
	Loekz?: boolean;
	Matnr?: string;
	Maktx?: string;
	Werks?: string;
	Lgort?: string;
	Lgobe?: string;
	Menge?: string;
	Meins?: string;
	Uebto?: string;
	Untto?: string;
	EindtC?: string;
	VbelnVl?: string;
	PosnrVl?: string;
	Lfimg?: string;
	Vrkme?: string;
	Wbstk?: string;
	Vbeln?: string;
	Bldat?: string;
	ErrCode?: string;
	ErrMsg?: string;
	PstyvVl?: string;
	ZqqId?: string;
	ZqqYear?: string;
	Zdate?: string;
	Zbumen?: string;
	ZqqSta?: string;
	Jian?: string;
	ZSta?: string;
	LgortFc?: string;
	LgortJs?: string;
};

type WarehouseItem = {
	area__c?: string;
	area_code__c?: string;
};

type WarehouseFieldConfig = {
	key: 'inAreaCode' | 'outAreaCode' | 'fromAreaCode' | 'toAreaCode';
	label: string;
	placeholder: string;
};

type SubmittedResultItem = {
	document_id__c?: string;
	line_item__c?: string;
};

type SearchFormValues = {
	docType?: string;
	selectedDocNo?: string;
	manualDocNo?: string;
	year?: string;
	manualYear?: string;
	startDate?: Dayjs;
	endDate?: Dayjs;
};

const docTypeOptions = [
	{ label: WmsDocumentsEnum.PurchaseReceipt, value: WmsDocumentsEnum.PurchaseReceipt },
	{ label: WmsDocumentsEnum.SalesReturn, value: WmsDocumentsEnum.SalesReturn },
	{ label: WmsDocumentsEnum.SalesOut, value: WmsDocumentsEnum.SalesOut },
	{ label: WmsDocumentsEnum.PurchaseReturn, value: WmsDocumentsEnum.PurchaseReturn },
	{ label: WmsDocumentsEnum.DemandOut, value: WmsDocumentsEnum.DemandOut },
];

const currentYear = String(new Date().getFullYear());
const getToday = () => dayjs().startOf('day');
const formatSapDate = (value?: Dayjs) => (value ? value.format('YYYYMMDD') : '');
const getInitialSearchValues = (docType = WmsDocumentsEnum.PurchaseReceipt): SearchFormValues => {
	const today = getToday();
	return {
		docType,
		selectedDocNo: undefined,
		manualDocNo: '',
		year: String(today.year()),
		manualYear: String(today.year()),
		startDate: today,
		endDate: today,
	};
};

const normalizeCompareValue = (value?: string | number) => String(value ?? '').trim();

const getDocLineCompareKey = (documentId?: string | number, lineItem?: string | number) => {
	const normalizedDocumentId = normalizeCompareValue(documentId);
	const normalizedLineItem = normalizeCompareValue(lineItem);
	return normalizedDocumentId && normalizedLineItem ? `${normalizedDocumentId}::${normalizedLineItem}` : '';
};

const ModalComponent = (Params: any) => {
	const { api, form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo, modalResult, formSchemaField } = Params;
	const [searchForm] = Form.useForm();
	const [searchLoading, setSearchLoading] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [warehouseLoading, setWarehouseLoading] = useState(false);
	const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
	const [searchedDocNo, setSearchedDocNo] = useState('');
	const [searchedParams, setSearchedParams] = useState<{ docType?: string; docNo?: string; year?: string }>({});
	const [hasSearched, setHasSearched] = useState(false);
	const [docNoLoading, setDocNoLoading] = useState(false);
	const [docNoOptions, setDocNoOptions] = useState<{ label: string; value: string }[]>([]);
	const [warehouseOptions, setWarehouseOptions] = useState<{ label: string; value: string }[]>([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [submittedDocLineKeys, setSubmittedDocLineKeys] = useState<string[]>([]);
	const [warehouseValues, setWarehouseValues] = useState<{
		inAreaCode?: string;
		outAreaCode?: string;
		fromAreaCode?: string;
		toAreaCode?: string;
	}>({});
	const searchRequestIdRef = useRef(0);
	const docNoRequestIdRef = useRef(0);
	const activeSearchKeyRef = useRef('');
	const currentDocType = Form.useWatch('docType', searchForm) || WmsDocumentsEnum.PurchaseReceipt;
	const isDemandOutDoc = currentDocType === WmsDocumentsEnum.DemandOut;
	const selectedDocNo = normalizeCompareValue(Form.useWatch('selectedDocNo', searchForm));
	const dateYear = normalizeCompareValue(Form.useWatch('year', searchForm));
	const manualDocNo = normalizeCompareValue(Form.useWatch('manualDocNo', searchForm));
	const manualYear = normalizeCompareValue(Form.useWatch('manualYear', searchForm));
	const canSearchByDate = Boolean(currentDocType && selectedDocNo && (!isDemandOutDoc || dateYear));
	const canSearchByManual = Boolean(currentDocType && manualDocNo && (!isDemandOutDoc || manualYear));
	const getRowKey = (record: SearchResultItem) =>
		[record.Ebeln || record.VbelnVl || record.Vbeln || record.ZqqId || '', record.Ebelp || record.PosnrVl || record.Matnr || '', record.Matnr || '', record.Lgort || record.LgortFc || '', record.LgortJs || ''].join(
			'::'
		);
	const getCompareKeyByRecord = (record: SearchResultItem) => getDocLineCompareKey(record.Ebeln || record.VbelnVl || record.Vbeln || record.ZqqId, record.Ebelp || record.PosnrVl);
	const submittedDocLineKeySet = new Set(submittedDocLineKeys);

	const warehouseFieldConfigs = useMemo<WarehouseFieldConfig[]>(() => {
		switch (currentDocType) {
			case WmsDocumentsEnum.PurchaseReceipt:
			case WmsDocumentsEnum.SalesReturn:
				return [{ key: 'inAreaCode', label: '入库仓库', placeholder: '请选择入库仓库' }];
			case WmsDocumentsEnum.SalesOut:
			case WmsDocumentsEnum.PurchaseReturn:
				return [{ key: 'outAreaCode', label: '出库仓库', placeholder: '请选择出库仓库' }];
			case WmsDocumentsEnum.DemandOut:
				return [
					{ key: 'fromAreaCode', label: '发出仓库', placeholder: '请选择发出仓库' },
					{ key: 'toAreaCode', label: '接收仓库', placeholder: '请选择接收仓库' },
				];
			default:
				return [];
		}
	}, [currentDocType]);

	const clearSearchState = (clearSubmittedDocLineKeys = true) => {
		setSearchResults([]);
		setHasSearched(false);
		setSearchedDocNo('');
		setSearchedParams({});
		setSelectedRowKeys([]);
		setSearchLoading(false);
		setDocNoLoading(false);
		setSubmitLoading(false);
		if (clearSubmittedDocLineKeys) {
			setSubmittedDocLineKeys([]);
		}
		setWarehouseValues({});
		searchRequestIdRef.current += 1;
		docNoRequestIdRef.current += 1;
		activeSearchKeyRef.current = '';
	};

	const loadDocNoOptions = async (formValues?: Partial<SearchFormValues>, silent = false) => {
		const mergedValues = { ...searchForm.getFieldsValue(), ...formValues } as SearchFormValues;
		const { docType, startDate, endDate } = mergedValues;
		if (!docType || !startDate || !endDate) {
			if (!silent) message.warning('请选择单据类型和日期范围');
			return [];
		}
		const requestId = ++docNoRequestIdRef.current;
		try {
			setDocNoLoading(true);
			const res: any = await api.searchSapDocs({
				docType,
				startData: formatSapDate(startDate),
				endDate: formatSapDate(endDate),
			});
			if (requestId !== docNoRequestIdRef.current) return [];
			const outerData = res?.data ?? {};
			const responseData = outerData?.data ?? outerData ?? {};
			const results = Array.isArray(responseData?.results) ? responseData.results : [];
			const options = results
				.map((item: string) => {
					const value = normalizeCompareValue(item);
					return { label: value, value };
				})
				.filter((item: any) => item.value);
			setDocNoOptions(options);
			const currentSelectedDocNo = normalizeCompareValue(searchForm.getFieldValue('selectedDocNo'));
			if (currentSelectedDocNo && !options.some((item: any) => item.value === currentSelectedDocNo)) {
				searchForm.setFieldsValue({ selectedDocNo: undefined });
			}
			if (!silent) {
				message.success(outerData?.msg || responseData?.message || '单号查询成功');
			}
			return options;
		} catch (error: any) {
			if (requestId !== docNoRequestIdRef.current) return [];
			setDocNoOptions([]);
			searchForm.setFieldsValue({ selectedDocNo: undefined });
			message.error(error?.message || '查询单号失败');
			return [];
		} finally {
			// eslint-disable-next-line no-unsafe-finally
			if (requestId !== docNoRequestIdRef.current) return;
			setDocNoLoading(false);
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter' && modalType !== 'create') {
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
	}, [modalIsVisible, modalType, form]);

	useEffect(() => {
		if (modalType === 'create') {
			form.resetFields();
			const initialSearchValues = getInitialSearchValues();
			searchForm.setFieldsValue(initialSearchValues);
			setDocNoOptions([]);
			clearSearchState(true);
			if (modalIsVisible) {
				void loadDocNoOptions(initialSearchValues, true);
			}
		}
		if (modalType === 'edit' || modalIsVisible) {
			const nextValues = { ...(modalUserInfo || {}) };
			if (nextValues.production_date__c) {
				const productionDate = dayjs(nextValues.production_date__c);
				nextValues.production_date__c = productionDate.isValid() ? productionDate : nextValues.production_date__c;
			}
			form.setFieldsValue(nextValues);
		}
	}, [modalIsVisible, modalType, modalUserInfo, form, searchForm]);

	useEffect(() => {
		if (!modalIsVisible || modalType !== 'create') return;
		const formValues = searchForm.getFieldsValue() as SearchFormValues;
		const startDate = formValues.startDate || getToday();
		const endDate = formValues.endDate || getToday();
		searchForm.setFieldsValue({
			docType: currentDocType,
			selectedDocNo: undefined,
			manualDocNo: '',
			year: formValues.year || String(startDate.year()),
			manualYear: formValues.manualYear || String(startDate.year()),
			startDate,
			endDate,
		});
		setDocNoOptions([]);
		clearSearchState(true);
		void loadDocNoOptions({ docType: currentDocType, startDate, endDate, selectedDocNo: undefined }, true);
	}, [currentDocType, modalIsVisible, modalType]);

	useEffect(() => {
		const loadWarehouseOptions = async () => {
			try {
				setWarehouseLoading(true);
				const res: any = await api.globalWarehouseInfo();
				const list = Array.isArray(res?.data?.data?.data) ? res.data.data.data : Array.isArray(res?.data?.data) ? res.data.data : [];
				const options = list
					.map((item: WarehouseItem) => ({
						label: item.area__c || '',
						value: item.area_code__c || '',
					}))
					.filter((item: { label: string; value: string }) => item.label && item.value);
				setWarehouseOptions(options);
			} catch (error: any) {
				setWarehouseOptions([]);
				message.error(error?.message || '获取仓库数据失败');
			} finally {
				setWarehouseLoading(false);
			}
		};

		if (modalIsVisible && modalType === 'create') {
			loadWarehouseOptions();
		}
	}, [modalIsVisible, modalType]);

	const onFinish: any = (values: any) => {
		const formList = form.getFieldsValue();
		if (formList.production_date__c) {
			formList.production_date__c = dayjs(formList.production_date__c).format('YYYY-MM-DD');
		}
		if (modalType === 'edit') {
			formList._id = modalUserInfo._id;
		}
		modalResult && modalResult(modalType, formList || values);
	};

	const onOpenChange = (v: boolean) => {
		setModalIsVisible(v);
		if (!v) {
			form.resetFields();
			searchForm.resetFields();
			setDocNoOptions([]);
			clearSearchState(true);
		}
	};

	const handleLoadDocNos = async () => {
		try {
			const values = await searchForm.validateFields(['docType', 'startDate', 'endDate']);
			const startDate = values.startDate as Dayjs | undefined;
			const endDate = values.endDate as Dayjs | undefined;
			if (startDate && endDate && startDate.isAfter(endDate, 'day')) {
				message.warning('开始日期不能大于结束日期');
				return;
			}
			searchForm.setFieldsValue({ selectedDocNo: undefined });
			await loadDocNoOptions(values);
		} catch (error: any) {
			if (error?.errorFields) return;
			message.error(error?.message || '查询单号失败');
		}
	};

	const handleSearchDocument = async (mode: 'date' | 'manual') => {
		const fieldNames = mode === 'date' ? ['docType', 'selectedDocNo', ...(isDemandOutDoc ? ['year'] : [])] : ['docType', 'manualDocNo', ...(isDemandOutDoc ? ['manualYear'] : [])];
		const values = (await searchForm.validateFields(fieldNames)) as SearchFormValues;
		const docNo = normalizeCompareValue(mode === 'date' ? values.selectedDocNo : values.manualDocNo);
		const year = normalizeCompareValue(mode === 'date' ? values.year : values.manualYear) || currentYear;
		const searchParams = {
			docType: values.docType,
			docNo,
			...(isDemandOutDoc ? { year } : {}),
		};
		const nextSearchKey = `${searchParams.docType || ''}::${searchParams.docNo || ''}::${searchParams.year || ''}`;
		const requestId = ++searchRequestIdRef.current;
		try {
			clearSearchState(activeSearchKeyRef.current === nextSearchKey);
			if (activeSearchKeyRef.current !== nextSearchKey) {
				setSubmittedDocLineKeys([]);
			}
			setSearchLoading(true);
			const res: any = await api.searchSapDocument(searchParams);
			// if (requestId !== searchRequestIdRef.current) return;
			console.log('res', res);
			const responseData = res?.data?.data ?? res?.data ?? {};
			const results = Array.isArray(responseData?.results) ? responseData.results : [];
			const savedList: SubmittedResultItem[] = Array.isArray(responseData?.Saved) ? responseData.Saved : [];
			const resultCompareKeySet = new Set(results.map((item: any) => getCompareKeyByRecord(item)).filter(Boolean));
			const savedDocLineKeys = savedList.map(item => getDocLineCompareKey(item.document_id__c, item.line_item__c)).filter(key => key && resultCompareKeySet.has(key));
			setSearchResults(results);
			setSubmittedDocLineKeys(savedDocLineKeys);
			activeSearchKeyRef.current = nextSearchKey;
			setHasSearched(true);
			setSearchedDocNo(searchParams.docNo || '');
			setSearchedParams(searchParams);
			if (!results.length) {
				message.warning('根据单据未获取到数据');
			} else {
				message.success(responseData.message || '查询成功');
			}
		} catch (error: any) {
			if (requestId !== searchRequestIdRef.current) return;
			if (error?.errorFields) return;
			message.error(error?.message || '查询失败');
			setSearchLoading(false);
		} finally {
			setSearchLoading(false);
			// eslint-disable-next-line no-unsafe-finally
			if (requestId !== searchRequestIdRef.current) return;
		}
	};

	const handleSubmitDocument = async () => {
		try {
			if (!searchResults.length) {
				message.warning('请先查询到有效数据后再提交');
				return;
			}
			const selectableRowKeys = searchResults.map(item => getCompareKeyByRecord(item)).filter(key => key && !submittedDocLineKeySet.has(key));
			// if (!selectableRowKeys.length) {
			// 	message.warning('当前没有可提交的数据');
			// 	return;
			// }
			const selectedKeySet = new Set(selectedRowKeys.map(String));
			// const hasSelectedAllRows = selectableRowKeys.every(key => selectedKeySet.has(key));
			// if (!hasSelectedAllRows) {
			// 	message.warning('请先勾选全部数据后再提交');
			// 	return;
			// }
			const emptyField = warehouseFieldConfigs.find(field => !warehouseValues[field.key]);
			if (emptyField) return message.warning(`请选择${emptyField.label}`);
			const selectedRows = searchResults.filter(item => selectedKeySet.has(getRowKey(item)));
			setSubmitLoading(true);
			const submitParams = {
				...searchedParams,
				selectedRows,
				...(warehouseValues.inAreaCode ? { in_area_code__c: warehouseValues.inAreaCode, area_code__c: warehouseValues.inAreaCode } : {}),
				...(warehouseValues.outAreaCode ? { out_area_code__c: warehouseValues.outAreaCode, area_code__c: warehouseValues.outAreaCode } : {}),
				...(warehouseValues.fromAreaCode ? { from_area_code__c: warehouseValues.fromAreaCode } : {}),
				...(warehouseValues.toAreaCode ? { to_area_code__c: warehouseValues.toAreaCode } : {}),
			};
			const data: any = await api.submitSapDocument(submitParams);
			console.log('data', data);
			const responseData = data?.data?.data ?? data?.data ?? {};
			const savedList: SubmittedResultItem[] = Array.isArray(responseData?.Saved) ? responseData.Saved : [];
			const savedDocLineKeys = savedList.map(item => getDocLineCompareKey(item.document_id__c, item.line_item__c)).filter(Boolean);
			if (responseData.success) {
				message.success(responseData.message || '提交成功');
				if (savedDocLineKeys.length) {
					setSubmittedDocLineKeys(prev => Array.from(new Set([...prev, ...savedDocLineKeys])));
				}
				setSelectedRowKeys([]);
				modalResult && modalResult('refresh', submitParams);
				setSubmitLoading(false);
			} else {
				message.error(responseData.message || '提交失败');
				setSubmitLoading(false);
			}
		} catch (error: any) {
			if (error?.errorFields) return;
			message.error(error?.message || '提交失败');
			setSubmitLoading(false);
		} finally {
			setSubmitLoading(false);
		}
	};

	const columns = useMemo(() => {
		const purchaseColumns = [
			{ title: '采购凭证', dataIndex: 'Ebeln', key: 'Ebeln', width: 140 },
			{ title: '行号', dataIndex: 'Ebelp', key: 'Ebelp', width: 100 },
			{ title: '物料代码', dataIndex: 'Matnr', key: 'Matnr', width: 120 },
			{ title: '物料名称', dataIndex: 'Maktx', key: 'Maktx', width: 180 },
			{ title: '入库数量', dataIndex: 'Menge', key: 'Menge', width: 100 },
			{ title: '入库仓库代码', dataIndex: 'Lgort', key: 'Lgort', width: 120 },
			{ title: '入库仓库名称', dataIndex: 'Lgobe', key: 'Lgobe', width: 160 },
			{ title: '柜号', dataIndex: 'ZhuoGuiHao', key: 'ZhuoGuiHao', width: 160 },
			{ title: '合同号', dataIndex: 'ZhuoGuiHeTongHao', key: 'ZhuoGuiHeTongHao', width: 160 },
			{ title: '基本单位', dataIndex: 'Meins', key: 'Meins', width: 100 },
			{ title: '是否保税', dataIndex: 'IsBonded', key: 'IsBonded', width: 100 },
			{ title: '提单号', dataIndex: 'BioflaNo', key: 'BioflaNo', width: 120 },
			{ title: '封签号', dataIndex: 'SealNo', key: 'SealNo', width: 120 },
			{ title: '订单类型', dataIndex: 'Bsart', key: 'Bsart', width: 100 },
			{ title: '厂号', dataIndex: 'FactoryId', key: 'FactoryId', width: 100 },
			{ title: '订单凭证日期', dataIndex: 'BedatC', key: 'BedatC', width: 120 },
			{ title: '国家', dataIndex: 'Country', key: 'Country', width: 100 },
			{ title: '记录创建日期', dataIndex: 'AedatC', key: 'AedatC', width: 120 },
			{ title: '供应商', dataIndex: 'Lifnr', key: 'Lifnr', width: 120 },
			{ title: 'SRM采购订单号', dataIndex: 'ZsrmEbeln', key: 'ZsrmEbeln', width: 140 },
			{ title: '删除标志', dataIndex: 'Loekz', key: 'Loekz', width: 100 },
			{ title: '工厂', dataIndex: 'Werks', key: 'Werks', width: 100 },
			{ title: '过量交货容差', dataIndex: 'Uebto', key: 'Uebto', width: 120 },
			{ title: '交货不足容差', dataIndex: 'Untto', key: 'Untto', width: 120 },
			{ title: '交货日期', dataIndex: 'EindtC', key: 'EindtC', width: 110 },
		];

		const salesColumns = [
			{ title: '出库单号', dataIndex: 'VbelnVl', key: 'VbelnVl', width: 140 },
			{ title: '行项目', dataIndex: 'PosnrVl', key: 'PosnrVl', width: 100 },
			{ title: '物料编码', dataIndex: 'Matnr', key: 'Matnr', width: 120 },
			{ title: '物料名称', dataIndex: 'Maktx', key: 'Maktx', width: 180 },
			{ title: '交货数量', dataIndex: 'Lfimg', key: 'Lfimg', width: 100 },
			{ title: '销售单位', dataIndex: 'Vrkme', key: 'Vrkme', width: 90 },
			{ title: '存储地点', dataIndex: 'Lgort', key: 'Lgort', width: 100 },
			{ title: '仓库描述', dataIndex: 'Lgobe', key: 'Lgobe', width: 160 },

			{ title: '销售组织', dataIndex: 'Vkorg', key: 'Vkorg', width: 160 },
			{ title: '客户编码', dataIndex: 'Kunnr', key: 'Kunnr', width: 160 },
			{ title: '客户名称', dataIndex: 'Kunnrt', key: 'Kunnrt', width: 160 },

			{ title: '移动状态', dataIndex: 'Wbstk', key: 'Wbstk', width: 100 },
			{ title: '销售凭证', dataIndex: 'Vbeln', key: 'Vbeln', width: 120 },
			{ title: '凭证日期', dataIndex: 'BldatC', key: 'BldatC', width: 120 },
			{ title: '错误编码', dataIndex: 'ErrCode', key: 'ErrCode', width: 100 },
			{ title: '错误信息', dataIndex: 'ErrMsg', key: 'ErrMsg', width: 180 },
			{ title: '项目类别', dataIndex: 'PstyvVl', key: 'PstyvVl', width: 100 },
		];

		const demandColumns = [
			{ title: '单据编号', dataIndex: 'ZqqId', key: 'ZqqId', width: 140 },
			{ title: '年度', dataIndex: 'ZqqYear', key: 'ZqqYear', width: 100 },
			{ title: '工厂', dataIndex: 'Werks', key: 'Werks', width: 100 },
			{ title: '日期', dataIndex: 'Zdate', key: 'Zdate', width: 120 },
			{ title: '部门', dataIndex: 'Zbumen', key: 'Zbumen', width: 160 },
			{ title: '审核状态', dataIndex: 'ZqqSta', key: 'ZqqSta', width: 100 },
			{ title: '物料编码', dataIndex: 'Matnr', key: 'Matnr', width: 120 },
			{ title: '物料名称', dataIndex: 'Maktx', key: 'Maktx', width: 180 },
			{ title: '数量', dataIndex: 'Menge', key: 'Menge', width: 100 },
			{ title: '基本单位', dataIndex: 'Meins', key: 'Meins', width: 100 },
			{ title: '件数', dataIndex: 'Jian', key: 'Jian', width: 100 },
			{ title: '单据状态', dataIndex: 'ZSta', key: 'ZSta', width: 100 },
			{ title: '发出仓库', dataIndex: 'LgortFc', key: 'LgortFc', width: 120 },
			{ title: '接收仓库', dataIndex: 'LgortJs', key: 'LgortJs', width: 120 },
		];

		switch (currentDocType) {
			case WmsDocumentsEnum.SalesOut:
			case WmsDocumentsEnum.SalesReturn:
				return salesColumns;
			case WmsDocumentsEnum.DemandOut:
				return demandColumns;
			case WmsDocumentsEnum.PurchaseReceipt:
			case WmsDocumentsEnum.PurchaseReturn:
			default:
				return purchaseColumns;
		}
	}, [currentDocType]);

	const createContent = (
		<div className='space-y-4 w-full overflow-hidden'>
			<Form form={searchForm} initialValues={getInitialSearchValues()}>
				<Space direction='vertical' size={12} className='w-full'>
					<Space wrap size={8}>
						<Form.Item name='docType' rules={[{ required: true, message: '请选择单据类型' }]} className='mb-0'>
							<Select style={{ width: 180 }} placeholder='请选择单据类型' options={docTypeOptions} />
						</Form.Item>
						方式一
						<Form.Item name='startDate' rules={[{ required: true, message: '请选择开始日期' }]} className='mb-0'>
							<DatePicker style={{ width: 120 }} placeholder='开始日期' format='YYYY-MM-DD' onChange={() => searchForm.setFieldsValue({ selectedDocNo: undefined })} />
						</Form.Item>
						<Form.Item name='endDate' rules={[{ required: true, message: '请选择结束日期' }]} className='mb-0'>
							<DatePicker style={{ width: 120 }} placeholder='结束日期' format='YYYY-MM-DD' onChange={() => searchForm.setFieldsValue({ selectedDocNo: undefined })} />
						</Form.Item>
						<Form.Item name='selectedDocNo' rules={[{ required: true, message: '请选择单号' }]} className='mb-0'>
							<Select style={{ width: 270 }} placeholder='请选择单号' options={docNoOptions} loading={docNoLoading} allowClear showSearch optionFilterProp='label' />
						</Form.Item>
						{isDemandOutDoc ? (
							<Form.Item name='year' rules={[{ required: true, message: '请输入年份' }]} className='mb-0'>
								<Input style={{ width: 100 }} placeholder='年份' allowClear />
							</Form.Item>
						) : null}
						<Form.Item className='mb-0'>
							<Space size={8}>
								<Button onClick={handleLoadDocNos} loading={docNoLoading}>
									查询单号
								</Button>
								<Button type='primary' onClick={() => handleSearchDocument('date')} loading={searchLoading} disabled={!canSearchByDate}>
									获取数据
								</Button>
							</Space>
						</Form.Item>
					</Space>
					<Space wrap size={8}>
						<Form.Item className='mb-0'>
							<Select style={{ width: 180, visibility: 'hidden' }} disabled />
						</Form.Item>
						方式二
						<Form.Item name='manualDocNo' rules={[{ required: true, message: '请输入单号查询明细' }]} className='mb-0'>
							<Input style={{ width: 270 }} placeholder='请输入单号' allowClear />
						</Form.Item>
						{isDemandOutDoc ? (
							<Form.Item name='manualYear' rules={[{ required: true, message: '请输入年份' }]} className='mb-0'>
								<Input style={{ width: 100 }} placeholder='年份' allowClear />
							</Form.Item>
						) : null}
						<Form.Item className='mb-0'>
							<Space size={8}>
								<Button type='primary' onClick={() => handleSearchDocument('manual')} loading={searchLoading} disabled={!canSearchByManual}>
									获取数据
								</Button>
								<Button
									onClick={() => {
										const initialSearchValues = getInitialSearchValues();
										searchForm.setFieldsValue(initialSearchValues);
										setDocNoOptions([]);
										clearSearchState(true);
										void loadDocNoOptions(initialSearchValues, true);
									}}
								>
									重置
								</Button>
							</Space>
						</Form.Item>
					</Space>
				</Space>
			</Form>

			<div className='w-full overflow-x-auto'>
				{searchResults.length > 0 ? (
					<>
						<div className='mb-4 flex justify-end gap-3'>
							{warehouseFieldConfigs.map(field => (
								<div key={field.key} className='flex items-center gap-3'>
									<span>{field.label}</span>
									<Select
										style={{ width: 220 }}
										placeholder={field.placeholder}
										options={warehouseOptions}
										value={warehouseValues[field.key]}
										loading={warehouseLoading}
										onChange={value => setWarehouseValues(prev => ({ ...prev, [field.key]: value }))}
									/>
								</div>
							))}
						</div>
						<Table<SearchResultItem>
							rowKey={getRowKey}
							className='[&_.ant-table-body]:min-h-[400px]'
							columns={columns}
							dataSource={searchResults}
							rowSelection={{
								selectedRowKeys,
								onChange: keys => setSelectedRowKeys(keys),
								getCheckboxProps: record => ({
									disabled: submittedDocLineKeySet.has(getCompareKeyByRecord(record)),
								}),
							}}
							loading={searchLoading}
							pagination={false}
							size='small'
							scroll={{ x: 'max-content', y: 400 }}
							style={{ width: '100%' }}
						/>
					</>
				) : (
					<div className='flex min-h-[420px] items-center justify-center rounded-md border border-dashed border-[#d9d9d9] bg-[#fafafa]'>
						{searchLoading ? null : hasSearched ? (
							<Empty description={`根据单号 ${searchedDocNo || ''} 未在sap系统中查找到数据`} />
						) : (
							<Empty description='请选择单据类型后先查询单号或直接输入单号，再点击获取数据' />
						)}
					</div>
				)}
			</div>
		</div>
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

	return (
		<ModalForm
			width={1200}
			className='px-[20px] py-[5px]'
			key={modalUserInfo?._id}
			form={form}
			title={
				<div>
					<span>{modalTitle}</span>
					<span className='text-[14px]'>{modalUserInfo?.name || ''}</span>
				</div>
			}
			open={modalIsVisible}
			layout='horizontal'
			labelCol={{ span: 6 }}
			wrapperCol={{ span: 14 }}
			grid
			rowProps={{ gutter: [16, 0] }}
			modalProps={{ destroyOnClose: true, styles: { body: { minHeight: 600 } } }}
			onOpenChange={onOpenChange}
			onFinish={onFinish}
			submitter={
				modalType === 'create'
					? {
							render: () => [
								<Button key='submit-document' type='primary' loading={submitLoading} onClick={handleSubmitDocument}>
									提交
								</Button>,
							],
						}
					: undefined
			}
		>
			{modalType === 'create' ? createContent : formSchemaField.map((item: any) => renderEditField(item))}
		</ModalForm>
	);
};

export default ModalComponent;
