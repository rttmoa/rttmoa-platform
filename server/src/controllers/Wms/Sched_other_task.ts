import { Context } from "koa";
import Basic from "../basic";
import _ from "lodash";
import { time, time_horizontal } from "@/src/utils";
import axios from "axios";
import { handle_Move_Materials, Material_getOutGroupRules } from "./wms_assign_material/out_assign_material";
import { handle_Move_Product, Product_getOutGroupRules } from "./wms_assign_product/out_assign_product";

class App extends Basic {
	constructor() {
		super();
	}

	private normalizeCookie = (cookie: any) => {
		if (!cookie) return "";
		const merged = Array.isArray(cookie) ? cookie.join("; ") : String(cookie);
		const trimmed = merged.trim();
		if (trimmed.toLowerCase().startsWith("cookie=")) return trimmed.slice("cookie=".length).trim();
		return trimmed;
	};

	private loggedTimers = new Set<string>();
	private logTimerOnce(key: string, message: string) {
		if (!this.loggedTimers.has(key)) {
			console.log(message);
			this.loggedTimers.add(key);
		}
	}

	Material_Send_WCS = async (ctx: Context) => {
		this.logTimerOnce("Material_Send_WCS", "定时器 > 其他任务 > 原料库下发WCS任务");

		const db = ctx.mongo;
		const data: any = ctx.request.body;
		// 这个文件中，我先描述规则是什么样的，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到18列，1到24排，1到3层，现在入库分配是这样，先分1层，1层按照1列分，1到7排为一组，9到13排为一组，14到17排为一组，19到24排为一组。其中入库1到7排入库升序，9到13排入库降序，14到17排入库升序，19到24排入库降序。有不同的地方是，其他列都是正常分配的，只是1列、6列、7列、13列的9到17排，需要改成9到17排为一组，并且是升序分配 入库分配是这样。  但是目前是出库下发WCS任务，需求根据传递的数据进行出库，出库是1到7排为一组降序发送，9到13排为一组升序发送，14到17排为一组降序发送，19到24排为一组升序发送。但是1列、6列、7列、13列的9到17排，需要改成9到17排为一组并且降序发送任务。其他列还是按照原来的，帮我优化下代码。

		async function SortRule01_Product(sortArr: any[]) {
			const getGroupInfo = (col: number, row: number) => {
				const groups = Material_getOutGroupRules(col);
				const groupIndex = groups.findIndex(group => group.rows.includes(row));
				if (groupIndex === -1) return null;
				return {
					groupIndex,
					order: groups[groupIndex].order,
				};
			};

			return sortArr.sort((a: { col__c: number; lay__c: number; row__c: number }, b: { col__c: number; lay__c: number; row__c: number }) => {
				if (a.col__c !== b.col__c) return a.col__c - b.col__c; // 列升序发送
				if (a.lay__c !== b.lay__c) return a.lay__c - b.lay__c; // 层升序发送

				const groupA = getGroupInfo(a.col__c, a.row__c);
				const groupB = getGroupInfo(b.col__c, b.row__c);
				if (!groupA && !groupB) return a.row__c - b.row__c;
				if (!groupA) return 1;
				if (!groupB) return -1;

				if (groupA.groupIndex !== groupB.groupIndex) return groupA.groupIndex - groupB.groupIndex;
				return groupA.order === "asc" ? a.row__c - b.row__c : b.row__c - a.row__c;
			});
		}

		const docs = await db.find("hk_mater_task__c", {
			query: {
				$and: [
					{ status__c: "正在执行" },
					{ cmdtype__c: "出库任务" },
					{
						$or: [{ send_wcs__c: "未下发WCS" }, { send_wcs__c: { $exists: false } }, { send_wcs__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			const { _id, instruct_type__c } = docs[0];

			const item = docs[0];
			const subTask = await db.find("hk_mater_wcs_task__c", { query: { instruction__c: item.instruction__c, status__c: "未下发WCS" } });
			if (subTask.length) {
				await db.updateOne("hk_mater_task__c", _id, { send_wcs__c: "已下发WCS" }); // 更新主任务、后面async依然可以继续执行

				const mapData = subTask.map(value => {
					const stockLoc = value.loc_start__c;
					const col__c = +stockLoc.substring(0, 2);
					const row__c = +stockLoc.substring(2, 4);
					const lay__c = +stockLoc.substring(4, 6);
					return { row__c, col__c, lay__c, ...value };
				});

				// const sortRule = flow.get("SortRule01_Product")
				const sortRes = await SortRule01_Product(mapData); // 托盘出库：按列、层、动态排规则发送

				// node.warn(sortRes.length);

				function delay(ms: number | undefined) {
					return new Promise(resolve => setTimeout(resolve, ms));
				}
				(async () => {
					for (let index = 0; index < sortRes.length; index++) {
						const item = sortRes[index];
						const Instruction = `77${Math.floor(1e9 + Math.random() * 9e9).toString()}`;
						let loc: any = {
							"1号口": "A01",
							"2号口": "A02",
							"3号口": "A03",
						};
						let data = {
							pallet: item.pallet__c,
							startNode: item.loc_start__c,
							groupId: item.group_id__c,
							order: index + 1,
							taskId: Instruction,
							endNode: loc[item.export_loc__c], // A02 A03
						};
						console.log("object", index);
						let url = "http://10.30.40.221:1880/api/receive/fromWms/material/popTask";
						try {
							const res = await axios.post(url, data, { timeout: 3000 });
							if (res.status == 200) {
								if (res.data.code == 200) {
									await db.updateOne("hk_mater_wcs_task__c", item._id, { status__c: "已下发WCS", taskno__c: Instruction, priority__c: index + 1, send_time__c: time(), desc__c: "" }); // 更新子任务
								} else {
									const errorMsg = res?.data?.returnInfo || res?.data?.message || `WCS返回异常，code: ${res?.data?.code ?? "未知"}`;
									await db.updateOne("hk_mater_wcs_task__c", item._id, { status__c: "任务发送异常", desc__c: errorMsg, taskno__c: Instruction, priority__c: index + 1, send_time__c: time() }); // 更新子任务
								}
							} else {
								await db.updateOne("hk_mater_wcs_task__c", item._id, {
									status__c: "任务发送异常",
									desc__c: `HTTP状态异常: ${res.status}`,
									taskno__c: Instruction,
									priority__c: index + 1,
									send_time__c: time(),
								}); // 更新子任务
							}
						} catch (error: any) {
							const responseMsg = error?.response?.data?.returnInfo || error?.response?.data?.message;
							const statusMsg = error?.response?.status ? `HTTP ${error.response.status}` : "";
							const errorMsg = responseMsg || error?.message || "WCS通讯错误";
							const desc = [statusMsg, errorMsg].filter(Boolean).join(" - ");
							await db.updateOne("hk_mater_wcs_task__c", item._id, {
								status__c: "任务发送异常",
								desc__c: desc,
								taskno__c: Instruction,
								priority__c: index + 1,
								send_time__c: time(),
							}); // 更新子任务
						}
						await delay(2000);
					}
				})();

				let results = { success: true, message: "成功：下发WCS成功！" };
				return ctx.send(results);
			}
		} else {
			let results = { success: true, message: "失败：未找到WCS未下发的任务" };
			return ctx.send(results);
		}
	};

	Material_Move_Send_WCS = async (ctx: Context) => {
		this.logTimerOnce("Material_Move_Send_WCS", "定时器 > 其他任务 > 原料库移库：下发WCS任务");

		const db = ctx.mongo;
		const data: any = ctx.request.body;
		// 这个文件中，我先描述规则是什么样的，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到18列，1到24排，1到3层，现在入库分配是这样，先分1层，1层按照1列分，1到7排为一组，9到13排为一组，14到17排为一组，19到24排为一组。其中入库1到7排入库升序，9到13排入库降序，14到17排入库升序，19到24排入库降序。有不同的地方是，其他列都是正常分配的，只是1列、6列、7列、13列的9到17排，需要改成9到17排为一组，并且是升序分配 入库分配是这样。  但是目前是出库下发WCS任务，需求根据传递的数据进行出库，出库是1到7排为一组降序发送，9到13排为一组升序发送，14到17排为一组降序发送，19到24排为一组升序发送。但是1列、6列、7列、13列的9到17排，需要改成9到17排为一组并且降序发送任务。其他列还是按照原来的，帮我优化下代码。

		async function SortRule01_Product(sortArr: any[]) {
			const getGroupInfo = (col: number, row: number) => {
				const groups = Material_getOutGroupRules(col);
				const groupIndex = groups.findIndex(group => group.rows.includes(row));
				if (groupIndex === -1) return null;
				return {
					groupIndex,
					order: groups[groupIndex].order,
				};
			};

			return sortArr.sort((a: { col__c: number; lay__c: number; row__c: number }, b: { col__c: number; lay__c: number; row__c: number }) => {
				if (a.col__c !== b.col__c) return a.col__c - b.col__c; // 列升序发送
				if (a.lay__c !== b.lay__c) return a.lay__c - b.lay__c; // 层升序发送

				const groupA = getGroupInfo(a.col__c, a.row__c);
				const groupB = getGroupInfo(b.col__c, b.row__c);
				if (!groupA && !groupB) return a.row__c - b.row__c;
				if (!groupA) return 1;
				if (!groupB) return -1;

				if (groupA.groupIndex !== groupB.groupIndex) return groupA.groupIndex - groupB.groupIndex;
				return groupA.order === "asc" ? a.row__c - b.row__c : b.row__c - a.row__c;
			});
		}

		const docs = await db.find("hk_mater_task__c", {
			query: {
				$and: [
					{ status__c: "正在执行" },
					{ cmdtype__c: "移库任务" },
					{
						$or: [{ send_wcs__c: "未下发WCS" }, { send_wcs__c: { $exists: false } }, { send_wcs__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			const { _id } = docs[0];

			const item = docs[0];
			const subTask = await db.find("hk_mater_wcs_task__c", { query: { instruction__c: item.instruction__c, status__c: "未下发WCS" } });
			if (subTask.length) {
				await db.updateOne("hk_mater_task__c", _id, { send_wcs__c: "已下发WCS" }); // 更新主任务、后面async依然可以继续执行

				const mapData = subTask.map(value => {
					const stockLoc = value.loc_start__c;
					const col__c = +stockLoc.substring(0, 2);
					const row__c = +stockLoc.substring(2, 4);
					const lay__c = +stockLoc.substring(4, 6);
					return { row__c, col__c, lay__c, ...value };
				});

				// const sortRule = flow.get("SortRule01_Product")
				const sortRes = await SortRule01_Product(mapData); // 托盘出库：按列、层、动态排规则发送

				// node.warn(sortRes.length);

				function delay(ms: number | undefined) {
					return new Promise(resolve => setTimeout(resolve, ms));
				}
				(async () => {
					for (let index = 0; index < sortRes.length; index++) {
						const item = sortRes[index];
						const Instruction = `77${Math.floor(1e9 + Math.random() * 9e9).toString()}`;

						let data = {
							pallet: item.pallet__c,
							startNode: item.loc_start__c,
							endNode: item.loc_dest__c, // A02 A03
							groupId: item.group_id__c,
							order: index + 1,
							taskId: Instruction,
						};
						console.log("object", index);
					let url = "http://10.30.40.221:1880/api/receive/fromWms/material/moveTask";
						try {
							const res = await axios.post(url, data, { timeout: 3000 });
							if (res.status == 200) {
								if (res.data.code == 200) {
									await db.updateOne("hk_mater_wcs_task__c", item._id, { status__c: "已下发WCS", taskno__c: Instruction, priority__c: index + 1, send_time__c: time(), desc__c: "" }); // 更新子任务
								} else {
									const errorMsg = res?.data?.returnInfo || res?.data?.message || `WCS返回异常，code: ${res?.data?.code ?? "未知"}`;
									await db.updateOne("hk_mater_wcs_task__c", item._id, { status__c: "任务发送异常", desc__c: errorMsg, taskno__c: Instruction, priority__c: index + 1, send_time__c: time() }); // 更新子任务
								}
							} else {
								await db.updateOne("hk_mater_wcs_task__c", item._id, {
									status__c: "任务发送异常",
									desc__c: `HTTP状态异常: ${res.status}`,
									taskno__c: Instruction,
									priority__c: index + 1,
									send_time__c: time(),
								}); // 更新子任务
							}
						} catch (error: any) {
							const responseMsg = error?.response?.data?.returnInfo || error?.response?.data?.message;
							const statusMsg = error?.response?.status ? `HTTP ${error.response.status}` : "";
							const errorMsg = responseMsg || error?.message || "WCS通讯错误";
							const desc = [statusMsg, errorMsg].filter(Boolean).join(" - ");
							await db.updateOne("hk_mater_wcs_task__c", item._id, {
								status__c: "任务发送异常",
								desc__c: desc,
								taskno__c: Instruction,
								priority__c: index + 1,
								send_time__c: time(),
							}); // 更新子任务
						}
						await delay(2000);
					}
				})();

				let results = { success: true, message: "成功：下发WCS成功！" };
				return ctx.send(results);
			}
		} else {
			let results = { success: true, message: "失败：未找到WCS未下发的任务" };
			return ctx.send(results);
		}
	};

	Product_Move_Send_WCS = async (ctx: Context) => {
		this.logTimerOnce("Product_Move_Send_WCS", "定时器 > 其他任务 > 成品库移库：下发WCS任务");

		const db = ctx.mongo;
		const data: any = ctx.request.body;
		// 这个文件中，我先描述规则是什么样的，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到18列，1到24排，1到3层，现在入库分配是这样，先分1层，1层按照1列分，1到7排为一组，9到13排为一组，14到17排为一组，19到24排为一组。其中入库1到7排入库升序，9到13排入库降序，14到17排入库升序，19到24排入库降序。有不同的地方是，其他列都是正常分配的，只是1列、6列、7列、13列的9到17排，需要改成9到17排为一组，并且是升序分配 入库分配是这样。  但是目前是出库下发WCS任务，需求根据传递的数据进行出库，出库是1到7排为一组降序发送，9到13排为一组升序发送，14到17排为一组降序发送，19到24排为一组升序发送。但是1列、6列、7列、13列的9到17排，需要改成9到17排为一组并且降序发送任务。其他列还是按照原来的，帮我优化下代码。

		async function SortRule01_Product(sortArr: any[]) {
			const getGroupInfo = (col: number, row: number) => {
				const groups = Material_getOutGroupRules(col);
				const groupIndex = groups.findIndex(group => group.rows.includes(row));
				if (groupIndex === -1) return null;
				return {
					groupIndex,
					order: groups[groupIndex].order,
				};
			};

			return sortArr.sort((a: { col__c: number; lay__c: number; row__c: number }, b: { col__c: number; lay__c: number; row__c: number }) => {
				if (a.col__c !== b.col__c) return a.col__c - b.col__c; // 列升序发送
				if (a.lay__c !== b.lay__c) return a.lay__c - b.lay__c; // 层升序发送

				const groupA = getGroupInfo(a.col__c, a.row__c);
				const groupB = getGroupInfo(b.col__c, b.row__c);
				if (!groupA && !groupB) return a.row__c - b.row__c;
				if (!groupA) return 1;
				if (!groupB) return -1;

				if (groupA.groupIndex !== groupB.groupIndex) return groupA.groupIndex - groupB.groupIndex;
				return groupA.order === "asc" ? a.row__c - b.row__c : b.row__c - a.row__c;
			});
		}

		const docs = await db.find("hk_product_task__c", {
			query: {
				$and: [
					{ status__c: "正在执行" },
					{ cmdtype__c: "移库任务" },
					{
						$or: [{ send_wcs__c: "未下发WCS" }, { send_wcs__c: { $exists: false } }, { send_wcs__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			const { _id } = docs[0];

			const item = docs[0];
			const subTask = await db.find("hk_product_wcs_task__c", { query: { instruction__c: item.instruction__c, status__c: "未下发WCS" } });
			if (subTask.length) {
				await db.updateOne("hk_product_task__c", _id, { send_wcs__c: "已下发WCS" }); // 更新主任务、后面async依然可以继续执行

				const mapData = subTask.map(value => {
					const stockLoc = value.loc_start__c;
					const col__c = +stockLoc.substring(0, 2);
					const row__c = +stockLoc.substring(2, 4);
					const lay__c = +stockLoc.substring(4, 6);
					return { row__c, col__c, lay__c, ...value };
				});

				// const sortRule = flow.get("SortRule01_Product")
				const sortRes = await SortRule01_Product(mapData); // 托盘出库：按列、层、动态排规则发送

				// node.warn(sortRes.length);

				function delay(ms: number | undefined) {
					return new Promise(resolve => setTimeout(resolve, ms));
				}
				(async () => {
					for (let index = 0; index < sortRes.length; index++) {
						const item = sortRes[index];
						const Instruction = `77${Math.floor(1e9 + Math.random() * 9e9).toString()}`;

						let data = {
							pallet: item.pallet__c,
							startNode: item.loc_start__c,
							endNode: item.loc_dest__c, // A02 A03
							groupId: item.group_id__c,
							order: index + 1,
							taskId: Instruction,
						};
						let url = "http://10.30.40.221:1880/api/receive/fromWms/product/moveTask";
						try {
							const res = await axios.post(url, data, { timeout: 3000 });
							if (res.status == 200) {
								if (res.data.code == 200) {
									await db.updateOne("hk_product_wcs_task__c", item._id, { status__c: "已下发WCS", taskno__c: Instruction, priority__c: index + 1, send_time__c: time(), desc__c: "" }); // 更新子任务
								} else {
									const errorMsg = res?.data?.returnInfo || res?.data?.message || `WCS返回异常，code: ${res?.data?.code ?? "未知"}`;
									await db.updateOne("hk_product_wcs_task__c", item._id, { status__c: "任务发送异常", desc__c: errorMsg, taskno__c: Instruction, priority__c: index + 1, send_time__c: time() }); // 更新子任务
								}
							} else {
								await db.updateOne("hk_product_wcs_task__c", item._id, {
									status__c: "任务发送异常",
									desc__c: `HTTP状态异常: ${res.status}`,
									taskno__c: Instruction,
									priority__c: index + 1,
									send_time__c: time(),
								}); // 更新子任务
							}
						} catch (error: any) {
							const responseMsg = error?.response?.data?.returnInfo || error?.response?.data?.message;
							const statusMsg = error?.response?.status ? `HTTP ${error.response.status}` : "";
							const errorMsg = responseMsg || error?.message || "WCS通讯错误";
							const desc = [statusMsg, errorMsg].filter(Boolean).join(" - ");
							await db.updateOne("hk_product_wcs_task__c", item._id, {
								status__c: "任务发送异常",
								desc__c: desc,
								taskno__c: Instruction,
								priority__c: index + 1,
								send_time__c: time(),
							}); // 更新子任务
						}
						await delay(2000);
					}
				})();

				let results = { success: true, message: "成功：下发WCS成功！" };
				return ctx.send(results);
			}
		} else {
			let results = { success: true, message: "失败：未找到WCS未下发的任务" };
			return ctx.send(results);
		}
	};

	Product_Send_WCS = async (ctx: Context) => {
		this.logTimerOnce("Product_Send_WCS", "定时器 > 其他任务 > 成品库下发WCS任务");
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		// 这个文件中，我先描述规则是什么样的，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到18列，1到24排，1到3层，现在入库分配是这样，先分1层，1层按照1列分，1到7排为一组，9到13排为一组，14到17排为一组，19到24排为一组。其中入库1到7排入库升序，9到13排入库降序，14到17排入库升序，19到24排入库降序。有不同的地方是，其他列都是正常分配的，只是1列、6列、7列、13列的9到17排，需要改成9到17排为一组，并且是升序分配 入库分配是这样。  但是目前是出库下发WCS任务，需求根据传递的数据进行出库，出库是1到7排为一组降序发送，9到13排为一组升序发送，14到17排为一组降序发送，19到24排为一组升序发送。但是1列、6列、7列、13列的9到17排，需要改成9到17排为一组并且降序发送任务。其他列还是按照原来的，帮我优化下代码。

		async function SortRule01_Product(sortArr: any[]) {
			const getGroupInfo = (col: number, row: number) => {
				const groups = Product_getOutGroupRules(col);
				const groupIndex = groups.findIndex(group => group.rows.includes(row));
				if (groupIndex === -1) return null;
				return {
					groupIndex,
					order: groups[groupIndex].order,
				};
			};

			return sortArr.sort((a: { col__c: number; lay__c: number; row__c: number }, b: { col__c: number; lay__c: number; row__c: number }) => {
				if (a.col__c !== b.col__c) return a.col__c - b.col__c; // 列升序发送
				if (a.lay__c !== b.lay__c) return a.lay__c - b.lay__c; // 层升序发送

				const groupA = getGroupInfo(a.col__c, a.row__c);
				const groupB = getGroupInfo(b.col__c, b.row__c);
				if (!groupA && !groupB) return a.row__c - b.row__c;
				if (!groupA) return 1;
				if (!groupB) return -1;

				if (groupA.groupIndex !== groupB.groupIndex) return groupA.groupIndex - groupB.groupIndex;
				return groupA.order === "asc" ? a.row__c - b.row__c : b.row__c - a.row__c;
			});
		}

		const docs = await db.find("hk_product_task__c", {
			query: {
				$and: [
					{ status__c: "正在执行" },
					{ cmdtype__c: "出库任务" },
					{
						$or: [{ send_wcs__c: "未下发WCS" }, { send_wcs__c: { $exists: false } }, { send_wcs__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			const { _id } = docs[0];

			const item = docs[0];
			const subTask = await db.find("hk_product_wcs_task__c", { query: { instruction__c: item.instruction__c, status__c: "未下发WCS" } });
			if (subTask.length) {
				await db.updateOne("hk_product_task__c", _id, { send_wcs__c: "已下发WCS" }); // 更新主任务、后面async依然可以继续执行

				const mapData = subTask.map(value => {
					const stockLoc = value.loc_start__c;
					const col__c = +stockLoc.substring(0, 2);
					const row__c = +stockLoc.substring(2, 4);
					const lay__c = +stockLoc.substring(4, 6);
					return { row__c, col__c, lay__c, ...value };
				});

				const sortRes = await SortRule01_Product(mapData); // 托盘出库：按列、层、动态排规则发送

				function delay(ms: number | undefined) {
					return new Promise(resolve => setTimeout(resolve, ms));
				}
				(async () => {
					for (let index = 0; index < sortRes.length; index++) {
						const item = sortRes[index];
						// node.warn(item);
						let area = "";
						if (item.area__c == "冷藏库") {
							area = "B04";
						} else if (item.area__c == "冷冻库") {
							area = "B01";
						}
						const Instruction = `77${Math.floor(1e9 + Math.random() * 9e9).toString()}`;
						let data = {
							pallet: item.pallet__c,
							startNode: item.loc_start__c,
							groupId: item.group_id__c,
							order: index + 1,
							taskId: Instruction,
							endNode: area,
						};
						// node.warn(data);

						// const sk = await db.find("hk_freezing_stock__c", { query: { position__c: item.loc_start__c } });
						// 	if (sk.length) {
						// 		await db.updateOne("hk_freezing_stock__c", sk[0]._id, { shelf_status__c: "占用" });
						// 	}

						// await db.updateOne("hk_product_wcs_task__c", item._id, { status__c: "已下发WCS", taskno__c: Instruction, priority__c: index + 1, send_time__c: "global.ge", desc__c: "" }); // 更新子任务

						let url = "http://10.30.40.221:1880/api/receive/fromWms/product/popTask";
						try {
							const res = await axios.post(url, data, { timeout: 3000 });
							if (res.status == 200) {
								if (res.data.code == 200) {
									await db.updateOne("hk_product_wcs_task__c", item._id, { status__c: "已下发WCS", taskno__c: Instruction, priority__c: index + 1, send_time__c: time(), desc__c: "" }); // 更新子任务
								} else {
									const errorMsg = res?.data?.returnInfo || res?.data?.message || `WCS返回异常，code: ${res?.data?.code ?? "未知"}`;
									await db.updateOne("hk_product_wcs_task__c", item._id, { status__c: "任务发送异常", desc__c: errorMsg, taskno__c: Instruction, priority__c: index + 1, send_time__c: time() }); // 更新子任务
								}
							} else {
								await db.updateOne("hk_product_wcs_task__c", item._id, {
									status__c: "任务发送异常",
									desc__c: `HTTP状态异常: ${res.status}`,
									taskno__c: Instruction,
									priority__c: index + 1,
									send_time__c: time(),
								}); // 更新子任务
							}
						} catch (error: any) {
							const responseMsg = error?.response?.data?.returnInfo || error?.response?.data?.message;
							const statusMsg = error?.response?.status ? `HTTP ${error.response.status}` : "";
							const errorMsg = responseMsg || error?.message || "WCS通讯错误";
							const desc = [statusMsg, errorMsg].filter(Boolean).join(" - ");
							await db.updateOne("hk_product_wcs_task__c", item._id, {
								status__c: "任务发送异常",
								desc__c: desc,
								taskno__c: Instruction,
								priority__c: index + 1,
								send_time__c: time(),
							}); // 更新子任务
						}
						await delay(2000);
					}
				})();

				let results = { success: true, message: "成功：下发WCS成功！" };
				return ctx.send(results);
			}
		} else {
			let results = { success: true, message: "失败：未找到 未下发的WCS任务！" };
			return ctx.send(results);
		}
	};

	Material_Barcode_Rule = async (ctx: Context) => {
		this.logTimerOnce("Material_Barcode_Rule", "定时器 > 其他任务 > 原料库条码规则");

		const db = ctx.mongo;

		const docs = await db.find("hk_mater_barcode_rule__c", { query: {} });

		for (const item of docs) {
			function getPosition(barcode: string | any[], demandWeight: string) {
				const rawWeight = demandWeight.replace(".", "");
				const startPosition = barcode.indexOf(rawWeight) + 1;
				const endPosition = startPosition + rawWeight.length - 1;
				const decimalPosition = startPosition + demandWeight.indexOf(".");

				const startIndex = startPosition - 1;
				const endIndex = endPosition;
				const decimalIndex = decimalPosition - startPosition;

				const weightStr = barcode.slice(startIndex, endIndex);
				const result = `${weightStr.slice(0, decimalIndex)}.${weightStr.slice(decimalIndex)}`;
				return { startPosition, endPosition, decimalPosition, result };
			}
			// let barcode = "2800279040030856752186010218730052025729000650"
			// let demandW = "21.87"
			// const getPositionResult = getPosition(barcode, demandW);
			// console.log('g', getPositionResult)

			// 国家 + 厂号 + 物料代码 + 输入条码 + 输入重量
			if (item.country__c && item.factory_no__c && item.material_code__c && item.test_barcode__c && item.input_weight__c) {
				const barcode = item.test_barcode__c;
				const input_weight = item.input_weight__c;
				// console.log('123');
				const getPositionResult = getPosition(barcode, input_weight);
				// console.log("g", getPositionResult);
				const startPosition = getPositionResult.startPosition;
				const endPosition = getPositionResult.endPosition;
				const decimalPosition = getPositionResult.decimalPosition;
				const result = getPositionResult.result;

				await db.updateOne("hk_mater_barcode_rule__c", item._id, {
					barcode_start__c: startPosition,
					barcode_over__c: endPosition,
					barcode_point__c: decimalPosition,
					get_weight__c: result,
					desc__c: "输入国家、厂号、物料代码、 输入条码、输入重量  -->  输出重量、截取开始、截取终点、小数点位置",
				});
			}
		}
	};

	Mater_s1 = async (ctx: Context) => {
		this.logTimerOnce("Material_Document_Update_Quantity", "定时器 > 其他任务 > 汇总原料库出入库数量");

		const db = ctx.mongo;

		let table_doc_detail = "hk_mater_doc_detail__c";
		const docs = await db.find(table_doc_detail, { query: { status__c: { $ne: "已完成" } } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务" && element.area__c == "原料一号冻库") {
					const pda_data = await db.find("hk_mater_pda_receipt__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
					if (pda_data.length) {
						let totalWeight = 0;
						for (const item of pda_data) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
					} else {
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
					}
				} else if (element.cmdtype__c == "出库任务") {
					if (element.area__c == "线边库" && element.recept_area__c == "原料一号冻库") {
						const pda_data = await db.find("hk_mater_pda_receipt__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
						if (pda_data.length) {
							let totalWeight = 0;
							for (const item of pda_data) {
								totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
							}
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
						} else {
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
						}
					} else {
						if (element.area__c == "原料一号冻库") {
							const pda_data = await db.find("hk_mater_pda_outgoing__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "处理库存成功" } });
							if (pda_data.length) {
								let totalWeight = 0;
								for (const item of pda_data) {
									totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
								}
								await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
							} else {
								await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
							}
						}
					}
				}
			}
		}
	};

	Material_Summary_lei = async (ctx: Context) => {
		this.logTimerOnce("Material_Summary_lei", "定时器 > 其他任务 > 汇总原料库出入库数量");

		const db = ctx.mongo;

		let table_doc_detail = "hk_mater_doc_detail__c";
		const docs = await db.find(table_doc_detail, { query: { area__c: "原料雷马外租冻库", status__c: { $ne: "已完成" } } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务") {
					const pda_data = await db.find("hk_mater_lei_pda_entry__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
					if (pda_data.length) {
						let totalWeight = 0;
						for (const item of pda_data) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
					} else {
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
					}
				} else if (element.cmdtype__c == "出库任务") {
					let f1 = element.area__c == "原料雷马外租冻库" && element.recept_area__c == "原料一号冻库";
					let f2 = element.area__c == "原料雷马外租冻库" && element.recept_area__c == "原料二号冻库";
					if (f1 || f2) {
						const pda_data = await db.find("hk_mater_lei_pda_out__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "处理库存成功" } });
						if (pda_data.length) {
							let totalWeight = 0;
							for (const item of pda_data) {
								totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
							}
							let table_re = "";
							if (element.recept_area__c == "原料一号冻库") {
								table_re = "hk_mater_pda_receipt__c";
							} else if (element.recept_area__c == "原料二号冻库") {
								table_re = "hk_mater_two_pda_entry__c";
							}
							const ps = await db.find(table_re, { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
							let totalWeight2 = 0;
							if (ps.length) {
								for (const item of ps) {
									totalWeight2 = Number((Math.round((Number(totalWeight2) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
								}
							}
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight, desc__c: `出库数量：${totalWeight}，入库数量：${totalWeight2}` });
						} else {
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
						}
					} else {
						const pda_data = await db.find("hk_mater_lei_pda_out__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "处理库存成功" } });
						if (pda_data.length) {
							let totalWeight = 0;
							for (const item of pda_data) {
								totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
							}
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
						} else {
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
						}
					}
				}
			}
		}
	};
	Material_Summary_tie = async (ctx: Context) => {
		this.logTimerOnce("Material_Summary_tie", "定时器 > 其他任务 > 汇总原料库出入库数量");

		const db = ctx.mongo;

		let table_doc_detail = "hk_mater_doc_detail__c";
		const docs = await db.find(table_doc_detail, { query: { area__c: "原料中铁外租冻库", status__c: { $ne: "已完成" } } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务") {
					const pda_data = await db.find("hk_mater_tie_pda_entry__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
					if (pda_data.length) {
						let totalWeight = 0;
						for (const item of pda_data) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
					} else {
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
					}
				} else if (element.cmdtype__c == "出库任务") {
					let f1 = element.area__c == "原料中铁外租冻库" && element.recept_area__c == "原料一号冻库";
					let f2 = element.area__c == "原料中铁外租冻库" && element.recept_area__c == "原料二号冻库";
					if (f1 || f2) {
						const pda_data = await db.find("hk_mater_tie_pda_out__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "处理库存成功" } });
						if (pda_data.length) {
							let totalWeight = 0;
							for (const item of pda_data) {
								totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
							}
							let table_re = "";
							if (element.recept_area__c == "原料一号冻库") {
								table_re = "hk_mater_pda_receipt__c";
							} else if (element.recept_area__c == "原料二号冻库") {
								table_re = "hk_mater_two_pda_entry__c";
							}
							const ps = await db.find(table_re, { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
							let totalWeight2 = 0;
							if (ps.length) {
								for (const item of ps) {
									totalWeight2 = Number((Math.round((Number(totalWeight2) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
								}
							}
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight, desc__c: `出库数量：${totalWeight}，入库数量：${totalWeight2}` });
						} else {
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
						}
					} else {
						const pda_data = await db.find("hk_mater_tie_pda_out__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "处理库存成功" } });
						if (pda_data.length) {
							let totalWeight = 0;
							for (const item of pda_data) {
								totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
							}
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
						} else {
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
						}
					}
				}
			}
		}
	};

	Auxilliry_Summary = async (ctx: Context) => {
		this.logTimerOnce("Auxilliry_Summary", "定时器 > 其他任务 > 汇总辅料库出入库数量");

		const db = ctx.mongo;

		let table_doc_detail = "hk_auxiliary_doc_detail__c";
		const docs = await db.find(table_doc_detail, { query: { status__c: { $ne: "已完成" } } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务") {
					const pda_data = await db.find("hk_auxiliary_pda_entry__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
					if (pda_data.length) {
						let totalWeight = 0;
						for (const item of pda_data) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
					} else {
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
					}
				} else if (element.cmdtype__c == "出库任务") {
					if (element.area__c == "线边库" && element.recept_area__c == "辅料库") {
						const pda_data = await db.find("hk_auxiliary_pda_entry__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
						if (pda_data.length) {
							let totalWeight = 0;
							for (const item of pda_data) {
								totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
							}
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
						} else {
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
						}
					} else {
						const pda_data = await db.find("hk_auxiliary_pda_out__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "处理库存成功" } });
						if (pda_data.length) {
							let totalWeight = 0;
							for (const item of pda_data) {
								totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
							}
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
						} else {
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
						}
					}
				}
			}
		}
	};

	Pack_Summary = async (ctx: Context) => {
		this.logTimerOnce("Pack_Summary", "定时器 > 其他任务 > 汇总包材库出入库数量");

		const db = ctx.mongo;

		let table_doc_detail = "hk_pack_doc_detail__c";
		const docs = await db.find(table_doc_detail, { query: { status__c: { $ne: "已完成" } } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务") {
					const pda_data = await db.find("hk_pack_pda_entry__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
					if (pda_data.length) {
						let totalWeight = 0;
						for (const item of pda_data) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
					} else {
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
					}
				} else if (element.cmdtype__c == "出库任务") {
					if (element.area__c == "线边库" && element.recept_area__c == "包材库") {
						const pda_data = await db.find("hk_pack_pda_entry__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
						if (pda_data.length) {
							let totalWeight = 0;
							for (const item of pda_data) {
								totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
							}
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
						} else {
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
						}
					} else {
						const pda_data = await db.find("hk_pack_pda_out__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "处理库存成功" } });
						if (pda_data.length) {
							let totalWeight = 0;
							for (const item of pda_data) {
								totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
							}
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
						} else {
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
						}
					}
				}
			}
		}
	};

	Material_Summary_two = async (ctx: Context) => {
		this.logTimerOnce("Material_Summary_two", "定时器 > 其他任务 > 汇总原料库出入库数量");

		const db = ctx.mongo;

		let table_doc_detail = "hk_mater_doc_detail__c";
		const docs = await db.find(table_doc_detail, { query: { status__c: { $ne: "已完成" } } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务" && element.area__c == "原料二号冻库") {
					const pda_data = await db.find("hk_mater_two_pda_entry__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
					if (pda_data.length) {
						let totalWeight = 0;
						for (const item of pda_data) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
					} else {
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
					}
				} else if (element.cmdtype__c == "出库任务") {
					if (element.area__c == "线边库" && element.recept_area__c == "原料二号冻库") {
						const pda_data = await db.find("hk_mater_two_pda_entry__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
						if (pda_data.length) {
							let totalWeight = 0;
							for (const item of pda_data) {
								totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
							}
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
						} else {
							await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
						}
					} else {
						if (element.area__c == "原料二号冻库") {
							const pda_data = await db.find("hk_mater_two_pda_out__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "处理库存成功" } });
							if (pda_data.length) {
								let totalWeight = 0;
								for (const item of pda_data) {
									totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
								}
								await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
							} else {
								await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
							}
						}
					}
				}
			}
		}
	};

	Pord_s2 = async (ctx: Context) => {
		this.logTimerOnce("Product_Document_Update_Quantity", "定时器 > 其他任务 > 汇总成品库出入库数量");

		const db = ctx.mongo;

		let table_doc_detail = "hk_product_doc_detail__c";
		const docs = await db.find(table_doc_detail, { query: { status__c: { $ne: "已完成" } } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务") {
					// const pda_data = await db.find("hk_product_chuyu__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "入库完成" } });
					const pda_data = await db.find("hk_product_chuyu__c", { query: { doc_instruction__c: element.doc_instruction__c } });
					if (pda_data.length) {
						let totalWeight = 0;
						for (const item of pda_data) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
					} else {
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
					}
				} else if (element.cmdtype__c == "出库任务") {
					const pda_data = await db.find("hk_product_pda_outgoing__c", { query: { doc_instruction__c: element.doc_instruction__c, status__c: "处理库存成功" } });
					if (pda_data.length) {
						let totalWeight = 0;
						for (const item of pda_data) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });
					} else {
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: 0 });
					}
				}
			}
		}
	};

	Material_Move_t = async (ctx: Context) => {
		this.logTimerOnce("Material_Move_t", "定时器 > 其他任务 > 原料库移库表：校验字段并写入出入库任务表中");

		const db = ctx.mongo;
		const result = await db.find("hk_mater_moves_task__c", {
			query: {
				$and: [
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});

		if (result.length) {
			const element = result[0];
			const instruction = element.instruction_move__c;
			const start_group = element.start_group_id__c;
			const start_quantity = element.start_quantity__c;
			const dest_group = element.dest_group_id__c;
			const uuid6 = `66${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;
			const tt = { time__c: time() };
			if (!start_group) {
				await db.updateOne("hk_mater_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "无 【起始组号】 " });
				return null;
			}
			if (!start_quantity) {
				await db.updateOne("hk_mater_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "无 【起始数量】 " });
				return null;
			}
			if (!dest_group) {
				await db.updateOne("hk_mater_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "无 【目标组号】 " });
				return null;
			}

			let Table_Stock_Name = "hk_mater_stock__c";

			// 1、校验起始位置和目标位置个数(空闲)
			// 2、校验起始位置字段是否与目标位置字段是否一致

			let dest_column = 0;
			const dest_stock = await db.find(Table_Stock_Name, { query: { group_id__c: dest_group, shelf_status__c: "空闲" } }); // 目标组
			if (dest_stock.length == 0) {
				await db.updateOne("hk_mater_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "根据组未找到目标空闲位置！" });
				return null;
			}
			dest_column = dest_stock?.[0].col__c;
			// const isEmpty = dest_stock.every(v => v.shelf_status__c == "空闲");
			// dest_column = dest_stock?.[0].col__c;
			// if (!isEmpty) {
			// 	await db.updateOne("hk_mater_moves_task__c", element._id, { status__c: "执行失败", desc__c: "目标组号货架表，货位状态不是【空闲】！" });
			// 	return null;
			// }

			// 校验目标库位是否大于起始数量 个数
			if (start_quantity > dest_stock.length) {
				await db.updateOne("hk_mater_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: `起始数量：${start_quantity} 大于目标空闲库位个数: ${dest_stock.length}！` });
				return null;
			}

			const start_stockD = await db.find(Table_Stock_Name, { query: { group_id__c: start_group } }); // 起始组
			if (start_stockD.length == 0) {
				await db.updateOne("hk_mater_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "根据组未找到货架数据！" });
				return null;
			}
			const isStock = start_stockD.every(item => item.shelf_status__c === "空闲" || item.shelf_status__c === "占用");
			if (!isStock) {
				await db.updateOne("hk_mater_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "起始组号库存表，库存状态不全是【空闲 | 在库】，不可有其他状态！" });
				return null;
			}

			const start_stockD_Info = await db.find(Table_Stock_Name, { query: { group_id__c: start_group, shelf_status__c: "占用" } });
			// console.log("start_stockD_Info", start_stockD_Info);

			// 判断起始位置的物料字段 是否 与目标物料字段一致
			// const dest_stockD_Info = await db.find(Table_Stock_Name, { query: { group_id__c: dest_group, shelf_status__c: "占用" } }); // 目标组
			// if (dest_stockD_Info.length) {
			// 	console.log("dest_stockD_Info", dest_stockD_Info);
			// 	const compareFields = [
			// 		{ key: "material_code__c", label: "物料代码" },
			// 		{ key: "production_date__c", label: "生产日期" },
			// 		{ key: "contract__c", label: "合同号" },
			// 		{ key: "batch__c", label: "批号" },
			// 		{ key: "is_tax__c", label: "是否保税" },
			// 	];
			// 	const normalizeValue = (value: any) => (value == null ? "" : String(value).trim());
			// 	const inconsistentFields = compareFields.filter(({ key }) => {
			// 		const values = [...start_stockD_Info, ...dest_stockD_Info].map(item => normalizeValue(item?.[key]));
			// 		return new Set(values).size > 1;
			// 	});
			// 	if (inconsistentFields.length) {
			// 		await db.updateOne("hk_mater_moves_task__c", element._id, {
			// 			status__c: "执行失败",
			// 			desc__c: `起始组与目标组物料字段不一致：${inconsistentFields.map(item => item.label).join("、")}！`,
			// 		});
			// 		return null;
			// 	}
			// }

			const rew = await handle_Move_Materials(db, start_stockD_Info, start_quantity, dest_group, dest_column, Table_Stock_Name); // 原料移库处理
			// console.log("rew", rew);
			const data = rew?.data || [];
			if (data.length) {
				let area = "原料库";

				await db.updateOne("hk_mater_moves_task__c", element._id, {
					time__c: time(),
					instruction_move__c: uuid6,
					status__c: "正在执行",
					desc__c: "",
				});

				const times = time();

				const cmdtype = "出库任务";
				// const doc_instruct = uuid1;

				const ids = await db.insertOne("hk_mater_task__c", {
					time__c: times,
					// doc_instruction__c: doc_instruct,
					instruction__c: uuid6,

					pallet__c: "xxx",
					loc_start__c: "xxx",
					loc_dest__c: "xxx",
					status__c: "正在执行",
					instruct_origin__c: "上位自动",
					cmdtype__c: "移库任务", // 出入库类型
					task_type__c: "移库任务", // 任务类型
					send_wcs__c: "未下发WCS",
					group_id__c: `${start_group} -> ${dest_group}`,
					priority__c: 0,
					area__c: area,

					instruct_type__c: cmdtype,
					height: 1600,
					desc__c: ``,
				});

				// data: [
				// 	{
				// 		pallet__c: 'YL7625090509',
				// 		start_position: '080701',
				// 		start_group_id: 'GROUP_30',
				// 		start_priority: 6,
				// 		dest_position: '060201',
				// 		dest_group_id: 'GROUP_21',
				// 		dest_priority: 2
				// 	},
				// 	{
				// 		pallet__c: 'YL7625090968',
				// 		start_position: '080801',
				// 		start_group_id: 'GROUP_30',
				// 		start_priority: 5,
				// 		dest_position: '060301',
				// 		dest_group_id: 'GROUP_21',
				// 		dest_priority: 3
				// 	}
				// ],

				for (const item of data) {
					// console.log("item", item);
					// 下发WCS任务表中，描述字段写 起始位置 目标位置、起始组号、目标组号

					const pallet = item.pallet__c;
					const locStart = item.start_position;
					const locEnd = item.dest_position;
					const start_GroupID = item?.start_group_id;
					const end_GroupID = item?.dest_group_id;
					const start_priority = item?.start_priority; // 从库存中获取
					const end_priority = item?.dest_priority; // 从库存中获取

					const taskNo = `33${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;
					await db.insertOne("hk_mater_wcs_task__c", {
						time__c: times,
						// doc_instruction__c: doc_instruct,
						instruction__c: uuid6,

						taskno__c: taskNo,

						pallet__c: pallet,
						loc_start__c: locStart,
						loc_dest__c: locEnd,
						group_id__c: start_GroupID,
						priority__c: start_priority,
						area__c: area,

						instruct_origin__c: "上位自动",
						cmdtype__c: "移库任务",
						task_type__c: "移库任务", // 任务类型
						status__c: "未下发WCS",
						desc__c: `组：${start_GroupID} -> ${end_GroupID}, 位置：${locStart} -> ${locEnd}, 优先级：${start_priority} -> ${end_priority}`,
					});
				}
			} else {
				await db.updateOne("hk_mater_moves_task__c", element._id, {
					time__c: time(),
					instruction_move__c: "",
					status__c: "执行失败",
					desc__c: "任务处理失败",
				});
			}
		}
	};

	Product_Move_t = async (ctx: Context) => {
		this.logTimerOnce("Product_Move_t", "定时器 > 其他任务 > 成品库移库表：校验字段并写入出入库任务表中");

		const db = ctx.mongo;
		const result = await db.find("hk_product_moves_task__c", {
			query: {
				$and: [
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});

		if (result.length) {
			const element = result[0];
			const Area = element.area__c;
			const instruction = element.instruction_move__c;
			const start_group = element.start_group_id__c;
			const start_quantity = element.start_quantity__c;
			const dest_group = element.dest_group_id__c;

			const uuid6 = `66${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;
			const tt = { time__c: time() };

			if (!start_group) {
				await db.updateOne("hk_product_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "无 【起始组号】 " });
				return null;
			}
			if (!start_quantity) {
				await db.updateOne("hk_product_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "无 【起始数量】 " });
				return null;
			}
			if (!dest_group) {
				await db.updateOne("hk_product_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "无 【目标组号】 " });
				return null;
			}

			let area = "";
			let Table_Stock_Name = "";
			if (Area == "成品冷冻库") {
				area = "冷冻库";
				Table_Stock_Name = "hk_freezing_stock__c";
			} else if (Area == "成品冷藏库") {
				area = "冷藏库";
				Table_Stock_Name = "hk_chilled_stock__c";
			}

			if (!Area) {
				await db.updateOne("hk_product_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "无【库区】！" });
				return null;
			}

			// 1、校验起始位置和目标位置个数(空闲)
			// 2、校验起始位置字段是否与目标位置字段是否一致

			let dest_column = 0;
			const dest_stock = await db.find(Table_Stock_Name, { query: { group_id__c: dest_group, shelf_status__c: "空闲" } });
			if (dest_stock.length == 0) {
				await db.updateOne("hk_product_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "根据组未找到目标空闲位置！" });
				return null;
			}
			dest_column = dest_stock?.[0].col__c;
			// const isEmpty = dest_stock.every(v => v.shelf_status__c == "空闲");
			// dest_column = dest_stock[0].col__c;
			// if (!isEmpty) {
			// 	await db.updateOne("hk_product_moves_task__c", element._id, { status__c: "执行失败", desc__c: "目标组号货架表，货位状态不是【空闲】！" });
			// 	return null;
			// }

			// 校验目标库位是否大于起始数量 个数
			if (start_quantity > dest_stock.length) {
				await db.updateOne("hk_product_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: `起始数量：${start_quantity} 大于目标空闲库位个数: ${dest_stock.length}！` });
				return null;
			}

			const start_stockD = await db.find(Table_Stock_Name, { query: { group_id__c: start_group } });
			if (start_stockD.length == 0) {
				await db.updateOne("hk_product_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "根据组未找到货架数据！" });
				return null;
			}
			const isStock = start_stockD.every(item => item.shelf_status__c === "空闲" || item.shelf_status__c === "占用");
			if (!isStock) {
				await db.updateOne("hk_product_moves_task__c", element._id, { ...tt, status__c: "执行失败", desc__c: "起始组号库存表，库存状态不全是【空闲 | 占用】，不可有其他状态！" });
				return null;
			}

			const start_stockD_Info = await db.find(Table_Stock_Name, { query: { group_id__c: start_group, shelf_status__c: "占用" } });
			// console.log("start_stockD_Info", start_stockD_Info);

			const rew = await handle_Move_Product(db, start_stockD_Info, start_quantity, dest_group, dest_column, Table_Stock_Name); // 原料移库处理
			// console.log("rew", rew);
			const data = rew?.data || [];
			if (data.length) {
				await db.updateOne("hk_product_moves_task__c", element._id, {
					time__c: time(),
					instruction_move__c: uuid6,
					status__c: "正在执行",
					desc__c: "",
				});

				const times = time();

				const cmdtype = "出库任务";
				// const doc_instruct = uuid1;

				const ids = await db.insertOne("hk_product_task__c", {
					time__c: times,
					// doc_instruction__c: doc_instruct,
					instruction__c: uuid6,

					pallet__c: "xxx",
					loc_start__c: "xxx",
					loc_dest__c: "xxx",
					status__c: "正在执行",
					instruct_origin__c: "上位自动",
					cmdtype__c: "移库任务", // 出入库类型
					task_type__c: "移库任务", // 任务类型
					send_wcs__c: "未下发WCS",
					group_id__c: `${start_group} -> ${dest_group}`,
					priority__c: 0,
					area__c: area,

					instruct_type__c: cmdtype,
					height: 1600,
					desc__c: ``,
				});

				// data: [
				// 	{
				// 		pallet__c: 'YL7625090509',
				// 		start_position: '080701',
				// 		start_group_id: 'GROUP_30',
				// 		start_priority: 6,
				// 		dest_position: '060201',
				// 		dest_group_id: 'GROUP_21',
				// 		dest_priority: 2
				// 	},
				// 	{
				// 		pallet__c: 'YL7625090968',
				// 		start_position: '080801',
				// 		start_group_id: 'GROUP_30',
				// 		start_priority: 5,
				// 		dest_position: '060301',
				// 		dest_group_id: 'GROUP_21',
				// 		dest_priority: 3
				// 	}
				// ],

				for (const item of data) {
					// console.log("item", item);
					// 下发WCS任务表中，描述字段写 起始位置 目标位置、起始组号、目标组号

					const pallet = item.pallet__c;
					const locStart = item.start_position;
					const locEnd = item.dest_position;
					const start_GroupID = item?.start_group_id;
					const end_GroupID = item?.dest_group_id;
					const start_priority = item?.start_priority; // 从库存中获取
					const end_priority = item?.dest_priority; // 从库存中获取

					const taskNo = `33${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;
					await db.insertOne("hk_product_wcs_task__c", {
						time__c: times,
						// doc_instruction__c: doc_instruct,
						instruction__c: uuid6,

						taskno__c: taskNo,

						pallet__c: pallet,
						loc_start__c: locStart,
						loc_dest__c: locEnd,
						group_id__c: start_GroupID,
						priority__c: start_priority,
						area__c: area,

						instruct_origin__c: "上位自动",
						cmdtype__c: "移库任务",
						task_type__c: "移库任务", // 任务类型
						status__c: "未下发WCS",
						desc__c: `组：${start_GroupID} -> ${end_GroupID}, 位置：${locStart} -> ${locEnd}, 优先级：${start_priority} -> ${end_priority}`,
					});
				}
			} else {
				await db.updateOne("hk_product_moves_task__c", element._id, {
					time__c: time(),
					instruction_move__c: "",
					status__c: "执行失败",
					desc__c: rew?.message || "任务处理失败",
				});
			}
		}
	};
}

export default new App();
