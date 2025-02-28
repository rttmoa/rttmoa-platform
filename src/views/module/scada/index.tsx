// import LoginForm from './components/LoginForm'
// import LoginLogo from './components/LoginLogo'
// import SwitchDark from '@/components/SwitchDark'
// import loginIllustration from '@/assets/images/login_illustration.svg'
// import logo from '@/assets/images/rttmoa-128x128.png'
// import ReactCanvas from './components/ReactCanvas'
import { Card } from 'antd'
import ScadaImage from './Scada.png'
import './index.less'

const Login: React.FC = () => {
	return (
		<div className="scada-container">
			<Card className="sc-card">
				<img src={ScadaImage} alt="" />
				<div className="sc-1">123</div>
			</Card>
		</div>
	)
}

export default Login
