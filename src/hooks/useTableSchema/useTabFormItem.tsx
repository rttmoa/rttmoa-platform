import { ProFormDateTimePicker, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';

const useTabFormItem = (item: any) => {
	const fieldProps = item.fieldProps || {};

	switch (item.type) {
		case 'string':
			return <ProFormText name={item.name} label={item.label} colProps={{ span: 12 }} fieldProps={fieldProps} />;

		case 'number':
			return <ProFormDigit name={item.name} label={item.label} colProps={{ span: 12 }} fieldProps={fieldProps} />;

		case 'date':
			return <ProFormDateTimePicker name={item.name} label={item.label} colProps={{ span: 12 }} fieldProps={fieldProps} />;

		case 'select':
			return <ProFormSelect name={item.name} label={item.label} colProps={{ span: 12 }} fieldProps={fieldProps} />;
	}
};
export default useTabFormItem;
