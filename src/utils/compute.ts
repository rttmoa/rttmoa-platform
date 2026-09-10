interface ComputeParams {
	(a: number, b: number, digits: number, op?: string): number | undefined;
}

/**
 * 加法(add)、减法(subtract)、乘法(multiply)、除法(divide)
 */
export class Compute {
	/*** method **
	 *  add / subtract / multiply / divide
	 * Compute.add(0.1, 0.2) >> 0.3
	 * Compute.multiply(19.9, 100) >> 1990
	 */

	//* 计算结果
	// 加法
	// console.log(0.1 + 0.2); // 0.30000000000000004
	// console.log(0.1 + 0.2222); // 0.32220000000000004
	// console.log(Compute.add(0.1, 0.2, 0)); // 0.3
	// console.log(Compute.add(0.1, 0.2222, 2)); // 0.3222
	// 减法
	// console.log(1.5 - 1.2); // 0.30000000000000004
	// console.log(0.03 - 0.02); // 0.009999999999999998
	// console.log(Compute.subtract(1.5, 1.2, 0)); // 0.3
	// console.log(Compute.subtract(0.03, 0.02, 0)); // 0.01
	// 乘法
	// console.log(19.9 * 100); // 1989.9999999999998
	// console.log(0.8 * 3); // 2.4000000000000004
	// console.log(Compute.multiply(19.9, 100, 0)); // 1990
	// console.log(Compute.multiply(0.8, 3, 0)); // 2.4
	// 除法
	// console.log(0.69 / 10); // 0.06899999999999999
	// console.log(Compute.divide(0.69, 10, 0)); // 0.069

	/*
	 * 判断obj是否为一个整数
	 */
	static isInteger(obj: any) {
		return Math.floor(obj) === obj;
	}

	/*
	 * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
	 * @param floatNum {number} 小数
	 * @return {object} result: {times:100, num: 314}
	 */
	static toInteger(floatNum: number) {
		var ret = { times: 1, num: 0 };
		if (Compute.isInteger(floatNum)) {
			ret.num = floatNum;
			return ret;
		}
		var strfi = floatNum + '';
		var dotPos = strfi.indexOf('.');
		var len = strfi.substr(dotPos + 1).length;
		var times = Math.pow(10, len);
		var intNum = Number(floatNum.toString().replace('.', ''));
		ret.times = times;
		ret.num = intNum;
		return ret;
	}

	/*
	 * 核心方法，实现加减乘除运算，确保不丢失精度
	 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
	 *
	 * @param a {number} 运算数1
	 * @param b {number} 运算数2
	 * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
	 * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
	 */
	static operation: ComputeParams = (a, b, digits, op) => {
		var o1 = Compute.toInteger(a);
		var o2 = Compute.toInteger(b);
		var n1 = o1.num;
		var n2 = o2.num;
		var t1 = o1.times;
		var t2 = o2.times;
		var max = t1 > t2 ? t1 : t2;
		var result: number;
		switch (op) {
			case 'add':
				if (t1 === t2) {
					// 两个小数位数相同
					result = n1 + n2;
				} else if (t1 > t2) {
					// o1 小数位 大于 o2
					result = n1 + n2 * (t1 / t2);
				} else {
					// o1 小数位 小于 o2
					result = n1 * (t2 / t1) + n2;
				}
				return result / max;
			case 'subtract':
				if (t1 === t2) {
					result = n1 - n2;
				} else if (t1 > t2) {
					result = n1 - n2 * (t1 / t2);
				} else {
					result = n1 * (t2 / t1) - n2;
				}
				return result / max;
			case 'multiply':
				result = (n1 * n2) / (t1 * t2);
				return result;
			case 'divide':
				result = (n1 / n2) * (t2 / t1);
				return result;
		}
	};

	// 加减乘除的四个接口
	/** #### 加法： */
	static add: ComputeParams = (a, b, digits) => {
		return Compute.operation(a, b, digits, 'add');
	};
	static subtract: ComputeParams = (a, b, digits) => {
		return Compute.operation(a, b, digits, 'subtract');
	};
	static multiply: ComputeParams = (a, b, digits) => {
		return Compute.operation(a, b, digits, 'multiply');
	};
	static divide: ComputeParams = (a, b, digits) => {
		return Compute.operation(a, b, digits, 'divide');
	};
}
