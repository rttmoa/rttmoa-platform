import { Col, Row } from 'antd';
import { RootState, useSelector } from '@/redux';
import { overviewOptionsFn, stockOverviewOptionsFn } from './report/overview';
import ECharts from '@/components/Echarts';
import './index.less';

const Analysis: React.FC = () => {
	const isDark = useSelector((state: RootState) => state.global.isDark);

	return (
		<div>
			<Row gutter={[15, 15]} className='analysis'>
				<Col span={24}>
					<Row gutter={[15, 15]} className='analysis-overview'>
						<Col xl={24} lg={24} md={24} sm={24} xs={24}>
							<div className='card overview-box'>
								<div className='overview-head'>
									<span className='overview-title'>克东飞鹤出入库任务报表</span>
								</div>
								<div className='overview-echarts'>
									<ECharts option={overviewOptionsFn(isDark)} />
								</div>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>

			<Row gutter={[15, 15]} className='analysis '>
				<Col span={24}>
					<Row gutter={[15, 15]} className='analysis-overview'>
						<Col xl={24} lg={24} md={24} sm={24} xs={24}>
							<div className='card overview-box'>
								<div className='overview-head'>
									<span className='overview-title'>克东飞鹤库存报表</span>
								</div>
								<div className='overview-echarts'>
									<ECharts option={stockOverviewOptionsFn(isDark)} />
								</div>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
};

export default Analysis;
