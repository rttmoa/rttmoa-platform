import Router = require("@koa/router")
import Storage_nb from '../../controllers/business_module/storage_nb'
const router = new Router();

// * 这几个接口为测试 mongodb 使用
router.get('/mongo/all_shelf', Storage_nb.findShelf);  
router.get('/mongo/update_shelf', Storage_nb.upShelf);  
router.get('/mongo/insert_shelf', Storage_nb.insShelf);  
router.get('/mongo/delete_shelf', Storage_nb.delShelf);  



// * 功能模块 —— 库存库位报表接口 1880个货位
router.get('/storages', Storage_nb.Storages); 


// * 功能模块 —— 仓库货架表 所有数据
router.get('/shelfs', Storage_nb.Shelfs); 


export default router;