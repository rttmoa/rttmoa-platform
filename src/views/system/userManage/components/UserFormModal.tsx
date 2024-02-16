import { Card, DatePicker, Form, Input, Radio, Select } from "antd";
import { useEffect } from "react";

const UserFormModal: any = ({ userInfo, type, form, roles }: any) => {
	const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 16 } };

	useEffect(() => {
		return () => {
			form.resetFields(); // 组件卸载将清空Form值
		};
	});
	return (
		<>
			<Card>
				<Form
					form={form}
					layout="horizontal"
					{...formItemLayout}
					initialValues={{
						id: type === "create" ? null : userInfo.id,
						user_name: type === "create" ? null : userInfo.username,
						sex: type === "create" ? null : userInfo.sex,
						state: type === "create" ? null : userInfo["state"],
						// birthday: type === "create" ? null : userInfo.birthday,
						address: type === "create" ? null : userInfo.address,
						roleiD: type === "create" ? null : userInfo.role_id
					}}>
					<Form.Item name="id" label="id" hidden={type === "create"}>
						<Input type="text" disabled />
					</Form.Item>
					<Form.Item name="user_name" label="姓名">
						<Input type="text" placeholder="请输入姓名" disabled={type === "detail"} />
					</Form.Item>
					<Form.Item name="sex" label="性别">
						<Radio.Group disabled={type === "detail"}>
							<Radio value={1}>男</Radio>
							<Radio value={2}>女</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item name="state" label="状态">
						<Select disabled={type === "detail"}>
							<Select.Option value={1}>痛苦</Select.Option>
							<Select.Option value={2}>委屈</Select.Option>
							<Select.Option value={3}>迷茫</Select.Option>
							<Select.Option value={4}>平淡</Select.Option>
							<Select.Option value={5}>开心</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name="roleiD" label="角色">
						<Select disabled={type === "detail"}>
							{roles.map((role: any) => {
								return (
									<Select.Option key={role.id} value={role.id}>
										{role.role_name}
									</Select.Option>
								);
							})}
						</Select>
					</Form.Item>
					<Form.Item name="birthday" label="生日">
						<DatePicker disabled={type === "detail"} />
					</Form.Item>
					<Form.Item name="address" label="联系地址">
						<Input.TextArea rows={3} disabled={type === "detail"} />
					</Form.Item>
				</Form>
			</Card>
		</>
	);
};
export default UserFormModal;
