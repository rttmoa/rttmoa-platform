import { ProFormDatePicker, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';

const useTabFormSchema = (schema: any) => {
	return Object.keys(schema)
		.filter(field => !String(field).startsWith('__'))
		.map(field => {
			const item = schema[field];

			let comp: any = ProFormText; // 默认输入组件
			let fieldProps: any = {};

			/** 统一禁用（关键） */
			if (item.editable === false) {
				fieldProps.disabled = true;
				fieldProps.readonly = true;
			}

			switch (item.type) {
				case 'string':
					comp = ProFormText;
					break;

				case 'number': {
					comp = ProFormDigit;
					// 整数模式
					if (item.int) {
						fieldProps = {
							precision: 0, // 无小数点
						};
					}

					// 小数模式
					if (item.decimal) {
						fieldProps = {
							precision: item.precision ?? 2, // 默认 2 位小数
						};
					}
					break;
				}

				case 'date':
					comp = ProFormDatePicker;
					break;

				case 'select':
					comp = ProFormSelect;
					fieldProps.options = item.options?.map((o: any) => ({
						label: o.label,
						value: o.value,
						color: o.color,
					}));
					break;
			}

			return {
				name: field,
				label: item.label,
				type: item.type,
				component: comp,
				options: item.options || [],
				fieldProps,
			};
		});
};
export default useTabFormSchema;
