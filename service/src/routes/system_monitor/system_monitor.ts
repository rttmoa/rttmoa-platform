import Router = require("@koa/router")
import ServerMonitor from '../../controllers/system_monitor/server_monitor'
const router = new Router();


router.get('/ServerMonitor/GetMonitor', ServerMonitor.GetMonitor);  

export default router;

