import { Empty } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { CLIENT_RENEG_LIMIT } from 'tls';
import './index.less';
import FakeData from './FakeData';
import { screen_API } from '@/api/modules/screen';

const MaleFemaleRatioChart: React.FC = () => {
	const scrollRef = useRef(null);

	useEffect(() => {
		const scrollContainer: any = scrollRef.current;
		if (!scrollContainer) return;

		let scrollStep = 1;
		let intervalId: any;

		const startScroll = () => {
			intervalId = setInterval(() => {
				if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
					// 滚动到底部后重置
					scrollContainer.scrollTop = 0;
				} else {
					scrollContainer.scrollTop += scrollStep;
				}
			}, 1000); // 控制滚动速度
		};

		startScroll();

		// 鼠标悬停暂停滚动
		scrollContainer.addEventListener('mouseenter', () => clearInterval(intervalId));
		scrollContainer.addEventListener('mouseleave', startScroll);

		return () => clearInterval(intervalId);
	}, []);

	function formatTimeToUTC8(isoString: string) {
		const date = new Date(isoString);

		// 转换为东八区时间 (UTC+8)
		date.setHours(date.getHours() + 8);

		// 提取时间组件并补零
		const year = date.getUTCFullYear();
		const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const day = String(date.getUTCDate()).padStart(2, '0');
		const hours = String(date.getUTCHours()).padStart(2, '0');
		const minutes = String(date.getUTCMinutes()).padStart(2, '0');
		const seconds = String(date.getUTCSeconds()).padStart(2, '0');

		return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
	}

	// 使用示例
	//   const inputTime = "2025-08-07T00:39:28.103Z";
	//   const formattedTime = formatTimeToUTC8(inputTime);

	const [dataSource, setdataSource] = useState([]);

	// useEffect(() => {

	// 	fetch("http://127.0.0.1:1880/wait_enter").then(res => res.json()).then(value => {
	// 		console.log('data', value.data)
	// 		const key = value.data.map((value: any, key: any) => ({ ...value, key: key + 1 }))
	// 		setdataSource(key)
	// 	})
	// }, []);
	// const api = {
	// 		find: keepwarm_stock_detail_API.find,
	// 		add: keepwarm_stock_detail_API.add,
	// 		modify: keepwarm_stock_detail_API.mod,
	// 		del: keepwarm_stock_detail_API.del,
	// 		delMore: keepwarm_stock_detail_API.delMore,
	// 		importEx: keepwarm_stock_detail_API.importEx,
	// 	};
	async function GetData() {
		// fetch('http://127.0.0.1:1880/wait_enter')
		// 	.then(res => res.json())
		// 	.then(value => {
		// 		// console.log('data', value.data)
		// 		const key = value.data.map((value: any, key: any) => ({ ...value, key: key + 1 }));
		// 		setdataSource(key);
		// 	});

		const data: any = await screen_API.find({});
		console.log('datassss', data?.data?.list);
	}

	const timerRef = useRef<any>(null); // 保存定时器ID

	useEffect(() => {
		// 创建定时器
		timerRef.current = setInterval(() => {
			GetData();
		}, 2000); // 每1秒执行一次

		// 清理函数：组件卸载时清除定时器
		return () => {
			clearInterval(timerRef.current);
		};
	}, []); // 空依赖数组，只在组件挂载时执行

	let car: any = {
		'0': '未执行',
		'1': '正在执行',
		'2': '已完成',
	};
	let loc: any = {
		'0': '未执行',
		'on-lift': '提升机口',
		'in-lift': '提升机内',
		'on-rack': '已完成',
		'on-shuttle': '入库中',
	};
	return (
		<div className='ratio-main'>
			<div className='flex justify-center  text-[18px] text-green-400 font-bold'>实时入库任务状态</div>
			<div className='mt-[15px] w-full text-white font-mono'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='text-[14px] text-orange-400'>
							<th className='w-[40px]'>索引</th>
							<th className='w-[70px]'>产品代码</th>
							<th className='w-[190px]'>产品名称</th>
							<th className='w-[90px]'>托盘码</th>
							<th className='w-[90px]'>物流位置</th>
							<th className='w-[90px]'>呼叫小车</th>
							<th className='w-[90px]'>小车取货</th>
							<th className='w-[90px]'>小车放货</th>
							<th className='w-[180px]'>更新时间</th>
						</tr>
					</thead>
				</table>

				{/* 滚动区域 */}
				<div className='max-h-[300px] overflow-y-auto' ref={scrollRef}>
					<table className='w-full border-collapse'>
						<tbody>
							{FakeData.length != 0 ? (
								FakeData.map((value: any, index: number) => (
									<tr key={index} className='w-[100px] text-[14px]'>
										<td className='w-[40px] text-center'>{value.key}</td>
										<td className='w-[70px] text-center'>{value.shproductpacktypecode__c}</td>
										<td className='max-w-[110px] text-center text-ellipsis text-nowrap overflow-hidden'>{value.shproductpacktypename__c}</td>
										<td className='w-[90px] text-center'>{value.pallet_code__c.substring(4)}</td>
										<td className='w-[90px] text-center'>{loc[value.logic_site__c]}</td>
										<td className='w-[90px] text-center'>{car[value.shuttle_call__c] || '未执行'}</td>
										<td className='w-[90px] text-center'>{car[value.shuttle_fetch__c] || '未执行'}</td>
										<td className='w-[90px] text-center'>{car[value.shuttle_release__c] || '未执行'}</td>
										<td className='w-[180px] text-center'>{formatTimeToUTC8(value.modified)}</td>
									</tr>
								))
							) : (
								<div className='flex justify-center mt-[30px]'>
									<Empty description={<div className='text-[#fba926] text-[18px]'>暂无待入库托盘</div>} />
								</div>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default MaleFemaleRatioChart;
