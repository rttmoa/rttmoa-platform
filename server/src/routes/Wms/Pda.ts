import Router = require("@koa/router");
import PDA from "@/src/controllers/Wms/Pda/pda";
import Material from "@/src/controllers/Wms/Pda/pda_material";
import Product from "@/src/controllers/Wms/Pda/pda_product";
import PDA_Pack from "@/src/controllers/Wms/Pda/pda_pack";
import PDA_Auxiliary from "@/src/controllers/Wms/Pda/pda_auxiliary";
const router = new Router();

// =======================================================【公共部分】=======================================================
router.post("/Network/pda", PDA.TestPDANetwork); // 检测网络状态
router.post("/handle/login", PDA.PdaLogin); // 登陆
router.post("/handle/logout", PDA.PdaLogout); // 退出
router.post("/Network/pda/handle/userInfo", PDA.UserStatus); // 检测用户状态

// =======================================================【PDA 原料库】=======================================================
// 入库部分
router.post("/hk_mater_enter_get_document", Material.hk_mater_enter_get_document); // 原料库——入库-获取入库单据
router.post("/hk_mater_enter_get_barcode_data", Material.hk_mater_enter_get_barcode_data); // 原料库——入库-根据指令号获取条码位置截取重量
router.post("/hk_mater_enter_query_total_q", Material.hk_mater_enter_query_total_q); // 原料库——收货界面添加汇总数量
router.post("/hk_mater_enter_byPallet_isGoods", Material.hk_mater_enter_byPallet_isGoods); // 原料库——查询托盘是否收货
router.post("/hk_mater_enter_accept_goods", Material.hk_mater_enter_accept_goods); // 原料库——入库-收货
// 入库查询汇总
router.post("/hk_mater_enter_goods_query", Material.hk_mater_enter_goods_query); // 原料库——入库-查询已收货，相同单号下的 汇总数量
// 出库部分
router.post("/hk_mater_by_pallet_PdaSplit", Material.hk_mater_by_pallet_PdaSplit); // 原料库出库—获取PDA出库表
router.post("/hk_mater_submit_PdaSplit", Material.hk_mater_submit_PdaSplit); // 原料库出库——提交半托出库数据
router.post("/hk_mater_by_pallet_Query", Material.hk_mater_by_pallet_PdaSplit2); // 原料库出库—获取PDA出库表


// =======================================================【PDA 原料库二号库】=======================================================
// 入库部分
router.post("/hk_mater_enter_get_doc_t", Material.hk_mater_enter_get_doc_t); // 原料库——入库-获取入库单据
router.post("/hk_mater_enter_query_total_q_t", Material.s1); // 原料库——收货界面添加汇总数量
router.post("/hk_mater_enter_byPallet_t", Material.hk_mater_enter_byPallet_t); // 原料库——查询托盘是否收货
router.post("/hk_mater_enter_goods_t", Material.hk_mater_enter_goods_t); // 原料库——入库-收货
// 入库查询汇总
router.post("/hk_mater_enter_goods_query_t", Material.hk_mater_enter_goods_query_t); // 原料库——入库-查询已收货，相同单号下的 汇总数量
// 出库部分
router.post("/hk_mater_t_sel_doc", Material.hk_mater_t_sel_doc); // 原料库出库—选择单据   POST-"/api/Pda/hk_mater_t_sel_doc"
router.post("/hk_mater_t_query_stock", Material.hk_mater_t_query_stock); // 原料库出库—选择单据   POST-"/api/Pda/hk_mater_t_query_stock"

router.post("/hk_mater_t_by_pallet_PdaSplit_t", Material.hk_mater_t_by_pallet_PdaSplit_t); // 原料库出库—获取PDA出库表    POST-"/api/Pda/hk_mater_t_by_pallet_PdaSplit_t"
router.post("/hk_mater_t_submit_PdaSplit_t", Material.hk_mater_t_submit_PdaSplit_t); // 原料库出库——提交半托出库数据
router.post("/hk_mater_t_by_pallet_Query", Material.hk_mater_t_by_pallet_PdaSplit_t2); // 原料库出库—获取PDA出库表    POST-"/api/Pda/hk_mater_t_by_pallet_PdaSplit_t"







// =======================================================【PDA 成品库】=======================================================
// 入库部分
router.post("/hk_product_enter_get_document", Product.hk_product_enter_get_document); // 原料库——入库-获取入库单据
router.post("/hk_product_enter_byPallet_isGoods", Product.hk_product_enter_byPallet_isGoods); // 原料库——查询托盘是否收货
router.post("/hk_product_enter_accept_goods", Product.hk_product_enter_accept_goods); // 原料库——入库-收货
// 出库部分
router.post("/hk_product_by_pallet_PdaSplit", Product.hk_product_by_pallet_PdaSplit); // 成品库出库—获取PDA出库表
router.post("/hk_product_submit_PdaSplit", Product.hk_product_submit_PdaSplit); // 成品库出库——提交半托出库数据




// =======================================================【PDA 辅料库】=======================================================
// 入库部分
router.post("/hk_auxiliary_enter_obtaion_document", PDA_Auxiliary.hk_auxiliary_obtaion_document); // 辅料库——入库：获取单据，选择单据信息
router.post("/hk_auxiliary_byPallet_isGoods", PDA_Auxiliary.hk_auxiliary_byPallet_isGoods); // 辅料库——入库：根据托盘号查询是否收货
router.post("/hk_auxiliary_enter_submit_pallet_bind_stock", PDA_Auxiliary.hk_auxiliary_enter_submit_pallet_bind_stock); // 辅料库——入库：提交入库信息，绑定托盘并上架 相同货架位、相同托盘、相同物料数量累加
router.post("/hk_auxiliary_query_stock", PDA_Auxiliary.hk_auxiliary_query_stock); // 辅料库——查询：查询库存模块
// 出库部分
router.post("/hk_auxiliary_out_obtaion_shelfCode", PDA_Auxiliary.hk_auxiliary_out_obtaion_shelfCode); // 辅料库——出库：通过货架条码获取托盘数据
router.post("/hk_auxiliary_out_submit_quantity", PDA_Auxiliary.hk_auxiliary_out_submit_quantity); // 辅料库——出库：物料详情提交出库数量，扣减库存




// =======================================================【PDA 包材库】=======================================================
// router.post("/hk_pack_enter_obtaion_document", PDA_Pack.hk_pack_obtaion_document); // -----------包材库——入库：获取入库单
// router.post("/hk_pack_byPallet_isGoods", PDA_Pack.hk_pack_byPallet_isGoods); // -----------------查询托盘是否收货
// router.post("/hk_pack_enter_submit_pallet_bind_stock", PDA_Pack.hk_pack_enter_submit_pallet_bind_stock); // 包材库——入库：收货并入库

// router.post("/hk_pack_get_out_list", PDA_Pack.hk_pack_get_out_list); //--------------------------- 包材库——出库：获取PDA出库表 列表数据
// // router.post("/hk_pack_out_obtaion_shelfCode", PDA_Pack.hk_pack_out_obtaion_shelfCode); // ---------包材库——出库：通过货架条码获取托盘数据
// router.post("/hk_pack_out_submit_quantity", PDA_Pack.hk_pack_out_submit_quantity); // -------------包材库——出库：出库提交件数和重量，扣减库存

export default router;
