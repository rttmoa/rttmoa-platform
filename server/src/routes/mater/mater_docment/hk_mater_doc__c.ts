import Router = require("@koa/router");
import Controllers from "../../../controllers/mater/mater_docment/hk_mater_doc__c";
const router = new Router();

router.post("/query", Controllers.Query);
router.post("/add", Controllers.Add);
router.put("/mod/:id", Controllers.Mod);
router.delete("/del/:id", Controllers.Del);
router.post("/delMore", Controllers.DelMore);
router.post("/importEx", Controllers.ImportEx);



router.post("/searchSapDocs", Controllers.searchSapDocs); // 根据日期范围查询所有单据编号
router.post("/searchSapDocument", Controllers.SearchSapDocument); // 根据单据获取SAP数据
router.post("/submitSapDocument", Controllers.SubmitSapDocument); // 提交勾选的SAP单据 并 存储到数据库中

router.post("/byOrderGetHTML", Controllers.byOrderGetHTML); // 通过单据号获取打印的单据信息

export default router;
