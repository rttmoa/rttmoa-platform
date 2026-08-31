import Router = require("@koa/router")
import Operate from '../../controllers/system_monitor/operate'
const router = new Router();

 
// 请求日志
router.post('/operate', Operate.findOperate);  



export default router;