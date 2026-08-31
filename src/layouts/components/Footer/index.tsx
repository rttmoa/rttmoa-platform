import React from 'react';
import { Layout } from 'antd';
import { RootState, useSelector } from '@/redux';
import logoUpackOud from '@/assets/images/logo_upack_oud.png';
import './index.less';

const { Footer } = Layout;
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE;

const LayoutFooter: React.FC = () => {
	const footer = useSelector((state: RootState) => state.global.footer);
	return (
		<>
			{footer && (
				<Footer className='ant-footer'>
					<a href='#' target='_blank' rel='noreferrer'>
						{/* {new Date().getFullYear()} © {APP_TITLE} By React Hooks Technology. */}
						Copyright © <img className='footer-logo' src={logoUpackOud} alt='Logo' /> 上 海 昱 庄 机 械 科 技 有 限 公 司.
					</a>
				</Footer>
			)}
		</>
	);
};
export default LayoutFooter;
