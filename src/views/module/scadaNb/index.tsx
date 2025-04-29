import { Card } from 'antd'
import ScadaImage from './Scada.png'
import LineRow from './icons/shusongxian1.png'
import LineCol from './icons/shusongxian2.png'
import Huojia from './icons/huojiaxinxi.png'
import LineRowGoods from './icons/shusongxian-yes1.png'
import LineColGoods from './icons/shusongxian-yes2.png'
import SvgIcon from '@/components/SvgIcon'
import HandStatic from './icons/maduogongyi.png'
import PreHuojia from './icons/huojia.png'
import React from 'react'
import './index.less'

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
						{/* <ScadaMap1022 /> */}
						{/* <ScadaMap1032 /> */}
						{/* <ScadaMap1037 /> */}
					</div>
					<div>
						{/* <ScadaMapStarcker01 /> */}
						{/* <ScadaMapStarcker02 /> */}
						{/* <ScadaMapStarcker03 /> */}
						{/* <ScadaMapStarcker04 /> */}
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
		{ pallet: 100, isAuto: 3, isHasPallet: 0, site: '1032' }, // 26
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 }, // 20
		{ pallet: 100, isAuto: 3, isHasPallet: 1 }, // 19
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 }, // 13
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 }, // 9
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 }, // 3
		{ pallet: 100, isAuto: 3, isHasPallet: 1 }, // 2
		{ pallet: 100, isAuto: 3, isHasPallet: 0 }, // 1
	]
	const coverLines1 = [
		{ pallet: 100, isAuto: 3, isHasPallet: 0, site: '1032' },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
	]
	const coverLines2 = [
		{ pallet: 100, isAuto: 3, isHasPallet: 0, site: '1032' },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0, site: '1032' },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
	]
	const coverLines3 = [
		{ pallet: 100, isAuto: 3, isHasPallet: 0, site: '1032' },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
		{ pallet: 100, isAuto: 3, isHasPallet: 0, site: '1032' },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
	]

	const coverShelfs = [
		{ pallet: 100, isAuto: 3, isHasPallet: 0, site: '1032' },
		{ pallet: 100, isAuto: 3, isHasPallet: 0 },
		{ pallet: 100, isAuto: 3, isHasPallet: 1 },
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
	]
	return (
		<div className="relative">
			{/* <SvgIcon name="scada-blue-jiantou-zuo" iconStyle={{ width: '30px', height: '30px', position: 'absolute', left: 35 }} /> */}
			<SvgIcon name="scada-blue-jiantou-xia" iconStyle={{ width: '30px', height: '30px', position: 'absolute', top: -20, left: 55 }} />
			<SvgIcon name="scada-blue-jiantou-shang" iconStyle={{ width: '30px', height: '30px', position: 'absolute', top: -10, left: 80 }} />
			<span className="font-mono absolute top-[-60px] left-[70px]">1019 - {coverLines.length}</span>
			<div className="flex flex-row relative">
				{/* 纵向输送线 1-26节 */}
				<div className="w-[15px] flex flex-col mt-[10px] ml-[60px]">
					{coverLines.map((element, index) => (
						<div key={index} className={`w-[20px] h-[20px] mt-1`}>
							<img src={element.isHasPallet == 0 ? LineCol : LineColGoods} alt="" />
						</div>
					))}
				</div>
				<div className="w-[15px] flex flex-col mt-[10px] ml-[10px]">
					{coverLines.map((element, index) => {
						if (index != 4 && index != 5) {
							return (
								<div key={index} className={`w-[20px] h-[20px] mt-1`}>
									<img src={element.isHasPallet == 0 ? LineCol : LineColGoods} alt="" />
								</div>
							)
						} else
							return (
								<div key={index} className={`w-[20px] h-[20px] mt-1`}>
									{' '}
								</div>
							)
					})}
				</div>
				{/* 横向输送线  码垛位  */}
				<div className="">
					<div className="flex flex-row ml-[5px] mt-[160px] ">
						{coverLines1.map((element, index) => (
							<div key={index} className={`w-[20px] h-[20px] ml-1`}>
								<img src={element.isHasPallet == 0 ? LineRow : LineRowGoods} alt="" />
							</div>
						))}
					</div>
					<div className="flex flex-row ml-[5px] mt-[5px]">
						{coverLines1.map((element, index) => (
							<div key={index} className={`w-[20px] h-[20px] ml-1`}>
								<img src={element.isHasPallet == 0 ? LineRow : LineRowGoods} alt="" />
							</div>
						))}
					</div>
					<div className="flex flex-row ml-[15px] mt-[20px]">
						<div className={`w-[80px] h-[0px] ml-1`}>
							<img src={HandStatic} alt="" />
						</div>
					</div>

					<div className="flex flex-row ml-[5px] mt-[100px]">
						{coverLines1.map((element, index) => (
							<div key={index} className={`w-[20px] h-[20px] ml-1`}>
								<img src={element.isHasPallet == 0 ? LineRow : LineRowGoods} alt="" />
							</div>
						))}
					</div>
					<div className="flex flex-row ml-[5px] mt-[80px]">
						{coverLines1.map((element, index) => (
							<div key={index} className={`w-[20px] h-[20px] ml-1`}>
								<img src={element.isHasPallet == 0 ? LineRow : LineRowGoods} alt="" />
							</div>
						))}
					</div>
					<div className="flex flex-row ml-[15px] mt-[20px]">
						<div className={`w-[80px] h-[0px] ml-1`}>
							<img src={HandStatic} alt="" />
						</div>
					</div>
					<div className="flex flex-row ml-[5px] mt-[100px]">
						{coverLines1.map((element, index) => (
							<div key={index} className={`w-[20px] h-[20px] ml-1`}>
								<img src={element.isHasPallet == 0 ? LineRow : LineRowGoods} alt="" />
							</div>
						))}
					</div>
					<div className="flex flex-row ml-[5px] mt-[5px]">
						{coverLines1.map((element, index) => (
							<div key={index} className={`w-[20px] h-[20px] ml-1`}>
								<img src={element.isHasPallet == 0 ? LineRow : LineRowGoods} alt="" />
							</div>
						))}
					</div>
				</div>
				{/* 右侧大托盘 */}
				<div className="">
					{/* 码垛位1 */}
					<div className="flex flex-row ml-[5px] mt-[160px]">
						<div className={`w-[50px] h-[20px] ml-1`}>
							<img src={LineRow} alt="" />
						</div>
					</div>
					<div className="flex flex-row ml-[5px] mt-[58px]">
						<div className={`w-[50px] h-[20px] ml-1`}>
							<img src={LineRow} alt="" />
						</div>
					</div>
					<div className="flex flex-row ml-[5px] mt-[62px]">
						<div className={`w-[50px] h-[20px] ml-1`}>
							<img src={LineRow} alt="" />
						</div>
					</div>
					{/* 码垛位2 */}
					<div className="flex flex-row ml-[5px] mt-[60px]">
						<div className={`w-[50px] h-[20px] ml-1`}>
							<img src={LineRow} alt="" />
						</div>
					</div>
					<div className="flex flex-row ml-[5px] mt-[59px]">
						<div className={`w-[50px] h-[20px] ml-1`}>
							<img src={LineRow} alt="" />
						</div>
					</div>
					<div className="flex flex-row ml-[5px] mt-[60px]">
						<div className={`w-[50px] h-[20px] ml-1`}>
							<img src={LineRow} alt="" />
						</div>
					</div>
				</div>
				{/* 码垛右侧输送线部分 */}
				<div className="flex flex-row">
					<div className="w-[15px] flex flex-col mt-[160px] ml-[3px]">
						{coverLines2.map((element, index) => {
							if (index == coverLines2.length - 2) {
								return (
									<div key={index} className={`w-[50px] h-[20px] mb-[40px]`}>
										<img src={element.isHasPallet == 0 ? LineCol : LineColGoods} alt="" />
									</div>
								)
							}
							return (
								<div key={index} className={`w-[50px] h-[20px] mb-[60px]`}>
									<img src={element.isHasPallet == 0 ? LineCol : LineColGoods} alt="" />
								</div>
							)
						})}
					</div>
					<div className="w-[15px] flex flex-col mt-[160px] ml-[40px]">
						{coverLines3.map((element, index) => (
							<div key={index} className={`w-[50px] h-[20px] mb-[60px]`}>
								<img src={element.isHasPallet == 0 ? LineCol : LineColGoods} alt="" />
							</div>
						))}
					</div>
				</div>
				{/* 右侧货架部分 */}
				<div className="">
					<div className=" flex flex-row mt-[160px] ml-[100px]">
						{new Array(38).fill(0).map((element, index) => (
							<div key={index} className={`w-[20px] h-[20px] ml-[2px]`}>
								<img src={index == 0 || index == 1 ? PreHuojia : Huojia} alt="" />
							</div>
						))}
					</div>
					<div className=" flex flex-row mt-[10px] ml-[100px]">
						{new Array(38).fill(0).map((element, index) => (
							<div key={index} className={`w-[20px] h-[20px] ml-[2px]`}>
								<img src={index == 0 || index == 1 ? PreHuojia : Huojia} alt="" />
							</div>
						))}
					</div>
					<div className=" flex flex-row mt-[120px] ml-[100px]">
						{new Array(38).fill(0).map((element, index) => (
							<div key={index} className={`w-[20px] h-[20px] ml-[2px]`}>
								<img src={index == 0 || index == 1 ? PreHuojia : Huojia} alt="" />
							</div>
						))}
					</div>
					<div className=" flex flex-row mt-[10px] ml-[100px]">
						{new Array(38).fill(0).map((element, index) => (
							<div key={index} className={`w-[20px] h-[20px] ml-[2px]`}>
								<img src={index == 0 || index == 1 ? PreHuojia : Huojia} alt="" />
							</div>
						))}
					</div>
					<div className=" flex flex-row mt-[120px] ml-[100px]">
						{new Array(38).fill(0).map((element, index) => (
							<div key={index} className={`w-[20px] h-[20px] ml-[2px]`}>
								<img src={index == 0 || index == 1 ? PreHuojia : Huojia} alt="" />
							</div>
						))}
					</div>
					<div className=" flex flex-row mt-[10px] ml-[100px]">
						{new Array(38).fill(0).map((element, index) => (
							<div key={index} className={`w-[20px] h-[20px] ml-[2px]`}>
								<img src={index == 0 || index == 1 ? PreHuojia : Huojia} alt="" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Scada
