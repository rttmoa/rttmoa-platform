// const router = require('koa-router')()
import Router from '@koa/router'
import Practice from './mysql 练习题.ts'
const router = new Router();

// ! 参考；https://hackmd.io/@_7vFEnkKTve5g-aFhT8EvQ/Sy-H0QeWr#
// https://blog.csdn.net/m0_67392182/article/details/126037354
// https://blog.csdn.net/weixin_43939159/article/details/121164493

// todo 根据 题目查看表结构即可 (审题)
// 根据题目标记关键词 student、sc、teacher、course

router.get('/test0', (ctx) => {
  return ctx.send({msg: '123'})
})


router.get('/test1', async (ctx) => { // ! 1.查询学生表的 前10条资料  (limit 0,10)
  return ctx.send(await ctx.executeSql(`

    select * from student LIMIT 0,10

`))
})  

// ! 2.查詢成績表所有成績的最低分,平均分,總分  (min,avg,sum)
router.get('/test2', Practice.test2) 

// ! 3.查询老师 “谌燕” 所带的课程设数量  (count(*) & left join)
router.get('/test3', Practice.test3) 

// ! 4.查詢所有老師, 每个老師所帶課程的數量 (count(*) & left join & group by)
router.get('/test4', Practice.test4) 

// ! 5.查詢姓”張”的學生名單  (like "張%")
router.get('/test5', Practice.test5) 

// ! 6.查詢課程名稱為’Oracle’且分數低於60的 课程号和分數  (left join & where ... AND ...)
router.get('/test6', Practice.test6) 

// ! 7.查询所有学生的选课 课程名称 (left join & left join)
router.get('/test7', Practice.test7) 

// ! 8.查詢任何一門課程成績在70 分以上的 學生姓名.課程名稱和分數
router.get('/test8', Practice.test8) 

// ! 9.查詢不及格的課程,並按課程號從大到小排列 學號,課程號,課程名,分數
router.get('/test9', Practice.test9) 

// ? 10.询没学过”谌燕”老师讲授的任一门课程的 学号,学生姓名
router.get('/test10', Practice.test10) 

// ? 11.查询两门以上不及格课程的 同学的学号及其平均成绩
router.get('/test11', Practice.test11)

// ! 12.检索’c004’课程分数小于60,按分数降序排列的同学学号
router.get('/test12', Practice.test12)

// ! 13.查詢’c001’課程比’c002’課程成績高的所有學生的學號
router.get('/test13', Practice.test13)

// ! 14.查询平均成绩大于60分的 同学的学号和平均成绩
router.get('/test14', Practice.test14)

// ! 15.查询所有同学的 学号.姓名.选课数.总成绩
router.get('/test15', Practice.test15)

// ! 16.查询姓”劉”的老师的个数
router.get('/test16', Practice.test16)

// ! 17.查詢只學”諶燕”老師所教的課的同學的學號:姓名

// ! 18.查詢學過”c001″並且也學過編號”c002″課程的同學的學號.姓名

// ! 19.查詢學過”諶燕”老師所教的所有課的同學的學號:姓名

// ! 20.查詢課程編號”c004″的成績比課程編號”c001″和”c002″課程低的所有同學的學號.姓名

// ! 21.查詢所有課程成績小於60 分的同學的學號.姓名

// ! 22.查詢沒有學課的同學的學號.姓名
router.get('/test22', async (ctx) => { 
  return ctx.send(await ctx.executeSql(`

    select sno,sname from student
    where sno not in (select distinct sno from sc)

`))
})  


// ! 23.查詢與學號為”s001″一起上過課的同學的學號和姓名

// ! 24.查詢跟學號為”s005″所修課程完全一樣的同學的學號和姓名

// ! 25.查詢各科成績最高和最低的分 顯示: 課程ID,最高分,最低分
router.get('/test22', async (ctx) => { 
  return ctx.send(await ctx.executeSql(`

    select cno,max(score),min(score) from sc
    group by cno

`))
})  


// ! 26.按各科平均成績和及格率的百分數 照平均從低到高顯示

// ! 27.查詢每個課程的老師及平均分從高到低顯示 老師名稱,課程名稱,平均分數

// ! 28.統計列印各科成績,各分數段人數:課程ID,課程名稱,verygood[100-86], good[85-71], bad[<60]

// ! 29.查詢各科成績前三名的記錄:(不考慮成績並列情況)

// ! 30.查詢每門課程被選修的學生數

// 查詢出只選修了兩門課程的全部學生的學號和姓名

// ! 32.查詢男生.女生人數  (count(*) & group by)
router.get('/test33', async (ctx) => { 
  return ctx.send(await ctx.executeSql(`

        select ssex,count(*) from student group by ssex

`))
})   


// 32-1.查詢每個課程的男生女生總數

// ! 33.查詢同名同姓學生名單,並統計同名人數
router.get('/test33', async (ctx) => {
  return ctx.send(await ctx.executeSql(`

      select sname,count(*) from student x
      group by sname
      having count(*) > 1

`))
})  

// 查詢年紀最小跟最大的學生名單(注:Student 表中Sage 列的型別是int)

// ! 35.查詢每門課程的平均成績,結果按平均成績升序排列,平均成績相同時,按課程號降序排列

// 查詢平均成績大於85的所有學生的 學號.姓名和平均成績

// 查詢課程編號為c001 且課程成績在80 分以上的學生的學號和姓名

// 檢索每課程第二高分的學號 分數(考慮成績並列)

// 求選了課程的學生人數

// 查詢選修”諶燕”老師所授課程的學生中,成績最高的學生姓名及其成績

// 41.查询不同课程成绩有相同的学生的学号.课程号.学生成绩

// 所有課程排名成績(不考慮並列) 學號,課程號,排名,成績 照課程,排名排序

// 所有課程排名成績(考慮並列) 學號,課程號,排名,成績 照課程,排名排序

// ! 44.做所有学生显示学生名称,课程名称,成绩,老师名称的视图
router.get('/test44', Practice.test44)

// ! 45.查询上过所有老师教的课程的学生 学号,学生名
router.get('/test45', Practice.test45)

// ! 46.查詢包含數字的課程名
router.get('/test22', async (ctx) => { 
  return ctx.send(await ctx.executeSql(`

  select cname from course where cname regexp '[0-9]'

`))
})  

// ! 47.查詢只有英文的課程名
router.get('/test22', async (ctx) => { 
  return ctx.send(await ctx.executeSql(`

    select cname from course where cname regexp '^([a-z]|[A-Z])+$'

`))
})  


// 查詢所有學生的平均成績 並排名 , 學號,學生名,排名,平均成績(不考慮並列) 對平均成績高到低及學號低到高排序

// 查詢所有學生的平均成績 並排名 , 學號,學生名,排名,平均成績(考慮並列) 對平均成績高到低及學號低到高排序

// 查詢課程有學生的成績是其他人成績兩倍的學號 學生名













export default router