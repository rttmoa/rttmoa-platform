import { Tag } from 'antd';
import dayjs from 'dayjs';

// ! 处理服务端 FieldSchema 对象定义的字段名称、字段类型、是否可查询、是否可行内编辑
const useTabColumnSchema = (schema: any) => {
	const columnsField = [];

	for (const field in schema) {
		if (String(field).startsWith('__')) continue;
		const item = schema[field];

		let col: any = {
			title: <span className='text-[13px] font-sans'>{item?.label}</span>, // 时间
			dataIndex: field, // time__c
			fixed: item?.fixed || false, // 默认不固定：left、right
			align: item?.align || 'center', // 默认居中：left、center、right
			width: item?.width || 120, // 默认150
			sorter: item?.sorter || true, // 默认可排序
			editable: () => item?.editable || false, // 默认不可行内编辑表格
			ellipsis: true,
			tooltip: `${item.label}：${field}`,
			hideInSearch: !item?.query,
		};

		// hideInSearch: false, // 在 Query 搜索栏中不展示
		// hideInTable: true, // 在 Table 中不展示此列
		// hideInForm: true, // 在 Form 中不展示此列
		// hideInSetting: true, // 在 Setting 中不展示
		// hideInDescriptions: true, // 在 Drawer 查看详情中不展示

		// 表格 & form 类型
		switch (item.type) {
			case 'string': {
				col.valueType = 'text';
				col.fieldProps = { placeholder: `请输入${item.label}` };
				break;
			}

			case 'number': {
				col.valueType = 'digit';
				col.fieldProps = { placeholder: `请输入${item.label}` };
				// 列中格式化显示：1,000 → 33,500,000
				col.render = (_: any, record: any) => {
					const val = record[field];
					if (val === undefined || val === null || val === '') return '-';
					return new Intl.NumberFormat().format(val);
				};
				break;
			}

			case 'date': {
				// 如果你希望在查询时使用时间范围选择器，可以设置 dateTimeRange 或 date
				col.valueType = 'dateTimeRange'; // 如果你要在搜索使用范围，可以改成 'dateTimeRange'
				col.fieldProps = { placeholder: `请选择${item.label}` };

				col.render = (_: any, record: any) => {
					const v = record[field];

					// 空值处理
					if (v === null || v === undefined || v === '') return <span>-</span>;

					// 如果是数组（例如存的是范围 [start, end]）
					if (Array.isArray(v)) {
						const a = v[0] ? dayjs(v[0]) : null;
						const b = v[1] ? dayjs(v[1]) : null;
						const sa = a && a.isValid() ? a.format('YYYY-MM-DD HH:mm:ss') : '-';
						const sb = b && b.isValid() ? b.format('YYYY-MM-DD HH:mm:ss') : '-';
						return <span>{`${sa} ~ ${sb}`}</span>;
					}

					// 如果是单个时间戳或 ISO 字符串
					const d = dayjs(v);
					if (!d.isValid()) return <span>{String(v)}</span>;
					return <span>{d.format('YYYY-MM-DD HH:mm:ss')}</span>;
				};

				break;
			}

			case 'select': {
				const opts = item.options || [];

				// 1. 表单中的 select 选项
				col.valueType = 'select';

				col.fieldProps = {
					options: opts.map((o: any) => ({
						label: o.label,
						value: o.value,
					})),
				};

				// 2. ProTable 列过滤
				// col.filters = opts.map((o: any) => ({
				// 	text: o.label,
				// 	value: o.value,
				// }));

				// 3. ProTable 显示：渲染成 Tag
				col.render = (_: any, record: any) => {
					const val = record[field];
					const cfg = opts.find((o: any) => o?.value === val);
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
};

export default useTabColumnSchema;
