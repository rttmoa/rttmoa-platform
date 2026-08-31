const port = process.env.SERVER_PORT || process.env.PORT || "4001";
const base = `http://localhost:${port}/api/Scheduled/history_task`;

let key = "History_";

export const history_task = [
	// {
	// 	key: `${key}material_document_lei`,
	// 	method: "POST",
	// 	targetUrl: `${base}/material_document_lei`,
	// 	intervalSec: "5min",
	// 	enabled: true,
	// 	desc: "原料库出入库任务（单据表 + 收货表）",
	// },
	// {
	// 	key: `${key}material_document_tie`,
	// 	method: "POST",
	// 	targetUrl: `${base}/material_document_tie`,
	// 	intervalSec: "5min",
	// 	enabled: true,
	// 	desc: "成品库出入库任务（单据表 + 收货表）",
	// },
	// {
	// 	key: `${key}material_document_two`,
	// 	method: "POST",
	// 	targetUrl: `${base}/material_document_two`,
	// 	intervalSec: "5min",
	// 	enabled: true,
	// 	desc: "成品库出入库任务（单据表 + 收货表）",
	// },
	// {
	// 	key: `${key}material_document_mater`,
	// 	method: "POST",
	// 	targetUrl: `${base}/material_document_mater`,
	// 	intervalSec: "5min",
	// 	enabled: true,
	// 	desc: "成品库出入库任务（单据表 + 收货表）",
	// },

	// 	{
	// 	key: `${key}Product_document`,
	// 	method: "POST",
	// 	targetUrl: `${base}/Product_document`,
	// 	intervalSec: "5min",
	// 	enabled: true,
	// 	desc: "成品库出入库任务（单据表 + 收货表）",
	// },

		{
		key: `${key}pack_document`,
		method: "POST",
		targetUrl: `${base}/pack_document`,
		intervalSec: "5min",
		enabled: true,
		desc: "成品库出入库任务（单据表 + 收货表）",
	},		{
		key: `${key}Auxilliry_document`,
		method: "POST",
		targetUrl: `${base}/Auxilliry_document`,
		intervalSec: "5min",
		enabled: true,
		desc: "成品库出入库任务（单据表 + 收货表）",
	},


{
		key: `${key}material_wms_wcs_task`,
		method: "POST",
		targetUrl: `${base}/material_wms_wcs_task`,
		intervalSec: "5min",
		enabled: true,
		desc: "原料库： 出入库主任务 + 下发WCS",
	},
{
		key: `${key}Product_wms_wcs_task`,
		method: "POST",
		targetUrl: `${base}/Product_wms_wcs_task`,
		intervalSec: "5min",
		enabled: true,
		desc: "成品库： 出入库主任务 + 下发WCS",
	},


];
