import { Card } from 'antd'
import ScadaImage from './Scada.png'
import Shusongxian_None from './icons/shusongxian1.png'
import Huojia from './icons/huojiaxinxi.png'
import Shusongxian_Yes from './icons/shusongxian-yes1.png'

import React from 'react'
import './index.less'
import ScadaMapStarcker01 from './components/ScadaStacker01'
import ScadaMapStarcker03 from './components/ScadaStacker03'
import ScadaMapStarcker02 from './components/ScadaStacker02'
import ScadaMapStarcker04 from './components/ScadaStacker04'
import SvgIcon from '@/components/SvgIcon'

const Scada: React.FC = () => {
	const obj1 = { uname: 1 }
	return (
		<div className="scada-container flex ">
			<Card className="sc-card  w-full h-screen bg-slate-200">
				<div className="relative bg-[#0F1D38] w-[600px] py-[6px] mt-[15px] mx-auto rounded-3xl">
					<SvgIcon name="scada-title-01" iconStyle={{ position: 'absolute', left: 30, top: 9, width: '30px', height: '30px' }} />
					<span className="flex justify-center font-serif text-3xl font-bold text-slate-100">SCADA</span>
				</div>

				{/* <img className="sc-img " src={ScadaImage} alt="" /> */}
				{/* <div className="sc-1">123</div> */}
				{/* <div className="w-[52px] h-[45px]  bg-cyan-200">sssss</div> */}

				<div className="flex">
					<div>
						<ScadaMap1019 {...obj1} />
						<ScadaMap1022 />
						<ScadaMap1032 />
						<ScadaMap1037 />
					</div>
					<div>
						<ScadaMapStarcker01 />
						<ScadaMapStarcker02 />
						<ScadaMapStarcker03 />
						<ScadaMapStarcker04 />
					</div>
				</div>
				<div className="ml-[100px] mt-[20px]">
					<div>每个站点说明</div>
					<div>入库流程</div>
					<div>出库流程</div>
				</div>
			</Card>
		</div>
	)
}
let dw = 30
let dh = 30
type ScadaParams1 = {
	uname: number
}
const ScadaMap1019: React.FC<ScadaParams1> = ({ uname }) => {
	const coverLines = [
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
	]
	return (
		<div className="relative">
			<SvgIcon name="scada-blue-jiantou-zuo" iconStyle={{ width: '30px', height: '30px', position: 'absolute', left: 35 }} />
			<SvgIcon name="scada-blue-jiantou-zuo" iconStyle={{ width: '30px', height: '30px', position: 'absolute', right: 55 }} />
			<span className="font-mono absolute top-[-30px] left-[70px]">1019</span>
			<div className="w-[300px]  flex mt-[100px] ml-[60px]">
				{coverLines.map((element, index) => (
					<div key={index} className={`w-[30px] h-[30px]   ml-3`}>
						<img src={element.isHasPallet == 0 ? Shusongxian_None : Shusongxian_Yes} alt="" />
					</div>
				))}
			</div>
		</div>
	)
}

const ScadaMap1022 = () => {
	const coverLines = [
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
	]
	return (
		<div className="relative">
			<SvgIcon name="scada-blue-jiantou-you" iconStyle={{ width: '30px', height: '30px', position: 'absolute', left: 35 }} />
			<SvgIcon name="scada-blue-jiantou-you" iconStyle={{ width: '30px', height: '30px', position: 'absolute', right: 55 }} />
			<span className="font-mono absolute top-[35px] left-[240px]">1022</span>
			<div className="w-[300px] flex ml-[60px] mt-[25px]">
				{coverLines.map((element, index) => (
					<div key={index} className={`w-[30px] h-[30px]   ml-3`}>
						<img src={element.isHasPallet == 0 ? Shusongxian_None : Shusongxian_Yes} alt="" />
					</div>
				))}
			</div>
		</div>
	)
}
const ScadaMap1032 = () => {
	const coverLines = [
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
	]
	return (
		<div className="w-[300px]  flex mt-[225px] ml-[60px]">
			{coverLines.map((element, index) => (
				<div key={index} className={`w-[30px] h-[30px]   ml-3`}>
					<img src={element.isHasPallet == 0 ? Shusongxian_None : Shusongxian_Yes} alt="" />
				</div>
			))}
		</div>
	)
}
const ScadaMap1037 = () => {
	const coverLines = [
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
	]
	return (
		<div className="w-[300px]  flex mt-[25px] ml-[60px]">
			{coverLines.map((element, index) => (
				<div key={index} className={`w-[30px] h-[30px]   ml-3`}>
					<img src={element.isHasPallet == 0 ? Shusongxian_None : Shusongxian_Yes} alt="" />
				</div>
			))}
		</div>
	)
}

export default Scada
