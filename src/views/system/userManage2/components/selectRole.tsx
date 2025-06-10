import { fetchUserSetRole } from '@/api/modules/system/userManage2';
import { message } from '@/hooks/useMessage';
import { Button, Card, Modal, Radio, Space } from 'antd';
import React, { useState } from 'react';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default function SelectRole(props: any) {
	const { select, values, visible, onCancel } = props;
	const [loading, setloading] = useState(false);
	const [checkedValues, setcheckedValues] = useState('');

	const handleSubmit = () => {
		setloading(true);
		fetchUserSetRole({ roleid: checkedValues, id: props.currPeopleId }).then((res: any) => {
			message.success(res.msg);
			setloading(false);
			props.handleOkRole();
		});
	};

	const footer: any = () => {
		return (
			<div>
				<Space size='middle'>
					<Button type='primary' onClick={handleSubmit} loading={loading}>
						确定
					</Button>
					<Button onClick={props.onCancel}>取消</Button>
				</Space>
			</div>
		);
	};
	const selectNodes = select.map((item: any, index: number) => {
		return (
			<RadioButton value={item.id} key={item.id}>
				{item.role_name}
			</RadioButton>
		);
	});
	return (
		<Modal width={600} open={visible} title='修改角色类别' onCancel={onCancel} footer={footer} className='modal-header modal-body'>
			<Card>
				<RadioGroup
					onChange={(e: any) => {
						setcheckedValues(e.target.value);
					}} /* defaultValue={values.roleid} */
				>
					{selectNodes}
				</RadioGroup>
			</Card>
		</Modal>
	);
}
