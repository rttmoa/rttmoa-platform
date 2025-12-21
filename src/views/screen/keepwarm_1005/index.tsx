import { useEffect, useRef, useState } from 'react';
import { Alert, Card, Descriptions, Empty } from 'antd';
import Stock from './outStock.png';
import { screen_API } from '@/api/modules/screen';

const taskType = '入库任务';
const site = 1005;
const stockName = '保温库';

const App = () => {
	const scrollRef = useRef(null);

	const [isArrive, setisArrive] = useState(false);
	const [arriveInfo, setArraiveInfo] = useState({});
	const [list, setList] = useState<any>([]);
	const [total, setTotal] = useState<any>(null);

	useEffect(() => {
		const scrollEl = scrollRef.current as any;
		if (!scrollEl) return;
		if (scrollEl.scrollHeight <= scrollEl.clientHeight) return;

		const scrollSpeed = 1.5;
		const interval = 200;
		const autoScroll = setInterval(() => {
			const atBottom = scrollEl.scrollTop + scrollEl.clientHeight + 20 >= scrollEl.scrollHeight;
			scrollEl.scrollTop = atBottom ? 0 : scrollEl.scrollTop + scrollSpeed;
		}, interval);
		return () => clearInterval(autoScroll);
	}, [list.length, isArrive]);

	const GetStockData = async () => {
		const data: any = await screen_API.find_keepwarm_enter({ location: `${site}` });
		if (data?.code == 200) {
			setTotal(data?.data?.total || 0);
			setList(data?.data?.list || []);
		} else {
			setTotal(0);
			setList([]);
		}
	};

	// 先获取托盘是否有载荷状态
	// 再通过载荷状态获取托盘号：是否扫描了托盘号
	// 再根据托盘号获取 出入库任务 是否有此托盘的数据
	// 如果有是否已经下发了四项车的任务
	const GetArrive = async () => {
		// const result = {
		// 	message: '成功',
		// 	success: true,
		// 	data: {
		// 		loadStatus: '有托盘',
		// 		pallet__c: 'QK5135145531',
		// 		task: '已生成WCS入库任务',
		// 		status: '正在执行',
		// 		pallet_arrive: '已到达入口',
		// 		distribute_stock: '已分配货位',
		// 		create_sc_task: '已生成世仓任务',
		// 		send_sc_task: '已下发世仓',
		// 		desc: '描述',
		// 	},
		// };
		const result = { success: false, data: {} };
		if (result?.success) {
			setisArrive(true);
			setArraiveInfo(result?.data);
		} else {
			setisArrive(false);
			setArraiveInfo({});
		}
	};
	useEffect(() => {
		let running = false;
		const fetchAll = async () => {
			if (running) return;
			running = true;
			try {
				await GetStockData();
				await GetArrive();
			} finally {
				running = false;
			}
		};
		fetchAll();
		const timer = setInterval(fetchAll, 5000);
		return () => clearInterval(timer);
	}, []);

	// 动态展示所有的出库任务
	const renderTaskList = () => (
		<div className='w-full h-[850px] flex flex-col mt-[20px] mx-[60px]'>
			<Alert
				className='w-[600px] mt-[20px]  '
				message={
					<div className='w-full text-center font-sans font-bold text-[24px]'>
						所有入库任务：{total}个 —— 当前站点入库任务：{list.length}个
					</div>
				}
				type='success'
			/>
			<div ref={scrollRef} className='mt-[30px] max-h-[1200px] overflow-y-auto overflow-x-hidden'>
				<StepList current={3} list={list} />
			</div>
		</div>
	);

	return (
		<Card className='w-full h-full'>
			<Alert
				message={
					<div className='font-mono w-full flex justify-center text-[30px] font-bold'>
						{`${stockName}`}({`${site}`})入库大屏显示
					</div>
				}
				type='info'
			/>

			{/* 1. 无任务 */}
			{list.length == 0 && renderNoTask()}

			{/* 2. 有任务但托盘未到达 */}
			{list.length > 0 && !isArrive && renderTaskList()}

			{/* 3. 有任务且托盘到达终点 */}
			{list.length > 0 && isArrive && renderPalletInfo(isArrive, arriveInfo, list, total)}
		</Card>
	);
};

const renderPalletInfo = (isArrive: boolean, data: any, list: any, total: number) => (
	<div className='w-full h-[850px] flex flex-col mt-[20px] mx-[60px]'>
		<Alert
			className='w-[600px] mt-[20px]  '
			message={
				<div className='w-full text-center font-sans font-bold text-[24px]'>
					所有入库任务：{total}个 —— 当前站点入库任务：{list.length}个
				</div>
			}
			type='success'
		/>
		{isArrive && (
			<div>
				{[
					['载荷状态一一', data.loadStatus],
					['当前托盘号一', data.pallet__c],
					['生成WCS任务', data.task],

					['执行状态一一', data.status],
					['是否到达入口', data.pallet_arrive],
					['是否分配货位', data.distribute_stock],
					['是否生成世仓', data.create_sc_task], // 是整托出库 | 是半托出库
					['是否下发世仓', data.send_sc_task],
					['描述一一一一', data.desc],
				].map(([label, value], idx) => {
					const totalChars = 8;
					const fillerLen = Math.max(3, totalChars - String(label).length);
					const filler = '-'.repeat(fillerLen);
					const valStr = String(value);
					const needHighlight = ['生成WCS任务', '是否到达入口', '执行状态一一', '是否分配货位', '是否生成世仓', '是否下发世仓'].includes(String(label));
					const cls = needHighlight ? (valStr.includes('已') ? 'text-[#52c41a]' : valStr.includes('未') ? 'text-[#f5222d]' : '') : '';
					const valueNode = <span className={cls}>{value}</span>;
					return (
						<Descriptions
							key={idx}
							className='mt-[25px] text-[22px]'
							bordered
							title={
								<div className='flex text-[28px] font-bold font-mono'>
									<div className='w-[270px] font-bold'>{`${label}${filler}>`}</div>
									{valueNode}
								</div>
							}
						/>
					);
				})}
			</div>
		)}
	</div>
);

const renderNoTask = () => (
	<div className='w-full h-[850px] flex justify-center items-center'>
		<Empty
			className='flex flex-col justify-center items-center'
			image={Stock}
			styles={{ image: { height: 150 } }}
			description={<div className='font-mono w-full flex justify-center text-[30px] font-bold'>{`暂无${taskType}`}</div>}
		/>
	</div>
);

const StepList = ({ list, current }: any) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
			{list.map((item: any, index: any) => {
				// const isActive = index === current;
				// const isFinished = index < current;

				const textColor: any = {
					未下发世仓: '#ff0000',
					已下发世仓: '#1677ff',
					'任务异常（不可选）': '#ff0000',
					任务已完成: '#e6f4ff',
				};

				const isActive = false;
				const isFinished = true;
				return (
					<div key={index} className='flex justify-start gap-10 '>
						{/* 左侧图标 */}
						<div
							className={`w-[55px] h-[55px] mt-3  rounded-full text-white text-[18px] flex items-center justify-center  font-bold  ${isActive ? 'bg-[#1677ff]' : isFinished ? 'bg-[#52c41a]' : 'bg-[#d9d9d9]'}`}
						>
							{index + 1}
						</div>

						{/* 右侧内容 */}
						<div className='w-full'>
							<div className={`text-[38px]   font-bold mb-1 ${isActive ? 'text-[#1677ff]' : 'text-[#333]'}`}>{item.pallet__c}</div>

							<div className='max-w-[95vw] xl:max-w-[1600px] text-[28px] font-bold leading-[1.3] flex flex-wrap gap-8 '>
								<div className='flex flex-col justify-center items-center  xl:w-[200px] 2xl:w-[220px]'>
									<span className='text-[18px] text-[#666] mb-[6px] w-full whitespace-nowrap overflow-hidden text-ellipsis'>创建任务时间</span>
									<span className='w-full whitespace-nowrap overflow-hidden text-ellipsis'>{item?.time__c?.substring(5)}</span>
								</div>
								<div className='flex flex-col justify-center items-center  xl:w-[110px] 2xl:w-[130px]'>
									<span className='text-[18px] text-[#666] mb-[6px] w-full whitespace-nowrap overflow-hidden text-ellipsis'>运行时长</span>
									<span className='w-full whitespace-nowrap overflow-hidden text-ellipsis'>{'6 分钟'}</span>
									{/* <span className='w-full whitespace-nowrap overflow-hidden text-ellipsis'>{`${((+new Date() - +new Date(item?.time__c)) / 60000).toFixed(0)} 分钟`}</span> */}
								</div>
								<div className='flex flex-col justify-center items-center   xl:w-[200px] 2xl:w-[220px]'>
									<span className='text-[18px] text-[#666] mb-[6px] w-full whitespace-nowrap overflow-hidden text-ellipsis'>起点到终点</span>
									<span className='w-full whitespace-nowrap overflow-hidden text-ellipsis'>{`${site} -> ${item.loc_dest__c}`}</span>
								</div>
								<div className='flex flex-col justify-center items-center  xl:w-[150px] 2xl:w-[170px]'>
									<span className='text-[18px] text-[#666] mb-[6px] w-full whitespace-nowrap overflow-hidden text-ellipsis'>任务状态</span>
									<span className='w-full whitespace-nowrap overflow-hidden text-ellipsis' style={{ color: textColor[item.send_sc__c] }}>
										{item.send_sc__c || '空'}
									</span>
								</div>
								<div className='flex flex-col justify-center items-center  xl:w-[220px] 2xl:w-[240px]'>
									<span className='text-[18px] text-[#666] mb-[6px] w-full whitespace-nowrap overflow-hidden text-ellipsis'>物料名称</span>
									<span className='w-full whitespace-nowrap overflow-hidden text-ellipsis'>{item.material_name__c}</span>
								</div>
								<div className='flex flex-col justify-center items-center  xl:w-[140px] 2xl:w-[160px]'>
									<span className='text-[18px] text-[#666] mb-[6px] w-full whitespace-nowrap overflow-hidden text-ellipsis'>批号</span>
									<span className='w-full whitespace-nowrap overflow-hidden text-ellipsis'>{item.batch__c}</span>
								</div>
								<div className='flex flex-col justify-center items-center  xl:w-[140px] 2xl:w-[160px]'>
									<span className='text-[18px] text-[#666] mb-[6px] w-full whitespace-nowrap overflow-hidden text-ellipsis'>生产日期</span>
									<span className='w-full whitespace-nowrap overflow-hidden text-ellipsis'>{item.production_date__c}</span>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default App;
