import Router = require("@koa/router")
import Message from '../../controllers/tanhua/message'
const router = new Router();


// TODO: MySQL 连接查询 + 子查询

// 获取点赞信息列表
router.get('/starlist', Message.starlist);  // FIXME: 已完成...



export default router;