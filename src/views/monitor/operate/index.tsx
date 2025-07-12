import { Alert, Card } from 'antd';
import opear from './opear.png';
import { Image } from 'antd';

const Online: React.FC = () => {
	return (
		<Card>
			<Alert message='示例：' type='info' showIcon />
			<br />
			<Image width={1600} src={opear} />
		</Card>
	);
};

export default Online;
