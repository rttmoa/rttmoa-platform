/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom'
import back from '@/assets/images/back.svg'
import './index.less'

// http://localhost:9527/#/isHide/nolayout/index
const NoLayout: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div className="no-layout">
			<div className="content" onClick={() => navigate(-1)}>
				<div className="button">
					<img src={back} alt="back" />
				</div>
			</div>
		</div>
	)
}

export default NoLayout
