import Router = require("@koa/router");
import Controllers from "../../controllers/keepwarm_doc/create_order";
const router = new Router();


router.post("/query", Controllers.Query);   

router.post("/add", Controllers.Add);  

router.put("/mod/:id", Controllers.Mod);  

router.delete("/del/:id", Controllers.Del);  

router.post("/delMore", Controllers.DelMore);  

router.post("/importEx", Controllers.ImportEx);   

 
export default router;
