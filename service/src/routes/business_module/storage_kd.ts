import Router = require("@koa/router")
import Storage_kd from '../../controllers/business_module/storage_kd'
const router = new Router();

 

// * 克东 保温库450个货位
router.get('/shelfs', Storage_kd.shelfs); 

 


export default router;