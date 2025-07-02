import Shusongxian_None from '../icons/shusongxian1.png';
import Shusongxian_Yes from '../icons/shusongxian-yes1.png';
import Huojia from '../icons/huojiaxinxi.png';
import Stacker from '../icons/a-dangongweiduiduoji-youmantuo.png';

export default function ScadaStacker() {
	const coverLinesEnter = [
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
	];
	const coverLinesOut = [
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
	];
	const shelves = [
		{ x: 100, y: 200 },
		{ x: 300, y: 400 },
		{ x: 100, y: 200 },
		{ x: 300, y: 400 },
		{ x: 100, y: 200 },
		{ x: 300, y: 400 },
		{ x: 100, y: 200 },
		{ x: 300, y: 400 },
		{ x: 100, y: 200 },
		{ x: 300, y: 400 },
		{ x: 100, y: 200 },
		{ x: 300, y: 400 },
		{ x: 300, y: 400 },
		{ x: 100, y: 200 },
		{ x: 300, y: 400 },
		{ x: 100, y: 200 },
		{ x: 300, y: 400 },
		{ x: 300, y: 400 },
		{ x: 100, y: 200 },
		{ x: 300, y: 400 },
	];
	return (
		<div className='w-auto h-[100px] relative flex mt-[55px] ml-[10px]'>
			<div>
				{/* 第一节线是出库 */}
				<div className='flex'>
					{coverLinesOut.map((element, index) => (
						<div key={index} className={`w-[30px] h-[30px]   ml-3`}>
							<img src={element.isHasPallet == 0 ? Shusongxian_None : Shusongxian_Yes} alt='' />
						</div>
					))}
				</div>
				{/* 第二节线是入库 */}
				<div className='flex mt-5'>
					{coverLinesEnter.map((element, index) => (
						<div key={index} className={`w-[30px] h-[30px]   ml-3`}>
							<img src={element.isHasPallet == 0 ? Shusongxian_None : Shusongxian_Yes} alt='' />
						</div>
					))}
				</div>
			</div>
			<div>
				<div className='flex ml-4'>
					{shelves.map((element, index) => (
						<div key={index} className={`w-[30px] h-[30px]  ml-[2px] -mt-[25px]`}>
							<img src={Huojia} alt='' />
						</div>
					))}
				</div>
				{/* <div className="mt-5 ml-6">堆垛机</div> */}
				<div className='mt-[10px] ml-[14px] w-[45px] h-[45px]'>
					<img src={Stacker} alt='' />
				</div>
				<div className='flex ml-4 mt-[25px]'>
					{shelves.map((element, index) => (
						<div key={index} className={`w-[30px] h-[30px]   ml-[2px] -mt-[15px]`}>
							<img src={Huojia} alt='' />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
