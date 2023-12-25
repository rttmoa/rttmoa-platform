// /*判断一个元素是否在数组中*/
// function contains (arr: string | any[], val: any) {
// 	return arr.indexOf(val) != -1 ? true : false;
// }

// /**
// * @param  {arr} 数组
// * @param  {fn} 回调函数
// * @return {undefined}
// */
// function each (arr: string | any[], fn: FunctionConstructor) {
// 	fn = fn || Function;
// 	var a = [];
// 	var args = Array.prototype.slice.call(arguments, 1);
// 	for(var i = 0; i < arr.length; i++) {
// 		var res = fn.apply(arr, [arr[i], i].concat(args));
// 		if(res != null) a.push(res);
// 	}
// }

// /**
// * @param  {arr} 数组
// * @param  {fn} 回调函数
// * @param  {thisObj} this指向
// * @return {Array}
// *
// function map (this: any, arr: string | any[], fn: { (o: any): any; call?: any; }, thisObj: any | (Window & typeof globalThis) | undefined) {
// 	var scope = thisObj || window;
// 	var a = [];
// 	for(var i = 0, j = arr.length; i < j; ++i) {
// 		var res = fn.call(scope, arr[i], i, this);
// 		if(res != null) a.push(res);
// 	}
// 	return a;
// }

// /**
// * @param  {arr} 数组
// * @param  {type} 1：从小到大   2：从大到小   3：随机
// * @return {Array}
// */
// function sort (arr: any, type = 1) {
// 	return arr.sort((a: number, b: number) => {
// 		switch(type) {
// 				case 1:
// 						return a - b;
// 				case 2:
// 						return b - a;
// 				case 3:
// 						return Math.random() - 0.5;
// 				default:
// 						return arr;
// 		}
// 	})
// }

// /*去重*/
// function unique (arr: []) {
// 	if ( Array.hasOwnProperty('from') ) {
// 		return Array.from(new Set(arr));
// 	}else{
// 		var n = {},r: never[] = [];
// 		for(var i = 0; i < arr.length; i++){
// 				if (!n[arr[i]]){
// 						n[arr[i]] = true;
// 						r.push(arr[i]);
// 				}
// 		}
// 		return r;
// 	}
// }

// /*求两个集合的并集*/
// function union (this: any, a: string | any[], b: any) {
// 	var newArr = a.concat(b);
// 	return this.unique(newArr);
// }

// /*求两个集合的交集*/
// function intersect (this: any, a: any, b: any) {
// 	var _this = this;
// 	a = this.unique(a);
// 	return this.map(a, function(o: any) {
// 			return _this.contains(b, o) ? o : null;
// 	});
// }

// /*删除其中一个元素*/
// function remove (arr: any[], ele: any) {
// 	var index = arr.indexOf(ele);
// 	if(index > -1) {
// 			arr.splice(index, 1);
// 	}
// 	return arr;
// }

// /*将类数组转换为数组的方法*/
// function formArray (ary: number | Iterable<any> | null | undefined) {
// 	var arr: number | Iterable<any> | null | undefined = [];
// 	if(Array.isArray(ary)) {
// 			arr = ary;
// 	} else {
// 			arr = Array.prototype.slice.call(ary);
// 	};
// 	return arr;
// }

// /*最大值*/
// function max (arr: number[]) {
// 	return Math.max.apply(null, arr);
// }

// /*最小值*/
// function min (arr: number[]) {
// 	return Math.min.apply(null, arr);
// }

// /*求和*/
// function sum (arr: any[]) {
// 	return arr.reduce( (pre: any, cur: any) => {
// 			return pre + cur
// 	})
// }

// /*平均值*/
// function average (arr: string | any[]) {
// 	return this.sum(arr)/arr.length
// }
