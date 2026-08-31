const port = process.env.SERVER_PORT || process.env.PORT || "4001";
const base = `http://localhost:${port}/api/Scheduled/check_Documents`;

let key = "Check_";

export const check_documents = [
	{
		key: `${key}Product_send_production`,
		method: "POST",
		targetUrl: `${base}/Product_send_production`,
		intervalSec: "3s",
		enabled: true,
		desc: "定时器 > 推送SAP > 成品入库：生产入库单",
	},
	{
		key: `${key}Product_e_production`,
		method: "POST",
		targetUrl: `${base}/Product_e_production`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}Product_o_other`,
		method: "POST",
		targetUrl: `${base}/Product_o_other`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}Product_o_compound`,
		method: "POST",
		targetUrl: `${base}/Product_o_compound`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}material_e_manual`,
		method: "POST",
		targetUrl: `${base}/material_e_manual`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}material_e_auto`,
		method: "POST",
		targetUrl: `${base}/material_e_auto`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}material_e_sale_back`,
		method: "POST",
		targetUrl: `${base}/material_e_sale_back`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}material_o_manual`,
		method: "POST",
		targetUrl: `${base}/material_o_manual`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}material_o_auto`,
		method: "POST",
		targetUrl: `${base}/material_o_auto`,
		intervalSec: "1s",
		enabled: true,
	},

	// 辅料库部分
	{
		key: `${key}auxiliry_e_auto`,
		method: "POST",
		targetUrl: `${base}/auxiliry_e_auto`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}auxiliry_e_sale_back`,
		method: "POST",
		targetUrl: `${base}/auxiliry_e_sale_back`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}auxiliry_o_manual`,
		method: "POST",
		targetUrl: `${base}/auxiliry_o_manual`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}auxiliry_o_auto`,
		method: "POST",
		targetUrl: `${base}/auxiliry_o_auto`,
		intervalSec: "1s",
		enabled: true,
	},
	// 包材库部分
	{
		key: `${key}pack_e_auto`,
		method: "POST",
		targetUrl: `${base}/pack_e_auto`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}pack_e_sale_back`,
		method: "POST",
		targetUrl: `${base}/pack_e_sale_back`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}pack_o_manual`,
		method: "POST",
		targetUrl: `${base}/pack_o_manual`,
		intervalSec: "1s",
		enabled: true,
	},
	{
		key: `${key}pack_o_auto`,
		method: "POST",
		targetUrl: `${base}/pack_o_auto`,
		intervalSec: "1s",
		enabled: true,
	},
];
