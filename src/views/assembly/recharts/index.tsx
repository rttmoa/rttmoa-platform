import { Card, Col, Descriptions, Row, Typography } from 'antd'
import Line from './component/line'
import Bar from './component/bar'
import Radar from './component/radar'
import Circle from './component/circle'
import TreeMap from './component/treemap'
const { Link } = Typography

// https://recharts.org/en-US/examples
export default function Recharts() {
	return (
		<div>
			<Row gutter={16} className="mb30 mt-4">
				<Col md={24} className="gutter-row">
					<Card title="折线图">
						<Line />
					</Card>
				</Col>
			</Row>
			<Row gutter={16} className="mb30">
				<Col md={24} className="gutter-row">
					<Card title="树状图">
						<Bar />
					</Card>
				</Col>
			</Row>
			<Row gutter={16} className="mb30">
				<Col md={12} sm={24} className="gutter-row sm:mb-6">
					<Card title="圆形图">
						<Circle />
					</Card>
				</Col>
				<Col md={12} sm={24} className="gutter-row">
					<Card title="雷达图">
						<Radar />
					</Card>
				</Col>
			</Row>
			<Row gutter={16} className="mb30">
				<Col md={24} className="gutter-row">
					<Card title="树形图">
						<TreeMap />
					</Card>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xl={24} lg={24} md={24} sm={24} xs={24}>
					<Card>
						<Descriptions title="recharts api 📚" bordered column={1} labelStyle={{ width: '200px' }}>
							<Descriptions.Item label="option">
								recharts api：
								<Link href="https://recharts.org/en-US/api" target="_blank">
									https://recharts.org/en-US/api
								</Link>
							</Descriptions.Item>
							<Descriptions.Item label="Charts"> AreaChart、BarChart、LineChart、ScatterChart、PieChart、RadarChart </Descriptions.Item>
							<Descriptions.Item label="General Components"> Legend、Tooltip、Cell、Text、Label </Descriptions.Item>
							<Descriptions.Item label="Cartesian Components"> Area、Bar、Line、Scatter、XAxis、YAxis </Descriptions.Item>
						</Descriptions>
					</Card>
				</Col>
			</Row>
		</div>
	)
}
