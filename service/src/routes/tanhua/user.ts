// const router = require('koa-router')()
import Router from '@koa/router'
import koaBody from 'koa-body'
import User from '../../controllers/tanhua/user.ts'
const router = new Router();


// TODO: 简单MySQL 增删改查

// 手机号获取验证码（手机号登录） 
router.post('/login', User.login) // FIXME: 已完成...

// 检查验证码
router.post('/loginVerification', User.loginVerification) // FIXME: 已完成...

// 注册新用户-填写资料
router.post('/loginReginfo', User.loginReginfo)  // FIXME: 已完成...

// 选取头像（处理上传的图片）
router.post('/loginReginfo/head', koaBody({
    multipart: true,
    formidable: {
        maxFieldsSize: 12000 * 1024 * 1024    // 设置上传文件大小最大限制，默认12M
    }
}), User.uploadHead) // FIXME: 已完成...
    
// 获取所有用户
router.get('/info', User.userinfo) // FIXME: 已完成...


// Utils
    // 获取百度ai 的access_token
    // 识别图片是否是人脸

    // 计算两个经纬度距离差值
    
export default router