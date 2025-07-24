import Router = require("@koa/router")
import Shelf from '../../controllers/business_module/shelf'
const router = new Router();

// * 这几个接口为测试 mongodb 使用
router.get('/mongo/all_shelf', Shelf.find_All_Shelf);  
router.get('/mongo/update_shelf', Shelf.updateOne_shelf);  
router.get('/mongo/insert_shelf', Shelf.insert_shelf);  
router.get('/mongo/delete_shelf', Shelf.delete_shelf);  

// * 功能模块 —— 库存库位报表接口 1880个货位
router.get('/Warehouse_Report', Shelf.Warehouse_Report); 


// * 功能模块 —— 仓库货架表 所有数据
router.get('/Warehouse_All_Shelf', Shelf.WarehouseAllShelf); 


export default router;

