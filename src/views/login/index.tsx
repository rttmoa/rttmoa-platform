import LoginForm from './components/LoginForm';
import LoginLogo from './components/LoginLogo';
import SwitchDark from '@/components/SwitchDark';
import loginIllustration from '@/assets/images/login_illustration.svg';
import logo from '@/assets/images/rttmoa-128x128.png';
import ReactCanvas from './components/ReactCanvas';
import './index.less';

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
					<div className='login-form-title'>
						<img className='login-title-logo' src={logo} alt='logo' />
						<span className='login-title-text'>login</span>
					</div>
					<LoginForm />
					<LoginLogo />
				</div>
			</div>
		</div>
	);
};

export default Login;
