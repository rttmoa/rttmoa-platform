import Router = require("@koa/router");
import Generate_Doc from "@/src/controllers/Wms/Generate_Doc";
const router = new Router();

  


// 调用接口生成单据打印机打印单据
router.post("/Generate_Sale_Out", Generate_Doc.Generate_Sale_Out);




// router.post("/By_Pallet_Get_ChuY?u_handleStock", Generate_Doc.ByPalletGetChuYuHandle);



export default router;

