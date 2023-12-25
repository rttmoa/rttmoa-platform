/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import dayjs from "dayjs";
import { useEffect, useState, useRef } from "react";
import { randomNum } from "@/utils/index";




/**
 * @description 获取本地时间
 * @link momentjs http://momentjs.cn/
 */
export const useTimes = () => {
	const timer: any = useRef(null);
	const [time, setTime] = useState(dayjs().format("YYYY年MM月DD日 HH:mm:ss"));  // 标题：时间
	
	const [random, setRandom] = useState(0);		// 实时游客统计：百分数
	const [str, setStr] = useState("");					// 实时游客统计：人数
	const [gender, setGender] = useState(0)			// 男女比例：百分数    +x.toFixed(2)    +(1-x).toFixed(2)

	const [over30, setOver30] = useState<Number[]>([]);   // 未来30天游客量趋势图

	const[tourist, setTourist] = useState<String[]>([]);  // 年度游客对比：12月份[0, 600] 


	useEffect(() => {
		timer.current = setInterval(() => {
			setTime(dayjs().format("YYYY年MM月DD日 HH:mm:ss"));
			setRandom(Math.random())
			setStr(Math.random().toString().substring(2, 8))
			setGender(Math.random())
			let genArr: String[] = [];
			for (let i = 0; i < 12; i++) { genArr.push(String(parseInt(String((Math.random() * 600))))) }
			setTourist(genArr)
			setOver30(new Array(30).fill("").map(val => {
				val = randomNum(1, 20000);
				return val;
			}))
		}, 5000);

		
		return () => { clearInterval(timer.current); };
	}, [time]);

	console.log(time);

	return {
		time,		// 当前时间
		random,	// [0, 1) 随机数
		str,		// 六位字符串
		gender,

		over30, // 未来30天游客量趋势图

		tourist, // 游客
	};
};
