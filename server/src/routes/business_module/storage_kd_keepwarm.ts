import Router = require("@koa/router")
import Storage_kd_keepwarm from '../../controllers/business_module/storage_kd_keepwarm'
const router = new Router();

 

// * 克东 保温库450个货位
router.get('/shelfs', Storage_kd_keepwarm.shelfs); 

 


export default router;