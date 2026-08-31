const port = process.env.SERVER_PORT || process.env.PORT || "4001";
const base = `http://localhost:${port}/api/Scheduled/transfer_sap`;

let key = "Transfer_";

export const transfer_sap = [
	{
		key: `${key}Product_e_production`,
		method: "POST",
		targetUrl: `${base}/Product_e_production`,
		intervalSec: "3s",
		enabled: true,
	},
	{
		key: `${key}Product_o_sale`,
		method: "POST",
		targetUrl: `${base}/Product_o_sale`,
		intervalSec: "3s",
		enabled: true,
	},
	{
		key: `${key}Product_o_demand`,
		method: "POST",
		targetUrl: `${base}/Product_o_demand`,
		intervalSec: "3s",
		enabled: true,
	},
	{
		key: `${key}Product_o_other`,
		method: "POST",
		targetUrl: `${base}/Product_o_other`,
		intervalSec: "3s",
		enabled: true,
	},
	// 原料部分
	{
		key: `${key}Material_e_purchase`,
		method: "POST",
		targetUrl: `${base}/Material_e_purchase`,
		intervalSec: "3s",
		enabled: true,
	},
	{
		key: `${key}Material_o_sale`,
		method: "POST",
		targetUrl: `${base}/Material_o_sale`,
		intervalSec: "3s",
		enabled: true,
	},
	{
		key: `${key}Material_o_demand`,
		method: "POST",
		targetUrl: `${base}/Material_o_demand`,
		intervalSec: "3s",
		enabled: true,
	},
	{
		key: `${key}Material_o_other`,
		method: "POST",
		targetUrl: `${base}/Material_o_other`,
		intervalSec: "3s",
		enabled: true,
	},
];
