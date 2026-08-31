import Router = require("@koa/router");
import Controllers from "../../../controllers/product/product_config/hk_freezing_lay_distribution__c";
// import Controllers from "../../controllers/product_config/product_freezing_lay_distribution";
const router = new Router();

router.post("/query", Controllers.Query);
router.post("/add", Controllers.Add);
router.put("/mod/:id", Controllers.Mod);
router.delete("/del/:id", Controllers.Del);
router.post("/delMore", Controllers.DelMore);
router.post("/importEx", Controllers.ImportEx);

export default router;
