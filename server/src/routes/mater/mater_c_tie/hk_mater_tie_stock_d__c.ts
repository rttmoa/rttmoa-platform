import Router = require("@koa/router");
import Controllers from "../../../controllers/mater/mater_c_tie/hk_mater_tie_stock_d__c";
const router = new Router();

router.post("/query", Controllers.Query);
router.post("/add", Controllers.Add);
router.put("/mod/:id", Controllers.Mod);
router.delete("/del/:id", Controllers.Del);
router.post("/delMore", Controllers.DelMore);
router.post("/importEx", Controllers.ImportEx);

export default router;
