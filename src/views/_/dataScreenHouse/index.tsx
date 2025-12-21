import { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_URL } from '@/config';
import titleIcon from '@/views/_/dataScreen/images/dataScreen-title.png';
import HeaderTime from './components/HeaderTime';
import MaleFemaleRatioChart from './components/MaleFemaleRatioChart';
import HotPlateChart from './components/HotPlateChart';
import AgeRatioChart from './components/AgeRatioChart';
import PlatformSourceChart from './components/PlatformSourceChart';
import './index.less';

const DataScreen = () => {
	const navigate = useNavigate();
	const dataScreenRef = useRef<HTMLDivElement>(null);

	// Infer scaling based on browser size
	const getScale = (width = 1920, height = 1080) => {
		let ww = window.innerWidth / width;
		let wh = window.innerHeight / height;
		return ww < wh ? ww : wh;
	};

	// Set Transform
	const setDataScreenStyle = () => {
		if (dataScreenRef.current) {
			dataScreenRef.current.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
			dataScreenRef.current.style.width = `1920px`;
			dataScreenRef.current.style.height = `1080px`;
		}
	};

	useLayoutEffect(() => {
		setDataScreenStyle();
		window.addEventListener('resize', setDataScreenStyle);
		return () => {
			window.removeEventListener('resize', setDataScreenStyle);
		};
	}, []);

	return (
		<div className='dataScreen-container'>
			<div className='dataScreen-content' ref={dataScreenRef}>
				<div className='dataScreen-header'>
					<div className='header-lf'>
						<span className='header-screening' onClick={() => navigate(HOME_URL)}>
							首页
						</span>
					</div>
					<div className='header-ct'>
						<div className='header-ct-title'>
							<span>克东飞鹤智慧仓储可视化大数据展示平台</span>
							{/* <div className='header-ct-warning'>平台高峰预警信息（2条）</div> */}
						</div>
					</div>
					<div className='header-ri'>
						<span className='header-download'>统计报告</span>
						<span className='header-time'>
							当前时间：
							<HeaderTime />
						</span>
					</div>
				</div>
				<div className='dataScreen-main'>
					<div className='dataScreen-lf'>
						<div className='dataScreen-center'>
							<div className='dataScreen-main-title'>
								<span>待入库托盘列表【入库任务】</span>
								<img src={titleIcon} alt='' />
							</div>
							<div className='dataScreen-main-chart'>
								<MaleFemaleRatioChart />
							</div>
						</div>
						<div className='dataScreen-bottom'>
							<div className='dataScreen-main-title'>
								<span>出入库任务看板</span>
								<img src={titleIcon} alt='' />
							</div>
							<div className='dataScreen-main-chart'>
								<AgeRatioChart />
							</div>
						</div>
					</div>
					<div className='dataScreen-rg'>
						<div className='dataScreen-top'>
							<div className='dataScreen-main-title'>
								<span>待出库托盘列表【出库任务】</span>
								<img src={titleIcon} alt='' />
							</div>
							<div className='dataScreen-main-chart'>
								<HotPlateChart />
							</div>
						</div>
						<div className='dataScreen-bottom'>
							<div className='dataScreen-main-title'>
								<span>库容库龄看板</span>
								<img src={titleIcon} alt='' />
							</div>
							<div className='dataScreen-main-chart'>
								<PlatformSourceChart />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DataScreen;
