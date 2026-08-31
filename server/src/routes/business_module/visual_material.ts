import Router = require("@koa/router")
import App from '../../controllers/business_module/visual_material'
const router = new Router();

 

router.get('/shelfs', App.shelfs); 

 


export default router;