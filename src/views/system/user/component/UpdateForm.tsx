import { UserList } from '@/api/interface';
import { ProFormDateTimePicker, ProFormRadio, ProFormSelect, ProFormText, ProFormTextArea, StepsForm } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

// Partial<API.RuleListItem>
export type FormValueType = {
	target?: string;
	template?: string;
	type?: string;
	time?: string;
	frequency?: string;
} & Partial<UserList>;

export type UpdateFormProps = {
	onCancel: (flag?: boolean, formVals?: FormValueType) => void;
	onSubmit: (values: FormValueType) => Promise<void>;
	updateModalOpen: boolean;
	values: Partial<UserList>;
};
// 分步表单组件
const UpdateForm: React.FC<UpdateFormProps> = props => {
	return (
		<StepsForm
			stepsProps={{ size: 'small' }}
			stepsFormRender={(dom, submitter) => {
				return (
					<Modal
						width={640}
						bodyStyle={{ padding: '32px 40px 48px' }}
						destroyOnClose
						title={'规则配置'}
						open={props.updateModalOpen}
						footer={submitter}
						onCancel={() => {
							props.onCancel();
						}}
					>
						{dom}
					</Modal>
				);
			}}
			onFinish={props.onSubmit}
		>
			""
		</StepsForm>
	);
};

export default UpdateForm;
