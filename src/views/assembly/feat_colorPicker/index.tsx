import { Button, Input, Space, Alert, Divider, Typography, Card } from 'antd';
import useEyeDropper from '@/hooks/useEyeDropper';

const { Link } = Typography;

const ColorPicker: React.FC = () => {
	let { color, isEnabled, openEyeDropper } = useEyeDropper();
	// color = "#90afe0"
	const message = (
		<span>
			通过 EyeDropper API 实现，MDN 官方文档请查看 ：
			<Link href='https://developer.mozilla.org/zh-CN/docs/Web/API/EyeDropper' target='_blank'>
				https://developer.mozilla.org/zh-CN/docs/Web/API/EyeDropper
			</Link>
		</span>
	);

	return (
		<Card className='w-full h-full'>
			<Alert message={message} type='success' showIcon />
			<Divider />
			{isEnabled ? (
				<>
					<Space.Compact className='w-[350px]'>
						<Input placeholder='The color picked up by the color picker' value={color} />
						<Button type='primary' onClick={openEyeDropper}>
							Open
						</Button>
					</Space.Compact>
					<Divider />
					<div style={{ width: 200, height: 200, backgroundColor: color }}></div>
				</>
			) : (
				<Button type='default' disabled>
					当前浏览器不支持 EyeDropper API，请切换到 Chrome / Edge
				</Button>
			)}
		</Card>
	);
};

export default ColorPicker;
