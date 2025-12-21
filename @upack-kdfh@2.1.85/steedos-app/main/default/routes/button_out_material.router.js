const express = require('express');
const router = express.Router();
const objectql = require('@steedos/objectql');

// let fDocs = await objectql.getObject("feihe_th__c").find({filters: [['pallet_id__c', '=', pallet], ['plctask__c', '=', plctask]]});
// await objectql.getObject("stacker1__c").update(str[0]._id, {name: '人工处理', status__c: '6', pri__c: '6', undone__c: '已完成', done__c: '6',  })
// await objectql.getObject("wcs_p_wms").insert({
//     funcode: '403',
//     cmdno: Fulux[0].cmdno,
//     cmdtype: '1',

//     ...baseInfo
// });

// TODO: EWM包材 出库任务表中   出库执行按钮
router.post('/api/button/out/material', async function (req, res) {
	const spaceId = '61c51b8f4cada30031994f3d';
	const userId = '63dc7de4902db72a48e718f2';
	const baseInfo = {
		space: spaceId,
		created: new Date(),
		created_by: userId,
		owner: userId,
	};
	function dateTime() {
		Date.prototype.format = function (format) {
			var o = {
				'M+': this.getMonth() + 1, //month
				'd+': this.getDate(), //day
				'h+': this.getHours(), //hour
				'm+': this.getMinutes(), //minute
				's+': this.getSeconds(), //second
				'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
				S: this.getMilliseconds(), //millisecond
			};
			if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
			for (var k in o) if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
			return format;
		};
		return new Date().format('yyyy/MM/dd hh:mm:ss');
	}

	const data = req.body.data;
	const fData = data.filter(v => v.status__c === '未执行');
	if (fData && fData.length > 0) {
		// FIX
		// order__c 交货单号
		// out_loc__c 出库站点号
		for (const item of fData) {
			if (item.qty__c && item.reserved2__c !== '' && item.source__c !== '') {
				let source = item.source__c;
				const lane = +source.substring(0, 2);
				const row = +source.substring(2, 4);
				let palletRes = await objectql.getObject('hs_pallet_detail__c').find({
					filters: [['loc__c', '=', item.source__c]],
				});
				// 在托盘详情数据找到该托盘
				if (palletRes.length) {
					if (palletRes.length === 1) {
						let finiallyLoc = '';
						const type = item.reserved2__c;
						if (type === 'XO02') {
							finiallyLoc = '';
						} else {
							const zone = palletRes[0].use__c; // 判断库存中的托盘区域
							if (zone === '包材区域') finiallyLoc = '1047';
							if (zone === '成品区域') {
								const value = Math.floor(Math.random() * 3); // 0,1,2,3
								let locLoc = { 0: '1090', 1: '1092', 2: '1094' };
								finiallyLoc = locLoc[value];
							}
						}
						// 如果有车间站点
						if (item.car_loc2__c) {
							finiallyLoc = item.car_loc2__c;
						}
						// FIX:
						// const fDocc = autoTask.filter(v => String(v.order__c).trim() == item.docno__c)
						// if(fDocc.length){
						//     const {out_loc__c} = fDocc[0];
						//     finiallyLoc = out_loc__c
						// }

						// if(item.docno__c)
						// EWM传递相同库位时，如果正在出库，那么再传递数量要直接扣减，不需要出库任务
						if (finiallyLoc) {
							const ewmQTY = item.qty__c; // EWM传递的数量
							const storeQTY = palletRes[0].qty__c; // 当前数量
							const lastQTY = palletRes[0].last_qty__c; // 最终数量
							const allQTY = lastQTY - ewmQTY; // 在库数量 - EWM  = 最终数量    大于：100-80   等于：100-100   小于：100-200
							const handleQTY = +allQTY.toFixed(3);
							const status = palletRes[0].status__c; // 处理托盘状态：在库、正在出库、已出库

							async function common() {
								const time = dateTime();
								const taskNo = '33' + String(parseInt(Math.random() * 9999999999999)).substring(0, 9);
								const pallet = palletRes[0].pallet__c;
								const detail = await objectql.getObject('hs_pallet_info__c').insert({
									name: '查看详情',
									time__c: time,
									task_type__c: '出库任务',
									pallet__c: pallet,
									taskno__c: taskNo,
									step1__c: '任务已创建',

									...baseInfo,
								});
								await objectql.getObject('hs_task__c').insert({
									...palletRes[0],
									name: '步骤壹',
									time__c: time,
									pallet__c: pallet,
									taskno__c: taskNo,
									curr_loc__c: `${source}`,
									fromloc__c: `${source}`,
									nextloc__c: finiallyLoc,
									product__c: '',
									priority__c: 1,
									is_manual__c: '否',
									work_type__c: '搬运任务',
									task_source__c: '上位自动',
									task_type__c: '出库任务',
									detail_info__c: detail._id, // 位置详情，iD关联

									...baseInfo,
								});
								let stra = {
									1: '一号堆垛机',
									2: '二号堆垛机',
									3: '三号堆垛机',
									4: '四号堆垛机',
								};
								await objectql.getObject('hs_stacker__c').insert({
									time__c: time,
									stacker__c: stra[lane],
									pallet__c: pallet,
									taskno__c: taskNo,
									product__c: '1',
									fromloc__c: source,
									nextloc__c: finiallyLoc,
									cmdtype__c: '出库任务',
									type_scurce__c: '上位自动',
									priority__c: Number(1), // 优先级
									status__c: '未执行',
									remove__c: '无', // 移库分解动作

									...baseInfo,
								});
							}

							if (status === '在库') {
								if (handleQTY == 0) {
									if (row === 2 || row === 3) {
										await common();
									} else {
										new Promise((reslove, reject) => {
											setTimeout(async () => {
												await common();
											}, 2000);
										});
									}
									await objectql.getObject('hs_pallet_detail__c').update(palletRes[0]._id, { last_qty__c: handleQTY, status__c: '正在出库' });
									await objectql.getObject('hs_ewm_out_material__c').update(item._id, { status__c: '执行成功', desc__c: '' });
								}
								if (handleQTY > 0) {
									if (row === 2 || row === 3) {
										await common();
									} else {
										new Promise((reslove, reject) => {
											setTimeout(async () => {
												await common();
											}, 2000);
										});
									}
									await objectql.getObject('hs_pallet_detail__c').update(palletRes[0]._id, { last_qty__c: handleQTY, status__c: '正在出库' });
									await objectql.getObject('hs_ewm_out_material__c').update(item._id, { status__c: '执行成功', desc__c: '' });
								}
								if (handleQTY < 0) {
									await objectql.getObject('hs_ewm_out_material__c').update(item._id, { status__c: '执行失败', desc__c: 'EWM传递的数量大于库中的数量' });
								}
							}
							if (status === '正在出库') {
								// 只需要减数量
								if (handleQTY == 0) {
									await objectql.getObject('hs_pallet_detail__c').update(palletRes[0]._id, { last_qty__c: handleQTY });
									await objectql.getObject('hs_ewm_out_material__c').update(item._id, { status__c: '执行成功', desc__c: '' });
								}
								if (handleQTY > 0) {
									await objectql.getObject('hs_pallet_detail__c').update(palletRes[0]._id, { last_qty__c: handleQTY });
									await objectql.getObject('hs_ewm_out_material__c').update(item._id, { status__c: '执行成功', desc__c: '' });
								}
								if (handleQTY < 0) {
									await objectql.getObject('hs_ewm_out_material__c').update(item._id, { status__c: '执行失败', desc__c: 'EWM传递的数量大于库中的数量' });
								}
							}
							if (status === '已出库') {
								await objectql.getObject('hs_ewm_out_material__c').update(item._id, { status__c: '执行失败', desc__c: '该托盘已出库，无法减数量' });
							}
							if (status === '正在入库') {
								await objectql.getObject('hs_ewm_out_material__c').update(item._id, { status__c: '执行失败', desc__c: '该托盘正在入库，无法处理' });
							}
						} else {
							await objectql.getObject('hs_ewm_out_material__c').update(item._id, { status__c: '执行失败', desc__c: '根据出库标识或货位信息未找到出口' });
						}
					} else {
						await objectql.getObject('hs_ewm_out_material__c').update(item._id, { status__c: '执行失败', desc__c: '托盘详情信息中找到的托盘不为一' });
					}
				} else {
					await objectql.getObject('hs_ewm_out_material__c').update(item._id, { status__c: '执行失败', desc__c: '该仓位信息在库中不存在' });
				}
			} else {
				await objectql.getObject('hs_ewm_out_material__c').update(item._id, { status__c: '执行失败', desc__c: '数据缺少：数量、出库标识、仓位信息' });
			}
		}
	}

	new Promise((reslove, reject) => {
		setTimeout(async () => {
			res.status(200).send({ message: 'router ok' });
		}, 3000);
	});
});
exports.default = router;
