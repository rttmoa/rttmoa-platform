import React, { useRef } from 'react';
import { HomeOutlined, UserOutlined, FormOutlined, LoginOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { type MenuProps, Dropdown, Avatar } from 'antd';
import { HOME_URL, LOGIN_URL } from '@/config';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '@/api/modules/login';
import { useDispatch } from '@/redux';
import { setToken } from '@/redux/modules/user';
import { setAuthMenuList } from '@/redux/modules/auth';
import { modal, message } from '@/hooks/useMessage';
import InfoModal, { InfoModalRef } from './InfoModal';
import PasswordModal, { PasswordModalRef } from './PasswordModal';
import avatar from '@/assets/images/avatar.png';

// todo
// todo: InfoModal: forwardRef & useImperativeHandle
const AvatarIcon: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const infoRef = useRef<InfoModalRef>(null); // 个人信息 Modal
	const passRef = useRef<PasswordModalRef>(null); // 修改用户信息 Modal

	const logout = () => {
		modal.confirm({
			title: '温馨提示 🧡',
			icon: <ExclamationCircleOutlined />,
			content: '是否确认退出登录？',
			okText: '确认',
			cancelText: '取消',
			maskClosable: true,
			onOk: async () => {
				//   退出逻辑
				//    1.执行注销接口
				//    2.设置 Token 为空
				//    3.设置 Menu 为空
				//    4.跳转至 登录页面
				//    5.提示 退出成功
				//    ？ 要不要清除Redux持久化数据
				await loginAPI.logoutApi();

				dispatch(setToken(''));

				dispatch(setAuthMenuList([]));

				navigate(LOGIN_URL, { replace: true });

				// navigate(LOGIN_URL);
				// navigate("/login?to=/personal", { replace: true });
				message.success('退出登录成功！');
			},
		});
	};

	const style = { style: { fontSize: '16px' } };

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <span className='dropdown-item'>首页</span>,
			icon: <HomeOutlined {...style} />,
			onClick: () => navigate(HOME_URL),
		},
		{
			type: 'divider',
		},
		{
			key: '2',
			label: <span className='dropdown-item'>个人信息</span>,
			icon: <UserOutlined {...style} />,
			// onClick: () => infoRef.current?.showModal({ name: "个人信息 showModal" }),
			onClick: () => navigate('/system/account'),
		},
		{
			type: 'divider',
		},
		{
			key: '3',
			label: <span className='dropdown-item'>{'修改用户信息'}</span>,
			icon: <FormOutlined {...style} />,
			onClick: () => passRef.current?.showModal({ name: 'hooks' }),
		},
		{
			type: 'divider',
		},
		{
			key: '4',
			label: <span className='dropdown-item'>退出登录</span>,
			icon: <LoginOutlined {...style} />,
			onClick: logout,
		},
	];

	return (
		<>
			<Dropdown menu={{ items }} trigger={['click']} placement='bottom' arrow overlayStyle={{ minWidth: 150 }}>
				<Avatar className='avatar' size={42} src={avatar} />
			</Dropdown>

			<InfoModal ref={infoRef} />
			<PasswordModal ref={passRef} />
		</>
	);
};

export default AvatarIcon;
