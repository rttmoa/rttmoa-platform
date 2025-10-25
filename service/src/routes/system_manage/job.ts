import Router = require('@koa/router');
import routes from '../../controllers/system_manage/job';
const router = new Router();

router.post('/query', routes.Query); // 查询

router.post('/add', routes.Add); // 增加

router.put('/mod/:id', routes.Mod); // 修改

router.delete('/del/:id', routes.Del); // 删除

router.post('/delMore', routes.DelMore); // 删除更多

router.post('/importEx', routes.ImportEx); // 导入Excel表格

export default router;
