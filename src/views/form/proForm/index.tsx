import { AlipayCircleOutlined, LockOutlined, PlusOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { DrawerForm, LightFilter, LoginForm, ModalForm, ProForm, ProFormDateRangePicker, ProFormRadio, ProFormSelect, ProFormText, QueryFilter, StepsForm } from '@ant-design/pro-components';
import { Button, Card, Space, message } from 'antd';
import { useState } from 'react';

const iconStyles = {
	marginInlineStart: '16px',
	color: 'rgba(0, 0, 0, 0.2)',
	fontSize: '24px',
	verticalAlign: 'middle',
	cursor: 'pointer',
};

const waitTime = (time: number = 100) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
};

export default () => {
	const Components = {
		ProForm,
		ModalForm,
		DrawerForm,
		QueryFilter,
		LightFilter,
		StepsForm,
		LoginForm,
	};
	const [type, setType] = useState<keyof typeof Components>('ProForm');

	// 返回步骤表单：第一步、第二步、第三步
	if (type === 'StepsForm') {
		return (
			<Card>
				<div className='mb-[25px] font-mono from-neutral-900 text-base font-semibold  '>pro-components {'>'} ProForm高级表单</div>
				<ProFormRadio.Group
					style={{
						margin: 16,
					}}
					radioType='button'
					fieldProps={{
						value: type,
						onChange: e => setType(e.target.value),
					}}
					options={['LightFilter', 'ProForm', 'ModalForm', 'DrawerForm', 'QueryFilter', 'StepsForm', 'LoginForm']}
				/>
				<StepsForm
					onFinish={async (values: any) => {
						await waitTime(2000);
						console.log(values);
						message.success('Submission successful');
					}}
				>
					<StepsForm.StepForm title='Step One'>
						<ProForm.Group>
							<ProFormText width='md' name='name' label='Contract Customer Name' tooltip='Up to 24 characters' placeholder='Please enter a name' />
							<ProFormText width='md' name='company' label='Our Company Name' placeholder='Please enter a name' />
						</ProForm.Group>
						<ProForm.Group>
							<ProFormText name={['contract', 'name']} width='md' label='Contract Name' placeholder='Please enter a name' />
							<ProFormDateRangePicker width='md' name={['contract', 'createTime']} label='Contract Effective Time' />
						</ProForm.Group>
					</StepsForm.StepForm>
					<StepsForm.StepForm title='Step Two'>
						<ProForm.Group>
							<ProFormSelect
								options={[
									{
										value: 'chapter',
										label: 'Effective after stamping',
									},
								]}
								readonly
								width='xs'
								name='useMode'
								label='Contract Agreed Effective Method'
							/>
							<ProFormSelect
								width='xs'
								options={[
									{
										value: 'time',
										label: 'Terminate after performance',
									},
								]}
								name='unusedMode'
								label='Contract Agreed Invalid Method'
							/>
						</ProForm.Group>
					</StepsForm.StepForm>
					<StepsForm.StepForm title='Step Three'>
						<ProFormText width='sm' name='id' label='Main Contract Number' />
						<ProFormText name='project' width='md' disabled label='Project Name' initialValue='xxxx Project' />
						<ProFormText width='xs' name='mangerName' disabled label='Business Manager' initialValue='Qitu' />
					</StepsForm.StepForm>
				</StepsForm>
			</Card>
		);
	}

	const FormComponents = Components[type as 'LoginForm'];

	// 返回登陆表单
	if (type === 'LoginForm') {
		return (
			<Card>
				<div className='mb-[25px] font-mono from-neutral-900 text-base font-semibold  '>pro-components {'>'} ProForm高级表单</div>
				<ProFormRadio.Group
					style={{
						margin: 16,
					}}
					radioType='button'
					fieldProps={{
						value: type,
						onChange: e => setType(e.target.value),
					}}
					options={['LightFilter', 'ProForm', 'ModalForm', 'DrawerForm', 'QueryFilter', 'StepsForm', 'LoginForm']}
				/>
				<FormComponents
					title='Github'
					subTitle="The world's largest code hosting platform"
					actions={
						<Space>
							Other login methods
							<AlipayCircleOutlined style={iconStyles} />
							<TaobaoCircleOutlined style={iconStyles} />
							<WeiboCircleOutlined style={iconStyles} />
						</Space>
					}
				>
					<ProFormText
						name='username'
						fieldProps={{
							size: 'large',
							prefix: <UserOutlined className={'prefixIcon'} />,
						}}
						placeholder={'Username: admin or user'}
						rules={[
							{
								required: true,
								message: 'Please enter your username!',
							},
						]}
					/>
					<ProFormText.Password
						name='password'
						fieldProps={{
							size: 'large',
							prefix: <LockOutlined className={'prefixIcon'} />,
						}}
						placeholder={'Password: ant.design'}
						rules={[
							{
								required: true,
								message: 'Please enter your password!',
							},
						]}
					/>
				</FormComponents>
			</Card>
		);
	}

	return (
		<Card>
			<div className='mb-[25px] font-mono from-neutral-900 text-base font-semibold  '>pro-components {'>'} ProForm高级表单</div>
			<ProFormRadio.Group
				style={{
					margin: 16,
				}}
				radioType='button'
				fieldProps={{
					value: type,
					onChange: e => setType(e.target.value),
				}}
				options={['LightFilter', 'ProForm', 'ModalForm', 'DrawerForm', 'QueryFilter', 'StepsForm', 'LoginForm']}
			/>
			<div style={{ margin: 24 }}>
				<FormComponents
					// @ts-ignore
					labelWidth='auto'
					trigger={
						<Button type='primary'>
							<PlusOutlined />
							{type == 'ModalForm' ? 'Modal 表单' : 'Drawer 表单'}
						</Button>
					}
					onFinish={async (values: any) => {
						await waitTime(2000);
						console.log(values);
						message.success('Submission successful');
					}}
					initialValues={{
						name: '蚂蚁设计有限公司',
						useMode: 'chapter',
					}}
				>
					<ProForm.Group>
						<ProFormText width='md' name='name' label='合同客户名称' tooltip='Up to 24 characters' placeholder='Please enter a name' />
						<ProFormText width='md' name='company' label='我们公司名称' placeholder='Please enter a name' />
					</ProForm.Group>
					<ProForm.Group>
						<ProFormText name={['contract', 'name']} width='md' label='合同名称' placeholder='Please enter a name' />
						<ProFormDateRangePicker width='md' name={['contract', 'createTime']} label='Contract Effective Time' />
					</ProForm.Group>
					<ProForm.Group>
						<ProFormSelect
							options={[
								{
									value: 'chapter',
									label: '冲压后有效',
								},
							]}
							readonly
							width='xs'
							name='useMode'
							label='合同约定的生效方法'
						/>
						<ProFormSelect
							width='xs'
							options={[
								{
									value: 'time',
									label: '执行后终止',
								},
							]}
							name='unusedMode'
							label='合同约定的无效方法'
						/>
					</ProForm.Group>
					<ProFormText width='sm' name='id' label='主要合同编号' />
					<ProFormText name='project' width='md' disabled label='项目名称' initialValue='xxxx Project' />
					<ProFormText width='xs' name='mangerName' disabled label='商业管理' initialValue='奇图' />
				</FormComponents>
			</div>
		</Card>
	);
};
