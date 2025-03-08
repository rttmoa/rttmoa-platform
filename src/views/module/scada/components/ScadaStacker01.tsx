import Shusongxian1 from '../icons/shusongxian1.png'
import Huojia from '../icons/huojiaxinxi.png'

const ScadaMapStarcker01 = () => {
	const coverLines = [
		{ x: 100, y: 200 },
		{ x: 300, y: 400 },
	]
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
	]
	return (
		<div className="w-auto h-[100px] relative flex mt-[55px] ml-[10px]">
			<div>
				<div className="flex">
					{coverLines.map((square, index) => (
						<div key={index} className={`w-[30px] h-[30px]   ml-3`}>
							<img src={Shusongxian1} alt="" />
						</div>
					))}
				</div>
				<div className="flex mt-5">
					{coverLines.map((square, index) => (
						<div key={index} className={`w-[30px] h-[30px]   ml-3`}>
							<img src={Shusongxian1} alt="" />
						</div>
					))}
				</div>
			</div>
			<div>
				<div className="flex ml-4">
					{shelves.map((square, index) => (
						<div key={index} className={`w-[30px] h-[30px]  ml-[2px] -mt-[25px]`}>
							<img src={Huojia} alt="" />
						</div>
					))}
				</div>
				<div className="mt-5 ml-6">堆垛机</div>
				<div className="flex ml-4 mt-[45px]">
					{shelves.map((square, index) => (
						<div key={index} className={`w-[30px] h-[30px]   ml-[2px] -mt-[15px]`}>
							<img src={Huojia} alt="" />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ScadaMapStarcker01
