import { Context } from "koa";
import Basic from "../basic";
import _ from "lodash";
import { time } from "@/src/utils";
import mssql from "mssql";
import axios from "axios";

class App extends Basic {
	constructor() {
		super();
	}
 

	// private sap_address = "http://saph4q.ziyanfoods.com:8042";
	private sap_address = "https://erp.ziyanfoods.com";

	private normalizeCookie = (cookie: any) => {
		if (!cookie) return "";
		const merged = Array.isArray(cookie) ? cookie.join("; ") : String(cookie);
		const trimmed = merged.trim();
		if (trimmed.toLowerCase().startsWith("cookie=")) return trimmed.slice("cookie=".length).trim();
		return trimmed;
	};

	GetToekn = async (ctx: Context) => {
		const db = ctx.mongo;
		let token = "";
		let cookie = "";

		// const baseUrl = "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet";
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const getResponse = await axios.get(urlWithFormat, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			token = getResponse.headers["x-csrf-token"];
			let setCookie = getResponse.headers["set-cookie"];
			if (setCookie) {
				cookie = setCookie.map(item => item.split(";")[0]).join("; ");
			}
			let success = false;
			if (token) {
				success = true;
			}
			return {
				success: success,
				token,
				cookie: this.normalizeCookie(cookie),
				authHeader,
			};
		} catch (error: any) {
			// return ctx.sendError(500, error.message || "获取 SAP Token 失败");
			return {
				success: false,
				message: error?.message,
			};
		}
	};

	Get_wareHouse = async (ctx: Context) => {
		// console.log("12");
		// const baseUrl = "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet";
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;
		try {
			const resp = await axios.get(urlWithFormat, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			let d = {
				d: {
					results: [
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7601')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7601')",
								type: "ZODATA_YUZ_001_SRV.T001L",
							},
							Werks: "7600",
							Lgort: "7601",
							Lgobe: "原料一号冻库",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7602')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7602')",
								type: "ZODATA_YUZ_001_SRV.T001L",
							},
							Werks: "7600",
							Lgort: "7602",
							Lgobe: "原料二号冻库",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7603')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7603')",
								type: "ZODATA_YUZ_001_SRV.T001L",
							},
							Werks: "7600",
							Lgort: "7603",
							Lgobe: "原料外租冻库",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7604')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7604')",
								type: "ZODATA_YUZ_001_SRV.T001L",
							},
							Werks: "7600",
							Lgort: "7604",
							Lgobe: "辅料库",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7605')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7605')",
								type: "ZODATA_YUZ_001_SRV.T001L",
							},
							Werks: "7600",
							Lgort: "7605",
							Lgobe: "包材库",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7606')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7606')",
								type: "ZODATA_YUZ_001_SRV.T001L",
							},
							Werks: "7600",
							Lgort: "7606",
							Lgobe: "线边库",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7607')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7607')",
								type: "ZODATA_YUZ_001_SRV.T001L",
							},
							Werks: "7600",
							Lgort: "7607",
							Lgobe: "成品冻库",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7608')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7608')",
								type: "ZODATA_YUZ_001_SRV.T001L",
							},
							Werks: "7600",
							Lgort: "7608",
							Lgobe: "成品冷藏库",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7609')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/T001LSet(Werks='7600',Lgort='7609')",
								type: "ZODATA_YUZ_001_SRV.T001L",
							},
							Werks: "7600",
							Lgort: "7609",
							Lgobe: "成品常温库",
						},
					],
				},
			};
			const data = resp?.data?.d?.results || [];
			if (data.length) {
				const db = ctx.mongo;
				const fDocs = await db.find("hk_main_warehouse__c", {query: { 	},})
				if(fDocs.length){
					for (const element of fDocs) {
						await db.deleteOne("hk_main_warehouse__c", element._id)
					}
				}
				for (const item of data) {
					const res = await db.insertOne("hk_main_warehouse__c", {
						time__c: time(),
						factory__c: item.Werks,
						area_code__c: item.Lgort,
						area__c: item.Lgobe,
					});
				}
				return ctx.send({ success: true, message: "同步成功！" });
			} else {
				return ctx.send({ success: false, message: "同步失败：未获取到SAP数据" });
			}
		} catch (error: any) {
			console.log("error", error);
			return ctx.sendError(500, error?.message || "获取 SAP Token 失败");
		}
	};

	Get_Leading = async (ctx: Context) => {
		// const baseUrl = "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/ZMMT027Set";
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/ZMMT027Set`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;
		try {
			const resp = await axios.get(urlWithFormat, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});

			let d = {
				d: {
					results: [
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/ZMMT027Set(Werks='7600',Zbumen='%E7%B2%97%E5%8A%A0%E5%B7%A5%E7%BB%84-%E5%8E%9F%E6%96%99')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/ZMMT027Set(Werks='7600',Zbumen='%E7%B2%97%E5%8A%A0%E5%B7%A5%E7%BB%84-%E5%8E%9F%E6%96%99')",
								type: "ZODATA_YUZ_001_SRV.ZMMT027",
							},
							Werks: "7600",
							Zbumen: "粗加工组-原料",
							Lgtyp: "",
							Lgort: "7601",
						},
					],
				},
			};
			const data = resp?.data?.d?.results || [];
			if (data.length) {
				const db = ctx.mongo;
				const fDocs = await db.find("hk_main_leading_departments__c", {query: { 	},})
				if(fDocs.length){
					for (const element of fDocs) {
						await db.deleteOne("hk_main_leading_departments__c", element._id)
					}
				}
				for (const item of data) {
					await db.insertOne("hk_main_leading_departments__c", {
						time__c: time(),
						factory__c: item.Werks,
						lead_department__c: item.Zbumen,
						save_type__c: item.Lgtyp,
						save_location__c: item.Lgort,
					});
				}
				return ctx.send({ success: true, message: "同步成功！" });
			} else {
				return ctx.send({ success: false, message: "同步失败：未获取到SAP数据" });
			}
		} catch (error) {
			return ctx.sendError(500, "获取 SAP Token 失败");
		}
	};
	Get_Cost_Center = async (ctx: Context) => {
		// const baseUrl = "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet";
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;
		try {
			const resp = await axios.get(urlWithFormat, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			let d = {
				d: {
					results: [
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76010000')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76010000')",
								type: "ZODATA_YUZ_001_SRV.CSKS",
							},
							Kostl: "76010000",
							Bukrs: "7600",
							Ktext: "海南云紫总经办",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76020000')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76020000')",
								type: "ZODATA_YUZ_001_SRV.CSKS",
							},
							Kostl: "76020000",
							Bukrs: "7600",
							Ktext: "海南云紫财务部",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76030000')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76030000')",
								type: "ZODATA_YUZ_001_SRV.CSKS",
							},
							Kostl: "76030000",
							Bukrs: "7600",
							Ktext: "海南云紫食安部",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76050000')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76050000')",
								type: "ZODATA_YUZ_001_SRV.CSKS",
							},
							Kostl: "76050000",
							Bukrs: "7600",
							Ktext: "海南云紫生产管理组",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76060000')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76060000')",
								type: "ZODATA_YUZ_001_SRV.CSKS",
							},
							Kostl: "76060000",
							Bukrs: "7600",
							Ktext: "海南云紫品质部",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76070000')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76070000')",
								type: "ZODATA_YUZ_001_SRV.CSKS",
							},
							Kostl: "76070000",
							Bukrs: "7600",
							Ktext: "海南云紫研发部",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76040000')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/CSKSSet('76040000')",
								type: "ZODATA_YUZ_001_SRV.CSKS",
							},
							Kostl: "76040000",
							Bukrs: "7600",
							Ktext: "海南云紫销售部",
						},
					],
				},
			};
			const data = resp?.data?.d?.results || [];
			if (data.length) {
				const db = ctx.mongo;
				const fDocs = await db.find("hk_main_cost_center__c", {query: { 	},})
				if(fDocs.length){
					for (const element of fDocs) {
						await db.deleteOne("hk_main_cost_center__c", element._id)
					}
				}
				for (const item of data) {
					const res = await db.insertOne("hk_main_cost_center__c", {
						time__c: time(),
						department_code__c: item.Kostl,
						factory__c: item.Bukrs,
						department__c: item.Ktext,
					});
				}
				console.log("成本中心 同步数据成功！");
				return ctx.send({ success: true, message: "同步成功！" });
			} else {
				return ctx.send({ success: false, message: "同步失败：未获取到SAP数据" });
			}
		} catch (error) {
			return ctx.sendError(500, "获取 SAP Token 失败");
		}
	};

	Get_Material = async (ctx: Context) => {
		// const baseUrl = "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet";
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;
		try {
			const resp = await axios.get(urlWithFormat, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			let d = {
				d: {
					results: [
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='10001')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='10001')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "10001",
							Maktx: "百味鸡",
							Meins: "KG",
							Mtart: "Z001",
							Mhdrz: "1",
							Mhdhb: "365",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='10028')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='10028')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "10028",
							Maktx: "夫妻肺片(牛肉)",
							Meins: "KG",
							Mtart: "Z001",
							Mhdrz: "1",
							Mhdhb: "365",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='10031')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='10031')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "10031",
							Maktx: "夫妻肺片(牛百叶)",
							Meins: "KG",
							Mtart: "Z001",
							Mhdrz: "1",
							Mhdhb: "30",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='30010')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='30010')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "30010",
							Maktx: "打印纸600*700mm",
							Meins: "JU",
							Mtart: "Z009",
							Mhdrz: "1",
							Mhdhb: "730",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='30073')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='30073')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "30073",
							Maktx: "空白膜200mm(PA15/PE80)",
							Meins: "KG",
							Mtart: "Z009",
							Mhdrz: "1",
							Mhdhb: "365",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40001')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40001')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40001",
							Maktx: "含碘食盐",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "1080",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40002')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40002')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40002",
							Maktx: "白糖",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "540",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40021')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40021')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40021",
							Maktx: "老抽",
							Meins: "L",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "365",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40033')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40033')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40033",
							Maktx: "白醋(5度)",
							Meins: "L",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "540",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40077')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40077')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40077",
							Maktx: "生姜",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "20",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40083')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40083')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40083",
							Maktx: "鸡香辛料",
							Meins: "PAC",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "240",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40093')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40093')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40093",
							Maktx: "D-异抗坏血酸钠",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "720",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40097')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40097')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40097",
							Maktx: "乙酰化二淀粉磷酸酯",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "720",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40119')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40119')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40119",
							Maktx: "食用碱粉(碳酸钠)",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "540",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40120')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40120')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40120",
							Maktx: "食用烧碱(氢氧化钠)",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "365",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40125')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40125')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40125",
							Maktx: "乙基麦芽酚",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "730",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40167')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40167')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40167",
							Maktx: "增香粉",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "365",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40176')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40176')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40176",
							Maktx: "胡椒面",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "365",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40301')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40301')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40301",
							Maktx: "干辣椒(段)",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "240",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40308')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40308')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40308",
							Maktx: "卤牛肉味粉食品用香精",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "300",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40341')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40341')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40341",
							Maktx: "乳酸链球菌素",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "730",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40518')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40518')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40518",
							Maktx: "牛油味膏食品用香精EB09772",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "270",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40781')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40781')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40781",
							Maktx: "无碘盐",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "730",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40794')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40794')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40794",
							Maktx: "保鲜复合酶YD-YZ23",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "730",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40881')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='40881')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "40881",
							Maktx: "保鲜复合酶YD-YZ1219",
							Meins: "KG",
							Mtart: "Z008",
							Mhdrz: "1",
							Mhdhb: "730",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50001')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50001')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "50001",
							Maktx: "百味鸡(原材料)2",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "10",
							Mhdhb: "150",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50002')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50002')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "50002",
							Maktx: "紫燕鹅(原料)",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "1",
							Mhdhb: "365",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50003')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50003')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "50003",
							Maktx: "猪心",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "1",
							Mhdhb: "365",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50007')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50007')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "50007",
							Maktx: "猪舌",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "1",
							Mhdhb: "730",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50055')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50055')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "50055",
							Maktx: "牛百叶",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "1",
							Mhdhb: "720",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50058')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50058')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "50058",
							Maktx: "批次测试#1",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "0",
							Mhdhb: "0",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50247')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50247')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "50247",
							Maktx: "牛肉(牛霖)",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "1",
							Mhdhb: "730",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50561')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50561')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "50561",
							Maktx: "牛板肚",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "10",
							Mhdhb: "180",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50563')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50563')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "50563",
							Maktx: "去骨腿肉",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "1",
							Mhdhb: "2",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50565')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50565')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "50565",
							Maktx: "去脖带肉鸡架",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "1",
							Mhdhb: "360",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50689')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50689')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "50689",
							Maktx: "牛脖肉",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "1",
							Mhdhb: "365",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50723')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='50723')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "50723",
							Maktx: "牛肉（后腱）",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "1",
							Mhdhb: "365",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='51055')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='51055')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "51055",
							Maktx: "牛肉（大米龙）",
							Meins: "KG",
							Mtart: "Z007",
							Mhdrz: "1",
							Mhdhb: "730",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='51074')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='51074')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "51074",
							Maktx: "物料测试1121",
							Meins: "KG",
							Mtart: "Z001",
							Mhdrz: "1",
							Mhdhb: "365",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='82790')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARASet(Werks='7600',Matnr='82790')",
								type: "ZODATA_YUZ_001_SRV.MARA",
							},
							Werks: "7600",
							Matnr: "82790",
							Maktx: "冷冻牛筋头",
							Meins: "KG",
							Mtart: "Z005",
							Mhdrz: "30",
							Mhdhb: "365",
						},
					],
				},
			};
			const data = resp?.data?.d?.results || [];
			if (data.length) {
				const db = ctx.mongo;
				const fDocs = await db.find("hk_main_mater_data__c", {query: { 	},})
				if(fDocs.length){
					for (const element of fDocs) {
						await db.deleteOne("hk_main_mater_data__c", element._id)
					}
				}
				for (const item of data) {
					const res = await db.insertOne("hk_main_mater_data__c", {
						time__c: time(),
						factory__c: item.Werks,
						material_code__c: item.Matnr,
						material_name__c: item.Maktx,
						unit__c: item.Meins,
						material_type__c: item.Mtart,
						mhdrz__c: item.Mhdrz,
						mhdhb__c: Number(item.Mhdhb),
					});
				}
				return ctx.send({ success: true, message: "同步成功！" });
			} else {
				return ctx.send({ success: false, message: "同步失败：未获取到SAP数据" });
			}
		} catch (error) {
			return ctx.sendError(500, "获取 SAP Token 失败");
		}
	};

	Get_Unit = async (ctx: Context) => {
		// const baseUrl = "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet";
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;
		try {
			const resp = await axios.get(urlWithFormat, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			let d = {
				d: {
					results: [
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='10001',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='10001',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "10001",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='10028',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='10028',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "10028",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='10031',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='10031',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "10031",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='30010',Meinh='EA')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='30010',Meinh='EA')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "30010",
							Meinh: "EA",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='30010',Meinh='JU')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='30010',Meinh='JU')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "30010",
							Meinh: "JU",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='30073',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='30073',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "30073",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40001',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40001',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40001",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40002',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40002',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40002",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40021',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40021',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40021",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40021',Meinh='L')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40021',Meinh='L')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40021",
							Meinh: "L",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40033',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40033',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40033",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40033',Meinh='L')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40033',Meinh='L')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40033",
							Meinh: "L",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40077',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40077',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40077",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40083',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40083',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40083",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40083',Meinh='PAC')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40083',Meinh='PAC')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40083",
							Meinh: "PAC",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40083',Meinh='PC')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40083',Meinh='PC')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40083",
							Meinh: "PC",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40093',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40093',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40093",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40097',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40097',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40097",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40119',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40119',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40119",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40120',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40120',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40120",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40125',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40125',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40125",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40167',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40167',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40167",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40176',Meinh='PC')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40176',Meinh='PC')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40176",
							Meinh: "PC",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40176',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40176',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40176",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40301',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40301',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40301",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40308',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40308',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40308",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40341',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40341',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40341",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40518',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40518',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40518",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40781',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40781',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40781",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40794',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40794',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40794",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40881',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='40881',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "40881",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50001',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50001',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50001",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50001',Meinh='PC')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50001',Meinh='PC')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50001",
							Meinh: "PC",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50002',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50002',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50002",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50003',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50003',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50003",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50007',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50007',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50007",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50055',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50055',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50055",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50058',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50058',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50058",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50247',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50247',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50247",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50561',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50561',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50561",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50563',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50563',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50563",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50565',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50565',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50565",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50689',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50689',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50689",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50723',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='50723',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "50723",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='51055',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='51055',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "51055",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='51074',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='51074',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "51074",
							Meinh: "KG",
						},
						{
							__metadata: {
								id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='82790',Meinh='KG')",
								uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_001_SRV/MARMSet(Matnr='82790',Meinh='KG')",
								type: "ZODATA_YUZ_001_SRV.MARM",
							},
							Matnr: "82790",
							Meinh: "KG",
						},
					],
				},
			};
			// console.log('resp.data', resp.data);

			const data = resp?.data?.d?.results || [];
			if (data.length) {
				const db = ctx.mongo;

				const fDocs = await db.find("hk_main_unit__c", {query: { 	},})
				if(fDocs.length){
					for (const element of fDocs) {
						await db.deleteOne("hk_main_unit__c", element._id)
					}
				}
				for (const item of data) {
					await db.insertOne("hk_main_unit__c", {
						time__c: time(),
						material_code__c: item.Matnr,
						unit__c: item.Meinh,
					});
				}
				return ctx.send({ success: true, message: "同步成功！" });
			} else {
				return ctx.send({ success: false, message: "同步失败：未获取到SAP数据" });
			}
		} catch (error) {
			return ctx.sendError(500, "获取 SAP Token 失败");
		}
	};

	// 成品入库：校验 生产入库单
	Product_prod_verify = async (ctx: Context) => {
		const db = ctx.mongo;

		const docs = await db.find("hk_product_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: "生产入库单" },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			const element = docs[0];
			if (!element.material_code__c) {
				await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入物料代码" });
				return null;
			}
			// if (!element.material_name__c) {
			// 	await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入物料名称" });
			// 	return null;
			// }
			if (!element.unit__c) {
				await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入单位" });
				return null;
			}
			if (!element.quantity__c) {
				await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入数量" });
				return null;
			}
			if (!element.production_date__c) {
				await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入生产日期" });
				return null;
			}

			// 校验生产日期
			function isValidProductionDate(dateStr: string) {
				const regex = /^\d{4}-\d{2}-\d{2}$/;
				if (!regex.test(dateStr)) return false;
				const [year, month, day] = dateStr.split("-").map(Number);
				const date = new Date(year, month - 1, day);
				return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
			}
			if (!isValidProductionDate(element.production_date__c)) {
				await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "生产日期格式不正确，格式 2026-05-15" });
				return null;
			}

			// 格式化批号
			function formatBatchNo(prodDate: { split: (arg0: string) => [any, any, any] }) {
				const [year, month, day] = prodDate.split("-");
				return year.slice(2) + month + day;
			}
			const batch_format = formatBatchNo(element.production_date__c);

			const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

			await db.updateOne("hk_product_doc_detail__c", element._id, {
				time__c: time(),
				status__c: "正在执行",
				desc__c: "",
				doc_instruction__c: uuid6,
				// document_id__c: `TASK${document_format}0001`,
				document_id__c: "",
				batch__c: `${batch_format}0001`,
				cmdtype__c: "入库任务",
			});
		}
	};

	Product_prod_send = async (ctx: Context) => {
		const { success, token, cookie, authHeader, message } = (await this.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, message);

		const db = ctx.mongo;
		const docs = await db.find("hk_product_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: "生产入库单" },
					{ cmdtype__c: "入库任务" },
					{ status__c: "正在执行" },
					{
						$or: [{ doc_send_info__c: { $exists: false } }, { doc_send_info__c: null }, { doc_send_info__c: "" }],
					},
				],
			},
		});
		// console.log("生成单据数量：", docs.length);?
		if (docs.length) {
			// 推送SAP结果、 入库推送单据，入库结果回传推送
			// 推送SAP结果、出库结果回传推送

			const element = docs[0];
			const payload = {
				Matnr: element.material_code__c, // 物料代码
				Pwerk: "7600", //  工厂
				Meins: element.unit__c, // 单位
				Psmng: String(element?.quantity__c), // 订单数量
				// Aufnr: element.document_id__c, // 订单号
			};

			const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/HEADERSet`;
			try {
				const resp = await axios.post(targetUrl, payload, {
					headers: {
						"X-CSRF-Token": token,
						Cookie: this.normalizeCookie(cookie),
						"Content-Type": "application/json",
						Authorization: authHeader,
						Accept: "application/json",
					},
					validateStatus: () => true,
				});
				console.log(`时间：${time()} 推送生产入库单结果：`, resp.data);
				let resp_data2: any = "";
				resp_data2 = {
					error: {
						code: "/IWCOR/CX_DS_EDM_FACET_ERROR/005056A509B11ED1BDCCCC5E8168819D",
						message: {
							lang: "zh",
							value: "Eigenschaft 'Aufnr' an Offset '86' hat ungültigen Wert 'TASK202605260001'",
						},
						innererror: {
							application: [Object],
							transactionid: "EE8A8017AD2E00D0E006A182737A78E3",
							timestamp: "20260530010839.0114670",
							Error_Resolution: [Object],
							errordetails: [],
						},
					},
				};
				resp_data2 = {
					d: {
						__metadata: {
							id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/HEADERSet('82707761')",
							uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/HEADERSet('82707761')",
							type: "ZODATA_YUZ_002_SRV.HEADER",
						},
						Aufnr: "82707761",
						ErrCode: "0",
						ErrMsg: "订单创建成功！",
						Psmng: "5000.000",
						Meins: "KG",
						Matnr: "16957",
						Uebto: "0.0",
						Untto: "0.0",
						Pwerk: "7600",
						Lgort: "",
						Dauat: "",
						Dgltp: "",
					},
				};
				if (resp.status >= 200 && resp.status < 300) {
					const d = resp.data.d;
					const code = d.ErrCode;
					if (code == "0") {
						await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: resp.data.d.ErrMsg, document_id__c: d.Aufnr });
					} else {
						await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: `错误：${d.ErrMsg}` });
					}
					return ctx.send({ success: true, message: "成功", data: resp.data });
				} else {
					const error = resp.data.error;
					const error_message = resp.data.error.message.value;
					console.log("错误信息 error_message：", error_message);
					return ctx.send({ success: false, message: error_message });
				}
			} catch (err: any) {
				await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: err?.message });
				return ctx.sendError(500, err?.message || "请求 SAP 失败");
			}
		} else {
			return ctx.send({ success: true, message: "无生成订单数据" });
		}
	};

	Product_prod_finish = async (ctx: Context) => {
		const { success, token, cookie, authHeader } = (await this.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		const db = ctx.mongo;
		const docs = await db.find("hk_product_doc_detail__c", {
			query: {
				$and: [{ document_type__c: "生产入库单" }, { status__c: "已完成" }],
			},
		});
		if (docs.length) {
			const element = docs[0];

			const today = new Date();
			const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
			const batch_date = `${String(today.getFullYear()).substring(2, 4)}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

			// 示例
			const payload1 = {
				Aufnr: "81828624", // 单据号
				Gstrp: "20260509", // 基本开始日期：报工日期
				Werks: "7600", // 工厂号
				TOITEMS: [
					{
						Werks: "7600",
						Aufnr: "81828624", // 单据号
						Matnr: "10028", // 物料代码
						Menge: "12.522", // 报工数量
						Meins: "KG", // 单位：不可以是中文，创建单据选择的时候，获取接口选单位
						Charg: "2605090001", // 批次：年月日+4位随机数=10位
					},
				],
			};
			// 发送SAP数据
			const payload = {
				Aufnr: element.document_id__c, // 单据号 - 81828624
				Gstrp: today_date, // 基本开始日期：报工日期 - 20260509
				Werks: "7600", // 工厂号
				TOITEMS: [
					{
						Werks: "7600",
						Aufnr: element.document_id__c, // 单据号 - 81828624
						Matnr: element.material_code__c, // 物料代码 - 10028
						Menge: `${element.handle_quantity__c}`, // 报工数量 - 12.522
						Meins: element.unit__c, // 单位：不可以是中文，创建单据选择的时候，获取接口选单位
						Charg: element.batch__c || `${batch_date}0001`, // ! 批次：年月日+4位随机数=10位 多条传多个批次
					},
				],
			};
			console.log("payload", payload);

			const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/CO11NSet`;
			try {
				const resp = await axios.post(targetUrl, payload, {
					headers: {
						"X-CSRF-Token": token,
						Cookie: this.normalizeCookie(cookie),
						"Content-Type": "application/json",
						Authorization: authHeader,
						Accept: "application/json",
					},
					validateStatus: () => true,
				});

				if (resp.status >= 200 && resp.status < 300) {
					const d = resp.data.d;
					const code = d.ErrCode;
					if (code == "0") {
						// console.log("d.Anfnr", d.Anfnr);
						await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_back__c: resp.data.d.ErrMsg, status_sap__c: "回传成功" });
					} else {
						await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败" });
					}
					return ctx.send({ success: true, message: "成功", data: resp.data });
				} else {
					const error_message = resp.data.error.message.value;
					await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败" });
					return ctx.send({ success: false, message: error_message });
				}
				let d = {
					d: {
						__metadata: {
							id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/CO11NSet(Aufnr='81828624',Werks='7600')",
							uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/CO11NSet(Aufnr='81828624',Werks='7600')",
							type: "ZODATA_YUZ_002_SRV.CO11N",
						},
						Aufnr: "81828624",
						ErrMsg: "报工成功！| 已收货",
						Gstrp: "20260509",
						ErrCode: "0",
						Werks: "7600",
						TOITEMS: {
							results: [
								{
									__metadata: {
										id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/CO11N_ITEMSet(Werks='7600',Aufnr='81828624')",
										uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/CO11N_ITEMSet(Werks='7600',Aufnr='81828624')",
										type: "ZODATA_YUZ_002_SRV.CO11N_ITEM",
									},
									Werks: "7600",
									Aufnr: "81828624",
									Matnr: "10028",
									Menge: "12.522",
									Meins: "KG",
									Charg: "2605090001",
								},
							],
						},
					},
				};
			} catch (err: any) {
				return ctx.sendError(500, err?.message || "请求 SAP 失败");
			}
		}
	};

	Product_Enter_Other_SendSap = async (ctx: Context) => {
		const { success, token, cookie, authHeader } = (await this.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		const payload = {
			Werks: "7600", // 工厂
			Budat: "20260514", // 记账日期
			TaskNo: "TASK202605140001", // 任务单号
			ErrCode: "",
			ErrMsg: "",
			Mjahr: "", // 物料凭证年度
			Mblnr: "", // 物料凭证
			Bwart: "Z02", // 移动凭证
			TOITEMS: [
				{
					Werks: "7600", // 工厂
					Matnr: "10028", // 物料代码
					Meins: "KG", // 基本单位
					Menge: "10", // 数量
					Kostl: "", // 成本中心
					LgortIn: "7608", // 入库库位：冷藏库
					LgortOut: "", // 出库库位：冷冻库
					Charg: "2605140001", // 批次
					Zeile: "0010", // 物料凭证项目
				},
			],
		};

		const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;
		try {
			const resp = await axios.post(targetUrl, payload, {
				headers: {
					"X-CSRF-Token": token,
					Cookie: this.normalizeCookie(cookie),
					"Content-Type": "application/json",
					Authorization: authHeader,
					Accept: "application/json",
				},
				validateStatus: () => true,
			});

			if (resp.status >= 200 && resp.status < 300) {
				return ctx.send({ success: true, message: "成功", data: resp.data });
			}
			let d = {
				d: {
					__metadata: {
						id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')",
						uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')",
						type: "ZODATA_YUZ_003_SRV.HEADER",
					},
					Werks: "7600",
					MjahrNew: "0000",
					Budat: "20260514",
					MblnrNew: "",
					TaskNo: "TASK202605140001",
					Cancel: "",
					ErrCode: "0",
					ErrMsg: "",
					Mjahr: "2026",
					Mblnr: "4907303493",
					Bwart: "Z02",
					TOITEMS: {
						results: [],
					},
				},
			};
			const errMsg = typeof resp.data === "string" ? resp.data : JSON.stringify(resp.data);
			return ctx.sendError(resp.status || 500, errMsg || "请求 SAP 失败");
		} catch (err: any) {
			return ctx.sendError(500, err?.message || "请求 SAP 失败");
		}

		// {"d":{"__metadata":{"id":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')","uri":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')","type":"ZODATA_YUZ_003_SRV.HEADER"},"Werks":"7600","MjahrNew":"0000","Budat":"20260514","MblnrNew":"","TaskNo":"TASK202605140001","Cancel":"","ErrCode":"0","ErrMsg":"","Mjahr":"2026","Mblnr":"4907303482","Bwart":"Z02","TOITEMS":{"results":[]}}}
	};

	Product_sale_detail = async (ctx: Context) => {
		let orderNo = "32938005";
		console.log("销售订单明细接口");
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet?$format=json&$filter=(VbelnVl eq '${orderNo}')`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			let d = {
				d: {
					results: [
						{
							VbelnVl: "32046257", // 订单编号
							PosnrVl: "000010", // 行号
							Matnr: "50001", // 物料代码
							Maktx: "百味鸡(原材料)2", // 描述：物料名称

							Lfimg: "12.000", // 交货数量
							Vrkme: "KG", // 销售单位

							Lgort: "7601", // 存储地点：哪个仓库的
							Lgobe: "原料一号冻库", // 描述：仓库位置描述

							Wbstk: "C", // 总体移动状态
							Vbeln: "24478029", // 销售凭证
							Bldat: "/Date(1778284800000)/", // 凭证日期
							BldatC: "", // 凭证日期
							ErrCode: "", // 错误编号
							ErrMsg: "", // 错误信息
							PstyvVl: "TAN", // 项目类别
						},
					],
				},
			};
			console.log(JSON.stringify(resp.data));
			return { success: true, message: "成功", data: resp.data };
		} catch (error: any) {
			return { success: false, message: error.message };
		}
	};

	Filter_by_date_sale = async (ctx: Context) => {
		let orderNo = "32938005";
		console.log("销售订单明细接口123123");
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet?$format=json&$filter=(Vkorg eq '7600' and ( BldatC ge '20260601'  and  BldatC le '20260604'))`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			let d = {
				d: {
					results: [
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='000010')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='000010')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325604",
							ErrMsg: "",
							VbelnVl: "32937997",
							PosnrVl: "000010",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "0.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900003')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900003')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325604",
							ErrMsg: "",
							VbelnVl: "32937997",
							PosnrVl: "900003",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "60.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900004')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900004')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325604",
							ErrMsg: "",
							VbelnVl: "32937997",
							PosnrVl: "900004",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "40.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900005')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900005')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325604",
							ErrMsg: "",
							VbelnVl: "32937997",
							PosnrVl: "900005",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "84.680",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900006')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900006')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325604",
							ErrMsg: "",
							VbelnVl: "32937997",
							PosnrVl: "900006",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "15.320",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='000010')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='000010')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325605",
							ErrMsg: "",
							VbelnVl: "32937998",
							PosnrVl: "000010",
							PstyvVl: "REN",
							Matnr: "16949",
							Lfimg: "0.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='900001')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='900001')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325605",
							ErrMsg: "",
							VbelnVl: "32937998",
							PosnrVl: "900001",
							PstyvVl: "REN",
							Matnr: "16949",
							Lfimg: "35.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='900002')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='900002')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325605",
							ErrMsg: "",
							VbelnVl: "32937998",
							PosnrVl: "900002",
							PstyvVl: "REN",
							Matnr: "16949",
							Lfimg: "35.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='900003')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='900003')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325605",
							ErrMsg: "",
							VbelnVl: "32937998",
							PosnrVl: "900003",
							PstyvVl: "REN",
							Matnr: "16949",
							Lfimg: "35.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325606',VbelnVl='32937999',PosnrVl='000010')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325606',VbelnVl='32937999',PosnrVl='000010')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325606",
							ErrMsg: "",
							VbelnVl: "32937999",
							PosnrVl: "000010",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "3.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325607',VbelnVl='32938000',PosnrVl='000010')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325607',VbelnVl='32938000',PosnrVl='000010')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325607",
							ErrMsg: "",
							VbelnVl: "32938000",
							PosnrVl: "000010",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "0.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325607',VbelnVl='32938000',PosnrVl='900001')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325607',VbelnVl='32938000',PosnrVl='900001')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325607",
							ErrMsg: "",
							VbelnVl: "32938000",
							PosnrVl: "900001",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "60.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325607',VbelnVl='32938000',PosnrVl='900002')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325607',VbelnVl='32938000',PosnrVl='900002')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325607",
							ErrMsg: "",
							VbelnVl: "32938000",
							PosnrVl: "900002",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "41.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325608',VbelnVl='32938001',PosnrVl='000010')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325608',VbelnVl='32938001',PosnrVl='000010')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325608",
							ErrMsg: "",
							VbelnVl: "32938001",
							PosnrVl: "000010",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "0.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780444800000)/",
							BldatC: "20260603",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325608',VbelnVl='32938001',PosnrVl='900001')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325608',VbelnVl='32938001',PosnrVl='900001')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325608",
							ErrMsg: "",
							VbelnVl: "32938001",
							PosnrVl: "900001",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "60.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780444800000)/",
							BldatC: "20260603",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325608',VbelnVl='32938001',PosnrVl='900002')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325608',VbelnVl='32938001',PosnrVl='900002')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325608",
							ErrMsg: "",
							VbelnVl: "32938001",
							PosnrVl: "900002",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "40.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780444800000)/",
							BldatC: "20260603",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325609',VbelnVl='32938002',PosnrVl='000010')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325609',VbelnVl='32938002',PosnrVl='000010')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325609",
							ErrMsg: "",
							VbelnVl: "32938002",
							PosnrVl: "000010",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "17000.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "A",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780531200000)/",
							BldatC: "20260604",
						},
					],
				},
			};
			// console.log(JSON.stringify(resp.data));
			const data = resp?.data?.d?.results?.length || 0;
			console.log(data);
			return ctx.send({ success: true, message: "成功", data: resp.data });
		} catch (error: any) {
			// return { success: false, message: error.message };
			return ctx.send({ success: true, message: error.message });
		}
	};

	// ? 公共： 销售订单 日期 范围查询
	Common_Filter_by_date_sale = async (ctx: Context, startData: string, endDate: string) => {
		// TAN、REN、

		let orderNo = "32938005";
		console.log("销售订单明细接口123123");
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet?$format=json&$filter=(Vkorg eq '7600' and ( BldatC ge '${startData}'  and  BldatC le '${endDate}'))`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			let d = {
				d: {
					results: [
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='000010')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='000010')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325604",
							ErrMsg: "",
							VbelnVl: "32937997",
							PosnrVl: "000010",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "0.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900003')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900003')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325604",
							ErrMsg: "",
							VbelnVl: "32937997",
							PosnrVl: "900003",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "60.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900004')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900004')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325604",
							ErrMsg: "",
							VbelnVl: "32937997",
							PosnrVl: "900004",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "40.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900005')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900005')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325604",
							ErrMsg: "",
							VbelnVl: "32937997",
							PosnrVl: "900005",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "84.680",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900006')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325604',VbelnVl='32937997',PosnrVl='900006')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325604",
							ErrMsg: "",
							VbelnVl: "32937997",
							PosnrVl: "900006",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "15.320",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='000010')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='000010')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325605",
							ErrMsg: "",
							VbelnVl: "32937998",
							PosnrVl: "000010",
							PstyvVl: "REN",
							Matnr: "16949",
							Lfimg: "0.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='900001')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='900001')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325605",
							ErrMsg: "",
							VbelnVl: "32937998",
							PosnrVl: "900001",
							PstyvVl: "REN",
							Matnr: "16949",
							Lfimg: "35.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='900002')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='900002')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325605",
							ErrMsg: "",
							VbelnVl: "32937998",
							PosnrVl: "900002",
							PstyvVl: "REN",
							Matnr: "16949",
							Lfimg: "35.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='900003')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325605',VbelnVl='32937998',PosnrVl='900003')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325605",
							ErrMsg: "",
							VbelnVl: "32937998",
							PosnrVl: "900003",
							PstyvVl: "REN",
							Matnr: "16949",
							Lfimg: "35.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325606',VbelnVl='32937999',PosnrVl='000010')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325606',VbelnVl='32937999',PosnrVl='000010')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325606",
							ErrMsg: "",
							VbelnVl: "32937999",
							PosnrVl: "000010",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "3.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325607',VbelnVl='32938000',PosnrVl='000010')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325607',VbelnVl='32938000',PosnrVl='000010')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325607",
							ErrMsg: "",
							VbelnVl: "32938000",
							PosnrVl: "000010",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "0.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325607',VbelnVl='32938000',PosnrVl='900001')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325607',VbelnVl='32938000',PosnrVl='900001')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325607",
							ErrMsg: "",
							VbelnVl: "32938000",
							PosnrVl: "900001",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "60.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325607',VbelnVl='32938000',PosnrVl='900002')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325607',VbelnVl='32938000',PosnrVl='900002')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325607",
							ErrMsg: "",
							VbelnVl: "32938000",
							PosnrVl: "900002",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "41.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780358400000)/",
							BldatC: "20260602",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325608',VbelnVl='32938001',PosnrVl='000010')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325608',VbelnVl='32938001',PosnrVl='000010')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325608",
							ErrMsg: "",
							VbelnVl: "32938001",
							PosnrVl: "000010",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "0.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780444800000)/",
							BldatC: "20260603",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325608',VbelnVl='32938001',PosnrVl='900001')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325608',VbelnVl='32938001',PosnrVl='900001')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325608",
							ErrMsg: "",
							VbelnVl: "32938001",
							PosnrVl: "900001",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "60.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780444800000)/",
							BldatC: "20260603",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325608',VbelnVl='32938001',PosnrVl='900002')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325608',VbelnVl='32938001',PosnrVl='900002')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325608",
							ErrMsg: "",
							VbelnVl: "32938001",
							PosnrVl: "900002",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "40.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "C",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780444800000)/",
							BldatC: "20260603",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325609',VbelnVl='32938002',PosnrVl='000010')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet(Vbeln='26325609',VbelnVl='32938002',PosnrVl='000010')",
								type: "ZODATA_YUZ_004_SRV.OUTB_DELIVERY",
							},
							Vkorg: "",
							ErrCode: "",
							Vbeln: "26325609",
							ErrMsg: "",
							VbelnVl: "32938002",
							PosnrVl: "000010",
							PstyvVl: "TAN",
							Matnr: "16949",
							Lfimg: "17000.000",
							Vrkme: "KG",
							Lgort: "7608",
							Wbstk: "A",
							Maktx: "海南夫妻肺片（牛肉）",
							Lgobe: "成品冷藏库",
							Bldat: "/Date(1780531200000)/",
							BldatC: "20260604",
						},
					],
				},
			};
			// return { success: true, message: "成功", data: d };
			return { success: true, message: "成功", data: resp?.data || [] };
		} catch (error: any) {
			return { success: false, message: error.message, data: [] };
		}
	};

	// ? 公共：销售出库单 根据单号和工厂获取明细
	Common_Product_sale_detail = async (ctx: Context, order_No: string = "") => {
		let orderNo = _.trim(order_No || _.get(ctx, "request.body.docNo", ""));

		// $filter=( BldatC eq '20260604' and VbelnVl eq '32046273' and Vkorg eq '7600') // 日期 + 单号 + 厂号
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet?$format=json&$filter=(VbelnVl eq '${orderNo}' and Vkorg eq '7600')`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			let sapData = resp.data;
			// let sapData = {
			// 	d: {
			// 		results: [
			// 			{
			// 				VbelnVl: "32046257", // 订单编号
			// 				PosnrVl: "000010", // 行号
			// 				Matnr: "50001", // 物料代码
			// 				Maktx: "百味鸡(原材料)2", // 描述：物料名称

			// 				Lfimg: "12.000", // 交货数量
			// 				Vrkme: "KG", // 销售单位

			// 				Lgort: "7601", // 存储地点：哪个仓库的
			// 				Lgobe: "原料一号冻库", // 描述：仓库位置描述

			// 				Wbstk: "C", // 总体移动状态
			// 				Vbeln: "24478029", // 销售凭证
			// 				Bldat: "/Date(1778284800000)/", // 凭证日期
			// 				BldatC: "", // 凭证日期
			// 				ErrCode: "", // 错误编号
			// 				ErrMsg: "", // 错误信息
			// 				PstyvVl: "TAN", // 项目类别
			// 			},
			// 				{
			// 				VbelnVl: "32046257", // 订单编号
			// 				PosnrVl: "000011", // 行号
			// 				Matnr: "50001", // 物料代码
			// 				Maktx: "百味鸡(原材料)2", // 描述：物料名称

			// 				Lfimg: "12.000", // 交货数量
			// 				Vrkme: "KG", // 销售单位

			// 				Lgort: "7601", // 存储地点：哪个仓库的
			// 				Lgobe: "原料一号冻库", // 描述：仓库位置描述

			// 				Wbstk: "C", // 总体移动状态
			// 				Vbeln: "24478029", // 销售凭证
			// 				Bldat: "/Date(1778284800000)/", // 凭证日期
			// 				BldatC: "", // 凭证日期
			// 				ErrCode: "", // 错误编号
			// 				ErrMsg: "", // 错误信息
			// 				PstyvVl: "TAN", // 项目类别
			// 			},
			// 				{
			// 				VbelnVl: "32046257", // 订单编号
			// 				PosnrVl: "000013", // 行号
			// 				Matnr: "50001", // 物料代码
			// 				Maktx: "百味鸡(原材料)2", // 描述：物料名称

			// 				Lfimg: "12.000", // 交货数量
			// 				Vrkme: "KG", // 销售单位

			// 				Lgort: "7601", // 存储地点：哪个仓库的
			// 				Lgobe: "原料一号冻库", // 描述：仓库位置描述

			// 				Wbstk: "C", // 总体移动状态
			// 				Vbeln: "24478029", // 销售凭证
			// 				Bldat: "/Date(1778284800000)/", // 凭证日期
			// 				BldatC: "", // 凭证日期
			// 				ErrCode: "", // 错误编号
			// 				ErrMsg: "", // 错误信息
			// 				PstyvVl: "TAN", // 项目类别
			// 			},
			// 				{
			// 				VbelnVl: "32046257", // 订单编号
			// 				PosnrVl: "000014", // 行号
			// 				Matnr: "50001", // 物料代码
			// 				Maktx: "百味鸡(原材料)2", // 描述：物料名称

			// 				Lfimg: "12.000", // 交货数量
			// 				Vrkme: "KG", // 销售单位

			// 				Lgort: "7601", // 存储地点：哪个仓库的
			// 				Lgobe: "原料一号冻库", // 描述：仓库位置描述

			// 				Wbstk: "C", // 总体移动状态
			// 				Vbeln: "24478029", // 销售凭证
			// 				Bldat: "/Date(1778284800000)/", // 凭证日期
			// 				BldatC: "", // 凭证日期
			// 				ErrCode: "", // 错误编号
			// 				ErrMsg: "", // 错误信息
			// 				PstyvVl: "TAN", // 项目类别
			// 			},
			// 		],
			// 	},
			// };
			console.log(JSON.stringify(sapData));
			return { success: true, message: "成功", data: sapData };
		} catch (error: any) {
			return { success: false, message: error.message };
		}
	};

	Product_sale_back_detail = async (ctx: Context) => {
		let orderNo = "32937998";
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/OUTB_DELIVERYSet?$format=json&$filter=(VbelnVl eq '${orderNo}')`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
				timeout: 6500,
			});
			let d = {
				d: {
					results: [
						{
							VbelnVl: "32046257", // 订单编号
							PosnrVl: "000010", // 行号
							Matnr: "50001", // 物料代码
							Maktx: "百味鸡(原材料)2", // 描述：物料名称

							Lfimg: "12.000", // 交货数量
							Vrkme: "KG", // 销售单位

							Lgort: "7601", // 存储地点：哪个仓库的
							Lgobe: "原料一号冻库", // 描述：仓库位置描述

							Wbstk: "C", // 总体移动状态
							Vbeln: "24478029", // 销售凭证
							Bldat: "/Date(1778284800000)/", // 凭证日期
							BldatC: "", // 凭证日期
							ErrCode: "", // 错误编号
							ErrMsg: "", // 错误信息
							PstyvVl: "TAN", // 项目类别
						},
					],
				},
			};
			console.log(JSON.stringify(resp.data));
			return ctx.send({ success: true, message: "成功", data: resp.data });
		} catch (error: any) {
			if (error.response) {
			}
		}
	};

	Product_sale_finish = async (ctx: Context) => {
		const { success, token, cookie, authHeader } = (await this.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		// 销售订单明细
		let a = {
			VbelnVl: "32046257", // 订单编号
			PosnrVl: "000010", // 行号
			Matnr: "50001", // 物料代码
			Maktx: "百味鸡(原材料)2", // 描述：物料名称

			Lfimg: "12.000", // 交货数量
			Vrkme: "KG", // 销售单位

			Lgort: "7601", // 存储地点：哪个仓库的
			Lgobe: "原料一号冻库", // 描述：仓库位置描述

			Wbstk: "C", // 总体移动状态
			Vbeln: "24478029", // 销售凭证
			Bldat: "/Date(1778284800000)/", // 凭证日期
			BldatC: "", // 凭证日期
			ErrCode: "", // 错误编号
			ErrMsg: "", // 错误信息
			PstyvVl: "TAN", // 项目类别
		};

		const payload = {
			VbelnVl: "32937999", // 交货
			ErrCode: "",
			ErrMsg: "",
			TOITEMS: [
				{
					VbelnVl: "32937999", // 交货
					PosnrVl: "000010", // 行号
					Matnr: "16949", // 物料代码
					Lfimg: "3", // 交货数量
					Vrkme: "KG", // 销售单位
					Lgort: "7608", // 存储地点：原料冻库
					Werks: "7600", // 工厂
					Charg: "2605300002", // 批次
					BldatC: "20260530", // 实际出库日期
				},
				{
					VbelnVl: "32937999", // 交货
					PosnrVl: "000010", // 行号
					Matnr: "16949", // 物料代码
					Lfimg: "3", // 交货数量
					Vrkme: "KG", // 销售单位
					Lgort: "7608", // 存储地点：原料冻库
					Werks: "7600", // 工厂
					Charg: "2605300003", // 批次
					BldatC: "20260530", // 实际出库日期
				},
			],
		};
		console.log("payload", payload);

		const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet`;
		try {
			const resp = await axios.post(targetUrl, payload, {
				headers: {
					"X-CSRF-Token": token,
					Cookie: this.normalizeCookie(cookie),
					"Content-Type": "application/json",
					Authorization: authHeader,
					Accept: "application/json",
				},
				timeout: 6500,
				validateStatus: () => true,
			});
			console.log("销售订单回传：", resp.data);
			if (resp.status >= 200 && resp.status < 300) {
				return ctx.send({ success: true, message: "成功", data: resp.data });
			}
			let d = {
				d: {
					__metadata: {
						id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet('32046257')",
						uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet('32046257')",
						type: "ZODATA_YUZ_004_SRV.HEADER",
					},
					VbelnVl: "32046257",
					ErrCode: "E",
					ErrMsg: "为交货的发货已经计帐",
					TOITEMS: {
						results: [],
					},
				},
			};
			let d2 = {
				d: {
					__metadata: {
						id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet('32937999')",
						uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet('32937999')",
						type: "ZODATA_YUZ_004_SRV.HEADER",
					},
					VbelnVl: "32937999",
					ErrCode: "S",
					ErrMsg: "",
					TOITEMS: {
						results: [],
					},
				},
			};
			const errMsg = typeof resp.data === "string" ? resp.data : JSON.stringify(resp.data);
			return ctx.sendError(resp.status || 500, errMsg || "请求 SAP 失败");
		} catch (err: any) {
			return ctx.sendError(500, err?.message || "请求 SAP 失败");
		}

		// {"d":{"__metadata":{"id":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet('32046257')","uri":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet('32046257')","type":"ZODATA_YUZ_004_SRV.HEADER"},"VbelnVl":"32046257","ErrCode":"E","ErrMsg":"为交货的发货已经计帐","TOITEMS":{"results":[]}}}
	};

	Product_sale_back_finish = async (ctx: Context) => {
		const { success, token, cookie, authHeader } = (await this.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		let a = {
			VbelnVl: "32046257", // 订单编号
			PosnrVl: "000010", // 行号
			Matnr: "50001", // 物料代码
			Maktx: "百味鸡(原材料)2", // 描述：物料名称

			Lfimg: "12.000", // 交货数量
			Vrkme: "KG", // 销售单位

			Lgort: "7601", // 存储地点：哪个仓库的
			Lgobe: "原料一号冻库", // 描述：仓库位置描述

			Wbstk: "C", // 总体移动状态
			Vbeln: "24478029", // 销售凭证
			Bldat: "/Date(1778284800000)/", // 凭证日期
			BldatC: "", // 凭证日期
			ErrCode: "", // 错误编号
			ErrMsg: "", // 错误信息
			PstyvVl: "TAN", // 项目类别
		};

		const payload = {
			VbelnVl: "32937998", // 交货
			ErrCode: "",
			ErrMsg: "",
			TOITEMS: [
				{
					VbelnVl: "32937999", // 交货
					PosnrVl: "000010", // 行号
					Matnr: "16949", // 物料代码
					Lfimg: "35", // 交货数量
					Vrkme: "KG", // 销售单位
					Lgort: "7608", // 存储地点：原料冻库
					Werks: "7600", // 工厂
					Charg: "2605300001", // 批次
					BldatC: "20260530", // 实际出库日期
				},
				{
					VbelnVl: "32937998", // 交货
					PosnrVl: "000010", // 行号
					Matnr: "16949", // 物料代码
					Lfimg: "35", // 交货数量
					Vrkme: "KG", // 销售单位
					Lgort: "7608", // 存储地点：原料冻库
					Werks: "7600", // 工厂
					Charg: "2605300002", // 批次
					BldatC: "20260530", // 实际出库日期
				},
			],
		};
		console.log("payload", payload);

		const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet`;
		try {
			const resp = await axios.post(targetUrl, payload, {
				headers: {
					"X-CSRF-Token": token,
					Cookie: this.normalizeCookie(cookie),
					"Content-Type": "application/json",
					Authorization: authHeader,
					Accept: "application/json",
				},
				validateStatus: () => true,
			});
			console.log("销售订单回传：", resp.data);
			if (resp.status >= 200 && resp.status < 300) {
				return ctx.send({ success: true, message: "成功", data: resp.data });
			}
			let d = {
				d: {
					__metadata: {
						id: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet('32046257')",
						uri: "https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet('32046257')",
						type: "ZODATA_YUZ_004_SRV.HEADER",
					},
					VbelnVl: "32046257",
					ErrCode: "E",
					ErrMsg: "为交货的发货已经计帐",
					TOITEMS: {
						results: [],
					},
				},
			};
			let d2 = {
				d: {
					__metadata: {
						id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet('32937999')",
						uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet('32937999')",
						type: "ZODATA_YUZ_004_SRV.HEADER",
					},
					VbelnVl: "32937999",
					ErrCode: "S",
					ErrMsg: "",
					TOITEMS: {
						results: [],
					},
				},
			};
			const errMsg = typeof resp.data === "string" ? resp.data : JSON.stringify(resp.data);
			return ctx.sendError(resp.status || 500, errMsg || "请求 SAP 失败");
		} catch (err: any) {
			return ctx.sendError(500, err?.message || "请求 SAP 失败");
		}

		// {"d":{"__metadata":{"id":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet('32046257')","uri":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet('32046257')","type":"ZODATA_YUZ_004_SRV.HEADER"},"VbelnVl":"32046257","ErrCode":"E","ErrMsg":"为交货的发货已经计帐","TOITEMS":{"results":[]}}}
	};

	Product_Out_Other_SendSAP = async (ctx: Context) => {
		const { success, token, cookie, authHeader } = (await this.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		let payload = {};
		// payload = {
		// 	Werks: "7600",
		// 	Budat: "20260530",
		// 	TaskNo: "TASK202605300001",
		// 	ErrCode: "",
		// 	ErrMsg: "",
		// 	Mjahr: "",
		// 	Mblnr: "",
		// 	Bwart: "Z01", // 出库 - 盘亏 Z01
		// 	TOITEMS: [
		// 		{
		// 			Menge: "10",
		// 			Matnr: "10001", // 物料代码
		// 			LgortIn: "7608", // 冷藏库
		// 			Charg: "2605300001",
		// 			Meins: "KG",
		// 			Kostl: "", // 76010001
		// 			LgortOut: "",
		// 			Zeile: "0010",
		// 			Werks: "7600",
		// 		},
		// 	],
		// };

		// payload = {
		// 	Werks: "7600",
		// 	Budat: "20260530",
		// 	TaskNo: "TASK202605300001",
		// 	ErrCode: "",
		// 	ErrMsg: "",
		// 	Mjahr: "",
		// 	Mblnr: "",
		// 	Bwart: "Z05", // 出库 - -成本中心发料 Z05
		// 	TOITEMS: [
		// 		{
		// 			Menge: "10",
		// 			Matnr: "10001", // 物料代码
		// 			LgortIn: "7608", // 冷藏库
		// 			Charg: "2605300001",
		// 			Meins: "KG",
		// 			Kostl: "76010001", // 76010001  成本中心需要手动选择 +++++
		// 			LgortOut: "",
		// 			Zeile: "0010",
		// 			Werks: "7600",
		// 		},
		// 	],
		// };

		// payload = {
		// 	Werks: "7600",
		// 	Budat: "20260530",
		// 	TaskNo: "TASK202605300001",
		// 	ErrCode: "",
		// 	ErrMsg: "",
		// 	Mjahr: "",
		// 	Mblnr: "",
		// 	Bwart: "Z07", // 出库 - -报废发货 Z07
		// 	TOITEMS: [
		// 		{
		// 			Menge: "10",
		// 			Matnr: "10001", // 物料代码
		// 			LgortIn: "7608", // 冷藏库
		// 			Charg: "2605300001",
		// 			Meins: "KG",
		// 			Kostl: "",
		// 			LgortOut: "",
		// 			Zeile: "0010",
		// 			Werks: "7600",
		// 		},
		// 	],
		// };

		// payload = {
		// 	Werks: "7600",
		// 	Budat: "20260530",
		// 	TaskNo: "TASK202605300001",
		// 	ErrCode: "",
		// 	ErrMsg: "",
		// 	Mjahr: "",
		// 	Mblnr: "",
		// 	Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
		// 	TOITEMS: [
		// 		{
		// 			Menge: "10",
		// 			Matnr: "10001", // 物料代码
		// 			LgortIn: "7608", // 冷藏库
		// 			Charg: "2605300001",
		// 			Meins: "KG",
		// 			Kostl: "",
		// 			LgortOut: "",
		// 			Zeile: "0010",
		// 			Werks: "7600",
		// 		},
		// 	],
		// };

		payload = {
			Werks: "7600",
			Budat: "20260530",
			TaskNo: "TASK202605300001",
			ErrCode: "",
			ErrMsg: "",
			Mjahr: "",
			Mblnr: "",
			Bwart: "311", // 出库 - -库存调拨 311
			TOITEMS: [
				{
					Menge: "10",
					Matnr: "10001", // 物料代码
					LgortIn: "7608", // 冷藏库
					Charg: "2605300001",
					Meins: "KG",
					Kostl: "",
					LgortOut: "7607",
					Zeile: "0010",
					Werks: "7600",
				},
			],
		};

		const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;
		try {
			const resp = await axios.post(targetUrl, payload, {
				headers: {
					"X-CSRF-Token": token,
					Cookie: this.normalizeCookie(cookie),
					"Content-Type": "application/json",
					Authorization: authHeader,
					Accept: "application/json",
				},
				validateStatus: () => true,
			});

			if (resp.status >= 200 && resp.status < 300) {
				return ctx.send({ success: true, message: "成功", data: resp.data });
			}
			let d = {
				d: {
					__metadata: {
						id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')",
						uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')",
						type: "ZODATA_YUZ_003_SRV.HEADER",
					},
					MjahrNew: "0000",
					Werks: "7600",
					MblnrNew: "",
					Budat: "20260530",
					Cancel: "",
					TaskNo: "TASK202605300001",
					ErrCode: "0",
					ErrMsg: "",
					Mjahr: "2026",
					Mblnr: "4910282101",
					Bwart: "Z01",
					TOITEMS: {
						results: [],
					},
				},
			};
			const errMsg = typeof resp.data === "string" ? resp.data : JSON.stringify(resp.data);
			return ctx.sendError(resp.status || 500, errMsg || "请求 SAP 失败");
		} catch (err: any) {
			return ctx.sendError(500, err?.message || "请求 SAP 失败");
		}

		// {"d":{"__metadata":{"id":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')","uri":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')","type":"ZODATA_YUZ_003_SRV.HEADER"},"Werks":"7600","MjahrNew":"0000","Budat":"20260514","MblnrNew":"","TaskNo":"TASK202605140001","Cancel":"","ErrCode":"0","ErrMsg":"","Mjahr":"2026","Mblnr":"4907303484","Bwart":"Z01","TOITEMS":{"results":[]}}}
	};

	Material_purchase_get = async (ctx: Context) => {
		const { success, token, cookie } = (await this.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		let orderNo = "4501069850";

		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet?$filter=( Ebeln eq '${orderNo}' )&$format=json`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			let d = {
				code: 200,
				msg: "请求成功",
				data: {
					success: true,
					message: "成功",
					data: {
						d: {
							results: [
								{
									Ebeln: "4501069850",
									IsBonded: "",
									BioflaNo: "TDH0000001",
									Ebelp: "00010",
									SealNo: "FQH0000002",
									Bsart: "ZNB",
									FactoryId: "",
									BedatC: "20260601",
									Country: "",
									AedatC: "20260601",
									Lifnr: "40007220",
									ZsrmEbeln: "",
									Loekz: false,
									Matnr: "50723",
									Maktx: "牛肉（后腱）",
									Werks: "7600",
									Lgort: "7601",
									Lgobe: "原料一号冻库",
									Menge: "10000.000",
									Meins: "KG",
									Uebto: "0.0",
									Untto: "0.0",
									EindtC: "20260601",
								},
								{
									Ebeln: "4501069850",
									IsBonded: "",
									BioflaNo: "TDH0000001",
									Ebelp: "00020",
									SealNo: "FQH0000002",
									Bsart: "ZNB",
									FactoryId: "",
									BedatC: "20260601",
									Country: "",
									AedatC: "20260601",
									Lifnr: "40007220",
									ZsrmEbeln: "",
									Loekz: false,
									Matnr: "40308",
									Maktx: "卤牛肉味粉食品用香精",
									Werks: "7600",
									Lgort: "",
									Lgobe: "",
									Menge: "10000.000",
									Meins: "KG",
									Uebto: "0.0",
									Untto: "0.0",
									EindtC: "20260611",
								},
								{
									Ebeln: "4501069850",
									IsBonded: "",
									BioflaNo: "TDH0000001",
									Ebelp: "00030",
									SealNo: "FQH0000002",
									Bsart: "ZNB",
									FactoryId: "",
									BedatC: "20260601",
									Country: "",
									AedatC: "20260601",
									Lifnr: "40007220",
									ZsrmEbeln: "",
									Loekz: false,
									Matnr: "40097",
									Maktx: "乙酰化二淀粉磷酸酯",
									Werks: "7600",
									Lgort: "",
									Lgobe: "",
									Menge: "10000.000",
									Meins: "KG",
									Uebto: "0.0",
									Untto: "0.0",
									EindtC: "20260608",
								},
								{
									Ebeln: "4501069850",
									IsBonded: "",
									BioflaNo: "TDH0000001",
									Ebelp: "00040",
									SealNo: "FQH0000002",
									Bsart: "ZNB",
									FactoryId: "",
									BedatC: "20260601",
									Country: "",
									AedatC: "20260601",
									Lifnr: "40007220",
									ZsrmEbeln: "",
									Loekz: false,
									Matnr: "40781",
									Maktx: "无碘盐",
									Werks: "7600",
									Lgort: "",
									Lgobe: "",
									Menge: "10000.000",
									Meins: "KG",
									Uebto: "0.0",
									Untto: "0.0",
									EindtC: "20260601",
								},
								{
									Ebeln: "4501069850",
									IsBonded: "",
									BioflaNo: "TDH0000001",
									Ebelp: "00050",
									SealNo: "FQH0000002",
									Bsart: "ZNB",
									FactoryId: "",
									BedatC: "20260601",
									Country: "",
									AedatC: "20260601",
									Lifnr: "40007220",
									ZsrmEbeln: "",
									Loekz: false,
									Matnr: "40002",
									Maktx: "白糖",
									Werks: "7600",
									Lgort: "",
									Lgobe: "",
									Menge: "10000.000",
									Meins: "KG",
									Uebto: "0.0",
									Untto: "0.0",
									EindtC: "20260608",
								},
								{
									__metadata: {
										id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00060')",
										uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00060')",
										type: "ZODATA_YUZ_005_SRV.PURCHASE",
									},
									Ebeln: "4501069850",
									IsBonded: "",
									BioflaNo: "TDH0000001",
									Ebelp: "00060",
									SealNo: "FQH0000002",
									Bsart: "ZNB",
									FactoryId: "",
									BedatC: "20260601",
									Country: "",
									AedatC: "20260601",
									Lifnr: "40007220",
									ZsrmEbeln: "",
									Loekz: false,
									Matnr: "40125",
									Maktx: "乙基麦芽酚",
									Werks: "7600",
									Lgort: "",
									Lgobe: "",
									Menge: "10000.000",
									Meins: "KG",
									Uebto: "0.0",
									Untto: "0.0",
									EindtC: "20260608",
								},
								{
									Ebeln: "4501069850",
									IsBonded: "",
									BioflaNo: "TDH0000001",
									Ebelp: "00070",
									SealNo: "FQH0000002",
									Bsart: "ZNB",
									FactoryId: "",
									BedatC: "20260601",
									Country: "",
									AedatC: "20260601",
									Lifnr: "40007220",
									ZsrmEbeln: "",
									Loekz: false,
									Matnr: "40518",
									Maktx: "牛油味膏食品用香精EB09772",
									Werks: "7600",
									Lgort: "",
									Lgobe: "",
									Menge: "10000.000",
									Meins: "KG",
									Uebto: "0.0",
									Untto: "0.0",
									EindtC: "20260611",
								},
								{
									__metadata: {
										id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00080')",
										uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00080')",
										type: "ZODATA_YUZ_005_SRV.PURCHASE",
									},
									Ebeln: "4501069850",
									IsBonded: "",
									BioflaNo: "TDH0000001",
									Ebelp: "00080",
									SealNo: "FQH0000002",
									Bsart: "ZNB",
									FactoryId: "",
									BedatC: "20260601",
									Country: "",
									AedatC: "20260601",
									Lifnr: "40007220",
									ZsrmEbeln: "",
									Loekz: false,
									Matnr: "40093",
									Maktx: "D-异抗坏血酸钠",
									Werks: "7600",
									Lgort: "",
									Lgobe: "",
									Menge: "10000.000",
									Meins: "KG",
									Uebto: "0.0",
									Untto: "0.0",
									EindtC: "20260608",
								},
								{
									__metadata: {
										id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00090')",
										uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00090')",
										type: "ZODATA_YUZ_005_SRV.PURCHASE",
									},
									Ebeln: "4501069850",
									IsBonded: "",
									BioflaNo: "TDH0000001",
									Ebelp: "00090",
									SealNo: "FQH0000002",
									Bsart: "ZNB",
									FactoryId: "",
									BedatC: "20260601",
									Country: "",
									AedatC: "20260601",
									Lifnr: "40007220",
									ZsrmEbeln: "",
									Loekz: false,
									Matnr: "40167",
									Maktx: "增香粉",
									Werks: "7600",
									Lgort: "",
									Lgobe: "",
									Menge: "10000.000",
									Meins: "KG",
									Uebto: "0.0",
									Untto: "0.0",
									EindtC: "20260608",
								},
								{
									__metadata: {
										id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00100')",
										uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00100')",
										type: "ZODATA_YUZ_005_SRV.PURCHASE",
									},
									Ebeln: "4501069850",
									IsBonded: "",
									BioflaNo: "TDH0000001",
									Ebelp: "00100",
									SealNo: "FQH0000002",
									Bsart: "ZNB",
									FactoryId: "",
									BedatC: "20260601",
									Country: "",
									AedatC: "20260601",
									Lifnr: "40007220",
									ZsrmEbeln: "",
									Loekz: false,
									Matnr: "40881",
									Maktx: "保鲜复合酶YD-YZ1219",
									Werks: "7600",
									Lgort: "",
									Lgobe: "",
									Menge: "10000.000",
									Meins: "KG",
									Uebto: "0.0",
									Untto: "0.0",
									EindtC: "20260601",
								},
							],
						},
					},
				},
			};
			console.log("resp.data", resp.data);
			let da = resp.data;
			da = {
				d: {
					results: [
						{
							Ebeln: "4500776356",
							IsBonded: "",
							BioflaNo: "",
							Ebelp: "00010",
							SealNo: "",
							Bsart: "ZTM",
							FactoryId: "",
							BedatC: "20240801",
							Country: "",
							AedatC: "20240812",
							Lifnr: "40000841",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "",
							Maktx: "",
							Werks: "7250",
							Lgort: "",
							Lgobe: "",
							Menge: "1.000",
							Meins: "AU",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20240812",
						},
					],
				},
			};
			return ctx.send({ success: true, message: "成功", data: resp.data });
		} catch (error: any) {
			return ctx.send({ success: false, message: "成功", data: error.message });
		}
	};

	Filter_by_date_purchase = async (ctx: Context) => {
		const { success, token, cookie } = (await this.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		let orderNo = "4501069850";
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet?$filter=(Bukrs eq '7600' and (BedatC ge '20260602' and BedatC le '20260612'  ) )&$format=json`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			let data2 = {
				d: {
					results: [
						{
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00010",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "50723",
							Maktx: "牛肉（后腱）",
							Werks: "7600",
							Lgort: "7601",
							Lgobe: "原料一号冻库",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260601",
						},
						{
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00020",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40308",
							Maktx: "卤牛肉味粉食品用香精",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260611",
						},
						{
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00030",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40097",
							Maktx: "乙酰化二淀粉磷酸酯",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260608",
						},
						{
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00040",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40781",
							Maktx: "无碘盐",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260601",
						},
						{
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00050",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40002",
							Maktx: "白糖",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260608",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00060')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00060')",
								type: "ZODATA_YUZ_005_SRV.PURCHASE",
							},
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00060",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40125",
							Maktx: "乙基麦芽酚",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260608",
						},
						{
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00070",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40518",
							Maktx: "牛油味膏食品用香精EB09772",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260611",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00080')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00080')",
								type: "ZODATA_YUZ_005_SRV.PURCHASE",
							},
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00080",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40093",
							Maktx: "D-异抗坏血酸钠",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260608",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00090')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00090')",
								type: "ZODATA_YUZ_005_SRV.PURCHASE",
							},
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00090",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40167",
							Maktx: "增香粉",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260608",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00100')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00100')",
								type: "ZODATA_YUZ_005_SRV.PURCHASE",
							},
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00100",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40881",
							Maktx: "保鲜复合酶YD-YZ1219",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260601",
						},
					],
				},
			};
			const data = resp?.data?.d?.results?.length || 0;
			console.log(data);
			return ctx.send({ success: true, message: "成功", data: resp.data });
		} catch (error: any) {
			return ctx.send({ success: false, message: "成功", data: error.message });
		}
	};

	// ? 公共： 采购订单 日期 范围查询
	Common_Filter_by_date_purchase = async (ctx: Context, startData: string, endDate: string) => {
		// const { success, token, cookie } = (await this.GetToekn(ctx)) as any;
		// if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		let orderNo = "4501069850";
		// /sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet?$filter=(Bukrs eq '7600' and (BedatC ge '20260602' and BedatC le '20260612'  ))&$format=json
		// /sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet?$filter=(Bukrs eq '7600' and (BedatC ge '20260602' and BedatC le '20260612'  ))&$format=json
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet?$filter=(Bukrs eq '7600' and (BedatC ge '${startData}' and BedatC le '${endDate}'  ))&$format=json`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			let d = {
				d: {
					results: [
						{
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00010",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "50723",
							Maktx: "牛肉（后腱）",
							Werks: "7600",
							Lgort: "7601",
							Lgobe: "原料一号冻库",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260601",
						},
						{
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00020",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40308",
							Maktx: "卤牛肉味粉食品用香精",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260611",
						},
						{
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00030",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40097",
							Maktx: "乙酰化二淀粉磷酸酯",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260608",
						},
						{
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00040",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40781",
							Maktx: "无碘盐",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260601",
						},
						{
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00050",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40002",
							Maktx: "白糖",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260608",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00060')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00060')",
								type: "ZODATA_YUZ_005_SRV.PURCHASE",
							},
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00060",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40125",
							Maktx: "乙基麦芽酚",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260608",
						},
						{
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00070",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40518",
							Maktx: "牛油味膏食品用香精EB09772",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260611",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00080')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00080')",
								type: "ZODATA_YUZ_005_SRV.PURCHASE",
							},
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00080",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40093",
							Maktx: "D-异抗坏血酸钠",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260608",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00090')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00090')",
								type: "ZODATA_YUZ_005_SRV.PURCHASE",
							},
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00090",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40167",
							Maktx: "增香粉",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260608",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00100')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00100')",
								type: "ZODATA_YUZ_005_SRV.PURCHASE",
							},
							Ebeln: "4501069850",
							IsBonded: "",
							BioflaNo: "TDH0000001",
							Ebelp: "00100",
							SealNo: "FQH0000002",
							Bsart: "ZNB",
							FactoryId: "",
							BedatC: "20260601",
							Country: "",
							AedatC: "20260601",
							Lifnr: "40007220",
							ZsrmEbeln: "",
							Loekz: false,
							Matnr: "40881",
							Maktx: "保鲜复合酶YD-YZ1219",
							Werks: "7600",
							Lgort: "",
							Lgobe: "",
							Menge: "10000.000",
							Meins: "KG",
							Uebto: "0.0",
							Untto: "0.0",
							EindtC: "20260601",
						},
					],
				},
			};
			// return { success: true, message: "成功", data: d };
			return { success: true, message: "成功", data: resp?.data || [] };
		} catch (error: any) {
			return { success: false, message: error.message, data: [] };
		}
	};

	// ? 公共：采购订单根据单号和工厂获取明细
	Common_purchase_get = async (ctx: Context, order: string = "") => {
		const orderNo = _.trim(order || _.get(ctx, "request.body.docNo", ""));

		// $filter=( Ebeln eq '4500776356' and Bukrs eq '7600' and BedatC eq '20251225' )&$format=json  // 单号 + 工厂 + 日期
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet?$filter=( Ebeln eq '${orderNo}' and Bukrs eq '7600' )&$format=json`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			let sapData = resp.data;
			// let sapData = {
			// 	d: {
			// 		results: [
			// 			{
			// 				Ebeln: "4501069850", // 采购凭证
			// 				Ebelp: "00010", // 行号

			// 				Matnr: "50723", // 物料代码
			// 				Maktx: "牛肉（后腱）", //  物料名称
			// 				Menge: "10000.000", // 入库数量
			// 				Lgort: "7601", // 入库仓库代码
			// 				Lgobe: "原料一号冻库", // 入库仓库名称
			// 				Meins: "KG", // 基本单位

			// 				IsBonded: "", // 是否保税
			// 				BioflaNo: "TDH0000001", // 提单号
			// 				SealNo: "FQH0000002", // 封签号
			// 				Bsart: "ZNB", // 订单类型
			// 				FactoryId: "", // 厂号
			// 				BedatC: "20260601", // 订单凭证日期
			// 				Country: "", // 国家
			// 				AedatC: "20260601", // 记录创建日期
			// 				Lifnr: "40007220", // 供应商
			// 				ZsrmEbeln: "", // SRM采购订单号
			// 				Loekz: false, // 删除标志
			// 				Werks: "7600", // 工厂
			// 				Uebto: "0.0", // 过量交货容差
			// 				Untto: "0.0", // 交货不足容差
			// 				EindtC: "20260601", // 交货日期
			// 				EindtsssssssssssssssssssssC: "20260601", // 交货日期
			// 			},
			// 			{
			// 				Ebeln: "4501069850",
			// 				IsBonded: "",
			// 				BioflaNo: "TDH0000001",
			// 				Ebelp: "00020",
			// 				SealNo: "FQH0000002",
			// 				Bsart: "ZNB",
			// 				FactoryId: "",
			// 				BedatC: "20260601",
			// 				Country: "",
			// 				AedatC: "20260601",
			// 				Lifnr: "40007220",
			// 				ZsrmEbeln: "",
			// 				Loekz: false,
			// 				Matnr: "40308",
			// 				Maktx: "卤牛肉味粉食品用香精",
			// 				Werks: "7600",
			// 				Lgort: "",
			// 				Lgobe: "",
			// 				Menge: "10000.000",
			// 				Meins: "KG",
			// 				Uebto: "0.0",
			// 				Untto: "0.0",
			// 				EindtC: "20260611",
			// 			},
			// 			{
			// 				Ebeln: "4501069850",
			// 				IsBonded: "",
			// 				BioflaNo: "TDH0000001",
			// 				Ebelp: "00030",
			// 				SealNo: "FQH0000002",
			// 				Bsart: "ZNB",
			// 				FactoryId: "",
			// 				BedatC: "20260601",
			// 				Country: "",
			// 				AedatC: "20260601",
			// 				Lifnr: "40007220",
			// 				ZsrmEbeln: "",
			// 				Loekz: false,
			// 				Matnr: "40097",
			// 				Maktx: "乙酰化二淀粉磷酸酯",
			// 				Werks: "7600",
			// 				Lgort: "",
			// 				Lgobe: "",
			// 				Menge: "10000.000",
			// 				Meins: "KG",
			// 				Uebto: "0.0",
			// 				Untto: "0.0",
			// 				EindtC: "20260608",
			// 			},
			// 			{
			// 				Ebeln: "4501069850",
			// 				IsBonded: "",
			// 				BioflaNo: "TDH0000001",
			// 				Ebelp: "00040",
			// 				SealNo: "FQH0000002",
			// 				Bsart: "ZNB",
			// 				FactoryId: "",
			// 				BedatC: "20260601",
			// 				Country: "",
			// 				AedatC: "20260601",
			// 				Lifnr: "40007220",
			// 				ZsrmEbeln: "",
			// 				Loekz: false,
			// 				Matnr: "40781",
			// 				Maktx: "无碘盐",
			// 				Werks: "7600",
			// 				Lgort: "",
			// 				Lgobe: "",
			// 				Menge: "10000.000",
			// 				Meins: "KG",
			// 				Uebto: "0.0",
			// 				Untto: "0.0",
			// 				EindtC: "20260601",
			// 			},
			// 			{
			// 				Ebeln: "4501069850",
			// 				IsBonded: "",
			// 				BioflaNo: "TDH0000001",
			// 				Ebelp: "00050",
			// 				SealNo: "FQH0000002",
			// 				Bsart: "ZNB",
			// 				FactoryId: "",
			// 				BedatC: "20260601",
			// 				Country: "",
			// 				AedatC: "20260601",
			// 				Lifnr: "40007220",
			// 				ZsrmEbeln: "",
			// 				Loekz: false,
			// 				Matnr: "40002",
			// 				Maktx: "白糖",
			// 				Werks: "7600",
			// 				Lgort: "",
			// 				Lgobe: "",
			// 				Menge: "10000.000",
			// 				Meins: "KG",
			// 				Uebto: "0.0",
			// 				Untto: "0.0",
			// 				EindtC: "20260608",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00060')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00060')",
			// 					type: "ZODATA_YUZ_005_SRV.PURCHASE",
			// 				},
			// 				Ebeln: "4501069850",
			// 				IsBonded: "",
			// 				BioflaNo: "TDH0000001",
			// 				Ebelp: "00060",
			// 				SealNo: "FQH0000002",
			// 				Bsart: "ZNB",
			// 				FactoryId: "",
			// 				BedatC: "20260601",
			// 				Country: "",
			// 				AedatC: "20260601",
			// 				Lifnr: "40007220",
			// 				ZsrmEbeln: "",
			// 				Loekz: false,
			// 				Matnr: "40125",
			// 				Maktx: "乙基麦芽酚",
			// 				Werks: "7600",
			// 				Lgort: "",
			// 				Lgobe: "",
			// 				Menge: "10000.000",
			// 				Meins: "KG",
			// 				Uebto: "0.0",
			// 				Untto: "0.0",
			// 				EindtC: "20260608",
			// 			},
			// 			{
			// 				Ebeln: "4501069850",
			// 				IsBonded: "",
			// 				BioflaNo: "TDH0000001",
			// 				Ebelp: "00070",
			// 				SealNo: "FQH0000002",
			// 				Bsart: "ZNB",
			// 				FactoryId: "",
			// 				BedatC: "20260601",
			// 				Country: "",
			// 				AedatC: "20260601",
			// 				Lifnr: "40007220",
			// 				ZsrmEbeln: "",
			// 				Loekz: false,
			// 				Matnr: "40518",
			// 				Maktx: "牛油味膏食品用香精EB09772",
			// 				Werks: "7600",
			// 				Lgort: "",
			// 				Lgobe: "",
			// 				Menge: "10000.000",
			// 				Meins: "KG",
			// 				Uebto: "0.0",
			// 				Untto: "0.0",
			// 				EindtC: "20260611",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00080')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00080')",
			// 					type: "ZODATA_YUZ_005_SRV.PURCHASE",
			// 				},
			// 				Ebeln: "4501069850",
			// 				IsBonded: "",
			// 				BioflaNo: "TDH0000001",
			// 				Ebelp: "00080",
			// 				SealNo: "FQH0000002",
			// 				Bsart: "ZNB",
			// 				FactoryId: "",
			// 				BedatC: "20260601",
			// 				Country: "",
			// 				AedatC: "20260601",
			// 				Lifnr: "40007220",
			// 				ZsrmEbeln: "",
			// 				Loekz: false,
			// 				Matnr: "40093",
			// 				Maktx: "D-异抗坏血酸钠",
			// 				Werks: "7600",
			// 				Lgort: "",
			// 				Lgobe: "",
			// 				Menge: "10000.000",
			// 				Meins: "KG",
			// 				Uebto: "0.0",
			// 				Untto: "0.0",
			// 				EindtC: "20260608",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00090')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/PURCHASESet(Ebeln='4501069850',Ebelp='00090')",
			// 					type: "ZODATA_YUZ_005_SRV.PURCHASE",
			// 				},
			// 				Ebeln: "4501069850",
			// 				IsBonded: "",
			// 				BioflaNo: "TDH0000001",
			// 				Ebelp: "00090",
			// 				SealNo: "FQH0000002",
			// 				Bsart: "ZNB",
			// 				FactoryId: "",
			// 				BedatC: "20260601",
			// 				Country: "",
			// 				AedatC: "20260601",
			// 				Lifnr: "40007220",
			// 				ZsrmEbeln: "",
			// 				Loekz: false,
			// 				Matnr: "40167",
			// 				Maktx: "增香粉",
			// 				Werks: "7600",
			// 				Lgort: "",
			// 				Lgobe: "",
			// 				Menge: "10000.000",
			// 				Meins: "KG",
			// 				Uebto: "0.0",
			// 				Untto: "0.0",
			// 				EindtC: "20260608",
			// 			},
			// 			{
			// 				Ebeln: "4501069850",
			// 				IsBonded: "",
			// 				BioflaNo: "TDH0000001",
			// 				Ebelp: "00100",
			// 				SealNo: "FQH0000002",
			// 				Bsart: "ZNB",
			// 				FactoryId: "",
			// 				BedatC: "20260601",
			// 				Country: "",
			// 				AedatC: "20260601",
			// 				Lifnr: "40007220",
			// 				ZsrmEbeln: "",
			// 				Loekz: false,
			// 				Matnr: "40881",
			// 				Maktx: "保鲜复合酶YD-YZ1219",
			// 				Werks: "7600",
			// 				Lgort: "",
			// 				Lgobe: "",
			// 				Menge: "10000.000",
			// 				Meins: "KG",
			// 				Uebto: "0.0",
			// 				Untto: "0.0",
			// 				EindtC: "20260601",
			// 			},
			// 		],
			// 	},
			// };

			return { success: true, message: "成功", data: sapData };
		} catch (error: any) {
			return { success: false, message: error.message };
		}
	};

	Material_purchase_finish = async (ctx: Context) => {
		const { success, token, cookie, authHeader } = (await this.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		const payload = {
			BedatC: "20260520", // 订单凭证日期
			Ebeln: "4501069850", // 采购订单号
			// 回传多条，
			TOITEMS: [
				{
					Charg: "2605200001", // 批次
					Ebeln: "4501069850", // 采购订单号
					Werks: "7600", // 工厂
					Ebelp: "00010", // 行项目号，
					Matnr: "50723", // 物料代码
					Lgort: "7601", // 仓库代码
					Menge: "20", // 入库数量
					Meins: "KG", // 单位
					HsdatC: "20260520", // 生产日期，传递时去掉 -
				},
			],
		};

		const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/HEADERSet`;
		try {
			const resp = await axios.post(targetUrl, payload, {
				headers: {
					"X-CSRF-Token": token,
					Cookie: this.normalizeCookie(cookie),
					"Content-Type": "application/json",
					Authorization: authHeader,
					Accept: "application/json",
				},
				validateStatus: () => true,
			});
			let s = resp.data;
			s = {
				d: {
					__metadata: {
						id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/HEADERSet('4501069850')",
						uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/HEADERSet('4501069850')",
						type: "ZODATA_YUZ_005_SRV.HEADER",
					},
					BedatC: "20260520",
					Mblnr: "5001596454",
					Ebeln: "4501069850",
					Mjahr: "2026",
					ErrCode: "0",
					ErrMsg: "采购订单入库成功！",
					TOITEMS: {
						results: [],
					},
				},
			};
			if (resp.status >= 200 && resp.status < 300) {
				return ctx.send({ success: true, message: "成功", data: resp.data });
			}

			const errMsg = typeof resp.data === "string" ? resp.data : JSON.stringify(resp.data);
			return ctx.sendError(resp.status || 500, errMsg || "请求 SAP 失败");
		} catch (err: any) {
			return ctx.sendError(500, err?.message || "请求 SAP 失败");
		}
	};

	Material_demand_detail = async (ctx: Context) => {
		const { success, token, cookie } = (await this.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		let orderNo = "0000034327";
		let year = "2026";
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet?$filter=(ZqqId eq '${orderNo}' and ZqqYear eq '${year}' )`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			console.log("需求出库明细：", resp.data);
			let d = {
				d: {
					results: [
						{
							ZqqId: "0000000001", // 单据编号
							ZqqYear: "2026", // 年度
							Werks: "7600", // 工厂
							Zdate: "20260519", // 日期
							Zbumen: "粗加工组-原料", // 部门
							ZqqSta: "02", // 审核状态
							Matnr: "10031", // 物料代码
							Maktx: "夫妻肺片(牛百叶)", // 物料名称
							Menge: "50.000", // 出库数量
							Meins: "KG", // 基本单位
							Jian: "5.000", // 件数
							ZSta: "02", // 单据状态
							LgortFc: "7604", // 发出仓库
							LgortJs: "7606", // 接收仓库地点
						},
					],
				},
			};
			console.log(JSON.stringify(resp.data));
			return ctx.send({ success: true, message: "成功", data: resp.data });
		} catch (error: any) {
			return ctx.send({ success: false, message: "成功", data: error.message });
			if (error.response) {
			}
		}

		// {"d":{"__metadata":{"id":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')","uri":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')","type":"ZODATA_YUZ_003_SRV.HEADER"},"Werks":"7600","MjahrNew":"0000","Budat":"20260514","MblnrNew":"","TaskNo":"TASK202605140001","Cancel":"","ErrCode":"0","ErrMsg":"","Mjahr":"2026","Mblnr":"4907303484","Bwart":"Z01","TOITEMS":{"results":[]}}}
	};

	Filter_by_date_demand = async (ctx: Context) => {
		const { success, token, cookie } = (await this.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		let orderNo = "0000034327";
		let year = "2026";
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet?$filter=(Werks eq '7600' and (Zdate ge '20260519' and Zdate le '20260529' ))`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			console.log("需求出库明细：", resp.data);
			let d = {
				d: {
					results: [
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032185',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032185',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032185",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260519",
							Zbumen: "内包组-包材",
							ZqqSta: "01",
							Matnr: "32606",
							Maktx: "真空乳白透明袋340*300mm",
							Menge: "15000",
							Meins: "EA",
							Jian: "10.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032189',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032189',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032189",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260519",
							Zbumen: "内包组-包材",
							ZqqSta: "01",
							Matnr: "32606",
							Maktx: "真空乳白透明袋340*300mm",
							Menge: "1200",
							Meins: "EA",
							Jian: "2.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032214",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260519",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40167",
							Maktx: "增香粉",
							Menge: "5.000",
							Meins: "KG",
							Jian: "1.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032214",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260519",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "41180",
							Maktx: "迷迭香提取物 5%迷迭香酸",
							Menge: "25.000",
							Meins: "KG",
							Jian: "1.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032214",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260519",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40794",
							Maktx: "保鲜复合酶YD-YZ23",
							Menge: "75.000",
							Meins: "KG",
							Jian: "3.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032214",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260519",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40518",
							Maktx: "牛油味膏食品用香精EB09772",
							Menge: "40.000",
							Meins: "KG",
							Jian: "2.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032486',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032486',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032486",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260520",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50247",
							Maktx: "牛肉(牛霖)",
							Menge: "13000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032488',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032488',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032488",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260520",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40002",
							Maktx: "白糖",
							Menge: "100.000",
							Meins: "KG",
							Jian: "2.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032558',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032558',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032558",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260520",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50055",
							Maktx: "牛百叶",
							Menge: "5000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032683',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032683',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032683",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260521",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40781",
							Maktx: "无碘盐",
							Menge: "250.000",
							Meins: "KG",
							Jian: "5.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032683',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032683',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032683",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260521",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40794",
							Maktx: "保鲜复合酶YD-YZ23",
							Menge: "50.000",
							Meins: "KG",
							Jian: "2.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032685',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032685',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032685",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260521",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50055",
							Maktx: "牛百叶",
							Menge: "11000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032685',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032685',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032685",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260521",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50247",
							Maktx: "牛肉(牛霖)",
							Menge: "13000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032692',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032692',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032692",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260521",
							Zbumen: "内包组-包材",
							ZqqSta: "01",
							Matnr: "32606",
							Maktx: "真空乳白透明袋340*300mm",
							Menge: "36000",
							Meins: "EA",
							Jian: "24.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032847',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032847',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032847",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260521",
							Zbumen: "外包组-包材",
							ZqqSta: "01",
							Matnr: "32687",
							Maktx: "封箱胶带(60mm透明底红Logo)",
							Menge: "1.000",
							Meins: "JU",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032848',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032848',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032848",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260521",
							Zbumen: "外包组-包材",
							ZqqSta: "01",
							Matnr: "30125",
							Maktx: "无孔套篮袋",
							Menge: "1",
							Meins: "EA",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032898',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032898',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032898",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260522",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40125",
							Maktx: "乙基麦芽酚",
							Menge: "25.000",
							Meins: "KG",
							Jian: "1.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032898',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032898',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032898",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260522",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40021",
							Maktx: "老抽",
							Menge: "240.000",
							Meins: "L",
							Jian: "10.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032898',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032898',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032898",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260522",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40308",
							Maktx: "卤牛肉味粉食品用香精",
							Menge: "75.000",
							Meins: "KG",
							Jian: "3.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032912',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032912',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032912",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260522",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50247",
							Maktx: "牛肉(牛霖)",
							Menge: "13000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032966',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032966',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000032966",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260522",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50723",
							Maktx: "牛肉（后腱）",
							Menge: "2000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033134',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033134',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033134",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260523",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40002",
							Maktx: "白糖",
							Menge: "150.000",
							Meins: "KG",
							Jian: "3.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033134',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033134',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033134",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260523",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40781",
							Maktx: "无碘盐",
							Menge: "250.000",
							Meins: "KG",
							Jian: "5.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033140',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033140',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033140",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260523",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40002",
							Maktx: "白糖",
							Menge: "100.000",
							Meins: "KG",
							Jian: "2.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033140',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033140',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033140",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260523",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40350",
							Maktx: "果葡糖浆",
							Menge: "25.000",
							Meins: "KG",
							Jian: "1.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033140',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033140',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033140",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260523",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40781",
							Maktx: "无碘盐",
							Menge: "200.000",
							Meins: "KG",
							Jian: "4.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033147',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033147',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033147",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260523",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50055",
							Maktx: "牛百叶",
							Menge: "5000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033284',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033284',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033284",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260523",
							Zbumen: "外包组-包材",
							ZqqSta: "01",
							Matnr: "32685",
							Maktx: "标签纸(100mm*80mm)",
							Menge: "10.000",
							Meins: "JU",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033284',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033284',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033284",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260523",
							Zbumen: "外包组-包材",
							ZqqSta: "01",
							Matnr: "32686",
							Maktx: "标签纸(80mm*60mm)",
							Menge: "10.000",
							Meins: "JU",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033337',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033337',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033337",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260524",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40097",
							Maktx: "乙酰化二淀粉磷酸酯",
							Menge: "1000.000",
							Meins: "KG",
							Jian: "40.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033337',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033337',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033337",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260524",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "41045",
							Maktx: "复合调味料LM310",
							Menge: "1000.000",
							Meins: "KG",
							Jian: "40.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033348',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033348',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033348",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260524",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40021",
							Maktx: "老抽",
							Menge: "48.000",
							Meins: "L",
							Jian: "2.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033348',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033348',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033348",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260524",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40301",
							Maktx: "干辣椒(段)",
							Menge: "20.000",
							Meins: "KG",
							Jian: "1.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033348',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033348',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033348",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260524",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40176",
							Maktx: "胡椒面",
							Menge: "15.000",
							Meins: "KG",
							Jian: "6.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033359',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033359',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033359",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260524",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50051",
							Maktx: "牛腱肉",
							Menge: "2000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033359',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033359',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033359",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260524",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50055",
							Maktx: "牛百叶",
							Menge: "1000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033360',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033360',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033360",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260524",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50051",
							Maktx: "牛腱肉",
							Menge: "2000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033360',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033360',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033360",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260524",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50055",
							Maktx: "牛百叶",
							Menge: "6000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033388',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033388',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033388",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260524",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50723",
							Maktx: "牛肉（后腱）",
							Menge: "2000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033389',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033389',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033389",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260524",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50723",
							Maktx: "牛肉（后腱）",
							Menge: "2000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033502',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033502',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033502",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260525",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40781",
							Maktx: "无碘盐",
							Menge: "250.000",
							Meins: "KG",
							Jian: "5.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033510',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033510',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033510",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260525",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50055",
							Maktx: "牛百叶",
							Menge: "5000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033510',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033510',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033510",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260525",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50247",
							Maktx: "牛肉(牛霖)",
							Menge: "13000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033637',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033637',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033637",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260525",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40083",
							Maktx: "鸡香辛料",
							Menge: "32.000",
							Meins: "***",
							Jian: "1.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033646',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033646',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033646",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260525",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50053",
							Maktx: "牛肚",
							Menge: "100.000",
							Meins: "KG",
							Jian: "5.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033795",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260526",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40021",
							Maktx: "老抽",
							Menge: "240.000",
							Meins: "L",
							Jian: "10.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033795",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260526",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40167",
							Maktx: "增香粉",
							Menge: "5.000",
							Meins: "KG",
							Jian: "1.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033795",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260526",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40308",
							Maktx: "卤牛肉味粉食品用香精",
							Menge: "75.000",
							Meins: "KG",
							Jian: "3.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033795",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260526",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40518",
							Maktx: "牛油味膏食品用香精EB09772",
							Menge: "40.000",
							Meins: "KG",
							Jian: "2.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033795",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260526",
							Zbumen: "粗加工-辅料",
							ZqqSta: "01",
							Matnr: "40794",
							Maktx: "保鲜复合酶YD-YZ23",
							Menge: "75.000",
							Meins: "KG",
							Jian: "3.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033802',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033802',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033802",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260526",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50247",
							Maktx: "牛肉(牛霖)",
							Menge: "13000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033807',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033807',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033807",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260525",
							Zbumen: "内包组-包材",
							ZqqSta: "01",
							Matnr: "32606",
							Maktx: "真空乳白透明袋340*300mm",
							Menge: "12000",
							Meins: "EA",
							Jian: "8.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033948',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033948',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033948",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260526",
							Zbumen: "外包组-包材",
							ZqqSta: "01",
							Matnr: "30125",
							Maktx: "无孔套篮袋",
							Menge: "1",
							Meins: "EA",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033948',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033948',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033948",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260526",
							Zbumen: "外包组-包材",
							ZqqSta: "01",
							Matnr: "32687",
							Maktx: "封箱胶带(60mm透明底红Logo)",
							Menge: "1.000",
							Meins: "JU",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033948',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033948',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000033948",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260526",
							Zbumen: "外包组-包材",
							ZqqSta: "01",
							Matnr: "32689",
							Maktx: "塑钢打包带",
							Menge: "10.000",
							Meins: "JU",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034039',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034039',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000034039",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260527",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50247",
							Maktx: "牛肉(牛霖)",
							Menge: "2000.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034023',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034023',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000034023",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260527",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40781",
							Maktx: "无碘盐",
							Menge: "200.000",
							Meins: "KG",
							Jian: "4.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034023',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034023',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000034023",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260527",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40350",
							Maktx: "果葡糖浆",
							Menge: "25.000",
							Meins: "KG",
							Jian: "1.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034023',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034023',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000034023",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260527",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40301",
							Maktx: "干辣椒(段)",
							Menge: "20.000",
							Meins: "KG",
							Jian: "1.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034024',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034024',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000034024",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260527",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40002",
							Maktx: "白糖",
							Menge: "50.000",
							Meins: "KG",
							Jian: "1.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034150',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034150',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000034150",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260526",
							Zbumen: "内包组-包材",
							ZqqSta: "01",
							Matnr: "32606",
							Maktx: "真空乳白透明袋340*300mm",
							Menge: "12000",
							Meins: "EA",
							Jian: "8.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034151',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034151',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000034151",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260527",
							Zbumen: "内包组-包材",
							ZqqSta: "01",
							Matnr: "30125",
							Maktx: "无孔套篮袋",
							Menge: "1000",
							Meins: "EA",
							Jian: "1.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034291',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034291',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000034291",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260528",
							Zbumen: "粗加工-原料",
							ZqqSta: "01",
							Matnr: "50055",
							Maktx: "牛百叶",
							Menge: "6500.000",
							Meins: "KG",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034300',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034300',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000034300",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260528",
							Zbumen: "煮制组—辅料",
							ZqqSta: "01",
							Matnr: "40794",
							Maktx: "保鲜复合酶YD-YZ23",
							Menge: "50.000",
							Meins: "KG",
							Jian: "2.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
						{
							__metadata: {
								id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034321',ZqqYear='2026')",
								uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034321',ZqqYear='2026')",
								type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
							},
							ZqqId: "0000034321",
							ZqqYear: "2026",
							Werks: "7600",
							Zdate: "20260528",
							Zbumen: "内包组-包材",
							ZqqSta: "01",
							Matnr: "30339",
							Maktx: "真空蒸煮袋230*185mm",
							Menge: "300",
							Meins: "EA",
							Jian: "0.000",
							ZSta: "01",
							LgortFc: "",
							LgortJs: "7606",
						},
					],
				},
			};
			console.log(JSON.stringify(resp.data));
			return ctx.send({ success: true, message: "成功", data: resp.data });
		} catch (error: any) {
			return ctx.send({ success: false, message: "成功", data: error.message });
			if (error.response) {
			}
		}

		// {"d":{"__metadata":{"id":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')","uri":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')","type":"ZODATA_YUZ_003_SRV.HEADER"},"Werks":"7600","MjahrNew":"0000","Budat":"20260514","MblnrNew":"","TaskNo":"TASK202605140001","Cancel":"","ErrCode":"0","ErrMsg":"","Mjahr":"2026","Mblnr":"4907303484","Bwart":"Z01","TOITEMS":{"results":[]}}}
	};

	// ? 公共： 需求出库单 日期 范围查询
	Common_Filter_by_date_demand = async (ctx: Context, startData: string, endDate: string) => {
		// const { success, token, cookie } = (await this.GetToekn(ctx)) as any;
		// if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		let orderNo = "0000034327";
		let year = "2026";
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet?$filter=(Werks eq '7600' and (Zdate ge '${startData}' and Zdate le '${endDate}' ))`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			// console.log("需求出库明细：", resp.data);
			// let d = {
			// 	d: {
			// 		results: [
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032185',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032185',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032185",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260519",
			// 				Zbumen: "内包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "32606",
			// 				Maktx: "真空乳白透明袋340*300mm",
			// 				Menge: "15000",
			// 				Meins: "EA",
			// 				Jian: "10.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032189',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032189',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032189",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260519",
			// 				Zbumen: "内包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "32606",
			// 				Maktx: "真空乳白透明袋340*300mm",
			// 				Menge: "1200",
			// 				Meins: "EA",
			// 				Jian: "2.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032214",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260519",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40167",
			// 				Maktx: "增香粉",
			// 				Menge: "5.000",
			// 				Meins: "KG",
			// 				Jian: "1.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032214",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260519",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "41180",
			// 				Maktx: "迷迭香提取物 5%迷迭香酸",
			// 				Menge: "25.000",
			// 				Meins: "KG",
			// 				Jian: "1.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032214",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260519",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40794",
			// 				Maktx: "保鲜复合酶YD-YZ23",
			// 				Menge: "75.000",
			// 				Meins: "KG",
			// 				Jian: "3.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032214',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032214",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260519",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40518",
			// 				Maktx: "牛油味膏食品用香精EB09772",
			// 				Menge: "40.000",
			// 				Meins: "KG",
			// 				Jian: "2.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032486',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032486',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032486",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260520",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50247",
			// 				Maktx: "牛肉(牛霖)",
			// 				Menge: "13000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032488',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032488',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032488",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260520",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40002",
			// 				Maktx: "白糖",
			// 				Menge: "100.000",
			// 				Meins: "KG",
			// 				Jian: "2.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032558',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032558',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032558",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260520",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50055",
			// 				Maktx: "牛百叶",
			// 				Menge: "5000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032683',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032683',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032683",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260521",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40781",
			// 				Maktx: "无碘盐",
			// 				Menge: "250.000",
			// 				Meins: "KG",
			// 				Jian: "5.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032683',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032683',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032683",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260521",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40794",
			// 				Maktx: "保鲜复合酶YD-YZ23",
			// 				Menge: "50.000",
			// 				Meins: "KG",
			// 				Jian: "2.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032685',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032685',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032685",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260521",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50055",
			// 				Maktx: "牛百叶",
			// 				Menge: "11000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032685',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032685',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032685",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260521",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50247",
			// 				Maktx: "牛肉(牛霖)",
			// 				Menge: "13000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032692',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032692',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032692",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260521",
			// 				Zbumen: "内包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "32606",
			// 				Maktx: "真空乳白透明袋340*300mm",
			// 				Menge: "36000",
			// 				Meins: "EA",
			// 				Jian: "24.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032847',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032847',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032847",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260521",
			// 				Zbumen: "外包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "32687",
			// 				Maktx: "封箱胶带(60mm透明底红Logo)",
			// 				Menge: "1.000",
			// 				Meins: "JU",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032848',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032848',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032848",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260521",
			// 				Zbumen: "外包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "30125",
			// 				Maktx: "无孔套篮袋",
			// 				Menge: "1",
			// 				Meins: "EA",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032898',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032898',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032898",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260522",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40125",
			// 				Maktx: "乙基麦芽酚",
			// 				Menge: "25.000",
			// 				Meins: "KG",
			// 				Jian: "1.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032898',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032898',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032898",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260522",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40021",
			// 				Maktx: "老抽",
			// 				Menge: "240.000",
			// 				Meins: "L",
			// 				Jian: "10.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032898',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032898',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032898",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260522",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40308",
			// 				Maktx: "卤牛肉味粉食品用香精",
			// 				Menge: "75.000",
			// 				Meins: "KG",
			// 				Jian: "3.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032912',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032912',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032912",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260522",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50247",
			// 				Maktx: "牛肉(牛霖)",
			// 				Menge: "13000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032966',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000032966',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000032966",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260522",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50723",
			// 				Maktx: "牛肉（后腱）",
			// 				Menge: "2000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033134',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033134',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033134",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260523",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40002",
			// 				Maktx: "白糖",
			// 				Menge: "150.000",
			// 				Meins: "KG",
			// 				Jian: "3.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033134',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033134',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033134",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260523",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40781",
			// 				Maktx: "无碘盐",
			// 				Menge: "250.000",
			// 				Meins: "KG",
			// 				Jian: "5.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033140',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033140',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033140",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260523",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40002",
			// 				Maktx: "白糖",
			// 				Menge: "100.000",
			// 				Meins: "KG",
			// 				Jian: "2.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033140',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033140',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033140",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260523",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40350",
			// 				Maktx: "果葡糖浆",
			// 				Menge: "25.000",
			// 				Meins: "KG",
			// 				Jian: "1.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033140',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033140',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033140",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260523",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40781",
			// 				Maktx: "无碘盐",
			// 				Menge: "200.000",
			// 				Meins: "KG",
			// 				Jian: "4.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033147',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033147',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033147",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260523",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50055",
			// 				Maktx: "牛百叶",
			// 				Menge: "5000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033284',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033284',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033284",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260523",
			// 				Zbumen: "外包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "32685",
			// 				Maktx: "标签纸(100mm*80mm)",
			// 				Menge: "10.000",
			// 				Meins: "JU",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033284',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033284',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033284",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260523",
			// 				Zbumen: "外包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "32686",
			// 				Maktx: "标签纸(80mm*60mm)",
			// 				Menge: "10.000",
			// 				Meins: "JU",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033337',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033337',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033337",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260524",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40097",
			// 				Maktx: "乙酰化二淀粉磷酸酯",
			// 				Menge: "1000.000",
			// 				Meins: "KG",
			// 				Jian: "40.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033337',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033337',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033337",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260524",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "41045",
			// 				Maktx: "复合调味料LM310",
			// 				Menge: "1000.000",
			// 				Meins: "KG",
			// 				Jian: "40.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033348',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033348',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033348",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260524",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40021",
			// 				Maktx: "老抽",
			// 				Menge: "48.000",
			// 				Meins: "L",
			// 				Jian: "2.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033348',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033348',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033348",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260524",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40301",
			// 				Maktx: "干辣椒(段)",
			// 				Menge: "20.000",
			// 				Meins: "KG",
			// 				Jian: "1.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033348',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033348',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033348",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260524",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40176",
			// 				Maktx: "胡椒面",
			// 				Menge: "15.000",
			// 				Meins: "KG",
			// 				Jian: "6.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033359',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033359',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033359",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260524",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50051",
			// 				Maktx: "牛腱肉",
			// 				Menge: "2000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033359',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033359',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033359",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260524",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50055",
			// 				Maktx: "牛百叶",
			// 				Menge: "1000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033360',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033360',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033360",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260524",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50051",
			// 				Maktx: "牛腱肉",
			// 				Menge: "2000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033360',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033360',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033360",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260524",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50055",
			// 				Maktx: "牛百叶",
			// 				Menge: "6000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033388',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033388',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033388",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260524",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50723",
			// 				Maktx: "牛肉（后腱）",
			// 				Menge: "2000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033389',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033389',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033389",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260524",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50723",
			// 				Maktx: "牛肉（后腱）",
			// 				Menge: "2000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033502',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033502',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033502",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260525",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40781",
			// 				Maktx: "无碘盐",
			// 				Menge: "250.000",
			// 				Meins: "KG",
			// 				Jian: "5.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033510',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033510',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033510",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260525",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50055",
			// 				Maktx: "牛百叶",
			// 				Menge: "5000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033510',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033510',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033510",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260525",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50247",
			// 				Maktx: "牛肉(牛霖)",
			// 				Menge: "13000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033637',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033637',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033637",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260525",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40083",
			// 				Maktx: "鸡香辛料",
			// 				Menge: "32.000",
			// 				Meins: "***",
			// 				Jian: "1.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033646',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033646',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033646",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260525",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50053",
			// 				Maktx: "牛肚",
			// 				Menge: "100.000",
			// 				Meins: "KG",
			// 				Jian: "5.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033795",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260526",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40021",
			// 				Maktx: "老抽",
			// 				Menge: "240.000",
			// 				Meins: "L",
			// 				Jian: "10.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033795",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260526",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40167",
			// 				Maktx: "增香粉",
			// 				Menge: "5.000",
			// 				Meins: "KG",
			// 				Jian: "1.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033795",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260526",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40308",
			// 				Maktx: "卤牛肉味粉食品用香精",
			// 				Menge: "75.000",
			// 				Meins: "KG",
			// 				Jian: "3.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033795",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260526",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40518",
			// 				Maktx: "牛油味膏食品用香精EB09772",
			// 				Menge: "40.000",
			// 				Meins: "KG",
			// 				Jian: "2.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033795',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033795",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260526",
			// 				Zbumen: "粗加工-辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40794",
			// 				Maktx: "保鲜复合酶YD-YZ23",
			// 				Menge: "75.000",
			// 				Meins: "KG",
			// 				Jian: "3.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033802',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033802',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033802",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260526",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50247",
			// 				Maktx: "牛肉(牛霖)",
			// 				Menge: "13000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033807',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033807',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033807",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260525",
			// 				Zbumen: "内包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "32606",
			// 				Maktx: "真空乳白透明袋340*300mm",
			// 				Menge: "12000",
			// 				Meins: "EA",
			// 				Jian: "8.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033948',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033948',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033948",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260526",
			// 				Zbumen: "外包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "30125",
			// 				Maktx: "无孔套篮袋",
			// 				Menge: "1",
			// 				Meins: "EA",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033948',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033948',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033948",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260526",
			// 				Zbumen: "外包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "32687",
			// 				Maktx: "封箱胶带(60mm透明底红Logo)",
			// 				Menge: "1.000",
			// 				Meins: "JU",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033948',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000033948',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000033948",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260526",
			// 				Zbumen: "外包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "32689",
			// 				Maktx: "塑钢打包带",
			// 				Menge: "10.000",
			// 				Meins: "JU",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034039',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034039',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000034039",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260527",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50247",
			// 				Maktx: "牛肉(牛霖)",
			// 				Menge: "2000.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034023',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034023',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000034023",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260527",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40781",
			// 				Maktx: "无碘盐",
			// 				Menge: "200.000",
			// 				Meins: "KG",
			// 				Jian: "4.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034023',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034023',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000034023",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260527",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40350",
			// 				Maktx: "果葡糖浆",
			// 				Menge: "25.000",
			// 				Meins: "KG",
			// 				Jian: "1.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034023',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034023',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000034023",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260527",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40301",
			// 				Maktx: "干辣椒(段)",
			// 				Menge: "20.000",
			// 				Meins: "KG",
			// 				Jian: "1.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034024',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034024',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000034024",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260527",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40002",
			// 				Maktx: "白糖",
			// 				Menge: "50.000",
			// 				Meins: "KG",
			// 				Jian: "1.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034150',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034150',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000034150",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260526",
			// 				Zbumen: "内包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "32606",
			// 				Maktx: "真空乳白透明袋340*300mm",
			// 				Menge: "12000",
			// 				Meins: "EA",
			// 				Jian: "8.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034151',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034151',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000034151",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260527",
			// 				Zbumen: "内包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "30125",
			// 				Maktx: "无孔套篮袋",
			// 				Menge: "1000",
			// 				Meins: "EA",
			// 				Jian: "1.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034291',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034291',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000034291",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260528",
			// 				Zbumen: "粗加工-原料",
			// 				ZqqSta: "01",
			// 				Matnr: "50055",
			// 				Maktx: "牛百叶",
			// 				Menge: "6500.000",
			// 				Meins: "KG",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034300',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034300',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000034300",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260528",
			// 				Zbumen: "煮制组—辅料",
			// 				ZqqSta: "01",
			// 				Matnr: "40794",
			// 				Maktx: "保鲜复合酶YD-YZ23",
			// 				Menge: "50.000",
			// 				Meins: "KG",
			// 				Jian: "2.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 			{
			// 				__metadata: {
			// 					id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034321',ZqqYear='2026')",
			// 					uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034321',ZqqYear='2026')",
			// 					type: "ZODATA_YUZ_006_SRV.XUQIUDAN",
			// 				},
			// 				ZqqId: "0000034321",
			// 				ZqqYear: "2026",
			// 				Werks: "7600",
			// 				Zdate: "20260528",
			// 				Zbumen: "内包组-包材",
			// 				ZqqSta: "01",
			// 				Matnr: "30339",
			// 				Maktx: "真空蒸煮袋230*185mm",
			// 				Menge: "300",
			// 				Meins: "EA",
			// 				Jian: "0.000",
			// 				ZSta: "01",
			// 				LgortFc: "",
			// 				LgortJs: "7606",
			// 			},
			// 		],
			// 	},
			// };
			// return { success: true, message: "成功", data: d };
			return { success: true, message: "成功", data: resp?.data || [] };
		} catch (error: any) {
			return { success: false, message: error.message, data: [] };
		}

		// {"d":{"__metadata":{"id":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')","uri":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')","type":"ZODATA_YUZ_003_SRV.HEADER"},"Werks":"7600","MjahrNew":"0000","Budat":"20260514","MblnrNew":"","TaskNo":"TASK202605140001","Cancel":"","ErrCode":"0","ErrMsg":"","Mjahr":"2026","Mblnr":"4907303484","Bwart":"Z01","TOITEMS":{"results":[]}}}
	};

	// ? 公共： 需求出库单  根据单号和工厂获取明细
	Common_demand_detail = async (ctx: Context, order: string = "", yearValue: string = "") => {
		const orderNo = _.trim(order || _.get(ctx, "request.body.docNo", ""));
		const year = _.trim(yearValue || _.get(ctx, "request.body.year", ""));

		// $filter=(ZqqId eq '1' and ZqqYear eq '2026' and Werks eq '7600' and Zdate eq '20260519') // 单号 + 年 + 工厂 + 日期
		const baseUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet?$filter=(ZqqId eq '${orderNo}' and ZqqYear eq '${year}' and Werks eq '7600' )`;
		const urlWithFormat = `${baseUrl}?$format=json`;
		const credentials = Buffer.from("siu:#SIUprd2021#").toString("base64"); // 'c2l1OjEyMw=='
		const authHeader = `Basic ${credentials}`;

		try {
			const resp = await axios.get(baseUrl, {
				headers: {
					"X-CSRF-Token": "Fetch", // 获取 CSRF Token
					Authorization: authHeader, // Basic 认证
					Accept: "application/json",
				},
			});
			console.log("需求出库明细：", resp.data);
			let sapData = resp.data;
			// let sapData = {
			// 	d: {
			// 		results: [
			// 			{
			// 				ZqqId: "0000000001", // 单据编号
			// 				ZqqYear: "2026", // 年度
			// 				Werks: "7600", // 工厂
			// 				Zdate: "20260519", // 日期
			// 				Zbumen: "粗加工组-原料", // 部门
			// 				ZqqSta: "02", // 审核状态
			// 				Matnr: "10031", // 物料代码
			// 				Maktx: "夫妻肺片(牛百叶)", // 描述
			// 				Menge: "50.000", // 数量
			// 				Meins: "KG", // 基本单位
			// 				Jian: "5.000", // 件数
			// 				ZSta: "02", // 单据状态
			// 				LgortFc: "7604", // 发出仓库代码
			// 				LgortJs: "7606", // 接收仓库代码
			// 			},
			// 				{
			// 				ZqqId: "0000000001", // 单据编号
			// 				ZqqYear: "2026", // 年度
			// 				Werks: "7600", // 工厂
			// 				Zdate: "20260519", // 日期
			// 				Zbumen: "粗加工组-原料", // 部门
			// 				ZqqSta: "02", // 审核状态
			// 				Matnr: "10031", // 物料代码
			// 				Maktx: "夫妻肺片(牛百叶)", // 描述
			// 				Menge: "50.000", // 数量
			// 				Meins: "KG", // 基本单位
			// 				Jian: "5.000", // 件数
			// 				ZSta: "02", // 单据状态
			// 				LgortFc: "7604", // 发出仓库代码
			// 				LgortJs: "7606", // 接收仓库代码
			// 			},
			// 				{
			// 				ZqqId: "0000000001", // 单据编号
			// 				ZqqYear: "2026", // 年度
			// 				Werks: "7600", // 工厂
			// 				Zdate: "20260519", // 日期
			// 				Zbumen: "粗加工组-原料", // 部门
			// 				ZqqSta: "02", // 审核状态
			// 				Matnr: "10031", // 物料代码
			// 				Maktx: "夫妻肺片(牛百叶)", // 描述
			// 				Menge: "50.000", // 数量
			// 				Meins: "KG", // 基本单位
			// 				Jian: "5.000", // 件数
			// 				ZSta: "02", // 单据状态
			// 				LgortFc: "7604", // 发出仓库代码
			// 				LgortJs: "7606", // 接收仓库代码
			// 			},
			// 				{
			// 				ZqqId: "0000000001", // 单据编号
			// 				ZqqYear: "2026", // 年度
			// 				Werks: "7600", // 工厂
			// 				Zdate: "20260519", // 日期
			// 				Zbumen: "粗加工组-原料", // 部门
			// 				ZqqSta: "02", // 审核状态
			// 				Matnr: "10031", // 物料代码
			// 				Maktx: "夫妻肺片(牛百叶)", // 描述
			// 				Menge: "50.000", // 数量
			// 				Meins: "KG", // 基本单位
			// 				Jian: "5.000", // 件数
			// 				ZSta: "02", // 单据状态
			// 				LgortFc: "7604", // 发出仓库代码
			// 				LgortJs: "7606", // 接收仓库代码
			// 			},
			// 				{
			// 				ZqqId: "0000000001", // 单据编号
			// 				ZqqYear: "2026", // 年度
			// 				Werks: "7600", // 工厂
			// 				Zdate: "20260519", // 日期
			// 				Zbumen: "粗加工组-原料", // 部门
			// 				ZqqSta: "02", // 审核状态
			// 				Matnr: "10031", // 物料代码
			// 				Maktx: "夫妻肺片(牛百叶)", // 描述
			// 				Menge: "50.000", // 数量
			// 				Meins: "KG", // 基本单位
			// 				Jian: "5.000", // 件数
			// 				ZSta: "02", // 单据状态
			// 				LgortFc: "7604", // 发出仓库代码
			// 				LgortJs: "7606", // 接收仓库代码
			// 			},
			// 		],
			// 	},
			// };
			console.log(JSON.stringify(sapData));
			return { success: true, message: "成功", data: sapData };
		} catch (error: any) {
			return { success: false, message: error.message };
		}

		// {"d":{"__metadata":{"id":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')","uri":"https://saph4d.ziyanfoods.com/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet('7600')","type":"ZODATA_YUZ_003_SRV.HEADER"},"Werks":"7600","MjahrNew":"0000","Budat":"20260514","MblnrNew":"","TaskNo":"TASK202605140001","Cancel":"","ErrCode":"0","ErrMsg":"","Mjahr":"2026","Mblnr":"4907303484","Bwart":"Z01","TOITEMS":{"results":[]}}}
	};

	Material_demand_finish = async (ctx: Context) => {
		const { success, token, cookie, authHeader } = (await this.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, "获取 SAP Token 失败");

		//  {
		//         "__metadata": {
		//           "id": "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034327',ZqqYear='2026')",
		//           "uri": "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/XUQIUDANSet(ZqqId='0000034327',ZqqYear='2026')",
		//           "type": "ZODATA_YUZ_006_SRV.XUQIUDAN"
		//         },
		//         "ZqqId": "0000034327",
		//         "ZqqYear": "2026",
		//         "Werks": "7600",
		//         "Zdate": "20260530",
		//         "Zbumen": "粗加工-原料",
		//         "ZqqSta": "01",
		//         "Matnr": "50247",
		//         "Maktx": "牛肉(牛霖)",
		//         "Menge": "500.000",
		//         "Meins": "KG",
		//         "Jian": "10.000",
		//         "ZSta": "01",
		//         "LgortFc": "",
		//         "LgortJs": "7606"
		//       }

		let payload = {
			Budat: "20260530", // 记账日期: 当天
			ZqqId: "0000034327", // 申请单号
			ZqqYear: "2026", // 年度
			TOITEMS: [
				{
					Charg: "2605140006", //  批次
					ZqqId: "0000034327", // 申请单号
					ZqqYear: "2026", // 年度
					Werks: "7600", // 工厂
					Matnr: "50247", // 物料代码
					Menge: "500", // 出库数量
					Meins: "KG", // 单位
					LgortFc: "7601", // 出库仓库
					LgortJs: "7606", // 入库仓库： 线面库
				},
			],
		};

		const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;
		try {
			const resp = await axios.post(targetUrl, payload, {
				headers: {
					"X-CSRF-Token": token,
					Cookie: this.normalizeCookie(cookie),
					"Content-Type": "application/json",
					Authorization: authHeader,
					Accept: "application/json",
				},
				validateStatus: () => true,
			});

			if (resp.status >= 200 && resp.status < 300) {
				return ctx.send({ success: true, message: "成功", data: resp.data });
			}

			const errMsg = typeof resp.data === "string" ? resp.data : JSON.stringify(resp.data);
			return ctx.sendError(resp.status || 500, errMsg || "请求 SAP 失败");
		} catch (err: any) {
			return ctx.sendError(500, err?.message || "请求 SAP 失败");
		}
	};
}

export default new App();
