import Router = require("@koa/router")
import Friends from '../../controllers/tanhua/friends'
const router = new Router();



// ? 最近来访（表dt_users、dt_visits；访客）
router.get('/visitors', Friends.visitors)

// ? 今日佳人（表dt_users；根据查询条件最后登陆时间和距离；寻找缘分值最大的用户）
router.get('/todayBest', Friends.todayBest)

// 推荐朋友
router.get('/recommendation', Friends.recommendation)

// ? 朋友信息（表dt_users、dt_trends、dt_album；页面分三块：轮播图、个人信息、个人动态）
router.get('/personalInfo/:id', Friends.personalInfo)

// ? 通过 guid 查找用户信息; 表dt_users
router.get('/personalInfoByGuid/:id', Friends.personalInfoByGuid)

// ? 搜附近的人：表dt_users、按照距离由近到远返回前10条数据
router.get('/search', Friends.search)

// ? 探花左滑右滑卡片分页数据（表dt_users、喜欢或不喜欢对方）
router.get('/cards', Friends.cards)

// ? 探花喜欢（表dt_like；喜欢对方，不再喜欢对方） 
router.get('/like/:id/:type', Friends.like)

// ? 测灵魂卷列表（表dt_questions、dt_question_user_ans；查询测试题数据，查询用户的测试题答案并处理）
router.get('/questions', Friends.questions)

// 测灵魂题卷题目 
router.get('/questionSection/:id', Friends.questionSection)

// 提交测试结果获得鉴定单信息
router.post('/questionsAns/:id', Friends.questionsAns)


export default  router