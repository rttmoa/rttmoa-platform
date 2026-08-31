import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DeleteOutlined, HolderOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, InputNumber, Modal, Popconfirm, Select, Space, Switch, Table, Tooltip } from 'antd';
import { type DragEndEvent, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { initTableListView, saveTableListView } from '@/api/modules/config';
import { message } from '@/hooks/useMessage';
import './index.less';

type SchemaItem = {
	_id?: string;
	object?: string;
	label?: string;
	type?: string;
	query?: boolean;
	editable?: boolean;
	width?: number | null;
	options?: any[];
	[key: string]: any;
};

type ColumnSchema = Record<string, SchemaItem>;

type VisibleColumnRow = {
	id: string;
	_id?: string;
	object?: string;
	field?: string;
	type?: string;
	label?: string;
	width?: number | null;
	query?: boolean;
	editable?: boolean;
	options?: any[];
};

type SortRuleRow = {
	id: string;
	_id?: string;
	object?: string;
	field?: string;
	order?: 'ascend' | 'descend';
};

export type TableListViewValue = {
	columns: Array<{
		_id?: string;
		object?: string;
		name: string;
		label?: string;
		width?: number | null;
		query?: boolean;
		editable?: boolean;
		type?: string;
		options?: any[];
		sort: number;
	}>;
	sortRules: Array<{
		_id?: string;
		object?: string;
		name: string;
		order: 'ascend' | 'descend';
		sort: number;
	}>;
};

type TableListViewProps = {
	columnSchema?: ColumnSchema;
	initColumnSchema?: ColumnSchema;
	disabled?: boolean;
	toolbarIconStyle?: React.CSSProperties;
	reloadTable?: () => void | Promise<void>;
	onSubmit?: (value: TableListViewValue) => void | Promise<void>;
};

type DragHandleContextValue = {
	setActivatorNodeRef?: (element: HTMLElement | null) => void;
	listeners?: ReturnType<typeof useSortable>['listeners'];
};

const DragHandleContext = createContext<DragHandleContextValue>({});

const createRowId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const buildVisibleColumns = (columnSchema: ColumnSchema = {}): VisibleColumnRow[] => {
	return Object.entries(columnSchema)
		.filter(([name, item]) => !name.startsWith('__') && item && typeof item === 'object')
		.map(([field, item], index) => buildVisibleColumnRow(field, item, index));
};

const buildVisibleColumnRow = (field: string, item: SchemaItem, index: number | string): VisibleColumnRow => ({
	id: `${field}-${index}`,
	_id: item._id,
	object: item.object,
	field,
	label: item.label || field,
	width: item.width ?? null,
	type: item.type,
	query: Boolean(item.query),
	editable: Boolean(item.editable),
	options: item.options,
});

const SortableBodyRow = (props: React.HTMLAttributes<HTMLTableRowElement> & { 'data-row-key': string }) => {
	const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
		id: props['data-row-key'],
	});

	const style: React.CSSProperties = {
		...props.style,
		transform: CSS.Transform.toString(transform),
		transition,
		...(isDragging ? { position: 'relative', zIndex: 2 } : {}),
	};

	return (
		<DragHandleContext.Provider value={{ setActivatorNodeRef, listeners }}>
			<tr {...props} ref={setNodeRef} style={style} {...attributes} />
		</DragHandleContext.Provider>
	);
};

const DragHandle = () => {
	const { setActivatorNodeRef, listeners } = useContext(DragHandleContext);

	return <Button type='text' size='small' icon={<HolderOutlined />} style={{ cursor: 'grab', color: '#8c8c8c' }} ref={setActivatorNodeRef as any} {...listeners} />;
};

const TableListView: React.FC<TableListViewProps> = ({ columnSchema = {}, initColumnSchema = {}, disabled, toolbarIconStyle, reloadTable, onSubmit }) => {
	const [open, setOpen] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [initLoading, setInitLoading] = useState(false);
	const [visibleColumns, setVisibleColumns] = useState<VisibleColumnRow[]>([]);
	const [sortRules, setSortRules] = useState<SortRuleRow[]>([]);
	const [editingFieldRowId, setEditingFieldRowId] = useState<string>();

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
	const fieldSchema = useMemo(() => (Object.keys(initColumnSchema).length ? initColumnSchema : columnSchema), [columnSchema, initColumnSchema]);

	const schemaOptions = useMemo(() => {
		return Object.entries(fieldSchema)
			.filter(([name, item]) => !name.startsWith('__') && item && typeof item === 'object')
			.map(([value, item]) => ({
				value,
				label: item.label ? `${item.label}（${value}）` : value,
				schema: item,
			}));
	}, [fieldSchema]);

	const currentObject = useMemo(() => {
		const schemaList = Object.values(columnSchema).filter(item => item && typeof item === 'object');
		return schemaList.find(item => item.object)?.object;
	}, [columnSchema]);

	useEffect(() => {
		if (open) {
			setVisibleColumns(buildVisibleColumns(columnSchema));
			setSortRules([]);
			setEditingFieldRowId(undefined);
		}
	}, [columnSchema, open]);

	const updateVisibleColumn = (id: string, nextValue: Partial<VisibleColumnRow>) => {
		setVisibleColumns(prev => prev.map(item => (item.id === id ? { ...item, ...nextValue } : item)));
	};

	const updateSortRule = (id: string, nextValue: Partial<SortRuleRow>) => {
		setSortRules(prev => prev.map(item => (item.id === id ? { ...item, ...nextValue } : item)));
	};

	const handleDeleteVisibleColumn = (record: VisibleColumnRow) => {
		setVisibleColumns(prev => prev.filter(item => item.id !== record.id));
		if (record.field) {
			setSortRules(prev => prev.filter(item => item.field !== record.field));
		}
	};

	const handleAddVisibleColumn = () => {
		setVisibleColumns(prev => {
			const selectedFields = new Set(prev.map(item => item.field).filter(Boolean));
			const nextField = Object.entries(fieldSchema).find(([name, item]) => !name.startsWith('__') && item && typeof item === 'object' && !selectedFields.has(name));

			if (!nextField) {
				return [...prev, { id: createRowId('column'), query: false, editable: false }];
			}

			const [field, item] = nextField;
			return [...prev, buildVisibleColumnRow(field, item, createRowId('column'))];
		});
	};

	const handleSelectColumnField = (id: string, field: string) => {
		const selected = schemaOptions.find(item => item.value === field);
		const nextValue: Partial<VisibleColumnRow> = {
			_id: selected?.schema?._id,
			object: selected?.schema?.object,
			field,
			label: selected?.schema?.label || field,
			width: selected?.schema?.width ?? null,
			type: selected?.schema?.type,
			query: Boolean(selected?.schema?.query),
			editable: Boolean(selected?.schema?.editable),
			options: selected?.schema?.options,
		};

		setVisibleColumns(prev => {
			const existingRow = prev.find(item => item.id !== id && item.field === field);
			if (existingRow) {
				return prev.filter(item => item.id !== id).map(item => (item.id === existingRow.id ? { ...item, ...nextValue } : item));
			}

			return prev.map(item => (item.id === id ? { ...item, ...nextValue } : item));
		});
		setEditingFieldRowId(undefined);
	};

	const handleSelectSortRuleField = (id: string, field: string) => {
		const selected = schemaOptions.find(item => item.value === field);
		updateSortRule(id, {
			_id: selected?.schema?._id,
			object: selected?.schema?.object,
			field,
		});
	};

	const handleVisibleDragEnd = ({ active, over }: DragEndEvent) => {
		if (!over || active.id === over.id) return;

		setVisibleColumns(prev => {
			const activeIndex = prev.findIndex(item => item.id === String(active.id));
			const overIndex = prev.findIndex(item => item.id === String(over.id));
			if (activeIndex < 0 || overIndex < 0) return prev;
			return arrayMove(prev, activeIndex, overIndex);
		});
	};

	const handleSubmit = async () => {
		const visibleColumnFields = new Set(visibleColumns.map(item => item.field).filter(Boolean));
		const value: TableListViewValue = {
			columns: visibleColumns
				.filter(item => item.field)
				.map((item, index) => ({
					_id: item._id,
					object: item.object,
					name: item.field!,
					label: item.label,
					width: item.width,
					query: item.query,
					editable: item.editable,
					options: item.options,
					type: item.type,
					sort: index + 1,
				})),
			sortRules: sortRules
				.filter(item => item.field && visibleColumnFields.has(item.field))
				.map((item, index) => ({
					_id: item._id,
					object: item.object,
					name: item.field!,
					order: item.order || 'ascend',
					sort: index + 1,
				})),
		};
		setSubmitLoading(true);
		try {
			const res = await saveTableListView(value);
			if (res?.code === 200 && res?.data?.success) {
				await onSubmit?.(value);
				message.success(res.data.message || res.msg || '列表视图设置保存成功');
				setOpen(false);
				await reloadTable?.();
				return;
			}

			message.error(res?.data?.message || res?.msg || '列表视图设置保存失败');
		} catch (error: any) {
			message.error(error?.message || error?.msg || '列表视图设置保存失败');
		} finally {
			setSubmitLoading(false);
		}
	};

	const handleInitTableListView = () => {
		if (!currentObject) {
			message.warning('未获取到 object，无法初始化列表视图');
			return;
		}

		Modal.confirm({
			title: '初始化列表视图',
			content: '确定要初始化当前列表视图吗？',
			okText: '确定',
			cancelText: '取消',
			onOk: async () => {
				setInitLoading(true);
				try {
					const res = await initTableListView({ object: currentObject });
					if (res?.code === 200 && res?.data?.success) {
						message.success(res.data.message || res.msg || '初始化列表视图成功');
						await reloadTable?.();
						return;
					}

					message.error(res?.data?.message || res?.msg || '初始化列表视图失败');
				} catch (error: any) {
					message.error(error?.message || error?.msg || '初始化列表视图失败');
				} finally {
					setInitLoading(false);
				}
			},
		});
	};

	const columnTableColumns = [
		{
			title: '',
			dataIndex: 'sort',
			width: 36,
			render: () => <DragHandle />,
		},
		{
			title: '字段',
			dataIndex: 'label',
			render: (_: string, record: VisibleColumnRow) => {
				if (editingFieldRowId === record.id) {
					return (
						<Select
							autoFocus
							showSearch
							size='small'
							placeholder='请选择字段'
							style={{ width: '100%' }}
							value={record.field}
							options={schemaOptions}
							optionFilterProp='label'
							onBlur={() => setEditingFieldRowId(undefined)}
							onChange={value => handleSelectColumnField(record.id, value)}
						/>
					);
				}

				return (
					<span style={{ display: 'inline-block', width: '100%', minHeight: 24, cursor: 'pointer' }} onDoubleClick={() => setEditingFieldRowId(record.id)}>
						{record.label || '===========  双击选择字段  ==========='}
					</span>
				);
			},
		},
		{
			title: '表格宽度',
			dataIndex: 'width',
			width: 120,
			render: (_: number | null, record: VisibleColumnRow) => (
				<InputNumber size='small' min={0} placeholder='宽度' style={{ width: '100%' }} value={record.width ?? undefined} onChange={value => updateVisibleColumn(record.id, { width: value ?? null })} />
			),
		},
		{
			title: '表头是否可查询',
			dataIndex: 'query',
			width: 100,
			render: (_: boolean, record: VisibleColumnRow) => <Switch size='small' checked={record.query} onChange={checked => updateVisibleColumn(record.id, { query: checked })} />,
		},
		{
			title: '表格是否可编辑',
			dataIndex: 'editable',
			width: 100,
			render: (_: boolean, record: VisibleColumnRow) => <Switch size='small' checked={record.editable} onChange={checked => updateVisibleColumn(record.id, { editable: checked })} />,
		},
		{
			title: '',
			dataIndex: 'action',
			width: 54,
			align: 'center' as const,
			render: (_: unknown, record: VisibleColumnRow) => (
				<Popconfirm title='确认删除' description='是否删除当前显示列？' okText='确定' cancelText='取消' onConfirm={() => handleDeleteVisibleColumn(record)}>
					<Button type='text' danger size='small' icon={<DeleteOutlined />} />
				</Popconfirm>
			),
		},
	];

	const sortRuleTableColumns = [
		{
			title: '',
			dataIndex: 'space',
			width: 36,
		},
		{
			title: '排序字段',
			dataIndex: 'field',
			render: (_: string, record: SortRuleRow) => (
				<Select
					showSearch
					size='small'
					placeholder='请选择字段'
					style={{ width: '100%' }}
					value={record.field}
					options={schemaOptions}
					optionFilterProp='label'
					onChange={value => handleSelectSortRuleField(record.id, value)}
				/>
			),
		},
		{
			title: '排序方式',
			dataIndex: 'order',
			width: 180,
			render: (_: string, record: SortRuleRow) => (
				<Select
					size='small'
					placeholder='请选择排序方式'
					style={{ width: '100%' }}
					value={record.order}
					options={[
						{ label: '正序', value: 'ascend' },
						{ label: '倒序', value: 'descend' },
					]}
					onChange={value => updateSortRule(record.id, { order: value })}
				/>
			),
		},
		{
			title: '',
			dataIndex: 'action',
			width: 54,
			align: 'center' as const,
			render: (_: unknown, record: SortRuleRow) => (
				<Popconfirm title='确认删除' description='是否删除当前排序规则？' okText='确定' cancelText='取消' onConfirm={() => setSortRules(prev => prev.filter(item => item.id !== record.id))}>
					<Button type='text' danger size='small' icon={<DeleteOutlined />} />
				</Popconfirm>
			),
		},
	];

	return (
		<>
			<Tooltip title='列表视图设置' className='text-lg'>
				<span style={toolbarIconStyle} onClick={() => !disabled && setOpen(true)}>
					<SettingOutlined />
				</span>
			</Tooltip>

			<Modal
				className='table-list-view-modal'
				title='编辑 列表视图'
				open={open}
				width={960}
				confirmLoading={submitLoading}
				onCancel={() => setOpen(false)}
				onOk={handleSubmit}
				okText='提交'
				cancelText='取消'
				destroyOnClose
			>
				<Space direction='vertical' size={12} style={{ width: '100%' }}>
					<div>
						<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
							<Button size='small' loading={initLoading} onClick={handleInitTableListView}>
								初始化列表视图
							</Button>
						</div>
						<div style={{ marginBottom: 6 }}>
							<span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>
							显示的列
						</div>
						<DndContext sensors={sensors} onDragEnd={handleVisibleDragEnd}>
							<SortableContext items={visibleColumns.map(item => item.id)} strategy={verticalListSortingStrategy}>
								<Table
									size='small'
									bordered
									pagination={false}
									rowKey='id'
									columns={columnTableColumns}
									dataSource={visibleColumns}
									scroll={{ y: 314, x: 840 }}
									components={{ body: { row: SortableBodyRow } }}
								/>
							</SortableContext>
						</DndContext>
						<Button type='link' size='small' icon={<PlusOutlined />} style={{ paddingInline: 0, marginTop: 8 }} onClick={handleAddVisibleColumn}>
							新增
						</Button>
					</div>

					<div>
						<div style={{ marginBottom: 6 }}>默认排序规则</div>
						<Table size='small' bordered pagination={false} rowKey='id' columns={sortRuleTableColumns} dataSource={sortRules || []} scroll={{ y: 120, x: 840 }} />
						<Button type='link' size='small' icon={<PlusOutlined />} style={{ paddingInline: 0, marginTop: 8 }} onClick={() => setSortRules(prev => [...prev, { id: createRowId('sort'), order: 'ascend' }])}>
							新增
						</Button>
					</div>
				</Space>
			</Modal>
		</>
	);
};

export default TableListView;
