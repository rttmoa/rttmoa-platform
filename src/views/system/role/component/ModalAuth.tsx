import { roleTransferList } from '@/api/modules/system/roleManage';
import { Form, Input, Modal, Transfer } from 'antd';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';

const ModalAuth = (Props: any) => {
	const { modalIsOpenAuth, setModalIsOpenAuth } = Props;

	const [formUser] = Form.useForm();

	const getStatusV = useRef<any>();

	const [transferData, settransferData] = useState([]);
	const [targetKeys, settargetKeys] = useState([]);
	const [isAuthClosed, setIsAuthClosed] = useState<any>(null);
	const [detailUserInfo, setdetailUserInfo] = useState({}); // 单选用户信息

	useEffect(() => {
		if (modalIsOpenAuth) {
			GetData();
		} else {
			settransferData([]);
			settargetKeys([]);
			setdetailUserInfo({}); // 设置弹窗、权限、用户信息
			setIsAuthClosed(false);
		}
	}, [modalIsOpenAuth]);

	let selectedItem = {
		authorize_time: '91919950866',
		authorize_user_name: '汤杰',
		create_time: '1678994140970',
		id: 2,
		key: 2,
		menus: '/home/index',
		role_name: '前端开发',
		status: 2,
	};

	const GetData = async () => {
		// 获取角色用户列表 > 筛选目标用户
		const results: any = await roleTransferList(selectedItem.id); // 根据iD获取该角色原有用户
		const transferData: any = [];
		const targetKeys: any = [];
		if (results.data.length > 0) {
			const dataSource = results.data;
			for (let index = 0; index < dataSource.length; index++) {
				const element = dataSource[index];
				const data = {
					key: element.user_id,
					title: element.user_name,
					status: element.status,
				};
				if (data.status === 1) {
					targetKeys.push(data.key);
				}
				transferData.push(data);
			}
		}
		settransferData(transferData);
		settargetKeys(targetKeys);

		// 设置弹窗、权限、用户信息
		setdetailUserInfo(selectedItem);
		setIsAuthClosed(false);
		// setModalIsOpenAuth(true);
	};

	// 弹窗：用户授权 提交
	const userPermSubmit = () => {
		let data: any = {};
		data.user_ids = targetKeys || [];
		data.role_id = selectedItem.id;
		data.authorize_time = Date.now();
		// 将 data 传递到服务端
		// 重置表单值
		formUser.resetFields();
		// 关闭弹窗
		setModalIsOpenAuth(false);
	};

	return (
		<Modal
			title='用户授权'
			width={800}
			open={modalIsOpenAuth}
			onOk={userPermSubmit}
			onCancel={() => {
				formUser.resetFields();
				setModalIsOpenAuth(false);
			}}
		>
			<RoleAuthForm
				form={formUser}
				isClose={isAuthClosed}
				detailUserInfo={detailUserInfo}
				targetKeys={targetKeys}
				transferData={transferData}
				patchUserInfo={(targetKeys: any) => {
					settargetKeys(targetKeys);
				}}
				ref={getStatusV}
			/>
		</Modal>
	);
};
function RoleAuthForm({ form, isClose, detailUserInfo, targetKeys, transferData, patchUserInfo, ref }: any): React.ReactNode {
	const [status, setstatus] = useState(11);
	const statusValue = () => {
		setstatus(status + 1);
		return status;
	};
	useImperativeHandle(ref, () => ({ status, statusValue }));

	const filterOption = (inputValue: any, option: any) => {
		return option.title.indexOf(inputValue) > -1;
	};
	const handleChange = (targetKeys: any): void => {
		patchUserInfo(targetKeys);
	};
	const formItemLayout = {
		labelCol: { span: 5 },
		wrapperCol: { span: 18 },
	};
	return (
		<Form form={form} layout='horizontal' {...formItemLayout} initialValues={{ transfer: targetKeys }}>
			<Form.Item name='role_name3' label='角色名称'>
				<Input disabled maxLength={8} placeholder={detailUserInfo.role_name} />
			</Form.Item>
			<Form.Item name='transfer' label='选择用户：'>
				<Transfer
					listStyle={{ width: 200, height: 400 }}
					dataSource={transferData}
					showSearch
					titles={['待选用户', '已选用户']}
					filterOption={filterOption}
					targetKeys={targetKeys}
					onChange={handleChange}
					render={(item: any) => item.title}
				/>
			</Form.Item>
		</Form>
	);
}
export default ModalAuth;
