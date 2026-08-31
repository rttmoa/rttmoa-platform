import Router = require("@koa/router");
import ChuYu from "@/src/controllers/Wms/ChuYu";
const router = new Router();

// 根据托盘号获取初禹数据
router.post("/By_Pallet_Get_ChuYu", ChuYu.ByPalletGetChuYu);

router.post("/By_Pallet_Get_ChuYu_handleStock", ChuYu.ByPalletGetChuYuHandle);

router.post("/ChuyuDataStore", ChuYu.ChuyuDataStore);

export default router;

let ChuyuData = [
	{
		ID: "295191",
		PalletID: "CP7625090631",
		Barcode: "16988220140101260531193705920000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:37:45.367Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295192",
		PalletID: "CP7625090631",
		Barcode: "16988205340101260531193729930000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:38:01.650Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295193",
		PalletID: "CP7625090631",
		Barcode: "16988218540101260531194033940000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:41:01.907Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295194",
		PalletID: "CP7625090631",
		Barcode: "16988199840101260531194059950000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:41:28.270Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295195",
		PalletID: "CP7625090631",
		Barcode: "16988207090101260531194131960000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:41:59.673Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295196",
		PalletID: "CP7625090631",
		Barcode: "16988224340101260531194223970000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:42:51.900Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295197",
		PalletID: "CP7625090631",
		Barcode: "16988213590101260531194247980000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:43:16.407Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295198",
		PalletID: "CP7625090631",
		Barcode: "16988201140101260531194316990000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:43:45.547Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295199",
		PalletID: "CP7625090631",
		Barcode: "16988216590101260531194346010000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:44:15.483Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295200",
		PalletID: "CP7625090631",
		Barcode: "16988222640101260531194446020000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:45:15.497Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295201",
		PalletID: "CP7625090631",
		Barcode: "16988205390101260531194515030000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:45:44.500Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295202",
		PalletID: "CP7625090631",
		Barcode: "16988210990101260531194534040000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:46:03.917Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295203",
		PalletID: "CP7625090631",
		Barcode: "16988207540101260531194601050000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:46:29.860Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295204",
		PalletID: "CP7625090631",
		Barcode: "16988216390101260531194630060000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:46:59.047Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295205",
		PalletID: "CP7625090631",
		Barcode: "16988216840101260531194721070000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:47:49.850Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295206",
		PalletID: "CP7625090631",
		Barcode: "16988229590101260531194803080000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:48:32.557Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295207",
		PalletID: "CP7625090631",
		Barcode: "16988224690101260531194837090000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:50:05.113Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295208",
		PalletID: "CP7625090631",
		Barcode: "16988231140101260531194951100000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:50:56.563Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295209",
		PalletID: "CP7625090631",
		Barcode: "16988201790101260531195017110000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:51:12.640Z",
		nProduct_ID: "10006",
	},
	{
		ID: "295210",
		PalletID: "CP7625090631",
		Barcode: "16988212940101260531195034120000",
		Statuas: 4,
		BoxStamp: "2026-05-31T19:53:39.820Z",
		nProduct_ID: "10006",
	},
];
