import Router = require("@koa/router")
import ServerMonitor from '../../controllers/system_monitor/monitor'
const router = new Router();


// 获取服务监控数据
router.get('/monitor', ServerMonitor.getMonitor);  
 

export default router;

