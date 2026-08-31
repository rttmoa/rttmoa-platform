import Router = require("@koa/router")
import storage_kd_cwwarm from '../../controllers/business_module/storage_kd_cwwarm'
const router = new Router();

 


 
router.post('/shelfs', storage_kd_cwwarm.shelfs);  // 

 


export default router;