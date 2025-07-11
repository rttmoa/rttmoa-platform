import Router = require("@koa/router")
import qz from '../../controllers/tanhua/qz'
import koaBody from 'koa-body' 
const router = new Router();
    

// 推荐动态
router.get('/recommend', qz.recommend)

// 最新动态
router.get('/newtrends', qz.newtrends)

// 动态点赞,取消点赞
router.get('/star/:id', qz.star)

// 动态喜欢,取消喜欢
router.get('/like/:id', qz.like)

// 不感兴趣
router.get('/noInterest/:id', qz.noInterest)

// 朋友圈评论分页数据
router.get('/comment/:id', qz.comments)

// 朋友圈评论点赞
router.get('/comments/star/:id', qz.commentsstar)

// 提交评论
router.post('/comments/submit/:id', qz.commentssubmit)

// 上传动态中的图片
router.post('/trends/image/upload', koaBody({
    multipart: true,
    formidable: {
        maxFieldsSize: 40000 * 1024 * 1024    // 设置上传文件大小最大限制，默认4M
    }
}), qz.trendsimageupload)

// 发布动态
router.post('/trend/submit', qz.submittrend)

    
export default router