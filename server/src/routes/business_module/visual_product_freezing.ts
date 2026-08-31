import Router = require("@koa/router")
import App from '../../controllers/business_module/visual_product_freezing'
const router = new Router();

 

router.get('/shelfs', App.shelfs); 

 


export default router;