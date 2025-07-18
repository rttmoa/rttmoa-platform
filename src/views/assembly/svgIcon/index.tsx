import { Alert, Card, Col, Descriptions, Row, Space, Typography } from 'antd';
import SvgIcon from '@/components/SvgIcon';
import './index.less';
const { Link } = Typography;

const SvgIconPage = () => {
	const message = (
		<span>
			SvgIcon 使用 vite-plugin-svg-icons 插件完成，官方文档请查看 ：
			<Link href='https://github.com/vbenjs/vite-plugin-svg-icons' target='_blank'>
				vite-plugin-svg-icons
			</Link>
		</span>
	);

	// @ svg 图标库：https://fonts.google.com/icons?hl=zh-cn&icon.platform=web
	return (
		<>
			<Card className='svg-content mb-6'>
				<Alert message={message} type='info' showIcon />
				<Alert message='!!!下面还有：iconFont矢量图标、iconFont字体图标' type='info' showIcon className='mt-[12px]' />
				<div className='icon-list'>
					<SvgIcon name='1' iconStyle={{ width: '180px' }} />
					<SvgIcon name='2' iconStyle={{ width: '180px' }} />
					<SvgIcon name='3' iconStyle={{ width: '180px' }} />
					<SvgIcon name='4' iconStyle={{ width: '180px' }} />
					<SvgIcon name='5' iconStyle={{ width: '180px' }} />
					<SvgIcon name='6' iconStyle={{ width: '180px' }} />
					<SvgIcon name='7' iconStyle={{ width: '180px' }} />
					<SvgIcon name='8' iconStyle={{ width: '180px' }} />
					<SvgIcon name='9' iconStyle={{ width: '180px' }} />
					<SvgIcon name='10' iconStyle={{ width: '180px' }} />
					<SvgIcon name='11' iconStyle={{ width: '180px' }} />
					<SvgIcon name='12' iconStyle={{ width: '180px' }} />
					<SvgIcon name='13' iconStyle={{ width: '180px' }} />
					<SvgIcon name='14' iconStyle={{ width: '180px' }} />
					<SvgIcon name='xianxingfanchuan' iconStyle={{ width: '180px' }} />
					<SvgIcon name='xianxingxiarilengyin' iconStyle={{ width: '180px' }} />
				</div>
				<Descriptions title='配置项 📚' bordered column={1} labelStyle={{ width: '200px' }}>
					<Descriptions.Item label='name'>图标的名称，svg 图标必须存储在 src/assets/icons 目录下</Descriptions.Item>
					<Descriptions.Item label='prefix'>图标的前缀，默认为 icon</Descriptions.Item>
					<Descriptions.Item label='iconStyle'> 图标的样式，默认样式为 {'{ width: 100px, height: 100px }'} </Descriptions.Item>
				</Descriptions>
			</Card>
			<Card className='mb-6' title='iconFont 矢量图标 <SvgIcon name=`fangda` />'>
				<Alert
					type='info'
					description={
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<SvgIcon name='fangda' iconStyle={{ width: 25, height: 25, marginRight: 20 }} />
							<SvgIcon name='suoxiao' iconStyle={{ width: 25, height: 25, marginRight: 20 }} />
							<SvgIcon name='contentleft' iconStyle={{ width: 25, height: 25, marginRight: 20 }} />
							<SvgIcon name='contentright' iconStyle={{ width: 25, height: 25, marginRight: 20 }} />
						</div>
					}
				/>
			</Card>
			<Card className='mb-6' title='iconFont 字体图标 <i className=`iconfont icon-zhuti` />'>
				<Alert
					type='info'
					description={
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Space size='large'>
								<i className='iconfont icon-zhuti' style={{ color: '#178fff', fontSize: 20 }}></i>
								<i className='iconfont icon-xiaoxi' style={{ color: '#178fff', fontSize: 20 }}></i>
								<i className='iconfont icon-sun' style={{ color: '#178fff', fontSize: 20 }}></i>
								<i className='iconfont icon-moon' style={{ color: '#178fff', fontSize: 20 }}></i>
								<i className='iconfont icon-moon1' style={{ color: '#178fff', fontSize: 20 }}></i>
							</Space>
						</div>
					}
				/>
			</Card>
		</>
	);
};

export default SvgIconPage;
