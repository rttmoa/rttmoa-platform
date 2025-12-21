import Router = require("@koa/router");
import Controllers from "../../controllers/screen/screen";
const router = new Router();



router.post("/query", Controllers.QueryTask); 

router.post("/query/keepwarm/enter", Controllers.QueryKeepWarm_Enter); 

router.post("/query/keepwarm/out", Controllers.QueryKeepWarm_Out); 


router.post("/query/cwwarm/enter", Controllers.QueryCWWarm_Enter); 

router.post("/query/cwwarm/out", Controllers.QueryCWWarm_Out); 

export default router;
