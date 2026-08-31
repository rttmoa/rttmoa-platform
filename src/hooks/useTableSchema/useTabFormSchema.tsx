import { useMemo } from 'react';
import { ProFormDatePicker, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';

const useTabFormSchema = (schema: any) => {
	return useMemo(() => {
		return Object.keys(schema || {})
			.filter(field => !String(field).startsWith('__'))
			.map(field => {
				const item = schema[field];

				let comp: any = ProFormText;
				let fieldProps: any = {};

				if (item.editable === false) {
					fieldProps.disabled = true;
					fieldProps.readOnly = true;
				}

				switch (item.type) {
					case 'string':
						comp = ProFormText;
						break;

					case 'number': {
						comp = ProFormDigit;
						if (item.int) {
							fieldProps = {
								...fieldProps,
								precision: 0,
							};
						}

						if (item.decimal) {
							fieldProps = {
								...fieldProps,
								precision: item.precision ?? 2,
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
	}, [schema]);
};

export default useTabFormSchema;
