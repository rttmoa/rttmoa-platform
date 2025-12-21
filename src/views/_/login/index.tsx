import LoginForm from './components/LoginForm';
import LoginLogo from './components/LoginLogo';
import loginIllustration from '@/assets/images/login_illustration.svg';
import logo from '@/assets/images/rttmoa-128x128.png';
import upack2 from '@/assets/images/upack2.png';
import kdFH from '@/assets/images/kdFH.png';
import ReactCanvas from './components/ReactCanvas';
import './index.less';
import SwitchDark from './components/SwitchDark';

const Login: React.FC = () => {
	return (
		<div className='login-container'>
			<div className='login-content'>
				<SwitchDark />
				<div className='login-illustration'>
					<img src={loginIllustration} alt='illustration' />
					{/* <ReactCanvas /> */}
				</div>
				<div className='login-form'>
					<div className='login-form-title font-mono text-[22px] font-bold '>
						<img className='login-title-logo' src={kdFH} alt='logo' />
						{/* <span className='login-title-text'>login</span> */}
						<span className='ml-2'>克东飞鹤后台管理系统</span>
					</div>
					<LoginForm />
					{/* <LoginLogo /> */}
				</div>
			</div>
		</div>
	);
};

export default Login;
