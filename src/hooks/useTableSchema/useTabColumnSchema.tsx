import { useMemo } from 'react';
import { Tag } from 'antd';
import dayjs from 'dayjs';

const numberFormatter = new Intl.NumberFormat();

// 处理Schema类型
const useTabColumnSchema = (schema: any) => {
	return useMemo(() => {
		const columnsField = [];
		const schemaCount = Object.keys(schema || {}).length;

		for (const field in schema) {
			if (String(field).startsWith('__')) continue;

			const item = schema[field];
			const setWidth = item?.width ? Number(item.width) : schemaCount > 7 ? 120 : undefined;

			const col: any = {
				title: <span className='text-[13px] font-sans'>{item?.label}</span>,
				dataIndex: field,
				fixed: item?.fixed || false,
				align: item?.align || 'left',
				width: setWidth,
				sorter: item?.sorter ?? true,
				defaultSortOrder: item?.defaultSortOrder,
				editable: () => Boolean(item?.editable),
				ellipsis: true,
				tooltip: `${item?.label}：${field}`,
				hideInSearch: !item?.query,
			};

			switch (item.type) {
				case 'string': {
					col.valueType = 'text';
					col.fieldProps = { placeholder: `请输入${item.label}` };
					break;
				}

				case 'number': {
					col.valueType = 'digit';
					col.fieldProps = { placeholder: `请输入${item.label}` };
					col.render = (_: any, record: any) => {
						const val = record[field];
						if (val === undefined || val === null || val === '') return '-';
						return numberFormatter.format(val);
					};
					break;
				}

				case 'date': {
					col.valueType = 'date';
					col.fieldProps = { placeholder: `请选择${item.label}` };
					col.render = (_: any, record: any) => {
						const v = record[field];
						if (v === null || v === undefined || v === '') return <span>-</span>;

						if (Array.isArray(v)) {
							const a = v[0] ? dayjs(v[0]) : null;
							const b = v[1] ? dayjs(v[1]) : null;
							const sa = a && a.isValid() ? a.format('YYYY-MM-DD') : '-';
							const sb = b && b.isValid() ? b.format('YYYY-MM-DD') : '-';
							return <span>{`${sa} ~ ${sb}`}</span>;
						}

						const d = dayjs(v);
						if (!d.isValid()) return <span>{String(v)}</span>;
						return <span>{d.format('YYYY-MM-DD')}</span>;
					};
					break;
				}

				case 'select': {
					const opts = item.options || [];
					const optionMap = new Map(opts.map((o: any) => [o?.value, o]));

					col.valueType = 'select';
					col.fieldProps = {
						options: opts.map((o: any) => ({
							label: o.label,
							value: o.value,
						})),
					};
					col.render = (_: any, record: any) => {
						const val = record[field];
						const cfg: any = optionMap.get(val);
						return (
							<Tag color={cfg?.color || 'default'} style={{ color: 'black' }}>
								{cfg?.label || val}
							</Tag>
						);
					};
					break;
				}
			}

			columnsField.push(col);
		}

		return columnsField;
	}, [schema]);
};

export default useTabColumnSchema;
